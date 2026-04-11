"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollReveal } from "./scroll-reveal"

interface FeaturesContent {
  title: string
  subtitle: string
}

const defaultContent: FeaturesContent = {
  title: "What makes our platform the best for you.",
  subtitle: "Discover our unique approach to city simulation",
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
        {/* Adaptability Card - Hidden on mobile */}
        <ScrollReveal delay={100}>
          <Card className="hidden md:block liquid-glass border border-white/20 glass-card-interactive h-full">
          <CardHeader>
            <p className="text-[11px] tracking-widest text-white/80">REAL-TIME SIMULATION</p>
            <CardTitle className="mt-1 text-xl text-white">AI-powered urban modeling at your fingertips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/images/intuitive-1.png"
                  alt="Interactive city map with heatmap overlay"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 240px, 45vw"
                  priority={false}
                />
              </div>
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/images/intuitive-2.png"
                  alt="Scenario planning dashboard interface"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 240px, 45vw"
                  priority={false}
                />
              </div>
            </div>
          </CardContent>
          </Card>
        </ScrollReveal>

        {/* Client Love Card - Always visible */}
        <ScrollReveal delay={200}>
          <Card className="liquid-glass border border-white/20 glass-card-interactive h-full">
          <CardHeader>
            <p className="text-[11px] tracking-widest text-white/80">TRUSTED BY CITIES</p>
            <CardTitle className="mt-1 text-xl text-white">
              The platform transformed how we plan for climate resilience — our response times improved by 40%.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex items-end gap-4">
              <div className="text-5xl font-bold text-lime-300">4.9</div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-lime-300 text-lime-300" />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src={"/images/top-rated-1.png"}
                width={280}
                height={160}
                alt="City planning dashboard with risk analytics"
                className="h-full w-full rounded-xl border border-white/10 object-cover"
              />
              <Image
                src={"/images/top-rated-2.png"}
                width={280}
                height={160}
                alt="Urban simulation results visualization"
                className="h-full w-full rounded-xl border border-white/10 object-cover"
              />
            </div>
          </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}
