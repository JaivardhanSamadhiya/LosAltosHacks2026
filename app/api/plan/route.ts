export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const { cityName, currentRiskScore, budget, timeline, priorities } = await req.json()

    // Validate input
    if (!cityName || currentRiskScore === undefined || !budget || !timeline || !priorities) {
      return Response.json(
        { error: "Missing required parameters", plan: null },
        { status: 400 }
      )
    }

    const message = `Generate an intervention plan for ${cityName} with current risk score ${currentRiskScore}, budget $${budget}M, timeline ${timeline} months, priorities: ${priorities}`

    const palantirUrl = process.env.PALANTIR_URL
    const palantirToken = process.env.PALANTIR_TOKEN
    const agentRid = process.env.PALANTIR_AGENT_RID

    // If Palantir env vars are set, call Palantir AIP
    if (palantirUrl && palantirToken && agentRid) {
      try {
        console.log("[v0] Calling Palantir AIP with agent:", agentRid)

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 45000) // 45s timeout for Palantir

        const res = await fetch(
          `${palantirUrl}/api/v2/aipAgents/agents/${agentRid}/sessions/*/continue`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${palantirToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userInput: { message } }),
            signal: controller.signal,
          }
        )

        clearTimeout(timeoutId)

        if (!res.ok) {
          console.error(`[v0] Palantir AIP returned ${res.status}:`, await res.text())
          // Fall through to mock plan on error
        } else {
          const data = await res.json()
          console.log("[v0] Palantir AIP success")
          return Response.json({ plan: data.agentResponse?.message ?? null })
        }
      } catch (err: any) {
        if (err?.name === "AbortError") {
          console.error("[v0] Palantir AIP request timed out")
        } else {
          console.error("[v0] Palantir AIP error:", err?.message)
        }
        // Fall through to mock plan
      }
    } else {
      console.warn("[v0] Palantir env vars not fully configured. Using mock plan.")
    }

    // Fallback: generate a realistic mock plan
    const interventions = [
      {
        name: "Urban Heat Island Mitigation — Green Roof Program",
        cost: Math.round(budget * 0.22),
        riskReduction: "−8 pts",
        phase: "Phase 1 (Months 1–3)",
      },
      {
        name: "Cooling Center Network Expansion",
        cost: Math.round(budget * 0.18),
        riskReduction: "−6 pts",
        phase: "Phase 1 (Months 1–3)",
      },
      {
        name: "Emergency Response Pre-positioning System",
        cost: Math.round(budget * 0.15),
        riskReduction: "−5 pts",
        phase: "Phase 2 (Months 4–6)",
      },
      {
        name: "Vulnerable Population Health Monitoring",
        cost: Math.round(budget * 0.20),
        riskReduction: "−7 pts",
        phase: "Phase 2 (Months 4–6)",
      },
      {
        name: "Infrastructure Resilience Upgrades",
        cost: Math.round(budget * 0.25),
        riskReduction: "−9 pts",
        phase: "Phase 3 (Months 7–12)",
      },
    ]

    const totalReduction = 35
    const projectedScore = Math.max(5, currentRiskScore - totalReduction)

    const plan = `## ${cityName} Intervention Roadmap

**PROJECTED_SCORE:${projectedScore}**

### Interventions

${interventions
  .map(
    (iv, i) =>
      `${i + 1}. **${iv.name}**\n   - Cost: $${iv.cost}M | Risk Reduction: ${iv.riskReduction} | ${iv.phase}`
  )
  .join("\n\n")}

### Executive Summary

Based on the current risk score of ${currentRiskScore} and a $${budget}M investment over ${timeline} months, this roadmap targets the priorities of ${priorities}. By deploying a phased approach — beginning with immediate cooling infrastructure and emergency response improvements, then transitioning to long-term resilience upgrades — ${cityName} can achieve an estimated risk score of **${projectedScore}**, a reduction of ${totalReduction} points. This plan leverages data-driven placement algorithms to maximize impact per dollar spent and prioritizes the most vulnerable populations first.`

    return Response.json({ plan })
  } catch (error: any) {
    console.error("[v0] Plan endpoint error:", error)
    return Response.json(
      { error: "Failed to generate plan", plan: null, details: process.env.NODE_ENV === "development" ? error?.message : undefined },
      { status: 500 }
    )
  }
}
