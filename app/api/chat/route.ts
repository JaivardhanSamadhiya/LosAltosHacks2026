import { convertToModelMessages, streamText, UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: "openai/gpt-4o-mini",
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
}
