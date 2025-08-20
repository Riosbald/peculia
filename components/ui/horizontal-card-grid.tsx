"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface HorizontalCardGridProps {
  children: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export default function HorizontalCardGrid({ children, title, description, action }: HorizontalCardGridProps) {
  return (
    <section className="py-12 bg-background/30 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 font-mono">{title}</h2>
              {description && <p className="text-white/70 max-w-2xl">{description}</p>}
            </div>

            {action && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {action}
              </motion.div>
            )}
          </motion.div>

          <div className="grid grid-cols-1 gap-6">{children}</div>
        </div>
      </div>
    </section>
  )
}
