"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { ScrollReveal } from "./scroll-reveal"
import {
  Send, Bot, User, Sparkles, MapPin, Shield, Zap, Target, TrendingUp,
  ArrowDown, ArrowUp, Thermometer, Wind, Droplets, AlertTriangle, Activity,
  CheckSquare, Square, ChevronDown, ChevronUp, FileText,
} from "lucide-react"
import { AnimatedCounter } from "./animated-counter"

// ─── Data ────────────────────────────────────────────────────────────────────

const cityHotspots = [
  { id: 1, name: "Chicago", lat: 41.878, lng: -87.629, risk: 72, pop: 2696000, temp: 38, type: "critical" },
  { id: 2, name: "Phoenix", lat: 33.448, lng: -112.074, risk: 91, pop: 1608000, temp: 47, type: "extreme" },
  { id: 3, name: "Houston", lat: 29.760, lng: -95.369, risk: 68, pop: 2304000, temp: 40, type: "high" },
  { id: 4, name: "New York", lat: 40.712, lng: -74.005, risk: 55, pop: 8336000, temp: 35, type: "high" },
  { id: 5, name: "Miami", lat: 25.775, lng: -80.208, risk: 83, pop: 478000, temp: 43, type: "critical" },
  { id: 6, name: "Los Angeles", lat: 34.052, lng: -118.243, risk: 61, pop: 3979000, temp: 42, type: "high" },
  { id: 7, name: "Denver", lat: 39.739, lng: -104.984, risk: 44, pop: 749000, temp: 34, type: "medium" },
  { id: 8, name: "Seattle", lat: 47.606, lng: -122.332, risk: 32, pop: 737000, temp: 29, type: "medium" },
]

const riskConfig = {
  extreme: { color: "#ef4444", glow: "rgba(239,68,68,0.6)", label: "Extreme" },
  critical: { color: "#f97316", glow: "rgba(249,115,22,0.6)", label: "Critical" },
  high: { color: "#eab308", glow: "rgba(234,179,8,0.6)", label: "High" },
  medium: { color: "#84cc16", glow: "rgba(132,204,22,0.6)", label: "Medium" },
}

function scoreToLevel(score: number): keyof typeof riskConfig {
  if (score >= 75) return "extreme"
  if (score >= 55) return "critical"
  if (score >= 35) return "high"
  return "medium"
}

const impactMetrics = [
  { icon: Shield, label: "Heat Risk Reduction", value: 35, suffix: "%", direction: "down", description: "Average reduction in heat-related health risks across simulated city scenarios using optimized cooling infrastructure placement.", color: "text-green-400", bgColor: "bg-green-400/10", borderColor: "border-green-400/20" },
  { icon: Zap, label: "Emergency Response", value: 48, suffix: "%", direction: "up", description: "Improvement in emergency response times when resources are positioned using AI-optimized placement derived from population vulnerability maps.", color: "text-blue-400", bgColor: "bg-blue-400/10", borderColor: "border-blue-400/20" },
  { icon: Target, label: "Resource Optimization", value: 27, suffix: "%", direction: "down", description: "Reduction in redundant infrastructure spend through AI-driven analysis identifying overlap zones and underserved areas simultaneously.", color: "text-orange-400", bgColor: "bg-orange-400/10", borderColor: "border-orange-400/20" },
  { icon: TrendingUp, label: "Planning Speed", value: 10, suffix: "x", direction: "up", description: "Faster scenario evaluation compared to traditional planning methods — what takes months of analysis now runs in seconds.", color: "text-lime-400", bgColor: "bg-lime-400/10", borderColor: "border-lime-400/20" },
]

// ─── Types ───────────────────────────────────────────────────────────────────

interface SimResult { cityName: string; riskScore: number }

interface HistoryItem {
  cityName: string
  riskScore: number
  riskLevel: keyof typeof riskConfig
  timeAgo: string
  explanation: string
}

interface MarkerUpdate {
  cityId: number
  prevScore: number
  newScore: number
  riskLevel: keyof typeof riskConfig
  topFactor: string
}

// ─── Leaflet Map ──────────────────────────────────────────────────────────────

