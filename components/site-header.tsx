"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, FileText, Info, Map, Cpu, LogOut, User } from "lucide-react"
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
        <button
          aria-label="Open user menu"
          className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden
                     ring-2 ring-lime-400/60 hover:ring-lime-400 transition-all focus-visible:outline-none"
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={name}
              width={36}
              height={36}
              className="object-cover w-full h-full"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="bg-lime-400 text-black text-xs font-semibold w-full h-full flex items-center justify-center">
              {initials}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-52 bg-gray-900/95 backdrop-blur border-gray-700 text-white"
      >
        <DropdownMenuLabel className="text-white/60 font-normal text-xs truncate">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem
          className="gap-2 text-sm cursor-pointer focus:bg-white/10 focus:text-white"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4 text-white/50" />
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
    <div className={isDesktop ? "flex items-center gap-2" : "flex flex-col gap-2 p-4"}>
      <Button
        variant="ghost"
        onClick={() => signInWithGoogle("signin")}
        className={`text-white/90 border border-white/20 hover:bg-white/10 hover:text-white rounded-lg
          ${isDesktop ? "px-4 py-2 text-sm" : "w-full justify-center"}`}
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
      <div className="container mx-auto max-w-4xl">
        <div className="flex h-14 items-center justify-between px-6 liquid-glass-header rounded-full">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/icons/skitbit-white.svg"
              alt="Civic Digital Twin logo"
              width={20}
              height={20}
              className="h-5 w-5"
            />
            <span className="font-semibold tracking-wide text-white text-sm">Civic DT</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 text-sm text-white/90 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-1.5 py-2.5 px-3 rounded-lg
                           hover:text-lime-300 hover:bg-white/5 transition-all duration-200"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth area */}
          <div className="hidden md:flex items-center">
            {!loading && (user ? <UserAvatar user={user} /> : <AuthButtons layout="desktop" />)}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-700 bg-gray-900/80 text-gray-200 hover:bg-gray-800"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="liquid-glass border-gray-800 p-0 w-64 flex flex-col">
                {/* Brand */}
                <div className="flex items-center gap-1.5 px-4 py-4 border-b border-gray-800">
                  <Image
                    src="/icons/skitbit-white.svg"
                    alt="Civic Digital Twin logo"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <span className="font-semibold tracking-wide text-white text-lg">Civic DT</span>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col gap-1 mt-2 text-gray-200">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-900 hover:text-lime-300 transition-colors"
                    >
                      <span className="inline-flex items-center justify-center w-5 h-5 text-gray-400">
                        <l.icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm">{l.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* Mobile auth area */}
                <div className="mt-auto border-t border-gray-800">
                  {!loading && (
                    user ? (
                      <div className="p-4 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-lime-400/60 flex-shrink-0">
                            {user.user_metadata?.avatar_url ? (
                              <Image
                                src={user.user_metadata.avatar_url as string}
                                alt="Avatar"
                                width={36}
                                height={36}
                                className="object-cover w-full h-full"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <span className="bg-lime-400 text-black text-xs font-semibold w-full h-full flex items-center justify-center">
                                <User className="h-4 w-4" />
                              </span>
                            )}
                          </div>
                          <p className="text-white/70 text-xs truncate">{user.email}</p>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={signOut}
                          className="w-full justify-start gap-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg"
                        >
                          <LogOut className="h-4 w-4" />
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
