"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface SectionHeaderProps {
  badge?: string
  badgeIcon?: ReactNode
  title: string
  description?: string
  className?: string
}

export function SectionHeader({ badge, badgeIcon, title, description, className = "" }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`text-center max-w-3xl mx-auto mb-16 ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center mb-3 bg-green-500/10 px-4 py-1 rounded-full">
          {badgeIcon && <span className="text-green-500 mr-2">{badgeIcon}</span>}
          <span className="text-green-500 text-sm font-medium">{badge}</span>
        </div>
      )}

      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-mono leading-tight">
        <span className="relative">
          {title}
          <motion.span
            className="absolute -bottom-2 left-0 h-1 bg-green-500/50 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </span>
      </h2>

      {description && <p className="text-lg text-white/80">{description}</p>}
    </motion.div>
  )
}
