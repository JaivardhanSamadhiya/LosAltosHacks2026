import { convertToModelMessages, streamText, UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  try {
    const result = streamText({
      model: "anthropic/claude-opus-4.6",
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
    console.error("[v0] Chat API error:", error)

    // Handle AI Gateway verification errors
    if (error?.statusCode === 403) {
      if (error?.data?.error?.type === 'customer_verification_required') {
        return new Response(
          JSON.stringify({
            error: "AI service temporarily unavailable due to verification. Please try again in a moment.",
            type: "service_verification_pending"
          }),
          { status: 503, headers: { "Content-Type": "application/json" } }
        )
      }
      // Generic 403 Forbidden
      return new Response(
        JSON.stringify({
          error: "Not authorized to use AI service. Please verify your Vercel project configuration.",
          type: "auth_error"
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      )
    }

    // Handle network/connection errors
    if (error?.message?.includes("ECONNREFUSED") || error?.message?.includes("ENOTFOUND")) {
      return new Response(
        JSON.stringify({
          error: "Unable to connect to AI service. This is a temporary issue. Please try again.",
          type: "connection_error"
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      )
    }

    // Handle timeout errors
    if (error?.name === "AbortError") {
      return new Response(
        JSON.stringify({
          error: "Request timed out. Please try again.",
          type: "timeout_error"
        }),
        { status: 504, headers: { "Content-Type": "application/json" } }
      )
    }

    // Generic error fallback
    return new Response(
      JSON.stringify({
        error: "An error occurred with the AI service. Please try again later.",
        type: "unknown_error",
        details: process.env.NODE_ENV === "development" ? error?.message : undefined
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
