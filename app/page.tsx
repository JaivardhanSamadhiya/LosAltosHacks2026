import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { SimulationPreview } from "@/components/simulation-preview"
import { AICopilotDemo } from "@/components/ai-copilot-demo"
import { ImpactMetrics } from "@/components/impact-metrics"
import { ProcessSection } from "@/components/process-section"
import { AppverseFooter } from "@/components/appverse-footer"
import Script from "next/script"

// Force static generation for low TTFB
export const dynamic = "force-static"

export default function Page() {
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
      "@type": "SoftwareApplication",
      name: "Civic Digital Twin",
      applicationCategory: "Urban Planning Software",
      operatingSystem: "Web",
      description: "AI-powered city simulation platform for climate resilience and urban planning",
    },
  }

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <Hero />
        <Features />
        <SimulationPreview />
        <AICopilotDemo />
        <ImpactMetrics />
        <ProcessSection />
        <AppverseFooter />
      </main>

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
