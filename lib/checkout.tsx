'use client'

import { useEffect, useState } from 'react'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { startCheckoutSession } from '@/app/actions/stripe'
import { Spinner } from '@/components/ui/spinner'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    const { error } = await stripe.confirmSetup({
      elements,
      redirect: 'if_required',
    })

    if (error) {
      setErrorMessage(error.message || 'An unexpected error occurred. Please try again.')
      setIsLoading(false)
    } else {
      setIsSuccess(true)
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="mb-4 text-green-400 text-lg">✓</div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Payment method saved
        </h3>
        <p className="text-white/60">
          Your subscription is being activated. You&apos;ll receive a confirmation email shortly.
        </p>
      </div>
    )
  }

  if (!stripe || !elements) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-white/60">Loading payment form...</div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {errorMessage && (
        <div className="p-3 rounded-lg bg-red-400/10 text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className="w-full bg-lime-400 text-black hover:bg-lime-300 disabled:opacity-50 font-semibold py-3 rounded-lg transition-colors"
      >
        {isLoading ? (
          <>
            <Spinner className="inline mr-2 h-4 w-4" />
            Processing...
          </>
        ) : (
          'Subscribe now'
        )}
      </button>

      <p className="text-center text-xs text-white/40">
        Secured by Stripe · Cancel anytime
      </p>
    </form>
  )
}

export function Checkout({ productId }: { productId: string }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initCheckout = async () => {
      try {
        const secret = await startCheckoutSession(productId)
        setClientSecret(secret)
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMsg)
      } finally {
        setLoading(false)
      }
    }

    initCheckout()
  }, [productId])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="h-6 w-6" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-400/10 border border-red-400/30">
        <h3 className="font-semibold text-red-400 mb-1">
          Error initializing checkout
        </h3>
        <p className="text-red-400/80 text-sm">{error}</p>
      </div>
    )
  }

  if (!clientSecret) {
    return (
      <div className="p-4 rounded-lg bg-red-400/10 border border-red-400/30">
        <h3 className="font-semibold text-red-400 mb-1">Failed to load checkout</h3>
        <p className="text-red-400/80 text-sm">
          Please try selecting a plan again
        </p>
      </div>
    )
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'dark',
          variables: {
            colorPrimary: '#a3e635',
          },
        },
      }}
    >
      <CheckoutForm />
    </Elements>
  )
}
