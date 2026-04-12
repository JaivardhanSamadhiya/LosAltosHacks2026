"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const ROLES = ["City Planner", "Researcher", "Developer"] as const
type Role = (typeof ROLES)[number]

export default function OnboardingPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState<Role | "">("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!fullName.trim() || !role) {
      setError("Please fill in all fields.")
      return
    }

    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError("Session expired. Please sign in again.")
      setLoading(false)
      return
    }

    const { error: upsertError } = await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName.trim(),
      role,
      avatar_url: user.user_metadata?.avatar_url ?? null,
    })

    if (upsertError) {
      setError("Failed to save your profile. Please try again.")
      setLoading(false)
      return
    }

    router.push("/")
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="liquid-glass rounded-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Image src="/icons/skitbit-white.svg" alt="Civic Digital Twin" width={24} height={24} className="h-6 w-6" />
          <span className="font-semibold text-white tracking-wide">Civic DT</span>
        </div>

        <h1 className="text-2xl font-semibold text-white mb-1">One last step</h1>
        <p className="text-white/60 text-sm mb-7">
          Tell us a bit about yourself to personalise your experience.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="fullName" className="text-white/80 text-sm">Full name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Jane Smith"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-lime-400 rounded-lg"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-white/80 text-sm">Your role</Label>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-2.5 px-2 rounded-lg text-sm font-medium border transition-all
                    ${role === r
                      ? "bg-lime-400 text-black border-lime-400"
                      : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-400 text-black font-medium rounded-lg hover:bg-lime-300 transition-all mt-1"
          >
            {loading ? "Saving…" : "Get started"}
          </Button>
        </form>
      </div>
    </main>
  )
}
