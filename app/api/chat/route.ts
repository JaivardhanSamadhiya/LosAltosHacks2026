export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const { messages }: { messages: any[] } = await req.json()

    const palantirUrl = process.env.PALANTIR_URL
    const palantirToken = process.env.PALANTIR_TOKEN
    const agentRid = process.env.PALANTIR_AGENT_RID

    // If Palantir env vars are set, route through Palantir agent
    if (palantirUrl && palantirToken && agentRid) {
      try {
        const userMessage = messages[messages.length - 1]?.content || "Help me analyze city risks"

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 55000)

        const res = await fetch(
          `${palantirUrl}/api/v2/aipAgents/agents/${agentRid}/sessions/*/continue`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${palantirToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput: { message: userMessage } }),
            signal: controller.signal,
          }
        )

        clearTimeout(timeoutId)

        if (res.ok) {
          const data = await res.json()
          const responseText = data.agentResponse?.message ?? "I encountered an issue processing your request."

          // Return as SSE stream for compatibility with AI SDK
          const stream = new ReadableStream({
            start(controller) {
              controller.enqueue(new TextEncoder().encode(`0:${JSON.stringify({ type: "text", text: responseText })}\n`))
              controller.close()
            },
          })

          return new Response(stream, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              "Connection": "keep-alive",
            },
          })
        } else {
          console.warn(`[v0] Palantir agent returned ${res.status}`)
        }
      } catch (err: any) {
        console.warn("[v0] Palantir agent error, falling back to mock:", err?.message)
        // Fall through to mock response
      }
    }

    // Fallback: mock response when Palantir is unavailable
    const mockResponses = [
      "Based on the current climate projections, the primary risks are concentrated in the low-lying coastal districts where storm surge could affect approximately 50,000 residents. I recommend prioritizing green infrastructure upgrades and expanded cooling centers in these vulnerable zones.",
      "The urban heat island effect is most severe in the downtown core where surface temperatures exceed ambient by 7-10°C. Strategic tree canopy expansion and reflective roof initiatives could reduce peak temperatures by 3-5°C and lower emergency service demand by approximately 25%.",
      "Wildfire smoke impact modeling suggests that without intervention, air quality index violations could increase by 40% during peak fire season. Enhancing indoor filtration systems in schools and hospitals would protect approximately 15,000 vulnerable populations.",
      "Flash flood risk is elevated in District 3 due to aging stormwater infrastructure with 60-year design life. Replacing this system would require $85M but prevent an estimated $450M in damages during a 100-year rainfall event.",
      "Current energy demand during peak heat hours creates grid instability risk in 4 zones. Distributed solar + battery storage investments of $120M could eliminate this risk while providing $45M in annual energy savings.",
    ]

    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(`0:${JSON.stringify({ type: "text", text: randomResponse })}\n`))
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    })
  } catch (error: any) {
    console.error("[v0] Chat API error:", error?.message || error)

    return new Response(
      JSON.stringify({
        error: "An error occurred processing your request. Please try again.",
        type: "server_error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
