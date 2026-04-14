# Civic Digital Twin - Setup Checklist

## Prerequisites
- [ ] Node.js 18+ installed
- [ ] Git installed
- [ ] GitHub account
- [ ] Vercel account (for deployment)

---

## Step 1: Repository Setup

- [ ] Clone repository:
  ```bash
  git clone https://github.com/samadhiyajaivardhan-png/LosAltosHacks2026.git
  cd LosAltosHacks2026
  ```

- [ ] Choose package manager (pnpm recommended):
  ```bash
  pnpm install
  # or: npm install / yarn install / bun install
  ```

---

## Step 2: Environment Variables Configuration

### Required (Core Functionality)

#### Stripe Integration
- [ ] Create Stripe account: https://stripe.com
- [ ] Go to Dashboard → API Keys
- [ ] Copy **Publishable Key** (starts with `pk_`)
- [ ] Copy **Secret Key** (starts with `sk_`)
- [ ] Add to `.env.local`:
  ```
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
  STRIPE_SECRET_KEY=sk_test_...
  ```

#### Palantir Integration
- [ ] Access your Palantir workspace
- [ ] Navigate to Settings → API Tokens
- [ ] Generate OAuth token
- [ ] Get your Palantir instance URL
- [ ] Get your agent RID
- [ ] Add to `.env.local`:
  ```
  PALANTIR_URL=https://your-palantir-instance...
  PALANTIR_TOKEN=your_token_here
  PALANTIR_AGENT_RID=ri.agent.main.agent...
  ML_API_URL=https://your-ml-api...
  ```

### Optional (For Full Features)

#### NextAuth.js Setup (for OAuth)
- [ ] Generate secret:
  ```bash
  openssl rand -base64 32
  ```
- [ ] Add to `.env.local`:
  ```
  NEXTAUTH_SECRET=your_generated_secret
  NEXTAUTH_URL=http://localhost:3000
  ```

#### Google OAuth (Sign in with Google)
- [ ] Create Google Cloud project: https://console.cloud.google.com
- [ ] Enable Google OAuth API
- [ ] Create OAuth 2.0 credentials (type: Web Application)
- [ ] Set authorized redirect URI: `http://localhost:3000/auth/callback`
- [ ] Copy Client ID and Client Secret
- [ ] Add to `.env.local`:
  ```
  NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_client_id
  GOOGLE_CLIENT_SECRET=your_client_secret
  ```

#### Database Setup (for user management)
- [ ] Choose provider: Supabase, Neon, Railway, or Vercel Postgres
- [ ] Create new project
- [ ] Get connection string
- [ ] Add to `.env.local`:
  ```
  DATABASE_URL=postgresql://user:password@host:port/database
  ```

---

## Step 3: Create `.env.local` File

```bash
# Copy from template
cp .env.example .env.local

# Edit with your values
nano .env.local  # or use your preferred editor
```

**Minimum required variables:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key
STRIPE_SECRET_KEY=your_key
PALANTIR_URL=your_url
PALANTIR_TOKEN=your_token
PALANTIR_AGENT_RID=your_rid
ML_API_URL=your_url
```

---

## Step 4: Run Locally

- [ ] Start development server:
  ```bash
  pnpm dev
  ```

- [ ] Open browser:
  ```
  http://localhost:3000
  ```

- [ ] Test key functionality:
  - [ ] Home page loads
  - [ ] Features section displays correctly
  - [ ] Join Us page shows subscription tiers
  - [ ] Stripe checkout works
  - [ ] Contact form submits without errors
  - [ ] AI copilot chat responds (if AI Gateway configured)

---

## Step 5: Deployment to Vercel

- [ ] Connect GitHub repository to Vercel:
  ```
  1. Go to https://vercel.com
  2. Click "Add New..." → "Project"
  3. Import your GitHub repository
  4. Select "LosAltosHacks2026"
  ```

- [ ] Set environment variables in Vercel:
  ```
  1. Go to Project Settings → Environment Variables
  2. Add all variables from .env.local
  3. Important: NEXT_PUBLIC_* variables are public
  4. Other variables are kept secret on the server
  ```

- [ ] Update OAuth redirect URIs:
  - [ ] Google OAuth: Add `https://your-vercel-domain.vercel.app/auth/callback`
  - [ ] Update `.env.local` (or Vercel env):
    ```
    NEXTAUTH_URL=https://your-vercel-domain.vercel.app
    ```

- [ ] Deploy:
  ```
  Vercel will auto-deploy when you push to main branch
  ```

---

## Step 6: Optional Enhancements

### Database Integration
- [ ] Set up database of choice
- [ ] Create user schema
- [ ] Update authentication to use database
- [ ] Implement user profiles

### Email Integration
- [ ] Choose email provider (SendGrid, Resend, etc.)
- [ ] Configure email service
- [ ] Update contact form to send emails

### Analytics
- [ ] Set up analytics (Vercel Analytics, Posthog, Mixpanel)
- [ ] Add tracking to key events

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure logging

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
pnpm dev
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
pnpm dev
```

### Environment Variables Not Loading
- [ ] Check `.env.local` file exists in root directory
- [ ] Restart development server
- [ ] Verify no typos in variable names
- [ ] Use `console.log()` to verify in routes

### Stripe Errors
- [ ] Verify keys are correct
- [ ] Check if in test mode (pk_test_/sk_test_)
- [ ] Test keys don't work with live transactions

### Auth Errors
- [ ] Verify NEXTAUTH_URL matches your domain
- [ ] Check redirect URIs in OAuth provider settings
- [ ] Ensure NEXTAUTH_SECRET is set

---

## Project Structure Summary

```
LosAltosHacks2026/
├── app/                    # Next.js app directory (pages & routes)
├── components/            # React components (UI, layout, features)
├── lib/                   # Utilities, configs, Stripe setup
├── hooks/                 # Custom React hooks
├── public/                # Static assets
├── .env.example           # Environment variables template
├── .env.local             # Your actual env vars (don't commit!)
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── tailwind.config.ts     # Tailwind CSS config
├── next.config.js         # Next.js config
└── middleware.ts          # Next.js middleware
```

---

## Key Features Available

| Feature | Status | Notes |
|---------|--------|-------|
| 🏠 Home Page | ✅ Ready | Fully functional |
| 💳 Stripe Payments | ✅ Ready | Subscriptions working |
| 📧 Contact Form | ✅ Ready | Async submission |
| 🤖 AI Copilot | ✅ Ready | Chat interface included |
| 🔐 OAuth Setup | 🟡 Ready | Structure in place, not configured |
| 👤 User Accounts | 🟡 Ready | Database needed |
| 📊 Admin Dashboard | 🟡 Ready | Login structure present |

---

## Support Resources

| Resource | URL |
|----------|-----|
| Stripe Documentation | https://stripe.com/docs |
| Vercel Docs | https://vercel.com/docs |
| Next.js Docs | https://nextjs.org/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| shadcn/ui | https://ui.shadcn.com |
| Palantir Docs | https://docs.palantir.com |

---

## Quick Start (Copy-Paste)

```bash
# 1. Clone
git clone https://github.com/samadhiyajaivardhan-png/LosAltosHacks2026.git
cd LosAltosHacks2026

# 2. Install
pnpm install

# 3. Setup env (copy & fill with your values)
cp .env.example .env.local
nano .env.local  # Edit with your Stripe & Palantir keys

# 4. Run
pnpm dev

# 5. Open
# http://localhost:3000
```

---

**Last Updated:** April 12, 2026  
**Project Status:** Development Ready  
**Ready for Production:** Once database & OAuth are fully configured
