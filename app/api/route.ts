export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const { cityName, currentRiskScore, budget, timeline, priorities } = await req.json()

    if (!cityName || currentRiskScore === undefined || !budget || !timeline || !priorities) {
      return Response.json(
        { error: "Missing required parameters", plan: null },
        { status: 400 }
      )
    }

    const palantirUrl = process.env.PALANTIR_URL
    const palantirToken = process.env.PALANTIR_TOKEN
    const agentRid = process.env.PALANTIR_AGENT_RID

    if (!palantirUrl || !palantirToken || !agentRid) {
      throw new Error("Missing Palantir environment variables")
    }

    // Step 1 — Create session
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

    // Step 2 — Request intervention plan
    const continueRes = await fetch(
      `${palantirUrl}/api/v2/aipAgents/agents/${agentRid}/sessions/${sessionRid}/blockingContinue?preview=true`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${palantirToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: {
            text: `Generate a detailed intervention plan for ${cityName} with:
- Current risk score: ${currentRiskScore}/100
- Budget: $${budget}M
- Timeline: ${timeline} months
- Priority areas: ${priorities}

Provide a numbered list of 4-6 specific interventions each with estimated cost,
projected risk reduction in points, and implementation phase.
End with an executive summary and the projected final risk score.`
          }
        }),
      }
    )

    if (!continueRes.ok) {
      const err = await continueRes.text()
      throw new Error(`Continue failed ${continueRes.status}: ${err}`)
    }

    const data = await continueRes.json()
    const plan = data.agentMarkdownResponse ?? "No plan generated"

    return Response.json({ plan })

  } catch (error: any) {
    console.error("[plan] error:", error?.message)
    return Response.json(
      { error: "Failed to generate plan", plan: null },
      { status: 500 }
    )
  }
}