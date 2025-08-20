"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import ParticleBackground from "@/components/ui/particle-background"

interface EcosystemPageLayoutProps {
  children: ReactNode
  title: string
  description: string
  icon: ReactNode
  backgroundColor?: string
  particleColor?: string
}

export default function EcosystemPageLayout({
  children,
  title,
  description,
  icon,
  backgroundColor = "rgba(16, 185, 129, 0.05)",
  particleColor = "#10b981",
}: EcosystemPageLayoutProps) {
  return (
    <div className="pt-24 pb-16 min-h-screen relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ParticleBackground
          className="w-full h-full"
          quantity={100}
          particleColor={particleColor}
          minSize={1}
          maxSize={3}
          speed={0.5}
        />
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-500/10 text-green-500 mb-6"
                whileHover={{ scale: 1.1, backgroundColor: "rgba(16, 185, 129, 0.2)" }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {icon}
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-mono leading-tight">{title}</h1>
              <p className="text-lg text-white/80 mb-8">{description}</p>
              {/* Slot for hero content */}
            </motion.div>

            <motion.div
              className="bg-background/30 border border-green-500/20 rounded-lg p-6 space-y-6 backdrop-blur-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 font-mono">How It Works</h2>
              {/* Slot for how it works content */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
