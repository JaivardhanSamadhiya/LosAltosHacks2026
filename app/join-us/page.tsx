'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkout } from '@/lib/checkout'
import { PRODUCTS } from '@/lib/products'
import { Check, ArrowLeft } from 'lucide-react'

export default function JoinUsPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-gray-950 relative overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-lime-400/20 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-lime-400/10 rounded-full blur-3xl opacity-10" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-lime-300 hover:text-lime-200 transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            Join the Civic Digital Twin Community
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            Choose a plan that fits your needs and start transforming urban planning with AI-powered simulations.
          </p>
        </div>

        {selectedPlan ? (
          // Checkout View
          <div className="max-w-2xl mx-auto">
            <Card className="liquid-glass border border-white/10 mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white">
                      {PRODUCTS.find((p) => p.id === selectedPlan)?.name} Plan
                    </CardTitle>
                    <CardDescription className="text-white/60">
                      ${(PRODUCTS.find((p) => p.id === selectedPlan)?.priceInCents || 0) / 100}/month
                    </CardDescription>
                  </div>
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </CardHeader>
            </Card>
            <Checkout productId={selectedPlan} />
          </div>
        ) : (
          // Plans Grid
          <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <Card
                key={product.id}
                className="liquid-glass border border-white/10 hover:border-lime-400/40 transition-all duration-300 flex flex-col group"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-white group-hover:text-lime-300 transition-colors">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-white/60">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${(product.priceInCents / 100).toFixed(2)}</span>
                    <span className="text-white/60">/month</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-lime-300 flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => setSelectedPlan(product.id)}
                    className="w-full bg-lime-400 text-black hover:bg-lime-300 font-semibold rounded-lg py-2 transition-all"
                  >
                    Choose {product.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-16 text-center text-white/60 text-sm">
          <p>All plans include a 7-day free trial. Cancel anytime.</p>
          <p className="mt-2">
            Questions?{' '}
            <Link href="/contact" className="text-lime-300 hover:text-lime-200 transition-colors">
              Contact our team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
