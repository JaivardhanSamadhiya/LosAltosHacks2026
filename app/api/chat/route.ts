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
    // Handle AI Gateway verification errors
    if (error?.statusCode === 403 && error?.data?.error?.type === 'customer_verification_required') {
      return new Response(
        JSON.stringify({
          error: "AI service temporarily unavailable. Please try again later or contact support.",
          type: "service_unavailable"
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      )
    }
    throw error
  }
}
