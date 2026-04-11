"use client"

import { ScrollReveal } from "./scroll-reveal"
import { MessageSquare, Palette, Clapperboard, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Discovery Call",
    description: "We understand your brand, goals, and vision in a quick 15-minute call.",
    color: "from-lime-400 to-lime-300",
  },
  {
    number: "02",
    icon: Palette,
    title: "Concept & Storyboard",
    description: "Our team creates detailed storyboards and mood boards for approval.",
    color: "from-purple-500 to-purple-400",
  },
  {
    number: "03",
    icon: Clapperboard,
    title: "3D Production",
    description: "We model, texture, light, and animate your product with precision.",
    color: "from-cyan-500 to-cyan-400",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Delivery & Launch",
    description: "Receive render-ready files optimized for all platforms.",
    color: "from-orange-500 to-orange-400",
  },
]

export function ProcessSection() {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="container mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <p className="text-[11px] tracking-widest text-lime-300/80 mb-2">OUR PROCESS</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            From idea to <span className="text-lime-300">launch</span> in 4 steps
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            A streamlined workflow designed to deliver stunning results without the usual agency headaches.
          </p>
        </ScrollReveal>

        <div className="relative">
          {/* Connection line - hidden on mobile */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-lime-400/20 via-purple-500/20 via-cyan-500/20 to-orange-500/20" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 150} direction="up">
                <div className="relative group">
                  {/* Step card */}
                  <div className="liquid-glass rounded-2xl p-6 h-full glass-card-interactive">
                    {/* Number badge */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} text-black font-bold text-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {step.number}
                    </div>
                    
                    {/* Icon */}
                    <div className="mb-4">
                      <step.icon className="w-6 h-6 text-white/70 group-hover:text-lime-300 transition-colors" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lime-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Connector dot for desktop */}
                  <div className={`hidden lg:block absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br ${step.color} shadow-lg`}>
                    <div className="absolute inset-1 bg-black rounded-full" />
                    <div className={`absolute inset-2 rounded-full bg-gradient-to-br ${step.color}`} />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
