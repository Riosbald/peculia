"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Layers, Sun, Hexagon, Disc, Link2, BarChart, Database, HardDrive } from "lucide-react"

const partners = [
  {
    name: "Ethereum",
    icon: <Layers className="h-8 w-8 text-[#627EEA]" />,
    description: "Smart Contract Platform",
  },
  {
    name: "Solana",
    icon: <Sun className="h-8 w-8 text-[#14F195]" />,
    description: "High-Performance Blockchain",
  },
  {
    name: "Polygon",
    icon: <Hexagon className="h-8 w-8 text-[#8247E5]" />,
    description: "Ethereum Scaling Solution",
  },
  {
    name: "Binance",
    icon: <Disc className="h-8 w-8 text-[#F0B90B]" />,
    description: "Cryptocurrency Exchange",
  },
  {
    name: "Chainlink",
    icon: <Link2 className="h-8 w-8 text-[#375BD2]" />,
    description: "Decentralized Oracle Network",
  },
  {
    name: "The Graph",
    icon: <BarChart className="h-8 w-8 text-[#6747ED]" />,
    description: "Indexing Protocol",
  },
  {
    name: "IPFS",
    icon: <Database className="h-8 w-8 text-[#65C2CB]" />,
    description: "Distributed File System",
  },
  {
    name: "Filecoin",
    icon: <HardDrive className="h-8 w-8 text-[#0090FF]" />,
    description: "Decentralized Storage Network",
  },
]

export default function PartnersSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">Our Partners</h2>
          <p className="text-lg text-white/80">
            We collaborate with leading blockchain networks and Web3 infrastructure providers.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative overflow-hidden py-4">
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            initial="hidden"
            animate={controls}
            className="flex space-x-12 py-4"
          >
            <motion.div
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex space-x-12 items-center"
            >
              {[...partners, ...partners].map((partner, index) => (
                <motion.div
                  key={`${partner.name}-${index}`}
                  className="flex flex-col items-center justify-center min-w-[180px] h-24 bg-background/20 border border-white/10 rounded-lg px-6 hover:border-white/30 transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="mb-2">{partner.icon}</div>
                    <span className="text-sm font-medium text-white/80">{partner.name}</span>
                    <span className="text-xs text-white/60 mt-1">{partner.description}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
        </div>
      </div>
    </section>
  )
}
