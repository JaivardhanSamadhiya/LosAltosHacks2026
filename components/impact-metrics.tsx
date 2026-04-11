"use client"

import { ScrollReveal } from "./scroll-reveal"
import { AnimatedCounter } from "./animated-counter"
import { ArrowDown, ArrowUp, Shield, Zap, Target, TrendingUp } from "lucide-react"

const metrics = [
  {
    icon: Shield,
    label: "Heat Risk Reduction",
    value: 35,
    suffix: "%",
    change: "decrease",
    description: "Average reduction in heat-related health risks across simulated scenarios",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    borderColor: "border-green-400/20",
  },
  {
    icon: Zap,
    label: "Response Efficiency",
    value: 48,
    suffix: "%",
    change: "increase",
    description: "Improvement in emergency response times with optimized resource placement",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
  },
  {
    icon: Target,
    label: "Resource Optimization",
    value: 27,
    suffix: "%",
    change: "decrease",
    description: "Reduction in redundant infrastructure through AI-driven placement analysis",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/20",
  },
  {
    icon: TrendingUp,
    label: "Planning Speed",
    value: 10,
    suffix: "x",
    change: "increase",
    description: "Faster scenario evaluation compared to traditional planning methods",
    color: "text-lime-400",
    bgColor: "bg-lime-400/10",
    borderColor: "border-lime-400/20",
  },
]

export function ImpactMetrics() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 particle-bg opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-400/3 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="text-center mb-12">
          <p className="text-[11px] tracking-widest text-lime-300/80 mb-2">PROJECTED IMPACT</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Measurable <span className="text-lime-300">outcomes</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Based on simulation modeling and urban planning research, here are the projected improvements cities can expect.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <ScrollReveal key={metric.label} delay={index * 100}>
              <div className={`liquid-glass rounded-2xl p-6 h-full border ${metric.borderColor} glass-card-interactive group`}>
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${metric.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>

                {/* Value */}
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-4xl font-bold ${metric.color}`}>
                    <AnimatedCounter end={metric.value} suffix={metric.suffix} duration={2000 + index * 200} />
                  </span>
                  {metric.change === "decrease" ? (
                    <ArrowDown className="w-5 h-5 text-green-400" />
                  ) : (
                    <ArrowUp className="w-5 h-5 text-blue-400" />
                  )}
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-white mb-2">{metric.label}</h3>

                {/* Description */}
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Disclaimer */}
        <ScrollReveal delay={500}>
          <div className="mt-12 text-center">
            <p className="text-xs text-neutral-500 max-w-xl mx-auto">
              These projections are based on simulation models and may vary depending on city-specific conditions, implementation strategies, and other factors. Actual results will be validated through pilot programs.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
