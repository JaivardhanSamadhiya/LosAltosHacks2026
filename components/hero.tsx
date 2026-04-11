"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import LazyVideo from "./lazy-video"
import { useEffect, useState } from "react"

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const buttonNew = (
    <Button asChild className="rounded-full bg-lime-400 px-6 text-black hover:bg-lime-300 hover:scale-105 transition-all duration-300 animate-glow-pulse">
      <a href="https://wa.link/rc25na" target="_blank" rel="noopener noreferrer">
        Chat With Us
      </a>
    </Button>
  )

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
            <Image src="/icons/skitbit-white.svg" alt="Skitbit logo" width={32} height={32} className="h-8 w-8 animate-float" />
            <p className="text-sm uppercase tracking-[0.25em] text-lime-300/80">skitbit</p>
          </div>
          <h1 
            className={`mt-3 text-center text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="block">HIGH-IMPACT</span>
            <span className="block text-lime-300 drop-shadow-[0_0_20px_rgba(132,204,22,0.35)] animate-text-gradient bg-gradient-to-r from-lime-300 via-lime-400 to-lime-300 bg-clip-text">3D ANIMATION</span>
            <span className="block">FOR BRANDS</span>
          </h1>
          <div 
            className={`mt-6 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {buttonNew}
          </div>

          {/* Phone grid mimic */}
          <div 
            className={`mt-10 grid w-full gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {phoneData.map((p, i) => {
              const visibility = i <= 2 ? "block" : i === 3 ? "hidden md:block" : i === 4 ? "hidden xl:block" : "hidden"

              return (
                <div 
                  key={i} 
                  className={visibility}
                  style={{ transitionDelay: `${400 + i * 100}ms` }}
                >
                  <PhoneCard title={p.title} sub={p.sub} tone={p.tone} gradient={p.gradient} videoSrc={p.videoSrc} index={i} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneCard({
  title = "8°",
  sub = "Clear night. Great for render farm runs.",
  tone = "calm",
  gradient = "from-[#0f172a] via-[#14532d] to-[#052e16]",
  videoSrc,
  index = 0,
}: {
  title?: string
  sub?: string
  tone?: string
  gradient?: string
  videoSrc?: string
  index?: number
}) {
  return (
    <div 
      className="relative rounded-[28px] glass-border bg-neutral-900 p-2 glass-card-interactive group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-2xl bg-black">
        <LazyVideo
          src={
            videoSrc ??
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/b0f3222371106db366a14ca1c29cef55-1b1EWVSa4w3FL2zslcaCGYTy9vcxjF.mp4"
          }
          className="absolute inset-0 h-full w-full object-cover"
          autoplay={true}
          loop={true}
          muted={true}
          playsInline={true}
          aria-label={`${title} - ${sub}`}
        />

        <div className="relative z-10 p-3">
          <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-white/20" />
          <div className="space-y-1 px-1">
            <div className="text-3xl font-bold leading-snug text-white/90">{title}</div>
            <p className="text-xs text-white/70">{sub}</p>
            <div className="mt-3 inline-flex items-center rounded-full bg-black/40 px-2 py-0.5 text-[10px] uppercase tracking-wider text-lime-300 group-hover:bg-lime-400/20 transition-colors duration-300">
              {tone === "calm" ? "skitbit app" : tone}
            </div>
          </div>
        </div>
      </div>
      
      {/* Hover glow overlay */}
      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-t from-lime-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  )
}

const phoneData = [
  {
    title: "Conversions",
    sub: "Turn clicks into paying customers.",
    tone: "results",
    gradient: "from-[#0b0b0b] via-[#0f172a] to-[#020617]",
    videoSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/A%20new%20chapter%20in%20the%20story%20of%20success.__Introducing%20the%20new%20TAG%20Heuer%20Carrera%20Day-Date%20collection%2C%20reimagined%20with%20bold%20colors%2C%20refined%20finishes%2C%20and%20upgraded%20functionality%20to%20keep%20you%20focused%20on%20your%20goals.%20__Six%20-nDNoRQyFaZ8oaaoty4XaQz8W8E5bqA.mp4",
  },
  {
    title: "Speed",
    sub: "Launch in days, not weeks.",
    tone: "speed",
    gradient: "from-[#0b1a0b] via-[#052e16] to-[#022c22]",
  },
  {
    title: "Social-Ready",
    sub: "Made for IG, TikTok, and Meta.",
    tone: "social",
    gradient: "from-[#001028] via-[#0b355e] to-[#052e5e]",
    videoSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Timeline%201-Ku3Y2Hgaw8hCiFEFg1ELtYp631rSzR.webm",
  },
  {
    title: "Standout",
    sub: "Be the product no one scrolls past.",
    tone: "standout",
    gradient: "from-[#0b0b0b] via-[#1f2937] to-[#0b1220]",
  },
  {
    title: "Premium",
    sub: "Look like the market leader.",
    tone: "premium",
    gradient: "from-[#0b0b0b] via-[#111827] to-[#052e16]",
  },
]
