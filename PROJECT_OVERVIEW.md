# Civic Digital Twin - Project Overview & Setup Guide

## Project Description
Civic Digital Twin is an AI-powered city simulation platform that helps urban planners and city officials understand how interventions affect city-wide risk levels, resource efficiency, and population health outcomes. The platform provides interactive simulations, climate risk analysis, and infrastructure planning tools.

---

## Project Directory Structure

```
LosAltosHacks2026/
├── app/
│   ├── 3D-architecture-visualization-studio/
│   │   ├── _components/
│   │   │   ├── features-archviz.tsx
│   │   │   ├── footer-archviz.tsx
│   │   │   ├── hero-archviz.tsx
│   │   │   ├── logo-marquee-archviz.tsx
│   │   │   ├── pricing-archviz.tsx
│   │   │   └── site-header-archviz.tsx
│   │   └── page.tsx
│   ├── 3d-product-rendering/
│   │   ├── _components/
│   │   │   └── before-after.tsx
│   │   └── page.tsx
│   ├── About/
│   │   └── page.tsx
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── actions/
│   │   ├── feedback.ts (Server action for contact form)
│   │   └── stripe.ts (Stripe checkout session creation)
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts (AI copilot chat API)
│   │   ├── geo/
│   │   │   └── route.ts
│   │   ├── health/
│   │   │   └── route.ts
│   │   ├── history/
│   │   │   └── route.ts
│   │   └── plan/
│   │       └── route.ts
│   ├── auth/
│   │   ├── callback/
│   │   │   └── route.ts (OAuth callback handler)
│   │   ├── error/
│   │   │   └── page.tsx
│   │   └── onboarding/
│   │       └── page.tsx
│   ├── checkout/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── contact/
│   │   └── page.tsx (Feedback form)
│   ├── faq/
│   │   └── page.tsx
│   ├── join-us/
│   │   └── page.tsx (Stripe subscription plans)
│   ├── revisions/
│   │   └── page.tsx
│   ├── t&c/
│   │   └── page.tsx
│   ├── layout.tsx (Root layout)
│   └── page.tsx (Home page)
│
├── components/
│   ├── site-header.tsx (Main navigation with Features button)
│   ├── hero.tsx
│   ├── features.tsx
│   ├── simulation-preview.tsx (AI copilot chat)
│   ├── process-section.tsx (How It Works)
│   ├── pricing.tsx
│   ├── impact-metrics.tsx
│   ├── testimonials-section.tsx
│   ├── appverse-footer.tsx
│   ├── checkout.tsx (Stripe embedded checkout)
│   ├── ai-copilot-demo.tsx
│   ├── scroll-reveal.tsx
│   ├── animated-counter.tsx
│   ├── logo-marquee.tsx
│   ├── theme-provider.tsx
│   ├── ui/ (shadcn/ui components - 40+ component files)
│   └── 3D-studio/ components
│
├── lib/
│   ├── stripe.ts (Stripe client setup)
│   ├── products.ts (Product catalog)
│   ├── checkout.tsx
│   └── utils.ts
│
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── middleware.ts (Next.js middleware)
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js (Not present, using defaults)
├── components.json (shadcn config)
└── package.json
```

---

## Key Features

### 1. **Home Page (page.tsx)**
   - Hero section with CTA buttons
   - Features showcase
   - Simulation preview with AI copilot chat
   - Process/How It Works section
   - Testimonials
   - Pricing display
   - Footer with navigation

### 2. **Join Us (Subscription)**
   - Stripe payment integration
   - Three subscription tiers: Starter ($99), Professional ($299), Enterprise ($999)
   - Embedded Stripe checkout
   - Feature comparison

### 3. **Contact Page**
   - Feedback form with async submission
   - Name, email, feedback type, and message fields
   - Success message displays on same page
   - Uses server action for form handling

### 4. **Admin Section**
   - Admin login page
   - Admin dashboard
   - Protected routes

### 5. **Auth System**
   - OAuth callback handler (`/auth/callback`)
   - Onboarding page for new users
   - Auth error page

### 6. **AI Copilot**
   - Chat interface in simulation preview
   - Uses Vercel AI Gateway
   - Supports streaming responses
   - Error handling for API failures

### 7. **Additional Pages**
   - About
   - FAQ
   - Terms & Conditions
   - 3D Architecture Visualization Studio
   - 3D Product Rendering
   - Revisions

---

## Environment Variables Required

