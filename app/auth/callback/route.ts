import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Check if this user already has a profile row
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", data.user.id)
        .single()

      // New users (no name / role yet) → onboarding; existing → home
      const isNewUser = !profile?.full_name || !profile?.role
      const redirectTo = isNewUser ? "/auth/onboarding" : next

      return NextResponse.redirect(`${origin}${redirectTo}`)
    }
  }

  // Something went wrong
  return NextResponse.redirect(`${origin}/auth/error`)
}
