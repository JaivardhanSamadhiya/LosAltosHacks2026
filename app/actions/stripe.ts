'use server'

import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'

export async function startCheckoutSession(productId: string) {
  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      },
    ],
    mode: 'subscription',
    redirect_on_completion: 'never',
  })

  return session.client_secret
}
