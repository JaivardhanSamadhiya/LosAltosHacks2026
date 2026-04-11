"use client"

import { useState, useEffect } from "react"
import { ScrollReveal } from "./scroll-reveal"
import { Slider } from "@/components/ui/slider"
import { MapPin, Thermometer, Users, AlertTriangle, Building, Trees } from "lucide-react"

const districts = [
  { id: 1, name: "Downtown", risk: 85, population: 45000, temp: 38 },
  { id: 2, name: "Riverside", risk: 45, population: 28000, temp: 32 },
  { id: 3, name: "Industrial", risk: 72, population: 12000, temp: 36 },
  { id: 4, name: "Suburban East", risk: 35, population: 52000, temp: 30 },
  { id: 5, name: "Harbor", risk: 58, population: 18000, temp: 33 },
]

export function SimulationPreview() {
  const [coolingCenters, setCoolingCenters] = useState(3)
  const [greenSpaces, setGreenSpaces] = useState(15)
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null)
  const [simulatedRisks, setSimulatedRisks] = useState(districts.map(d => d.risk))

  useEffect(() => {
    // Simulate risk reduction based on interventions
    const newRisks = districts.map(d => {
      const coolingReduction = coolingCenters * 3
      const greenReduction = greenSpaces * 0.8
      const newRisk = Math.max(10, d.risk - coolingReduction - greenReduction)
      return Math.round(newRisk)
    })
    setSimulatedRisks(newRisks)
  }, [coolingCenters, greenSpaces])

  const avgRisk = Math.round(simulatedRisks.reduce((a, b) => a + b, 0) / simulatedRisks.length)
  const originalAvgRisk = Math.round(districts.reduce((a, b) => a + b.risk, 0) / districts.length)
  const riskReduction = originalAvgRisk - avgRisk

  const getRiskColor = (risk: number) => {
    if (risk >= 70) return "bg-red-500"
    if (risk >= 50) return "bg-orange-500"
    if (risk >= 30) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getRiskBorderColor = (risk: number) => {
    if (risk >= 70) return "border-red-500/50"
    if (risk >= 50) return "border-orange-500/50"
    if (risk >= 30) return "border-yellow-500/50"
    return "border-green-500/50"
  }

  return (
    <section id="simulation" className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 particle-bg opacity-30" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="text-center mb-12">
          <p className="text-[11px] tracking-widest text-lime-300/80 mb-2">LIVE SIMULATION</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Test interventions in <span className="text-lime-300">real-time</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Adjust parameters and instantly see how they affect city-wide risk levels. This is a simplified demo of our full simulation engine.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_320px] gap-6">
              
              {/* Map Visualization */}
              <div className="liquid-glass rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-lime-300" />
                    District Risk Map
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-neutral-400">Avg Risk:</span>
                    <span className={`font-bold ${avgRisk >= 50 ? "text-orange-400" : "text-green-400"}`}>
                      {avgRisk}%
                    </span>
                  </div>
                </div>

                {/* Simplified 2.5D Grid Map */}
                <div className="relative aspect-[16/10] bg-black/30 rounded-xl overflow-hidden border border-white/5">
                  {/* Grid background */}
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>

                  {/* District blocks */}
                  <div className="absolute inset-4 grid grid-cols-3 grid-rows-2 gap-3">
                    {districts.map((district, i) => {
                      const risk = simulatedRisks[i]
                      return (
                        <button
                          key={district.id}
                          onClick={() => setSelectedDistrict(selectedDistrict === district.id ? null : district.id)}
                          className={`
                            relative rounded-lg border-2 transition-all duration-300 p-3
                            ${getRiskBorderColor(risk)}
                            ${selectedDistrict === district.id ? "ring-2 ring-lime-300 scale-105" : "hover:scale-102"}
                            bg-gradient-to-br from-black/60 to-black/40
                          `}
                        >
                          {/* Risk indicator bar */}
                          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-lg overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 ${getRiskColor(risk)}`}
                              style={{ width: `${risk}%` }}
                            />
                          </div>

                          <div className="mt-2">
                            <div className="text-xs text-neutral-400 truncate">{district.name}</div>
                            <div className="text-lg font-bold text-white">{risk}%</div>
                          </div>

                          {/* Pulse animation for high risk */}
                          {risk >= 70 && (
                            <div className="absolute top-2 right-2">
                              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                              <div className="absolute inset-0 w-2 h-2 rounded-full bg-red-500" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-green-500" />
                      <span className="text-neutral-400">Low</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-yellow-500" />
                      <span className="text-neutral-400">Medium</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-orange-500" />
                      <span className="text-neutral-400">High</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-red-500" />
                      <span className="text-neutral-400">Critical</span>
                    </div>
                  </div>
                </div>

                {/* District Details */}
                {selectedDistrict && (
                  <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    {(() => {
                      const district = districts.find(d => d.id === selectedDistrict)
                      const risk = simulatedRisks[selectedDistrict - 1]
                      if (!district) return null
                      return (
                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div>
                            <AlertTriangle className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                            <div className="text-lg font-bold text-white">{risk}%</div>
                            <div className="text-xs text-neutral-400">Risk Level</div>
                          </div>
                          <div>
                            <Users className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                            <div className="text-lg font-bold text-white">{(district.population / 1000).toFixed(0)}k</div>
                            <div className="text-xs text-neutral-400">Population</div>
                          </div>
                          <div>
                            <Thermometer className="w-5 h-5 mx-auto mb-1 text-red-400" />
                            <div className="text-lg font-bold text-white">{district.temp}C</div>
                            <div className="text-xs text-neutral-400">Peak Temp</div>
                          </div>
                          <div>
                            <Building className="w-5 h-5 mx-auto mb-1 text-lime-400" />
                            <div className="text-lg font-bold text-white">{coolingCenters}</div>
                            <div className="text-xs text-neutral-400">Cooling Centers</div>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>

              {/* Control Panel */}
              <div className="space-y-4">
                {/* Intervention Controls */}
                <div className="liquid-glass rounded-2xl p-5 border border-white/10">
                  <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                    <Building className="w-4 h-4 text-lime-300" />
                    Interventions
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm text-neutral-300">Cooling Centers</label>
                        <span className="text-sm font-bold text-lime-300">{coolingCenters}</span>
                      </div>
                      <Slider
                        value={[coolingCenters]}
                        onValueChange={(v) => setCoolingCenters(v[0])}
                        min={0}
                        max={15}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm text-neutral-300 flex items-center gap-1">
                          <Trees className="w-4 h-4" />
                          Green Space %
                        </label>
                        <span className="text-sm font-bold text-lime-300">{greenSpaces}%</span>
                      </div>
                      <Slider
                        value={[greenSpaces]}
                        onValueChange={(v) => setGreenSpaces(v[0])}
                        min={5}
                        max={40}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Impact Summary */}
                <div className="liquid-glass rounded-2xl p-5 border border-lime-300/20 bg-lime-400/5">
                  <h3 className="text-sm font-semibold text-lime-300 mb-3">Projected Impact</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-300">Risk Reduction</span>
                      <span className="text-lg font-bold text-green-400">-{riskReduction}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-300">Coverage</span>
                      <span className="text-lg font-bold text-white">{Math.min(95, 60 + coolingCenters * 2.5).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-neutral-300">Est. Annual Cost</span>
                      <span className="text-lg font-bold text-white">${(coolingCenters * 0.4 + greenSpaces * 0.1).toFixed(1)}M</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-xs text-neutral-400">
                      Based on historical data and AI modeling
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
