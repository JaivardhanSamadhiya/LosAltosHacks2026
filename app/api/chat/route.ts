import { convertToModelMessages, streamText, UIMessage } from "ai"
import { createAnthropic } from "@ai-sdk/anthropic"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json()

    // Use Anthropic provider via AI SDK with explicit configuration
    const client = createAnthropic({
      baseURL: process.env.AI_SDK_PROVIDER_ENDPOINT,
      apiKey: process.env.VERCEL_AI_GATEWAY_API_KEY || process.env.ANTHROPIC_API_KEY,
    })

    const result = streamText({
      model: client("claude-3-5-sonnet-20241022"),
      system: `You are the AI Copilot for Civic Digital Twin, an AI-powered city simulation platform.
You help urban planners and city officials understand how interventions affect city-wide risk levels, resource efficiency, and population health outcomes.

You can analyze:
- Climate and heat risk scenarios (e.g., "What happens if we add 5 cooling centers in District 7?")
- Infrastructure planning (green spaces, emergency services, transport)
- Population vulnerability mapping (elderly, low-income, high-density areas)
- Resource optimization and cost-benefit analysis
- Flood, wildfire, and extreme weather resilience

Respond with concrete, data-driven projections. Use specific percentages, populations, and cost estimates when possible. Keep responses concise and actionable. Format key numbers in bold.`,
      messages: await convertToModelMessages(messages),
      abortSignal: req.signal,
    })

    return result.toUIMessageStreamResponse()
  } catch (error: any) {
    console.error("[v0] Chat API error:", error?.message || error)

    // Handle timeout errors first
    if (error?.name === "AbortError") {
      return new Response(
        JSON.stringify({
          error: "Request timed out. Please try again.",
          type: "timeout_error"
        }),
        { status: 504, headers: { "Content-Type": "application/json" } }
      )
    }

    // Handle 401/403 auth errors
    if (error?.statusCode === 401 || error?.statusCode === 403) {
      return new Response(
        JSON.stringify({
          error: "Authentication failed. Please verify API keys are configured.",
          type: "auth_error"
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      )
    }

    // Handle 429 rate limit
    if (error?.statusCode === 429) {
      return new Response(
        JSON.stringify({
          error: "Rate limited. Please try again in a moment.",
          type: "rate_limit_error"
        }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      )
    }

    // Handle network/connection errors
    const errorMsg = error?.message || ""
    if (errorMsg.includes("ECONNREFUSED") || errorMsg.includes("ENOTFOUND") || errorMsg.includes("fetch")) {
      return new Response(
        JSON.stringify({
          error: "Unable to connect to AI service. Please check your network connection.",
          type: "connection_error"
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      )
    }

    // Generic error fallback with detailed message in development
    const isDev = process.env.NODE_ENV === "development"
    return new Response(
      JSON.stringify({
        error: "An error occurred with the AI service. Please try again later.",
        type: "unknown_error",
        details: isDev ? (error?.message || String(error)) : undefined
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
