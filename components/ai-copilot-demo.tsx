"use client"

import { useState, useEffect, useRef } from "react"
import { ScrollReveal } from "./scroll-reveal"
import { Button } from "@/components/ui/button"
import { Send, Bot, User, Sparkles } from "lucide-react"

const demoConversation = [
  {
    role: "user",
    message: "What if we add 5 cooling centers to District 7?",
  },
  {
    role: "assistant", 
    message: "Analyzing District 7... Adding 5 cooling centers would reduce heat-related risk by 23% and improve emergency response coverage to 94% of vulnerable populations. Estimated budget impact: $2.1M annually.",
  },
  {
    role: "user",
    message: "Show me the impact on elderly populations specifically.",
  },
  {
    role: "assistant",
    message: "For residents 65+: Access to cooling within 10-min walk increases from 67% to 89%. Projected heat-related hospitalizations decrease by 31%. I recommend prioritizing locations near senior housing complexes.",
  },
]

export function AICopilotDemo() {
  const [messages, setMessages] = useState<typeof demoConversation>([])
  const [isTyping, setIsTyping] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const startDemo = () => {
    setMessages([])
    setCurrentIndex(0)
    setDisplayedText("")
    setIsPlaying(true)
  }

  useEffect(() => {
    if (!isPlaying || currentIndex >= demoConversation.length) {
      if (currentIndex >= demoConversation.length) {
        setIsPlaying(false)
      }
      return
    }

    const currentMessage = demoConversation[currentIndex]
    
    if (currentMessage.role === "user") {
      // User messages appear instantly
      setTimeout(() => {
        setMessages(prev => [...prev, currentMessage])
        setCurrentIndex(prev => prev + 1)
      }, 500)
    } else {
      // Assistant messages type out
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        let charIndex = 0
        const typeInterval = setInterval(() => {
          if (charIndex <= currentMessage.message.length) {
            setDisplayedText(currentMessage.message.slice(0, charIndex))
            charIndex++
          } else {
            clearInterval(typeInterval)
            setMessages(prev => [...prev, currentMessage])
            setDisplayedText("")
            setCurrentIndex(prev => prev + 1)
          }
        }, 20)
        return () => clearInterval(typeInterval)
      }, 1000)
    }
  }, [currentIndex, isPlaying])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, displayedText])

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 particle-bg opacity-30" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="text-center mb-12">
          <p className="text-[11px] tracking-widest text-lime-300/80 mb-2">AI COPILOT</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Plan scenarios with <span className="text-lime-300">natural language</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Ask questions in plain English. Get instant simulations, impact analysis, and actionable recommendations.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="max-w-2xl mx-auto">
            <div className="liquid-glass rounded-2xl overflow-hidden border border-white/10">
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-black/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-lime-400/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-lime-300" />
                  </div>
                  <span className="text-sm font-medium text-white">AI Copilot</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                  <span className="text-xs text-lime-300">Online</span>
                </div>
              </div>

              {/* Chat Area */}
              <div 
                ref={containerRef}
                className="h-80 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
              >
                {messages.length === 0 && !isPlaying && (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <Bot className="w-12 h-12 text-lime-300/30 mb-4" />
                    <p className="text-neutral-400 text-sm mb-4">
                      See how the AI Copilot helps you plan city scenarios
                    </p>
                    <Button 
                      onClick={startDemo}
                      className="bg-lime-400 text-black hover:bg-lime-300"
                    >
                      Start Demo
                    </Button>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div 
                    key={i}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-lime-300" />
                      </div>
                    )}
                    <div 
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === "user" 
                          ? "bg-lime-400 text-black" 
                          : "bg-white/5 text-white border border-white/10"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-lime-300" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-lime-300 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-lime-300 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-lime-300 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Currently typing message */}
                {displayedText && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-lime-400/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-lime-300" />
                    </div>
                    <div className="max-w-[80%] bg-white/5 text-white border border-white/10 rounded-2xl px-4 py-3">
                      <p className="text-sm leading-relaxed">{displayedText}<span className="animate-pulse">|</span></p>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="px-4 py-3 border-t border-white/10 bg-black/20">
                <div className="flex items-center gap-3">
                  <input 
                    type="text"
                    placeholder="Ask about city scenarios..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-lime-300/50"
                    disabled
                  />
                  <button className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center hover:bg-lime-300 transition-colors">
                    <Send className="w-4 h-4 text-black" />
                  </button>
                </div>
              </div>
            </div>

            {/* Restart button */}
            {messages.length > 0 && !isPlaying && (
              <div className="mt-4 text-center">
                <Button 
                  onClick={startDemo}
                  variant="outline"
                  className="border-lime-300/30 text-lime-300 hover:bg-lime-300/10"
                >
                  Replay Demo
                </Button>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