function CityMap({
  selected,
  onSelect,
  markerUpdate,
  onDismissCard,
}: {
  selected: number | null
  onSelect: (id: number) => void
  markerUpdate: MarkerUpdate | null
  onDismissCard: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<ReturnType<typeof import("leaflet").map> | null>(null)
  const markersRef = useRef<Map<number, ReturnType<typeof import("leaflet").circleMarker>>>(new Map())
  const pulseTimersRef = useRef<NodeJS.Timeout[]>([])

  // Build map once
  useEffect(() => {
    let L: typeof import("leaflet")

    const init = async () => {
      L = (await import("leaflet")).default
      // @ts-expect-error - leaflet icon default
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      if (!containerRef.current || mapRef.current) return

      const map = L.map(containerRef.current, {
        center: [38, -96], zoom: 4, zoomControl: true,
        attributionControl: false, scrollWheelZoom: false,
      })

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd", maxZoom: 19,
      }).addTo(map)

      cityHotspots.forEach((city) => {
        const cfg = riskConfig[city.type as keyof typeof riskConfig]
        const radius = city.type === "extreme" ? 18 : city.type === "critical" ? 15 : city.type === "high" ? 12 : 10

        const marker = L.circleMarker([city.lat, city.lng], {
          radius, fillColor: cfg.color, color: cfg.color,
          weight: 2, opacity: 0.9, fillOpacity: 0.55,
        })

        const tooltipHtml = `
          <div style="background:#0a0a0a;border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:10px 14px;min-width:160px;font-family:inherit;">
            <div style="font-size:13px;font-weight:700;color:#fff;margin-bottom:6px;">${city.name}</div>
            <div style="display:flex;justify-content:space-between;font-size:11px;color:#a3a3a3;margin-bottom:3px;">
              <span>Risk Score</span><span style="color:${cfg.color};font-weight:700;">${city.risk}%</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:11px;color:#a3a3a3;margin-bottom:3px;">
              <span>Peak Temp</span><span style="color:#fff;font-weight:600;">${city.temp}°C</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:11px;color:#a3a3a3;">
              <span>Population</span><span style="color:#fff;font-weight:600;">${(city.pop / 1e6).toFixed(1)}M</span>
            </div>
          </div>
        `

        marker.bindTooltip(tooltipHtml, { permanent: false, direction: "top", className: "civic-tooltip", offset: [0, -8] })
        marker.on("click", () => onSelect(city.id))
        marker.addTo(map)
        markersRef.current.set(city.id, marker)
      })

      mapRef.current = map
    }

    init()

    return () => {
      pulseTimersRef.current.forEach(clearInterval)
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; markersRef.current.clear() }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Highlight selected
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const city = cityHotspots.find((c) => c.id === id)
      if (!city) return
      const cfg = riskConfig[city.type as keyof typeof riskConfig]
      if (id === selected) {
        marker.setStyle({ weight: 3, opacity: 1, fillOpacity: 0.85, color: "#d9f99d" })
      } else {
        marker.setStyle({ weight: 2, opacity: 0.9, fillOpacity: 0.55, color: cfg.color })
      }
    })
  }, [selected])

  // Pulse + recolor on markerUpdate
  useEffect(() => {
    if (!markerUpdate) return
    const marker = markersRef.current.get(markerUpdate.cityId)
    if (!marker) return

    const newCfg = riskConfig[markerUpdate.riskLevel]
    let pulseCount = 0
    const MAX_PULSES = 6 // 3 full pulses (expand/contract)

    const timer = setInterval(() => {
      pulseCount++
      if (pulseCount % 2 === 1) {
        marker.setStyle({ radius: 24, fillOpacity: 0.9, color: newCfg.color, fillColor: newCfg.color, weight: 4 })
      } else {
        marker.setStyle({ radius: 16, fillOpacity: 0.6, color: newCfg.color, fillColor: newCfg.color, weight: 2 })
      }
      if (pulseCount >= MAX_PULSES) {
        clearInterval(timer)
        marker.setStyle({ radius: 16, fillOpacity: 0.7, color: newCfg.color, fillColor: newCfg.color, weight: 2 })
      }
    }, 350)

    pulseTimersRef.current.push(timer)
  }, [markerUpdate])

  return (
    <>
      {`
        .civic-tooltip .leaflet-tooltip { background: transparent !important; border: none !important; box-shadow: none !important; padding: 0 !important; }
        .leaflet-container { background: #0d0d0d; }
      `} 

      <div ref={containerRef} className="w-full h-full rounded-xl" />

      {/* Floating marker card */}
      {markerUpdate && (
        <div className="absolute top-4 right-4 bg-black/80 border border-white/10 rounded-lg p-4 w-80 backdrop-blur z-50 shadow-2xl">
          <button
            onClick={onDismissCard}
            className="absolute top-2 right-2 text-neutral-400 hover:text-white text-sm"
          >
            ✕
          </button>
          <div className="space-y-2.5">
            <div className="text-sm font-semibold text-white">
              {markerUpdate.cityId === 1 ? "Chicago" : cityHotspots.find(c => c.id === markerUpdate.cityId)?.name}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400">{markerUpdate.prevScore}%</span>
              <ArrowRight className="w-3 h-3 text-neutral-500" />
              <span className="text-xs font-semibold text-lime-400">{markerUpdate.newScore}%</span>
              {markerUpdate.newScore < markerUpdate.prevScore ? (
                <ArrowDown className="w-4 h-4 text-green-400 ml-1" />
              ) : (
                <ArrowUp className="w-4 h-4 text-red-400 ml-1" />
              )}
            </div>
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-white inline-block rounded-full px-2 py-1" style={{ background: riskConfig[markerUpdate.riskLevel].color + "30", color: riskConfig[markerUpdate.riskLevel].color }}>
                {riskConfig[markerUpdate.riskLevel].label}
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              {markerUpdate.topFactor}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

// ─── AI Copilot Chat ──────────────────────────────────────────────────────────

function AICopilotChat({ onSimResult }: { onSimResult: (result: SimResult) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<{ id: string; role: "user" | "assistant"; content: string }[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [suggestedFollowUps, setSuggestedFollowUps] = useState<string[]>([])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || isStreaming) return
    setError(null)
    setInput("")

    const userMsg = { id: crypto.randomUUID(), role: "user" as const, content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setIsStreaming(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || `Server returned ${res.status}`)
      }

      const data = await res.json()
      const reply: string = data.reply || "I encountered an issue processing your request."

      const followUps: string[] = []
      // Try multiple patterns to catch the follow-up section
      const followUpPatterns = [
        /(?:📌|🔖|💡)[^\n]*(?:Suggested|Follow[- ]Up|Next)[^\n]*\n([\s\S]*?)$/i,
        /(?:Suggested Follow[- ]Up Actions?|Next Steps?|What(?:'s| is) Next)[^\n]*\n([\s\S]*?)$/i,
        /\n\n(?:\d+\.\s+.+\n?){2,}$/,
      ]

      let cleanReply = reply
      for (const pattern of followUpPatterns) {
        const matched = cleanReply.match(pattern)
        if (matched) {
          const section = matched[1] || matched[0]
          section.split('\n').forEach((line: string) => {
            const match = line.match(/^\d+\.\s+\*?\*?([^*\n]{10,})\*?\*?/)
            if (match) followUps.push(match[1].replace(/\*\*/g, '').trim())
          })
          if (followUps.length > 0) {
            cleanReply = cleanReply.replace(pattern, '').trim()
            break
          }
        }
      }
      setSuggestedFollowUps(followUps.slice(0, 3))

      const assistantMsg = { id: crypto.randomUUID(), role: "assistant" as const, content: cleanReply }
      setMessages((prev) => [...prev, assistantMsg])

      const cityMatch = cityHotspots.find((c) => reply.toLowerCase().includes(c.name.toLowerCase()))
      const scoreMatch = reply.match(/risk(?:\s+score)?[^\d]*(\d{1,3})%?/i) ?? reply.match(/(\d{1,3})%?\s+risk/i)
      if (cityMatch && scoreMatch) {
        const score = parseInt(scoreMatch[1])
        if (score >= 1 && score <= 100) onSimResult({ cityName: cityMatch.name, riskScore: score })
      }
    } catch (err: any) {
      console.error("[chat] Error:", err)
      setError("Unable to connect to AI service. Please try again later.")
    } finally {
      setIsStreaming(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, isStreaming])

  const suggestedPrompts = [
    "What if Phoenix adds 10 cooling centers?",
    "Compare flood risk for Miami vs Houston",
    "How to reduce Chicago heat deaths by 30%?",
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-black/20 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-lime-400/20 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-lime-300" />
        </div>
        <div>
          <span className="text-sm font-semibold text-white">AI Copilot</span>
          <p className="text-[10px] text-neutral-500">City scenario planner</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
          <span className="text-[10px] text-lime-300">Live</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {error && (
          <div className="flex gap-2.5 justify-start">
            <div className="w-7 h-7 rounded-full bg-red-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            </div>
            <div className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm bg-red-400/10 text-red-400 border border-red-400/30">
              {error}
            </div>
          </div>
        )}
        {messages.length === 0 && !error ? (
          <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-4">
            <Bot className="w-10 h-10 text-lime-300/30" />
            <p className="text-neutral-500 text-xs max-w-[200px]">
              Ask about any city scenario — heat risk, floods, infrastructure, or resource planning.
            </p>
            <div className="flex flex-col gap-2 w-full">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="text-left text-[11px] text-lime-300/70 border border-lime-300/20 rounded-lg px-3 py-2 hover:bg-lime-300/10 hover:border-lime-300/40 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-lime-300" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-lime-400 text-black font-medium"
                    : "bg-white/5 text-white border border-white/10"
                }`}
                dangerouslySetInnerHTML={{
                  __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                }}
              />
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
              )}
            </div>
          ))
        )}

        {isStreaming && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex gap-2.5 justify-start">
            <div className="w-7 h-7 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0">
              <Bot className="w-3.5 h-3.5 text-lime-300" />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-3.5 py-2.5">
              <div className="flex gap-1">
                {[0, 150, 300].map((delay) => (
                  <div
                    key={delay}
                    className="w-1.5 h-1.5 rounded-full bg-lime-300 animate-bounce"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {suggestedFollowUps.length > 0 && !isStreaming && (
          <div className="flex flex-col gap-2">
            {suggestedFollowUps.map((prompt, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput(prompt)
                  setSuggestedFollowUps([])
                }}
                className="text-left text-[11px] text-lime-300/70 border border-lime-300/20 rounded-lg px-3 py-2 hover:bg-lime-300/10 hover:border-lime-300/40 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-white/10 bg-black/20 flex-shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about any city scenario..."
            disabled={isStreaming}
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-3.5 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-lime-300/50 transition-colors disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isStreaming || !input.trim()}
            className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center hover:bg-lime-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            aria-label="Send message"
          >
            <Send className="w-3.5 h-3.5 text-black" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── City Detail Bar ─────────────────────────────────────────────────────

function CityDetailBar({ cityId }: { cityId: number | null }) {
  if (!cityId) return null
  const city = cityHotspots.find((c) => c.id === cityId)
  if (!city) return null
  const cfg = riskConfig[city.type as keyof typeof riskConfig]
  return (
    <div className="mt-3 p-4 bg-white/5 rounded-xl border border-white/10 grid grid-cols-4 gap-3 text-center">
      <div>
        <AlertTriangle className="w-4 h-4 mx-auto mb-1" style={{ color: cfg.color }} />
        <div className="text-lg font-bold text-white">{city.risk}%</div>
        <div className="text-[10px] text-neutral-400">Risk Score</div>
      </div>
      <div>
        <Thermometer className="w-4 h-4 mx-auto mb-1 text-red-400" />
        <div className="text-lg font-bold text-white">{city.temp}°C</div>
        <div className="text-[10px] text-neutral-400">Peak Temp</div>
      </div>
      <div>
        <Wind className="w-4 h-4 mx-auto mb-1 text-blue-400" />
        <div className="text-lg font-bold text-white">{(city.pop / 1e6).toFixed(1)}M</div>
        <div className="text-[10px] text-neutral-400">Population</div>
      </div>
      <div>
        <Droplets className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
        <div className="text-lg font-bold" style={{ color: cfg.color }}>{cfg.label}</div>
        <div className="text-[10px] text-neutral-400">Risk Level</div>
      </div>
    </div>
  )
}

// ─── Live Simulation Feed ─────────────────────────────────────────────────────

const riskBadgeStyle: Record<keyof typeof riskConfig, string> = {
  extreme: "bg-red-500/20 text-red-400 border-red-500/30",
  critical: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  high: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  medium: "bg-lime-500/20 text-lime-400 border-lime-500/30",
}

function LiveSimulationFeed() {
  const [items, setItems] = useState<HistoryItem[]>([])
  const [newIds, setNewIds] = useState<Set<number>>(new Set())
  const prevCitiesRef = useRef<Set<string>>(new Set())

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch("/api/history")
      if (!res.ok) {
        console.warn("[v0] History fetch returned", res.status)
        return
      }
      const data: HistoryItem[] = await res.json()

      setItems((prev) => {
        const incoming = new Set(data.map((d) => d.cityName + d.riskScore))
        const prevNames = prevCitiesRef.current
        const brandNew = data.filter((d) => !prevNames.has(d.cityName + d.riskScore))
        if (brandNew.length > 0) {
          setNewIds(new Set(brandNew.map((_, i) => i)))
          setTimeout(() => setNewIds(new Set()), 800)
        }
        prevCitiesRef.current = incoming
        return data
      })
    } catch (err) {
      console.warn("[v0] History fetch error:", err instanceof Error ? err.message : err)
      // silently ignore network errors in feed — will retry on next poll
    }
  }, [])

  useEffect(() => {
    fetchHistory()
    const id = setInterval(fetchHistory, 10000)
    return () => clearInterval(id)
  }, [fetchHistory])

  return (
    <div className="flex flex-col h-full gap-3 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
        <Activity className="w-4 h-4 text-lime-400" />
        <span className="text-xs font-semibold text-white">Live Simulations</span>
        <span className="ml-auto text-[10px] text-neutral-500">{items.length} results</span>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-3 space-y-2.5">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <p className="text-[11px] text-neutral-500">Simulations will appear here</p>
          </div>
        ) : (
          items.map((item, idx) => (
            <div
              key={`${item.cityName}-${item.riskScore}-${idx}`}
              className={`p-3 rounded-lg border transition-all ${riskBadgeStyle[item.riskLevel]} ${
                newIds.has(idx) ? "ring-2 ring-lime-400 scale-105" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-current">{item.cityName}</span>
                <span className="text-[10px] text-current/60">{item.timeAgo}</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-current">{item.riskScore}%</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ background: riskConfig[item.riskLevel].color + "30", color: riskConfig[item.riskLevel].color }}>
                  {riskConfig[item.riskLevel].label}
                </span>
              </div>
              <p className="text-[10px] text-current/70 leading-relaxed">{item.explanation}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function SimulationPreview() {
  const [selectedCity, setSelectedCity] = useState<number | null>(null)
  const [markerUpdate, setMarkerUpdate] = useState<MarkerUpdate | null>(null)
  const [mapMounted, setMapMounted] = useState(false)

  const handleSimResult = (result: SimResult) => {
    const city = cityHotspots.find((c) => c.name === result.cityName)
    if (city) {
      const prevScore = city.risk
      const newScore = result.riskScore
      const riskLevel = scoreToLevel(newScore)
      const topFactor = newScore < prevScore ? "Infrastructure optimization detected" : "Risk factors increasing"
      setMarkerUpdate({ cityId: city.id, prevScore, newScore, riskLevel, topFactor })
    }
  }

  return (
    <section id="simulation" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 particle-bg opacity-30" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <ScrollReveal className="text-center mb-12">
          <p className="text-[11px] tracking-widest text-lime-300/80 mb-2">LIVE SIMULATION</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Explore cities. Ask the <span className="text-lime-300">AI Copilot</span>.
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Click any city on the map to inspect its risk profile, then ask the AI Copilot to simulate interventions and project outcomes.
          </p>
        </ScrollReveal>

        {/* Map + Chat panel */}
        <ScrollReveal delay={100}>
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_340px] gap-5">
              {/* Left: Leaflet Map */}
              <div className="liquid-glass rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                {/* Map toolbar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/20 flex-shrink-0">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-lime-300" />
                    US City Heat Risk Map
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] text-neutral-400">
                    {Object.entries(riskConfig).map(([key, val]) => (
                      <div key={key} className="flex items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: val.color }} />
                        <span>{val.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div className="relative flex-1 min-h-[360px]">
                  {mapMounted && (
                    <CityMap 
                      selected={selectedCity} 
                      onSelect={setSelectedCity}
                      markerUpdate={markerUpdate}
                      onDismissCard={() => setMarkerUpdate(null)}
                    />
                  )}
                </div>

                {/* Selected city detail */}
                <div className="px-5 pb-4">
                  {selectedCity ? (
                    <CityDetailBar cityId={selectedCity} />
                  ) : (
                    <p className="text-[11px] text-neutral-500 text-center py-3">
                      Click a marker to inspect city risk details
                    </p>
                  )}
                </div>
              </div>

              {/* Right: AI Copilot Chat */}
              <div className="liquid-glass rounded-2xl border border-white/10 overflow-hidden flex flex-col">
                <AICopilotChat onSimResult={handleSimResult} />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Impact metrics */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {impactMetrics.map((metric, idx) => (
            <ScrollReveal key={idx} delay={idx * 50}>
              <div className={`p-5 rounded-xl border ${metric.borderColor} ${metric.bgColor} hover:border-opacity-100 transition-all`}>
                <div className="flex items-start justify-between mb-3">
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-bold ${metric.color}`}>
                      <AnimatedCounter value={metric.value} />
                    </span>
                    <span className={`text-xs font-semibold ${metric.color}`}>{metric.suffix}</span>
                    {metric.direction === "up" && <ArrowUp className={`w-3 h-3 ${metric.color} ml-0.5`} />}
                    {metric.direction === "down" && <ArrowDown className={`w-3 h-3 ${metric.color} ml-0.5`} />}
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-white mb-2">{metric.label}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{metric.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ArrowRight Icon ─────────────────────────────────────────────────────────
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}
