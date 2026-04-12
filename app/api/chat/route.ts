export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const message = body.message || body.messages?.[body.messages.length - 1]?.content || "Help me analyze city risks"

    const palantirUrl = process.env.PALANTIR_URL
    const palantirToken = process.env.PALANTIR_TOKEN
    const agentRid = process.env.PALANTIR_AGENT_RID

    if (!palantirUrl || !palantirToken || !agentRid) {
      throw new Error("Missing Palantir environment variables")
    }

    const sessionRes = await fetch(
      `${palantirUrl}/api/v2/aipAgents/agents/${agentRid}/sessions?preview=true`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${palantirToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    )

    if (!sessionRes.ok) {
      const err = await sessionRes.text()
      throw new Error(`Session creation failed ${sessionRes.status}: ${err}`)
    }

    const session = await sessionRes.json()
    const sessionRid = session.rid

    const continueRes = await fetch(
      `${palantirUrl}/api/v2/aipAgents/agents/${agentRid}/sessions/${sessionRid}/blockingContinue?preview=true`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${palantirToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: { text: message }
        }),
      }
    )

    if (!continueRes.ok) {
      const err = await continueRes.text()
      throw new Error(`Continue failed ${continueRes.status}: ${err}`)
    }

    const data = await continueRes.json()
    const reply = data.agentMarkdownResponse ?? "No response from agent"
    return Response.json({ reply })

  } catch (error: any) {
    console.error("[chat] error:", error?.message)
    return Response.json(
      { error: error?.message || "An error occurred" },
      { status: 500 }
    )
  }
}
