"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowRight, Check, HelpCircle, Vote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/ui/section-header"

export default function QuadraticFundingSection() {
  const [activeTab, setActiveTab] = useState<"traditional" | "quadratic">("quadratic")
  const [hoveredVoter, setHoveredVoter] = useState<string | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  // Memoize particle configurations to prevent recalculation
  const particleConfigs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      initialX: Math.random() * 100 - 50,
      initialY: Math.random() * 100,
      animateX: Math.random() * 100 - 50,
      animateY: Math.random() * 100,
      offsetX: Math.random() * 200 - 100,
      offsetY: Math.random() * 200,
      duration: 15 + Math.random() * 10,
      delay: i * 0.8,
      size: i % 3 === 0 ? "h-3 w-3" : i % 3 === 1 ? "h-4 w-4" : "h-2 w-2",
    }))
  }, [])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const traditionalVotes = [
    { voter: "Whale", tokens: 10000, power: 10000 },
    { voter: "Medium Holder", tokens: 1000, power: 1000 },
    { voter: "Small Holder", tokens: 100, power: 100 },
    { voter: "Micro Holder", tokens: 10, power: 10 },
  ]

  const quadraticVotes = [
    { voter: "Whale", tokens: 10000, power: 100 },
    { voter: "Medium Holder", tokens: 1000, power: 31.6 },
    { voter: "Small Holder", tokens: 100, power: 10 },
    { voter: "Micro Holder", tokens: 10, power: 3.2 },
  ]

  const totalTraditional = traditionalVotes.reduce((sum, vote) => sum + vote.power, 0)
  const totalQuadratic = quadraticVotes.reduce((sum, vote) => sum + vote.power, 0)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-green-500/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-radial from-blue-500/5 to-transparent"></div>
      </div>

      {/* Optimized floating particles - reduced count and memoized */}
      {isInView &&
        particleConfigs.map((config) => (
          <motion.div
            key={config.id}
            className={cn("absolute rounded-full", activeTab === "quadratic" ? "bg-green-500/20" : "bg-blue-500/20")}
            style={{
              width: config.size === "h-3 w-3" ? "12px" : config.size === "h-4 w-4" ? "16px" : "8px",
              height: config.size === "h-3 w-3" ? "12px" : config.size === "h-4 w-4" ? "16px" : "8px",
            }}
            initial={{
              x: `${config.initialX}%`,
              y: `${config.initialY}%`,
              opacity: 0,
            }}
            animate={{
              x: `calc(${config.animateX}% + ${config.offsetX}px)`,
              y: `calc(${config.animateY}% - ${config.offsetY}px)`,
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: config.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: config.delay,
              ease: "easeInOut",
            }}
          />
        ))}

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Fair Governance"
          badgeIcon={<Vote className="h-4 w-4" />}
          title="Quadratic Governance"
          description="Our innovative √(PPT) voting system ensures fair governance by preventing whale dominance while still rewarding token holders."
        />

        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-background/20 rounded-lg border border-white/10">
              <motion.button
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all relative ${
                  activeTab === "traditional" ? "bg-white/10 text-white" : "text-white/60 hover:text-white/80"
                }`}
                onClick={() => setActiveTab("traditional")}
                whileHover={{
                  backgroundColor:
                    activeTab === "traditional" ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Traditional Voting
                {activeTab === "traditional" && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-full"
                    layoutId="activeTabIndicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
              <motion.button
                className={`px-6 py-3 rounded-md text-sm font-medium transition-all relative ${
                  activeTab === "quadratic" ? "bg-white/10 text-white" : "text-white/60 hover:text-white/80"
                }`}
                onClick={() => setActiveTab("quadratic")}
                whileHover={{
                  backgroundColor: activeTab === "quadratic" ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Quadratic Voting
                {activeTab === "quadratic" && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-green-500 w-full"
                    layoutId="activeTabIndicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            </div>
          </div>

          {/* Simplified tab content without AnimatePresence to prevent blank states */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-background/20 border border-white/20 rounded-lg p-6 hover:border-white/30 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <motion.h3
                    key={`title-${activeTab}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl font-bold text-white"
                  >
                    {activeTab === "traditional" ? "Traditional Voting" : "Quadratic Voting"}
                  </motion.h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs bg-background/95 backdrop-blur-md border-white/20">
                        <p>
                          {activeTab === "traditional"
                            ? "In traditional voting, voting power is directly proportional to token holdings, giving whales disproportionate influence."
                            : "In quadratic voting, voting power equals the square root of token holdings, reducing whale dominance while still rewarding larger holders."}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <motion.div
                  key={`table-${activeTab}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-3 gap-2 text-sm font-medium text-white/80 pb-2 border-b border-white/10">
                    <div>Voter</div>
                    <div>PPT Tokens</div>
                    <div>Voting Power</div>
                  </div>

                  {(activeTab === "traditional" ? traditionalVotes : quadraticVotes).map((vote, index) => (
                    <motion.div
                      key={`${activeTab}-${index}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={cn(
                        "grid grid-cols-3 gap-2 text-sm p-2 rounded-lg transition-all duration-300",
                        hoveredVoter === vote.voter
                          ? activeTab === "traditional"
                            ? "bg-blue-500/10"
                            : "bg-green-500/10"
                          : "",
                      )}
                      onMouseEnter={() => setHoveredVoter(vote.voter)}
                      onMouseLeave={() => setHoveredVoter(null)}
                    >
                      <div className="text-white/90 font-medium">{vote.voter}</div>
                      <div className="text-white/70">{vote.tokens.toLocaleString()}</div>
                      <div
                        className={cn(
                          "text-white/90 font-medium",
                          activeTab === "traditional" ? "text-blue-500" : "text-green-500",
                        )}
                      >
                        {vote.power.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                      </div>
                    </motion.div>
                  ))}

                  <div className="grid grid-cols-3 gap-2 text-sm font-medium pt-2 border-t border-white/10">
                    <div>Total</div>
                    <div></div>
                    <div className={cn("font-bold", activeTab === "traditional" ? "text-blue-500" : "text-green-500")}>
                      {activeTab === "traditional"
                        ? totalTraditional.toLocaleString()
                        : totalQuadratic.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-background/20 border border-white/20 rounded-lg p-6 hover:border-white/30 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white mb-4">Voting Power Distribution</h3>

                  <motion.div
                    key={`distribution-${activeTab}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {(activeTab === "traditional" ? traditionalVotes : quadraticVotes).map((vote, index) => {
                      const percentage =
                        activeTab === "traditional"
                          ? (vote.power / totalTraditional) * 100
                          : (vote.power / totalQuadratic) * 100

                      return (
                        <motion.div
                          key={`${activeTab}-dist-${index}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="space-y-1"
                          onMouseEnter={() => setHoveredVoter(vote.voter)}
                          onMouseLeave={() => setHoveredVoter(null)}
                        >
                          <div className="flex justify-between text-sm">
                            <span className={cn("text-white/80", hoveredVoter === vote.voter ? "text-white" : "")}>
                              {vote.voter}
                            </span>
                            <span
                              className={cn(
                                "font-medium",
                                activeTab === "traditional" ? "text-blue-500" : "text-green-500",
                              )}
                            >
                              {percentage.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className={cn(
                                "h-full",
                                activeTab === "traditional" ? "bg-blue-500/60" : "bg-green-500/60",
                              )}
                              initial={{ width: 0 }}
                              animate={{
                                width: `${percentage}%`,
                                backgroundColor:
                                  hoveredVoter === vote.voter
                                    ? activeTab === "traditional"
                                      ? "rgb(59, 130, 246)"
                                      : "rgb(16, 185, 129)"
                                    : "",
                              }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                            ></motion.div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-background/20 border border-white/20 rounded-lg p-6 hover:border-white/30 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white mb-4">Key Benefits</h3>

                  <motion.ul
                    key={`benefits-${activeTab}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    {activeTab === "quadratic" ? (
                      <>
                        {[
                          "Prevents whale dominance in governance",
                          "Encourages broader community participation",
                          "Still rewards larger token holders",
                          "Creates more democratic outcomes",
                        ].map((benefit, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className="flex items-start"
                            whileHover={{ x: 5 }}
                          >
                            <div className="flex-shrink-0 h-5 w-5 bg-green-500/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                              <Check className="h-3 w-3 text-green-500" />
                            </div>
                            <span className="text-white/80">{benefit}</span>
                          </motion.li>
                        ))}
                      </>
                    ) : (
                      <>
                        {[
                          { text: "Simple to understand and implement", active: true },
                          { text: "Directly rewards token accumulation", active: true },
                          { text: "Vulnerable to whale manipulation", active: false },
                          { text: "Discourages small holder participation", active: false },
                        ].map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                            className={cn("flex items-start", item.active ? "" : "opacity-50")}
                            whileHover={{ x: item.active ? 5 : 0 }}
                          >
                            {item.active ? (
                              <div className="flex-shrink-0 h-5 w-5 bg-blue-500/10 rounded-full flex items-center justify-center mr-2 mt-0.5">
                                <Check className="h-3 w-3 text-blue-500" />
                              </div>
                            ) : (
                              <div className="h-5 w-5 border border-white/20 rounded-full mr-2 flex-shrink-0 mt-0.5"></div>
                            )}
                            <span className={item.active ? "text-white/80" : "text-white/60"}>{item.text}</span>
                          </motion.li>
                        ))}
                      </>
                    )}
                  </motion.ul>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <Button className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border border-green-500/30 px-6 py-5 h-auto text-base relative overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center">
                Learn More About Quadratic Governance
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                  className="ml-2"
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
