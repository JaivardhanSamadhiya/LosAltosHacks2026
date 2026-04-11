"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "./scroll-reveal"

interface FeaturesContent {
  title: string
  subtitle: string
}

const defaultContent: FeaturesContent = {
  title: "Core Platform Capabilities",
  subtitle: "Everything you need for sustainable urban planning",
}

export function Features() {
  const [content, setContent] = useState<FeaturesContent>(defaultContent)

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem("skitbit-content")
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent)
        if (parsed.features) {
          setContent(parsed.features)
        }
      } catch (error) {
        console.error("Error parsing saved content:", error)
      }
    }
  }, [])

  return (
    <section id="features" className="container mx-auto px-4 py-16 sm:py-20">
      <ScrollReveal>
        <h2 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          {content.title}
        </h2>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-2">
        {/* AI Copilot Card */}
        <ScrollReveal delay={100}>
          <Card className="hidden md:block liquid-glass border border-cyan-400/20 glass-card-interactive h-full bg-gradient-to-br from-cyan-500/5 to-blue-500/5">
          <CardHeader>
            <p className="text-[11px] tracking-widest text-cyan-300">AI COPILOT</p>
            <CardTitle className="mt-1 text-xl text-white">Natural Language Planning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-lg bg-black/40 border border-cyan-400/20 p-3">
                <p className="text-sm text-cyan-300/80">💬 "What if we doubled our cooling centers in this district?"</p>
              </div>
              <div className="rounded-lg bg-black/40 border border-cyan-400/20 p-3">
                <p className="text-sm text-cyan-300/80">🤖 Model updates instantly with impacts shown in real-time</p>
              </div>
              <div className="text-xs text-gray-400">AI analyzes policies across climate, equity, budget, and health</div>
            </div>
          </CardContent>
          </Card>
        </ScrollReveal>

        {/* Real-Time Mapping Card */}
        <ScrollReveal delay={200}>
          <Card className="liquid-glass border border-cyan-400/20 glass-card-interactive h-full bg-gradient-to-br from-cyan-500/5 to-blue-500/5">
          <CardHeader>
            <p className="text-[11px] tracking-widest text-cyan-300">LIVE MAPPING</p>
            <CardTitle className="mt-1 text-xl text-white">
              Interactive 2.5D City Visualization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-red-500/20 border border-red-400/20 p-2 text-center">
                  <div className="text-xs font-bold text-red-300">Risk Zones</div>
                </div>
                <div className="rounded-lg bg-yellow-500/20 border border-yellow-400/20 p-2 text-center">
                  <div className="text-xs font-bold text-yellow-300">Resources</div>
                </div>
                <div className="rounded-lg bg-green-500/20 border border-green-400/20 p-2 text-center">
                  <div className="text-xs font-bold text-green-300">Solutions</div>
                </div>
              </div>
              <p className="text-xs text-gray-400">Pan, zoom, and drill into neighborhood-level data instantly</p>
            </div>
          </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}
