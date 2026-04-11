import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { StatsSection } from "@/components/stats-section"
import { ProcessSection } from "@/components/process-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { LogoMarquee } from "@/components/logo-marquee"
import { Pricing } from "@/components/pricing"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

// Force static generation for low TTFB
export const dynamic = "force-static"

export default function Page() {
  // Structured data for pricing
  const pricingStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "@id": "https://civicdigitaltwin.com/#pricing",
    name: "Pricing Plans",
    description: "Civic Digital Twin pricing plans - Starter, Pro, and Enterprise packages for cities of all sizes",
    url: "https://civicdigitaltwin.com/#pricing",
    mainEntity: {
      "@type": "PriceSpecification",
      name: "City Simulation Services",
      description: "AI-powered urban simulation platform with three pricing tiers",
      offers: [
        {
          "@type": "Offer",
          name: "Starter Plan",
          price: "99",
          priceCurrency: "USD",
          description: "1 neighborhood model with basic climate modeling",
        },
        {
          "@type": "Offer",
          name: "Pro Plan",
          price: "299",
          priceCurrency: "USD",
          description: "Full city district with advanced AI scenario planning",
        },
        {
          "@type": "Offer",
          name: "Enterprise Plan",
          price: "999",
          priceCurrency: "USD",
          description: "Unlimited cities with custom AI models and 24/7 support",
        },
      ],
    },
  }

  // Structured data for main page
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://civicdigitaltwin.com/",
    name: "Civic Digital Twin | AI-Powered City Simulation Platform",
    description:
      "Simulate climate impacts, optimize resources, and make data-driven decisions for sustainable urban planning with our AI-powered city simulation platform.",
    url: "https://civicdigitaltwin.com/",
    mainEntity: {
      "@type": "Organization",
      name: "Civic Digital Twin",
      url: "https://civicdigitaltwin.com",
      sameAs: [
        "https://twitter.com/civicdigitaltwin",
        "https://linkedin.com/company/civicdigitaltwin",
        "https://youtube.com/@civicdigitaltwin",
      ],
    },
    hasPart: [
      {
        "@type": "WebPageElement",
        "@id": "https://civicdigitaltwin.com/#pricing",
        name: "Pricing Section",
        url: "https://civicdigitaltwin.com/#pricing",
      },
    ],
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <Hero />
        <StatsSection />
        <Features />
        <ProcessSection />
        <TestimonialsSection />
        <LogoMarquee />
        <Pricing />
        <AppverseFooter />
      </main>

      {/* JSON-LD structured data */}
      <Script
        id="pricing-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingStructuredData),
        }}
      />

      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData),
        }}
      />
    </>
  )
}
