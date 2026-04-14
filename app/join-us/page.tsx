'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Layers, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkout } from '@/lib/checkout'
import { PRODUCTS } from '@/lib/products'

export default function JoinUsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <div className="min-h-screen text-white flex flex-col">
      <div className="absolute inset-0 particle-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-lime-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center container mx-auto px-4 py-12">
        <div className="w-full max-w-5xl">
          {selectedProduct ? (
            // Checkout view
            <div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="mb-8 flex items-center gap-2 text-sm text-neutral-400 hover:text-lime-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to plans
              </button>
              <div className="liquid-glass rounded-2xl p-8 border border-lime-400/20">
                <Checkout productId={selectedProduct} />
              </div>
            </div>
          ) : (
            // Plans view
            <div>
              {/* Brand and Title */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-lime-400 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-lg font-semibold text-white">Civic Digital Twin</span>
                </div>
                <h1 className="text-4xl font-extrabold text-white mb-3">Join Our Platform</h1>
                <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                  Choose the perfect subscription plan for your urban planning needs. Start simulating smarter cities today.
                </p>
              </div>

              {/* Pricing Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {PRODUCTS.map((product) => {
                  const isPopular = product.id === 'professional'
                  return (
                    <div
                      key={product.id}
                      className={`relative liquid-glass rounded-2xl p-8 border transition-all duration-300 ${
                        isPopular
                          ? 'border-lime-400/60 ring-2 ring-lime-400/30 md:scale-[1.05]'
                          : 'border-white/10 hover:border-lime-400/40'
                      }`}
                    >
                      {isPopular && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <span className="inline-block bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                            MOST POPULAR
                          </span>
                        </div>
                      )}

                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                        <p className="text-neutral-400 text-sm mb-4">{product.description}</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold text-lime-400">
                            ${(product.priceInCents / 100).toFixed(0)}
                          </span>
                          <span className="text-neutral-400">/month</span>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="mb-8 space-y-3">
                        {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-lime-300 flex-shrink-0 mt-0.5" />
                            <span className="text-neutral-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Button
                        onClick={() => setSelectedProduct(product.id)}
                        className={`w-full font-semibold py-3 rounded-lg transition-all ${
                          isPopular
                            ? 'bg-lime-400 text-black hover:bg-lime-300'
                            : 'border border-lime-400/50 text-lime-300 hover:bg-lime-400/10'
                        }`}
                      >
                        Subscribe Now
                      </Button>
                    </div>
                  )
                })}
              </div>

              {/* Support Info */}
              <div className="mt-12 text-center">
                <p className="text-neutral-400">
                  All plans include a 14-day free trial. Cancel anytime, no questions asked.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
