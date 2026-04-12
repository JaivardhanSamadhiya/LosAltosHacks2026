"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Layers, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen text-white flex flex-col">
      <div className="absolute inset-0 particle-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-lime-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center container mx-auto px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Brand */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-8 w-8 rounded-lg bg-lime-400 flex items-center justify-center">
              <Layers className="w-5 h-5 text-black" />
            </div>
            <span className="text-lg font-semibold text-white">Civic Digital Twin</span>
          </div>

          {submitted ? (
            <div className="liquid-glass rounded-2xl p-10 border border-lime-400/20 text-center">
              <CheckCircle className="w-14 h-14 text-lime-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Thank you for your feedback!</h2>
              <p className="text-neutral-400 mb-6">
                We appreciate your input. It helps us build a better product for everyone.
              </p>
              <Button asChild className="bg-lime-400 text-black hover:bg-lime-300">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          ) : (
            <div className="liquid-glass rounded-2xl p-8 border border-white/10">
              <h1 className="text-3xl font-extrabold text-white mb-2">Share Your Feedback</h1>
              <p className="text-neutral-400 mb-8 text-sm">
                Do you have any feedback for us? We'd love to hear your thoughts on Civic Digital Twin and how we can improve the platform.
              </p>

              {/* formsubmit.co form — action points to the email, _next redirects back */}
              <form
                action="https://formsubmit.co/33adb1ba33fe6326f12587f46bf36cad"
                method="POST"
                onSubmit={() => {
                  // Allow native submit but show success state after a brief delay
                  setTimeout(() => setSubmitted(true), 200)
                }}
                className="space-y-5"
              >
                {/* Formsubmit honeypot + config */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New Civic Digital Twin Feedback" />
                <input type="hidden" name="_next" value="/" />
                <input type="text" name="_honey" className="hidden" />

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Smith"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-lime-300/60 focus:ring-1 focus:ring-lime-300/30 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-lime-300/60 focus:ring-1 focus:ring-lime-300/30 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="feedback-type" className="block text-sm font-medium text-neutral-300 mb-1.5">
                    Feedback Type
                  </label>
                  <select
                    id="feedback-type"
                    name="feedback_type"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-lime-300/60 focus:ring-1 focus:ring-lime-300/30 transition-colors"
                  >
                    <option value="general">General Feedback</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="improvement">Improvement Suggestion</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1.5">
                    Your Feedback
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us what you think. What's working well? What could we improve?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-lime-300/60 focus:ring-1 focus:ring-lime-300/30 transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-lime-400 text-black hover:bg-lime-300 font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Feedback
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
