export default function AuthErrorPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="liquid-glass rounded-2xl p-10 text-center max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-white mb-2">Authentication Error</h1>
        <p className="text-white/70 text-sm mb-6">
          Something went wrong during sign-in. Please try again.
        </p>
        <a
          href="/"
          className="inline-block bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5 text-sm
                     hover:bg-lime-300 transition-all"
        >
          Back to Home
        </a>
      </div>
    </main>
  )
}
