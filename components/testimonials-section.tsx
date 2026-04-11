"use client"

import { ScrollReveal } from "./scroll-reveal"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow",
    image: "/images/archviz/client-love-1.jpg",
    rating: 5,
    quote: "Skitbit transformed our product launch. The 3D animations captured attention instantly and our conversion rate jumped 40%.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Founder & CEO",
    company: "Nexa Wellness",
    image: "/images/archviz/client-love-2.jpg",
    rating: 5,
    quote: "Working with Skitbit felt effortless. They understood our vision immediately and delivered beyond expectations.",
  },
  {
    name: "Emily Watson",
    role: "Creative Lead",
    company: "Bloom Studio",
    image: "/images/top-rated-1.png",
    rating: 5,
    quote: "The quality is exceptional. Every frame looks like it belongs in a premium commercial. Highly recommend!",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-lime-400/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <p className="text-[11px] tracking-widest text-lime-300/80 mb-2">TESTIMONIALS</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            What our <span className="text-lime-300">clients</span> say
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            {"Don't just take our word for it. Here's what brands love about working with us."}
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.name} delay={index * 100}>
              <div className="liquid-glass rounded-2xl p-6 h-full glass-card-interactive relative group">
                {/* Quote icon */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-lime-300/20 group-hover:text-lime-300/40 transition-colors" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-lime-300 text-lime-300" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-neutral-300 mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-lime-300/30">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-neutral-400">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
