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
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-950 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="w-full max-w-md mb-12 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">One last step</h1>
        <p className="text-white/60">
          Tell us a bit about yourself to personalise your experience.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        {/* Full Name */}
        <div>
          <Label htmlFor="name" className="text-white/80 mb-2 block">
            Full name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-lime-400 rounded-lg"
          />
        </div>

        {/* Role */}
        <div>
          <Label className="text-white/80 mb-3 block">Your role</Label>
          <div className="grid grid-cols-3 gap-2">
            {ROLES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`py-2.5 px-2 rounded-lg text-sm font-medium border transition-all
                  ${
                    role === r
                      ? "bg-lime-400 text-black border-lime-400"
                      : "bg-white/5 text-white/70 border-white/15 hover:bg-white/10 hover:text-white"
                  }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-400/10 text-red-400 text-sm">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-lime-400 text-black hover:bg-lime-300 disabled:opacity-50 font-semibold py-3 rounded-lg"
        >
          {loading ? "Saving…" : "Get started"}
        </Button>
      </form>
    </div>
  )
}
