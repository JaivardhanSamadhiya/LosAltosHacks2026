export const maxDuration = 60

const sessionStore: Record<string, string> = {}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const message = body.message || body.messages?.[body.messages.length - 1]?.content || "Help me analyze city risks"
    const conversationId = body.conversationId || "default"

    const palantirUrl = process.env.PALANTIR_URL
    const palantirToken = process.env.PALANTIR_TOKEN
    const agentRid = process.env.PALANTIR_AGENT_RID
    const mlApiUrl = process.env.ML_API_URL

    if (!palantirUrl || !palantirToken || !agentRid) {
      throw new Error("Missing Palantir environment variables")
    }

    // Reuse existing session or create new one
    let sessionRid = sessionStore[conversationId]

    if (!sessionRid) {
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
      sessionRid = session.rid
      sessionStore[conversationId] = sessionRid
    }

    // Try to call ML model first if message mentions a city intervention
    let mlData = null
    if (mlApiUrl) {
      try {
        const mlRes = await fetch(`${mlApiUrl}/api/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            city_name: extractCity(message),
            cooling_centers_delta: extractNumber(message, ["cooling center", "cooling centres"]),
            medical_resources_delta: extractNumber(message, ["hospital", "medical", "clinic"]),
            budget_change_pct: null,
            other_changes: message
          }),
        })
        if (mlRes.ok) {
          mlData = await mlRes.json()
        }
      } catch (e) {
        console.warn("ML model call failed:", e)
      }
    }

    // Build prompt with ML data if available
    const prompt = mlData
      ? `The user said: "${message}"
         ML model results for ${mlData.city_name}:
         - Previous risk score: ${mlData.previous_risk_score}/100
         - New risk score: ${mlData.new_risk_score}/100
         - Risk level: ${mlData.risk_level}
         - Top contributing factors: ${mlData.top_features.join(", ")}
         - Risk reduction: ${mlData.risk_reduction_pct}%
         Generate a clear, actionable 3-paragraph insight explaining these results.`
      : message

    // Continue the session
    const continueRes = await fetch(
      `${palantirUrl}/api/v2/aipAgents/agents/${agentRid}/sessions/${sessionRid}/blockingContinue?preview=true`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${palantirToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: { text: prompt }
        }),
      }
    )

    if (!continueRes.ok) {
      // Session expired — create new one
      delete sessionStore[conversationId]
      const err = await continueRes.text()
      throw new Error(`Continue failed ${continueRes.status}: ${err}`)
    }

    const data = await continueRes.json()
    const reply = data.agentMarkdownResponse ?? "No response from agent"

    return Response.json({
      reply,
      riskData: mlData,
      sessionRid
    })

  } catch (error: any) {
    console.error("[chat] error:", error?.message)
    return Response.json(
      { error: error?.message || "An error occurred" },
      { status: 500 }
    )
  }
}

function extractCity(message: string): string | null {
  const cities = ["Phoenix", "Miami", "Houston", "Chicago", "Los Angeles", "New York",
    "Dallas", "Atlanta", "Seattle", "Denver", "Las Vegas", "Portland",
    "San Francisco", "Boston", "Detroit", "Memphis", "New Orleans"]
  for (const city of cities) {
    if (message.toLowerCase().includes(city.toLowerCase())) return city
  }
  return null
}

function extractNumber(message: string, keywords: string[]): number | null {
  for (const keyword of keywords) {
    const regex = new RegExp(`(\\d+)\\s*${keyword}`, 'i')
    const match = message.match(regex)
    if (match) return parseInt(match[1])
  }
  return null
}
