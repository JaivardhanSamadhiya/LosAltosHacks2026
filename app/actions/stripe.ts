'use server'

import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'

export async function startCheckoutSession(productId: string) {
  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  // First create or retrieve a Stripe Price for this product
  const price = await stripe.prices.create({
    currency: 'usd',
    unit_amount: product.priceInCents,
    recurring: { interval: 'month' },
    product_data: {
      name: product.name,
    },
  })

  // Create a SetupIntent so we can collect payment details with PaymentElement
  // and then create the subscription server-side once confirmed
  const setupIntent = await stripe.setupIntents.create({
    payment_method_types: ['card'],
    metadata: {
      productId: product.id,
      priceId: price.id,
    },
  })

  if (!setupIntent.client_secret) {
    throw new Error('Failed to create setup intent: no client_secret returned')
  }

  return setupIntent.client_secret
}
