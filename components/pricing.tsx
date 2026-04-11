"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { ExamplesDialog } from "./examples-dialog"

type Feature = { text: string; muted?: boolean }

const ACCENT = "#a3e635" // Lime-400

function FeatureItem({ text, muted = false }: Feature) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: ACCENT }} />
      <span className={`text-sm ${muted ? "text-neutral-400" : "text-neutral-100"}`}>{text}</span>
    </li>
  )
}

type Currency = "INR" | "USD"

const PRICES: Record<Currency, { startup: string; pro: string; premium: string; save: string }> = {
  INR: {
    startup: "₹8,000/mo",
    pro: "₹25,000/mo",
    premium: "₹80,000/mo",
    save: "Save Flat ₹8,000/-",
  },
  USD: {
    startup: "$99/mo",
    pro: "$299/mo",
    premium: "$999/mo",
    save: "Save $99",
  },
}

function guessLocalCurrency(): Currency {
  const lang = typeof navigator !== "undefined" ? navigator.language : ""
  const tz = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : ""
  if (/-(IN|PK|BD)\b/i.test(lang) || /(Kolkata|Karachi|Dhaka)/i.test(tz || "")) return "INR"
  return "USD"
}

const startupVideos = [
  "H1h5dHpp1Nw",
  "HXARcSSdfMU",
  "fd8zraQ1JdE",
  "ARQyF2FA3Ec",
  "dEZfHADlFtw",
  "wuyfdfKO6Rc",
  "VakkmhtrUA0",
  "o8DoIg9yNGk",
  "rtReBkFt-To",
]
const proVideos = [
  "ASV2myPRfKA",
  "eTfS2lqwf6A",
  "KALbYHmGV4I",
  "Go0AA9hZ4as",
  "sB7RZ9QCOAg",
  "TK2WboJOJaw",
  "5Xq7UdXXOxI",
  "kMjWCidQSK0",
  "RKKdQvwKOhQ",
]
const premiumVideos = [
  "v2AC41dglnM",
  "pRpeEdMmmQ0",
  "3AtDnEC4zak",
  "JRfuAukYTKg",
  "LsoLEjrDogU",
  "RB-RcX5DS5A",
  "hTWKbfoikeg",
  "YQHsXMglC9A",
  "09R8_2nJtjg",
]

