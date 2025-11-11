"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import WalletConnect from "@/components/wallet-connect"
import ThemeSelector from "@/components/theme-selector"

const navItems = [
  { name: "Home", path: "/" },
  {
    name: "Ecosystem",
    path: "#",
    dropdown: [
      {
        name: "Prediction Markets",
        path: "/prediction-markets",
        description: "Create and participate in AI-verified predictions",
      },
      { name: "Token Pitching", path: "/token-pitching", description: "Simulate and evaluate token ideas" },
      { name: "Quest System", path: "/quest-system", description: "Complete missions for rewards and governance" },
      {
        name: "Quadratic Funding",
        path: "/quadratic-funding",
        description: "Fair governance with √(PPT) voting power",
      },
    ],
  },
  { name: "Portfolio", path: "/portfolio" },
  {
    name: "Documentation",
    path: "#",
    dropdown: [
      { name: "Getting Started", path: "/docs/getting-started", description: "Learn the basics of Peculia" },
      { name: "API Reference", path: "/docs/api", description: "Integrate with our platform" },
      { name: "CLI Guide", path: "/docs/cli", description: "Command-line interface documentation" },
    ],
  },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const pathname = usePathname()
  const headerRef = useRef<HTMLDivElement>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleDropdownHover = (name: string, isEntering: boolean) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }

    if (isEntering) {
      setActiveDropdown(name)
    } else {
      const timeout = setTimeout(() => {
        setActiveDropdown(null)
      }, 300)
      setHoverTimeout(timeout)
    }
  }

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(name)
    }
  }

  const closeDropdownOnNavigate = () => {
    setActiveDropdown(null)
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur-md border-b border-[#1e1e1e] py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center mr-8 group">
              <motion.div
                className="w-10 h-10 rounded-lg bg-white flex items-center justify-center mr-2 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.span
                  className="text-black font-bold text-lg"
                  initial={{ y: 0 }}
                  whileHover={{ y: [-2, 0, -2] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  P
                </motion.span>
              </motion.div>
              <motion.span
                className="text-xl font-bold text-white font-mono"
                initial={{ opacity: 1 }}
                whileHover={{ opacity: 0.8 }}
              >
                Peculia
              </motion.span>
            </Link>

            <nav className="hidden lg:flex space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && handleDropdownHover(item.name, true)}
                  onMouseLeave={() => item.dropdown && handleDropdownHover(item.name, false)}
                >
                  {item.dropdown ? (
                    <button
                      className={`px-4 py-2 rounded-md text-base font-medium transition-all flex items-center ${
                        activeDropdown === item.name
                          ? "bg-[#10b981]/20 text-white"
                          : "text-white/80 hover:text-white hover:bg-[#1a1a1a]"
                      }`}
                      onClick={() => toggleDropdown(item.name)}
                      aria-expanded={activeDropdown === item.name}
                    >
                      {item.name}
                      <motion.div
                        animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-1"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    </button>
                  ) : (
                    <Link
                      href={item.path}
                      className={`px-4 py-2 rounded-md text-base font-medium transition-all block ${
                        pathname === item.path
                          ? "bg-[#10b981]/20 text-white"
                          : "text-white/80 hover:text-white hover:bg-[#1a1a1a]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-1 w-64 rounded-lg shadow-lg bg-[#0a0a0a] backdrop-blur-md border border-[#1e1e1e] overflow-hidden z-50"
                        style={{ transformOrigin: "top left" }}
                      >
                        <div className="py-2">
                          {item.dropdown.map((dropdownItem, idx) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.path}
                              className="block px-4 py-3 text-sm hover:bg-[#10b981]/10 transition-colors"
                            >
                              <div className="flex items-start">
                                <div className="mr-2 mt-0.5 text-[#10b981]">
                                  <ChevronRight className="h-3 w-3" />
                                </div>
                                <div>
                                  <div className="font-medium text-white">{dropdownItem.name}</div>
                                  {dropdownItem.description && (
                                    <div className="text-xs text-[#a0a0a0] mt-0.5">{dropdownItem.description}</div>
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/auth">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-[#1a1a1a]">
                Get Started
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="sm" className="bg-[#10b981] text-black hover:bg-[#0d9668]">
                Get Started
              </Button>
            </Link>
            <WalletConnect />
            <ThemeSelector />
          </div>

          <motion.button
            className="lg:hidden text-white/80 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 bg-black/95 backdrop-blur-md border-t border-[#1e1e1e] max-h-[calc(100vh-80px)] overflow-y-auto">
              <nav className="flex flex-col space-y-2 py-2">
                {navItems.map((item) => (
                  <div key={item.name} className="w-full">
                    {item.dropdown ? (
                      <div className="w-full">
                        <button
                          className={`text-left w-full px-4 py-3 rounded-md text-base font-medium transition-all flex items-center justify-between ${
                            activeDropdown === item.name
                              ? "bg-[#10b981]/20 text-white"
                              : "text-white/80 hover:text-white hover:bg-[#1a1a1a]"
                          }`}
                          onClick={() => toggleDropdown(item.name)}
                          aria-expanded={activeDropdown === item.name}
                        >
                          {item.name}
                          <motion.div
                            animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 mt-1 space-y-1"
                            >
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  href={dropdownItem.path}
                                  onClick={closeDropdownOnNavigate}
                                  className="block px-4 py-2 rounded-md text-sm text-white/80 hover:text-white hover:bg-[#10b981]/10 transition-colors"
                                >
                                  <div className="flex items-start">
                                    <div className="mr-2 mt-0.5 text-[#10b981]">
                                      <ChevronRight className="h-3 w-3" />
                                    </div>
                                    <div>
                                      <div className="font-medium">{dropdownItem.name}</div>
                                      {dropdownItem.description && (
                                        <div className="text-xs text-[#a0a0a0] mt-0.5">{dropdownItem.description}</div>
                                      )}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.path}
                        onClick={closeDropdownOnNavigate}
                        className={`block px-4 py-3 rounded-md text-base font-medium transition-all ${
                          pathname === item.path
                            ? "bg-[#10b981]/20 text-white"
                            : "text-white/80 hover:text-white hover:bg-[#1a1a1a]"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              <div className="flex flex-col space-y-3 py-4 border-t border-[#1e1e1e] mt-2">
                <Link href="/auth" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full h-12 text-white/80 border-[#1e1e1e] hover:bg-[#1a1a1a] bg-transparent"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth" className="w-full">
                  <Button className="w-full h-12 bg-[#10b981] text-black hover:bg-[#0d9668]">Get Started</Button>
                </Link>
                <div className="pt-2">
                  <WalletConnect />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
