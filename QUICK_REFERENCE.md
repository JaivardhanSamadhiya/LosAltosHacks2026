# Quick Reference Guide

## 🚀 Start Local Development
```bash
pnpm install
pnpm dev
# Open http://localhost:3000
```

## 📦 Tech Stack
- **Framework:** Next.js 14
- **Language:** TypeScript
- **UI:** Tailwind CSS + shadcn/ui
- **Payment:** Stripe
- **Auth:** OAuth-ready (NextAuth.js structure)
- **Database:** Ready for integration

## 🔑 Environment Variables Required
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY    # pk_test_...
STRIPE_SECRET_KEY                     # sk_test_...
PALANTIR_URL                          # https://...
PALANTIR_TOKEN                        # OAuth token
PALANTIR_AGENT_RID                    # ri.agent...
ML_API_URL                            # https://...
```

## 📍 Key Pages
| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Main landing page |
| Join Us | `/join-us` | Subscription checkout |
| Contact | `/contact` | Feedback form |
| About | `/about` | About page |
| FAQ | `/faq` | FAQ page |
| Admin | `/admin` | Admin dashboard |

## 🔌 Features
- ✅ Stripe subscriptions ($99, $299, $999)
- ✅ AI copilot chat
- ✅ Contact form with async submission
- ✅ Responsive navigation
- ✅ Admin route protection
- ✅ Error handling & logging

## 🔄 Deployment to Vercel
1. Push to GitHub
2. Connect to Vercel
3. Add env variables
4. Auto-deploys on push

## 📧 Contact Form
- **Location:** `/contact`
- **Type:** Async (no redirect)
- **Validation:** Client-side
- **Success:** Shows message on same page

## 💳 Stripe Setup
- **Dashboard:** https://dashboard.stripe.com
- **Webhook Handler:** Ready for implementation
- **Checkout:** Embedded Stripe checkout form
- **Products:** Defined in `/lib/products.ts`

## 🔐 Admin Routes
- **Protected:** `/admin`, `/admin/*`
- **Login:** `/admin/login`
- **Protection:** Middleware-based
- **Session:** Cookie-based (admin-session)

## 🤖 AI Copilot
- **Location:** Home page simulation section
- **Type:** Chat interface
- **API:** `/api/chat`
- **Model:** OpenAI GPT-4o-mini
- **Error Handling:** Graceful fallback on API errors

## 📁 Important Files
```
lib/stripe.ts              # Stripe client
lib/products.ts            # Product catalog
app/join-us/page.tsx      # Checkout page
app/contact/page.tsx      # Contact form
components/site-header.tsx # Navigation
middleware.ts             # Route protection
```

## 🛠️ Common Commands
```bash
# Development
pnpm dev              # Start dev server

# Building
pnpm build            # Build for production
pnpm start            # Start production server

# Linting
pnpm lint             # Run ESLint

# Formatting
pnpm format           # Format with Prettier (if configured)

# Dependencies
pnpm add <package>    # Add new package
pnpm update           # Update all packages
```

## 🔗 Links
- **GitHub:** https://github.com/samadhiyajaivardhan-png/LosAltosHacks2026
- **Stripe Docs:** https://stripe.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind Docs:** https://tailwindcss.com/docs

## 📋 Checklist Before Deploy
- [ ] `.env.local` configured with all keys
- [ ] Build succeeds: `pnpm build`
- [ ] No console errors
- [ ] Stripe keys verified
- [ ] Payment flow tested
- [ ] Contact form tested
- [ ] Navigation links working

## 🚨 Troubleshooting
| Issue | Solution |
|-------|----------|
| Port in use | `lsof -ti:3000 \| xargs kill -9` |
| Build fails | `rm -rf .next && pnpm install` |
| Env vars not loading | Restart dev server |
| Stripe errors | Verify keys, check if test vs live |
| 404 errors | Clear browser cache, restart server |

## 💡 Pro Tips
1. Use `pnpm` instead of `npm` (faster, lighter)
2. Keep Stripe test keys safe - never commit to git
3. Test locally before deploying to Vercel
4. Monitor error logs in Vercel dashboard
5. Use Stripe test mode for development

## 📞 Getting Help
1. Check error logs: `pnpm dev` console
2. Read documentation files in project root
3. Check GitHub issues
4. Contact Stripe/Vercel support if needed

---

**Last Updated:** April 12, 2026  
**Status:** Ready for Development & Deployment
