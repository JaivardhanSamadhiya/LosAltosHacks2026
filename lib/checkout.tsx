'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { startCheckoutSession } from '@/app/actions/stripe'
import { Spinner } from '@/components/ui/spinner'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function Checkout({ productId }: { productId: string }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initCheckout = async () => {
      try {
        const secret = await startCheckoutSession(productId)
        setClientSecret(secret)
      } catch (error) {
        console.error('Failed to initialize checkout:', error)
      } finally {
        setLoading(false)
      }
    }

    initCheckout()
  }, [productId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="text-center py-16 text-red-400">
        Failed to load checkout. Please try again.
      </div>
    )
  }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ clientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
