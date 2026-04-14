"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, FileText, Info, Map, Cpu, LogOut, User, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

const links = [
  { href: "#features", label: "Features", icon: Cpu },
  { href: "#simulation", label: "Demo", icon: Map },
  { href: "#process", label: "How It Works", icon: Info },
  { href: "/contact", label: "Contact", icon: FileText },
]

const pricingLink = { href: "/pricing", label: "Pricing", icon: CreditCard }

// ─── Google OAuth helpers ────────────────────────────────────────────────────

async function signInWithGoogle(mode: "signin" | "signup") {
  const supabase = createClient()
  const next = mode === "signup" ? "/auth/onboarding" : "/"
  // Store the intended redirect in sessionStorage so the callback can access it
  if (typeof window !== "undefined") {
    sessionStorage.setItem("auth_redirect_next", next)
  }
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
        `${window.location.origin}/auth/callback`,
    },
  })
}

async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  window.location.href = "/"
}

// ─── Avatar / user menu ──────────────────────────────────────────────────────

function UserAvatar({ user }: { user: SupabaseUser }) {
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined
  const name =
    (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "User"
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-8 w-8 rounded-full bg-gradient-to-br from-lime-400 to-cyan-500 flex items-center justify-center text-sm font-bold text-black hover:scale-110 transition-transform">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <span>{initials}</span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-white font-medium">{name}</span>
          <span className="text-xs text-neutral-400">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-400">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ─── Auth buttons (unauthenticated) ─────────────────────────────────────────

function AuthButtons({ layout }: { layout: "desktop" | "mobile" }) {
  const isDesktop = layout === "desktop"
  return (
    <div className={`flex gap-2 ${!isDesktop && "flex-col w-full"}`}>
      <Button
        onClick={() => signInWithGoogle("signin")}
        className={`text-white/90 border border-white/20 hover:bg-white/10 hover:text-white rounded-lg
        ${isDesktop ? "px-4 py-2 text-sm" : "w-full justify-center"}`}
        variant="outline"
      >
        Sign In
      </Button>
      <Button
        onClick={() => signInWithGoogle("signup")}
        className={`bg-lime-400 text-black font-medium rounded-lg hover:bg-lime-300 hover:shadow-md
        transition-all ${isDesktop ? "px-5 py-2 text-sm" : "w-full justify-center"}`}
      >
        Sign Up
      </Button>
    </div>
  )
}

// ─── Main header ─────────────────────────────────────────────────────────────

export function SiteHeader() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <header className="sticky top-0 z-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex h-14 items-center justify-between px-6 liquid-glass-header rounded-full">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icons/skitbit-white.svg" alt="Civic Digital Twin logo" width={20} height={20} className="h-5 w-5" />
            <span className="font-semibold tracking-wide text-white text-sm">Civic DT</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 text-sm text-white/90 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-1.5 py-2.5 px-3 rounded-lg
                           hover:text-lime-300 hover:bg-white/5
                           transition-all duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth area */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/pricing"
              className="text-sm text-white/90 hover:text-lime-300 transition-colors px-3 py-2"
            >
              Pricing
            </Link>
            {!loading && (user ? <UserAvatar user={user} /> : <AuthButtons layout="desktop" />)}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="liquid-glass border-white/10 p-6 w-64 flex flex-col">
                {/* Brand */}
                <div className="flex items-center gap-2 mb-6">
                  <Image src="/icons/skitbit-white.svg" alt="Civic Digital Twin logo" width={24} height={24} className="h-6 w-6" />
                  <span className="font-semibold tracking-wide text-white">Civic DT</span>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col gap-2">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="flex items-center gap-2 text-white/90 hover:text-lime-300 transition-colors px-3 py-2"
                    >
                      <l.icon className="h-4 w-4" />
                      {l.label}
                    </Link>
                  ))}
                  <Link
                    href="/pricing"
                    className="flex items-center gap-2 text-white/90 hover:text-lime-300 transition-colors px-3 py-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    {pricingLink.label}
                  </Link>
                </nav>

                {/* Mobile auth area */}
                <div className="mt-auto pt-4 border-t border-white/10">
                  {!loading && (
                    user ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 px-3 py-2">
                          {user.user_metadata?.avatar_url ? (
                            <Image
                              src={user.user_metadata.avatar_url as string}
                              alt="Avatar"
                              width={32}
                              height={32}
                              className="h-8 w-8 rounded-full"
                            />
                          ) : (
                            <div className="h-8 w-8 rounded-full bg-lime-400 flex items-center justify-center text-xs font-bold text-black">
                              {(user.user_metadata?.full_name as string)
                                ?.split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")
                                .toUpperCase()}
                            </div>
                          )}
                          <span className="text-sm text-white">{user.email}</span>
                        </div>
                        <Button
                          onClick={signOut}
                          variant="ghost"
                          className="w-full justify-start text-red-400 hover:bg-red-500/10"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign out
                        </Button>
                      </div>
                    ) : (
                      <AuthButtons layout="mobile" />
                    )
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
