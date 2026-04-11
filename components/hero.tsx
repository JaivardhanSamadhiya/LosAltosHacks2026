"use client"

import { Button } from "@/components/ui/button"
import LazyVideo from "./lazy-video"
import { useEffect, useState } from "react"

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative isolate overflow-hidden">
      {/* Animated background elements - Civic colors (cyan/teal) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "-2s" }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "-4s" }} />
      </div>
      
      {/* Particle background */}
      <div className="absolute inset-0 particle-bg opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center py-14 sm:py-20">
          <div 
            className={`mb-5 flex items-center gap-2 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center font-bold text-black animate-float">◆</div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">Civic Digital Twin</p>
          </div>
          <h1 
            className={`mt-3 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="block">SIMULATE</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.35)]">THE FUTURE</span>
            <span className="block">OF YOUR CITY</span>
          </h1>
          <p 
            className={`mt-4 max-w-2xl text-center text-lg text-gray-300 transition-all duration-700 delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            AI-powered urban simulations for climate resilience, resource optimization, and sustainable city planning.
          </p>
          <div 
            className={`mt-6 flex gap-4 flex-wrap justify-center transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Button asChild className="rounded-full bg-cyan-400 px-8 py-2 text-black hover:bg-cyan-300 hover:scale-105 transition-all duration-300 animate-glow-pulse font-semibold">
              <a href="#dashboard">Enter Dashboard</a>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-cyan-400/50 text-cyan-300 hover:border-cyan-300 hover:bg-cyan-400/10 px-8 py-2 font-semibold">
              <a href="#features">Learn More</a>
            </Button>
          </div>

          {/* Platform preview cards */}
          <div 
            className={`mt-12 grid w-full gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {platformFeatures.map((feature, i) => (
              <PreviewCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PreviewCard({
  feature,
  index = 0,
}: {
  feature: (typeof platformFeatures)[0]
  index?: number
}) {
  return (
    <div 
      className="relative rounded-2xl glass-border bg-black/40 p-4 glass-card-interactive group overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/30 mb-3 group-hover:scale-110 transition-transform duration-300">
          <span className="text-lg">{feature.icon}</span>
        </div>
        
        <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
          {feature.title}
        </h3>
        
        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {feature.description}
        </p>
      </div>

      {/* Hover glow overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  )
}

const platformFeatures = [
  {
    icon: "🌍",
    title: "Real-Time Mapping",
    description: "Live 2.5D city visualization with interactive heatmaps",
  },
  {
    icon: "🤖",
    title: "AI Copilot",
    description: "Natural language interface for scenario planning",
  },
  {
    icon: "📊",
    title: "Impact Analytics",
    description: "Model climate, resource, and population outcomes",
  },
  {
    icon: "⚡",
    title: "Quick Scenarios",
    description: "Test policies in minutes, not months",
  },
]
