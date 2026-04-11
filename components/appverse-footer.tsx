"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Twitter, Linkedin, Github, Mail, Layers } from "lucide-react"

export function AppverseFooter() {
  return (
    <section className="text-white">
      {/* Contact CTA */}
      <div className="container mx-auto px-4 pt-12 sm:pt-16">
        <div className="flex justify-center">
          <Button
            asChild
            className="rounded-full bg-lime-400 px-6 py-2 text-sm font-medium text-black shadow-[0_0_20px_rgba(163,230,53,0.35)] hover:bg-lime-300"
          >
            <a href="mailto:hello@civicdigitaltwin.com">
              Get In Touch
            </a>
          </Button>
        </div>
      </div>

      {/* CTA Card */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <Card className="relative overflow-hidden rounded-3xl liquid-glass p-6 sm:p-10">
          <div className="relative text-center max-w-2xl mx-auto">
            <p className="mb-2 text-[11px] tracking-widest text-lime-300">COMING SOON</p>
            <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl mb-4">
              Building the future of urban planning
            </h3>
            <p className="text-sm text-neutral-400 mb-6">
              Civic Digital Twin is currently in development. We&apos;re working with pilot cities to refine our AI simulation platform. Interested in early access or collaboration?
            </p>
            <Button
              asChild
              className="bg-lime-400 text-black hover:bg-lime-300"
            >
              <a href="mailto:hello@civicdigitaltwin.com">
                Join the Pilot Program
              </a>
            </Button>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 pb-20 md:pb-10">
        <div className="container mx-auto px-4 py-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
            {/* Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5">
                <div className="h-6 w-6 rounded-lg bg-lime-400 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-black" />
                </div>
                <span className="text-xl font-semibold text-white">Civic Digital Twin</span>
              </div>
              <p className="max-w-sm text-sm text-neutral-400">
                An AI-powered city simulation platform for climate resilience and sustainable urban planning. Currently in development.
              </p>
            </div>

            {/* Navigation */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-2">
              <div>
                <h5 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">Navigation</h5>
                <ul className="space-y-2 text-sm text-neutral-300">
                  {["Home", "Features", "Demo", "How It Works", "Contact"].map((item) => (
                    <li key={item}>
                      <Link 
                        href={item === "Demo" ? "#simulation" : item === "How It Works" ? "#process" : `#${item.toLowerCase()}`} 
                        className="hover:text-lime-300"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-400">Connect</h5>
                <ul className="space-y-2 text-sm text-neutral-300">
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-neutral-400" />
                    <a
                      href="mailto:hello@civicdigitaltwin.com"
                      className="hover:text-lime-300"
                      aria-label="Email Civic Digital Twin"
                    >
                      Email
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-neutral-400" />
                    <a
                      href="https://twitter.com/civicdigitaltwin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-lime-300"
                      aria-label="Follow Civic Digital Twin on Twitter"
                    >
                      X/Twitter
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-neutral-400" />
                    <a
                      href="https://linkedin.com/company/civicdigitaltwin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-lime-300"
                      aria-label="Follow Civic Digital Twin on LinkedIn"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-neutral-400" />
                    <a
                      href="https://github.com/civicdigitaltwin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-lime-300"
                      aria-label="View Civic Digital Twin on GitHub"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row">
            <p>2025 Civic Digital Twin. In development.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-lime-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-lime-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