export function Pricing() {
  const [openPlan, setOpenPlan] = useState<null | "Startup" | "Pro" | "Premium">(null)
  const [currency, setCurrency] = useState<Currency>("USD")

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch("/api/geo", { cache: "no-store" })
        if (!res.ok) throw new Error("geo failed")
        const data = await res.json()
        if (!cancelled) setCurrency(data?.currency === "INR" ? "INR" : "USD")
      } catch {
        if (!cancelled) setCurrency(guessLocalCurrency())
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="pricing" className="text-white" itemScope itemType="https://schema.org/PriceSpecification">
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mx-auto mb-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium text-white"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", border: `1px solid ${ACCENT}` }}
          >
            Flexible Plans for Every City
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl" itemProp="name">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-300" itemProp="description">
            Subscription-based access to AI-powered city simulations with full support and regular platform updates.
          </p>
          <div className="mt-6">
            <Button
              asChild
              className="rounded-full px-5 text-black hover:brightness-110"
              style={{ backgroundColor: ACCENT }}
            >
              <Link href="https://wa.link/civic-demo" target="_blank">
                Request Demo
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3 stagger-children">
          {/* Startup */}
          <Card
            className="relative overflow-hidden rounded-2xl liquid-glass shadow-[0_12px_40px_rgba(0,0,0,0.3)] glass-card-interactive group"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <div
              className="absolute right-4 top-11 rounded-full px-2 py-0.5 text-[10px]"
              style={{ backgroundColor: "#1f1f1f", color: "#d4d4d4" }}
            >
              {PRICES[currency].save}
            </div>
            <CardHeader className="space-y-3 pb-4">
              <div className="text-sm font-semibold text-neutral-100" itemProp="name">
                Starter
              </div>
              <div className="flex items-end gap-2 text-white">
                <div className="text-xl font-bold tracking-tight" itemProp="price">
                  {PRICES[currency].startup}
                </div>
                <span className="pb-0.5 text-[11px] text-neutral-300">billed monthly</span>
                <meta itemProp="priceCurrency" content={currency} />
              </div>
              <Button
                type="button"
                onClick={() => setOpenPlan("Startup")}
                onTouchStart={() => setOpenPlan("Startup")}
                className="w-full rounded-full px-4 py-2 text-sm font-medium transition-colors"
                style={{ backgroundColor: "#0a0a0a", color: ACCENT, border: `1px solid ${ACCENT}` }}
              >
                Try Free
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="grid gap-2" itemProp="description">
                {[
                  "1 small neighborhood model",
                  "Basic climate risk modeling",
                  "Email support",
                  "Monthly data updates",
                  "API access (basic)",
                  "Community forum access",
                ].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
            </CardContent>
            <CardFooter />
          </Card>

          {/* Pro */}
          <Card
            className="relative overflow-hidden rounded-2xl liquid-glass shadow-[0_12px_40px_rgba(0,0,0,0.3)] glass-card-interactive group"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <CardHeader className="space-y-3 pb-4">
              <div className="text-sm font-semibold text-neutral-100" itemProp="name">
                Pro
              </div>
              <div className="flex items-end gap-2 text-white">
                <div className="text-xl font-bold tracking-tight" itemProp="price">
                  {PRICES[currency].pro}
                </div>
                <span className="pb-0.5 text-[11px] text-neutral-300">billed monthly</span>
                <meta itemProp="priceCurrency" content={currency} />
              </div>
              <Button
                type="button"
                onClick={() => setOpenPlan("Pro")}
                onTouchStart={() => setOpenPlan("Pro")}
                className="w-full rounded-full px-4 py-2 text-sm font-medium transition-colors"
                style={{ backgroundColor: ACCENT, color: "#000" }}
              >
                Get Started
              </Button>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="grid gap-2" itemProp="description">
                {[
                  "Full city district modeling",
                  "Advanced AI scenario planning",
                  "Priority support (24h response)",
                  "Bi-weekly data updates",
                  "Full API access",
                  "Multi-scenario comparison",
                  "Custom dashboard views",
                ].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
            </CardContent>
            <CardFooter />
          </Card>

          {/* Premium */}
          <Card
            className="relative overflow-hidden rounded-2xl liquid-glass-enhanced shadow-[0_16px_50px_rgba(0,0,0,0.4)] glass-card-interactive group rotating-border"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <CardHeader className="relative space-y-3 pb-4">
              <div className="text-sm font-semibold text-neutral-100" itemProp="name">
                Enterprise
              </div>
              <div className="flex items-end gap-2 text-white">
                <div className="text-xl font-bold tracking-tight" itemProp="price">
                  {PRICES[currency].premium}
                </div>
                <span className="pb-0.5 text-[11px] text-neutral-300">billed monthly</span>
                <meta itemProp="priceCurrency" content={currency} />
              </div>
              <Button
                type="button"
                onClick={() => setOpenPlan("Premium")}
                onTouchStart={() => setOpenPlan("Premium")}
                className="w-full rounded-full px-4 py-2 text-sm font-medium transition-colors"
                style={{ backgroundColor: ACCENT, color: "#000", fontWeight: "bold" }}
              >
                Contact Sales
              </Button>
            </CardHeader>
            <CardContent className="relative pt-0">
              <ul className="grid gap-2" itemProp="description">
                {[
                  "Unlimited cities & districts",
                  "Custom AI model training",
                  "24/7 dedicated support team",
                  "Real-time data integrations",
                  "Full API with webhooks",
                  "Third-party integrations",
                  "White-label options",
                  "SLA guarantee (99.9%)",
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: ACCENT }} />
                    <span className="text-sm text-neutral-100">{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter />
          </Card>
        </div>
      </div>

      {/* Modals */}
      <ExamplesDialog
        open={openPlan === "Startup"}
        onOpenChange={(v) => setOpenPlan(v ? "Startup" : null)}
        planName="Starter Plan"
        price={PRICES[currency].startup}
        videoIds={startupVideos}
      />
      <ExamplesDialog
        open={openPlan === "Pro"}
        onOpenChange={(v) => setOpenPlan(v ? "Pro" : null)}
        planName="Pro Plan"
        price={PRICES[currency].pro}
        videoIds={proVideos}
      />
      <ExamplesDialog
        open={openPlan === "Premium"}
        onOpenChange={(v) => setOpenPlan(v ? "Premium" : null)}
        planName="Enterprise Plan"
        price={PRICES[currency].premium}
        videoIds={premiumVideos}
      />
    </section>
  )
}
