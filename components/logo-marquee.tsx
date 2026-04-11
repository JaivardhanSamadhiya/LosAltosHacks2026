"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"

export function LogoMarquee() {
  const [pausedRow, setPausedRow] = useState<string | null>(null)

  const logos = [
    { name: "Metro Council", image: "/icons/Victorinox.png" },
    { name: "Urban Lab", image: "/icons/Trumpp.png" },
    { name: "City Planning", image: "/icons/Poedagarr.png" },
    { name: "Regional Authority", image: "/icons/Supp.png" },
    { name: "Smart Cities", image: "/icons/SHKUP.png" },
    { name: "Climate Institute", image: "/icons/Persona.png" },
    { name: "Resilience Hub", image: "/icons/HFFB.png" },
    { name: "Innovation Center", image: "/icons/Palladio.png" },
  ]

  const secondRowLogos = [
    { name: "Urban Strategy", image: "/icons/Kami.png" },
    { name: "Infrastructure", image: "/icons/NEEMANS.png" },
    { name: "Planning Dept", image: "/icons/FLICK.png" },
    { name: "City Analytics", image: "/icons/Vandelay.png" },
    { name: "GovTech", image: "/icons/KEJBYKEJ.png" },
    { name: "Sustainability", image: "/icons/Skinny.png" },
    { name: "Data Services", image: "/icons/RICO.png" },
    { name: "Research Lab", image: "/icons/Skyborne.png" },
  ]

  const LogoCard = ({ logo, rowId }: { logo: { name: string; image: string }; rowId: string }) => (
    <div
      className="flex-shrink-0 mx-3 group"
      onMouseEnter={() => setPausedRow(rowId)}
      onMouseLeave={() => setPausedRow(null)}
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl bg-black/40 border border-white/20 backdrop-blur-xl flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:border-lime-300/50 group-hover:shadow-[0_0_20px_rgba(163,230,53,0.2)]">
        <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-105">
          <Image
            src={logo.image || "/placeholder.svg"}
            alt={logo.name}
            fill
            className="object-cover transition-all duration-300 group-hover:brightness-110"
            sizes="(min-width: 1024px) 128px, (min-width: 640px) 112px, 96px"
          />
        </div>
      </div>
    </div>
  )

  return (
    <section className="text-white py-16 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center justify-between mb-12 sm:flex-row sm:items-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl text-center sm:text-left">
            Trusted by <span className="text-lime-300">leading</span>
            <br />
            city planners
          </h2>
          <Button
            variant="outline"
            className="mt-4 sm:mt-0 liquid-glass hover:liquid-glass-enhanced text-white border-white/20 bg-transparent"
          >
            Learn More
          </Button>
        </div>

        {/* Logo Marquee */}
        <div className="relative">
          {/* First Row - Scrolling Right */}
          <div className="flex overflow-hidden mb-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div
              className={`flex animate-scroll-right whitespace-nowrap`}
              style={{
                animationPlayState: pausedRow === "first" ? "paused" : "running",
                width: "max-content",
              }}
            >
              {[...logos, ...logos, ...logos].map((logo, index) => (
                <LogoCard key={`first-${index}`} logo={logo} rowId="first" />
              ))}
            </div>
          </div>

          {/* Second Row - Scrolling Left */}
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div
              className={`flex animate-scroll-left whitespace-nowrap`}
              style={{
                animationPlayState: pausedRow === "second" ? "paused" : "running",
                width: "max-content",
              }}
            >
              {[...secondRowLogos, ...secondRowLogos, ...secondRowLogos].map((logo, index) => (
                <LogoCard key={`second-${index}`} logo={logo} rowId="second" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
