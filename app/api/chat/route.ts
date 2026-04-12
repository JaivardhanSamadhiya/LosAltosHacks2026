export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const message = body.message || "Help me analyze city risks"

    const palantirUrl = process.env.PALANTIR_URL
    const palantirToken = process.env.PALANTIR_TOKEN
    const agentRid = process.env.PALANTIR_AGENT_RID

    // DEBUG — log everything
    console.log('=== PALANTIR DEBUG ===')
    console.log('URL:', palantirUrl)
    console.log('HAS TOKEN:', !!palantirToken)
    console.log('TOKEN LENGTH:', palantirToken?.length)
    console.log('AGENT RID:', agentRid)
    console.log('SESSION URL:', `${palantirUrl}/api/v2/aipAgents/agents/${agentRid}/sessions?preview=true`)

    if (!palantirUrl || !palantirToken || !agentRid) {
      return Response.json({
        error: "Missing env vars",
        debug: { palantirUrl, hasToken: !!palantirToken, agentRid }
      }, { status: 500 })
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

    console.log('SESSION STATUS:', sessionRes.status)
    const sessionBody = await sessionRes.text()
    console.log('SESSION BODY:', sessionBody)

    if (!sessionRes.ok) {
      return Response.json({
        error: `Session creation failed: ${sessionRes.status}`,
        debug: { sessionBody, url: `${palantirUrl}/api/v2/aipAgents/agents/${agentRid}/sessions?preview=true` }
      }, { status: 500 })
    }

    const session = JSON.parse(sessionBody)
    const sessionRid = session.rid
    console.log('SESSION RID:', sessionRid)

    // Step 2 — Continue session
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

    console.log('CONTINUE STATUS:', continueRes.status)
    const continueBody = await continueRes.text()
    console.log('CONTINUE BODY:', continueBody)

    if (!continueRes.ok) {
      return Response.json({
        error: `Continue failed: ${continueRes.status}`,
        debug: { continueBody }
      }, { status: 500 })
    }

    const data = JSON.parse(continueBody)
    const reply = data.agentMarkdownResponse ?? "No response from agent"
    return Response.json({ reply })

  } catch (error: any) {
    console.error('[chat] error:', error?.message)
    return Response.json(
      { error: error?.message, stack: error?.stack },
      { status: 500 }
    )
  }
}
