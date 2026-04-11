"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "./scroll-reveal"
import { Globe, Brain, BarChart3, Clock, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Real-Time City Mapping",
    description: "Interactive 2.5D visualization with dynamic heatmaps showing risk zones, resources, and population density across your entire urban area.",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Our AI copilot understands natural language queries and provides instant scenario analysis with actionable recommendations.",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    icon: BarChart3,
    title: "Impact Projections",
    description: "Model the effects of interventions before implementation. See projected changes in risk, efficiency, and resource utilization.",
    color: "text-lime-400",
    bgColor: "bg-lime-400/10",
  },
  {
    icon: Clock,
    title: "Rapid Scenario Testing",
    description: "Evaluate policy options in minutes instead of months. Compare multiple scenarios side-by-side with detailed metrics.",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
  },
  {
    icon: Shield,
    title: "Climate Resilience",
    description: "Specifically designed for heat vulnerability, flood risk, and emergency response planning in the face of climate change.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
  },
  {
    icon: Zap,
    title: "Instant Updates",
    description: "Real-time data integration means your digital twin stays synchronized with actual city conditions and sensor data.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
  },
]

export function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-16 sm:py-20">
      <ScrollReveal>
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-widest text-lime-300/80 mb-2">PLATFORM CAPABILITIES</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Everything you need for <span className="text-lime-300">smarter planning</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            A comprehensive toolkit for urban planners, emergency managers, and city officials.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <ScrollReveal key={feature.title} delay={index * 100}>
            <Card className="liquid-glass border border-white/10 glass-card-interactive h-full group">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg text-white group-hover:text-lime-300 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