### **Stripe Integration** (Already Set Up)
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51TLN88K8EyHKfRTZdkCd69zUM0PGzSWXOB0FlZ2XwlHuGfrKZNHBjOFzEAraE3DIzhXAsNwdDGecERGzC9lOFSCY00b9Tl56V7
STRIPE_SECRET_KEY=sk_test_51TLN88K8EyHKfRTZX1E890das6E6HiwozBcuhldFZF4zG1PcL8SRA6wv5FDVDV3D30RMCFijya5b8YoSFUfQ2GZC00peDOoYAp
```

### **Palantir Integration** (Already Set Up)
```
PALANTIR_URL=[Your Palantir instance URL]
PALANTIR_TOKEN=[Your Palantir OAuth token]
PALANTIR_AGENT_RID=[Your Palantir agent RID]
ML_API_URL=[Your ML API endpoint URL]
```

### **OAuth/Authentication** (If Implementing Google OAuth)
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[Google OAuth Client ID]
GOOGLE_CLIENT_SECRET=[Google OAuth Client Secret]
NEXTAUTH_SECRET=[NextAuth.js encryption secret]
NEXTAUTH_URL=http://localhost:3000 (development) or https://yourdomain.com (production)
```

### **AI Gateway** (For AI Copilot)
```
AI_GATEWAY_API_KEY=[Vercel AI Gateway API key - if using non-default providers]
```

### **Database** (If Adding Database Later)
```
DATABASE_URL=[Your database connection string]
```

---

## Current Setup Status

### ✅ Configured
- Stripe payment processing
- Palantir integration (environment variables present)
- AI copilot with error handling
- Contact form with async submission
- Navigation with Features button linking to #features section
- Join Us page with subscription tiers
- Responsive design with Tailwind CSS
- shadcn/ui components

### ⚠️ Ready for Implementation
- OAuth login feature (structure in place with `/auth/callback` and `/auth/onboarding`)
- Admin authentication system
- Database integration for user management

---

## How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/samadhiyajaivardhan-png/LosAltosHacks2026.git
   cd LosAltosHacks2026
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   # or npm install / yarn install / bun install
   ```

3. **Set up environment variables:**
   Create `.env.local` with the variables listed above

4. **Run development server:**
   ```bash
   pnpm dev
   ```

5. **Open browser:**
   ```
   http://localhost:3000
   ```

---

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Payment:** Stripe
- **AI:** Vercel AI SDK 6 with AI Gateway
- **Authentication:** Next Auth (structure present, not fully configured)
- **Database:** None configured (ready for integration)
- **Deployment:** Vercel (with GitHub integration)

---

## Key Dependencies

```json
{
  "next": "^14.2.25",
  "react": "^19.2.5",
  "react-dom": "^19.2.5",
  "typescript": "^5.7.3",
  "tailwindcss": "^4.0.0",
  "@stripe/react-stripe-js": "^2.7.3",
  "stripe": "^14.17.0",
  "ai": "^6.0.158",
  "@ai-sdk/gateway": "^3.0.95",
  "lucide-react": "^0.344.0",
  "zustand": "^4.4.7"
}
```

---

## Project Completion Status

| Feature | Status | Notes |
|---------|--------|-------|
| Home Page | ✅ Complete | Hero, Features, Simulation, Process, Testimonials |
| Navigation | ✅ Complete | Features button links to #features section |
| Join Us (Subscriptions) | ✅ Complete | Stripe integration working |
| Contact Form | ✅ Complete | Async submission with success message |
| AI Copilot | ✅ Complete | Chat interface with error handling |
| Stripe Integration | ✅ Complete | Checkout and subscriptions |
| Admin Section | 🟡 Partial | Login structure present, not authenticated |
| OAuth Setup | 🟡 Partial | Callback and onboarding pages exist |
| Database | ❌ Not Started | Ready for implementation |
| User Authentication | 🟡 Partial | OAuth structure ready, not fully implemented |

---

## Next Steps for Full Implementation

1. **Implement OAuth (Google/GitHub)**
   - Set up NextAuth.js configuration
   - Add Google OAuth credentials
   - Connect to database for user storage

2. **Add Database**
   - Choose provider (Supabase, Neon, etc.)
   - Create user schema
   - Implement user management

3. **Protect Routes**
   - Add middleware for authenticated routes
   - Implement role-based access control

4. **Admin Dashboard**
   - Complete admin authentication
   - Build admin features

---

## Support & Resources

- **GitHub:** https://github.com/samadhiyajaivardhan-png/LosAltosHacks2026
- **Stripe Docs:** https://stripe.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind Docs:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com

---

Generated: April 12, 2026
