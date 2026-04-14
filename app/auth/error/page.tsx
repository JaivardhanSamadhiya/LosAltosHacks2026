import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Authentication Error
        </h1>
        <p className="text-white/60 mb-8">
          Something went wrong during sign-in. Please try again.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-lime-400 text-black hover:bg-lime-300 rounded-lg font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
