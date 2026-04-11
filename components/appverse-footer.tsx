"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Layers } from "lucide-react"

export function AppverseFooter() {
  return (
    <section className="text-white">
      {/* CTA Card */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <Card className="relative overflow-hidden rounded-3xl liquid-glass p-6 sm:p-10">
          <div className="relative text-center max-w-2xl mx-auto">
            <p className="mb-2 text-[11px] tracking-widest text-lime-300">IN DEVELOPMENT</p>
            <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl mb-4">
              Help shape the future of urban planning
            </h3>
            <p className="text-sm text-neutral-400 mb-6">
              Civic Digital Twin is actively seeking pilot city partners and collaborators. If you work in urban
              planning, climate resilience, or smart city infrastructure, we&apos;d love to connect.
            </p>
            <Button asChild className="bg-lime-400 text-black hover:bg-lime-300 font-semibold">
              <Link href="/contact">Join the Pilot Program</Link>
            </Button>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 pb-20 md:pb-10">
        <div className="container mx-auto px-4 py-10">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5">
                <div className="h-6 w-6 rounded-lg bg-lime-400 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-black" />
                </div>
                <span className="text-xl font-semibold text-white">Civic Digital Twin</span>
              </div>
              <p className="max-w-sm text-sm text-neutral-400">
                An AI-powered city simulation platform for climate resilience and sustainable urban planning.
                Currently in development.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h5 className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400">Navigation</h5>
              <ul className="space-y-2 text-sm text-neutral-300">
                <li>
                  <Link href="/" className="hover:text-lime-300 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:text-lime-300 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#simulation" className="hover:text-lime-300 transition-colors">
                    Live Demo
                  </Link>
                </li>
                <li>
                  <Link href="#process" className="hover:text-lime-300 transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-lime-300 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row">
            <p>2025 Civic Digital Twin. In development.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-lime-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-lime-300 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
