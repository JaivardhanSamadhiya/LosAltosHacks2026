"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateCount()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateCount = () => {
    const startTime = performance.now()
    const startValue = 0

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function for smooth animation
      const easeOutExpo = 1 - Math.pow(2, -10 * progress)
      const currentValue = startValue + (end - startValue) * easeOutExpo
      
      setCount(currentValue)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    requestAnimationFrame(updateCount)
  }

  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString()

  return (
    <span ref={ref} className={`counter-animate ${className}`}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}
