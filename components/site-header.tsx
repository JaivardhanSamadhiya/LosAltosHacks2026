"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { Menu, FileText, Info, ChevronDown, Map, Cpu } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

export function SiteHeader() {
  const [servicesOpen, setServicesOpen] = useState(false)

  const services = [
    {
      href: "#features",
      label: "Platform Features",
      icon: Map,
      description: "Explore core capabilities",
    },
    {
      href: "#simulation",
      label: "Live Demo",
      icon: Cpu,
      description: "Try the AI chatbot and map",
    },
    {
      href: "#process",
      label: "How It Works",
      icon: FileText,
      description: "Learn about our workflow",
    },
  ]

  const links = [
    { href: "#simulation", label: "Demo", icon: Map },
    { href: "#process", label: "How It Works", icon: Info },
    { href: "/contact", label: "Contact", icon: FileText },
  ]

  return (
    <header className="sticky top-0 z-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex h-14 items-center justify-between px-6 liquid-glass-header rounded-full">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icons/skitbit-white.svg" alt="Civic Digital Twin logo" width={20} height={20} className="h-5 w-5" />
            <span className="font-semibold tracking-wide text-white text-sm">Civic DT</span>
          </Link>

          {/* Desktop Nav with Services Dropdown */}
          <nav className="hidden items-center gap-6 text-sm text-white/90 md:flex">
            <NavigationMenu className="relative">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="bg-transparent text-white/90 hover:text-lime-300 data-[state=open]:text-lime-300
                               hover:bg-transparent focus:bg-transparent
                               data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent
                               data-[active=true]:bg-transparent"
                  >
                    Features
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="absolute left-0 top-full mt-1 z-[9999]">
                    <div className="w-[320px] rounded-xl border border-lime-400/30 bg-black/95 backdrop-blur-md shadow-xl p-4">
                      <ul className="grid gap-2">
                        {services.map((service) => (
                          <li key={service.href + service.label}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={service.href}
                                className="group relative flex items-start gap-3 rounded-lg p-3 transition-all
                                           hover:bg-lime-400/20 hover:ring-1 hover:ring-lime-300/60
                                           hover:shadow-[0_0_0_1px_rgba(163,230,53,0.3),0_0_20px_rgba(163,230,53,0.2)]
                                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70"
                              >
                                <service.icon className="h-5 w-5 text-lime-300 mt-0.5 shrink-0 group-hover:text-lime-100" />
                                <div>
                                  <div className="text-sm font-semibold text-white group-hover:text-lime-200">
                                    {service.label}
                                  </div>
                                  <p className="text-xs text-white/60 mt-0.5 group-hover:text-white/80">{service.description}</p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-lime-300 transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Button
              asChild
              className="bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5
                         hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                         transition-all"
            >
              <Link href="/contact">Request Demo</Link>
            </Button>
          </div>

          {/* Mobile Nav */}
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
                {/* Brand Header */}
                <div className="flex items-center gap-1.5 px-4 py-4 border-b border-gray-800">
                  <Image src="/icons/skitbit-white.svg" alt="Civic Digital Twin logo" width={24} height={24} className="h-6 w-6" />
                  <span className="font-semibold tracking-wide text-white text-lg">Civic DT</span>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-1 mt-2 text-gray-200">
                  <Collapsible open={servicesOpen} onOpenChange={setServicesOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-900 hover:text-lime-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center w-5 h-5 text-gray-400">
                          <Cpu className="h-4 w-4" />
                        </span>
                        <span className="text-sm">Features</span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="flex flex-col bg-gray-900/50 border-l-2 border-lime-300/30 ml-4">
                        {services.map((service) => (
                          <Link
                            key={service.href + service.label}
                            href={service.href}
                            className="flex items-center gap-3 pl-8 pr-4 py-2.5 hover:bg-gray-900 hover:text-lime-300 transition-colors"
                          >
                            <service.icon className="h-4 w-4 text-lime-300/70" />
                            <span className="text-sm">{service.label}</span>
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

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

                {/* CTA Button at Bottom */}
                <div className="mt-auto border-t border-gray-800 p-4">
                  <Button
                    asChild
                    className="w-full bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5
                               hover:bg-lime-300 hover:shadow-md hover:scale-[1.02]
                               transition-all"
                  >
                    <Link href="/contact">Request Demo</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
