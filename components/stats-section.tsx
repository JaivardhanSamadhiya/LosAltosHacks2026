"use client"

import { AnimatedCounter } from "./animated-counter"
import { ScrollReveal } from "./scroll-reveal"

const stats = [
  {
    value: 250,
    suffix: "+",
    label: "Projects Delivered",
    description: "Successful 3D animations",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Based on feedback",
  },
  {
    value: 15,
    suffix: "+",
    label: "Countries Served",
    description: "Global reach",
  },
  {
    value: 48,
    suffix: "h",
    label: "Avg. Turnaround",
    description: "For initial concepts",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 particle-bg opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-400/5 rounded-full blur-3xl animate-blob" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="text-center mb-12">
          <p className="text-[11px] tracking-widest text-lime-300/80 mb-2">BY THE NUMBERS</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Trusted by brands <span className="animate-text-gradient">worldwide</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 100}>
              <div className="liquid-glass rounded-2xl p-6 text-center glass-card-interactive group">
                <div className="text-4xl sm:text-5xl font-bold text-lime-300 mb-2">
                  <AnimatedCounter 
                    end={stat.value} 
                    suffix={stat.suffix}
                    duration={2000 + index * 200}
                  />
                </div>
                <div className="text-white font-medium mb-1">{stat.label}</div>
                <div className="text-neutral-400 text-sm">{stat.description}</div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-lime-400/10 to-transparent" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
