export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  features: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for exploring urban planning concepts',
    priceInCents: 9900, // $99/month
    features: [
      'Basic city simulation',
      'Limited scenario planning',
      'Community access',
      'Monthly updates',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For active city planners and researchers',
    priceInCents: 29900, // $299/month
    features: [
      'Advanced simulations',
      'Unlimited scenarios',
      'AI copilot assistance',
      'Priority support',
      'Custom data imports',
      'Team collaboration',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For government and large organizations',
    priceInCents: 99900, // $999/month
    features: [
      'Everything in Professional',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced analytics',
      'White-label options',
      'SLA guarantee',
      'On-premise deployment',
    ],
  },
]
