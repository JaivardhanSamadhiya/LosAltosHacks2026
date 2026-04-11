"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { MapPin, Bot, AlertTriangle, LineChart, Layers } from "lucide-react"

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative isolate overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-lime-400/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "-2s" }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "-4s" }} />
      </div>
      
      {/* Particle background */}
      <div className="absolute inset-0 particle-bg opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center py-14 sm:py-20">
          <div 
            className={`mb-5 flex items-center gap-2 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="h-8 w-8 rounded-lg bg-lime-400 flex items-center justify-center animate-float">
              <Layers className="w-5 h-5 text-black" />
            </div>
            <p className="text-sm uppercase tracking-[0.25em] text-lime-300/80">Civic Digital Twin</p>
          </div>
          <h1 
            className={`mt-3 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="block">AI-POWERED</span>
            <span className="block text-lime-300 drop-shadow-[0_0_20px_rgba(132,204,22,0.35)]">CITY SIMULATION</span>
            <span className="block">FOR SMART DECISIONS</span>
          </h1>
          <p 
            className={`mt-4 max-w-2xl text-center text-base text-gray-300 transition-all duration-700 delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            Simulate climate impacts, optimize resources, and make data-driven decisions for sustainable urban planning.
          </p>
          <div 
            className={`mt-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Button asChild className="rounded-full bg-lime-400 px-6 text-black hover:bg-lime-300 hover:scale-105 transition-all duration-300 animate-glow-pulse">
              <a href="#simulation">Try Live Demo</a>
            </Button>
          </div>

          {/* Feature cards grid */}
          <div 
            className={`mt-10 grid w-full gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  feature,
  index = 0,
}: {
  feature: (typeof features)[0]
  index?: number
}) {
  return (
    <div 
      className="relative rounded-[28px] glass-border bg-neutral-900 p-2 glass-card-interactive group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-black via-neutral-900 to-black">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`grid-${index}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke={feature.gridColor} strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${index})`} />
          </svg>
        </div>

        {/* Animated glow */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl animate-pulse ${feature.glowColor}`}
        />

        {/* Content */}
        <div className="relative z-10 p-4 h-full flex flex-col">
          <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/20" />
          
          {/* Icon */}
          <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
          </div>

          <div className="text-2xl font-bold leading-snug text-white/90 mb-1">{feature.title}</div>
          <p className="text-xs text-white/60 flex-1">{feature.description}</p>
          
          <div className="mt-3 inline-flex items-center rounded-full bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-lime-300 group-hover:bg-lime-400/20 transition-colors duration-300 w-fit">
            {feature.tag}
          </div>
        </div>
      </div>
      
      {/* Hover glow overlay */}
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-t from-lime-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  )
}

const features = [
  {
    title: "2.5D Maps",
    description: "Interactive city visualization with real-time heatmaps",
    tag: "live mapping",
    icon: MapPin,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    glowColor: "bg-blue-500/20",
    gridColor: "#3b82f6",
  },
  {
    title: "AI Copilot",
    description: "Natural language scenario planning and analysis",
    tag: "intelligence",
    icon: Bot,
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
    glowColor: "bg-purple-500/20",
    gridColor: "#a855f7",
  },
  {
    title: "Risk Score",
    description: "Real-time climate and health risk assessment",
    tag: "analytics",
    icon: AlertTriangle,
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
    glowColor: "bg-orange-500/20",
    gridColor: "#f97316",
  },
  {
    title: "Scenarios",
    description: "Test interventions before implementation",
    tag: "simulation",
    icon: Layers,
    iconBg: "bg-lime-500/20",
    iconColor: "text-lime-400",
    glowColor: "bg-lime-500/20",
    gridColor: "#84cc16",
  },
  {
    title: "Insights",
    description: "Data-driven decision support dashboard",
    tag: "dashboard",
    icon: LineChart,
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    glowColor: "bg-cyan-500/20",
    gridColor: "#06b6d4",
  },
]
