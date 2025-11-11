"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { Dices, TrendingUp, Trophy, Users, Zap, Shield, Database, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/ui/section-header"

const flowLines = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (custom: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, delay: custom * 0.5, ease: "easeInOut" },
  }),
}

const boxVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (custom: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: custom * 0.3 },
  }),
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: custom * 0.2, duration: 0.4 },
  }),
}

// Define the components of the Peculia ecosystem
const ecosystemComponents = [
  {
    id: "user",
    title: "USER",
    description: "Participates in predictions, evaluations, and quests",
    icon: <Users className="h-5 w-5" />,
    actions: ["Stake", "Participate"],
    position: "top",
    color: "green",
  },
  {
    id: "platform",
    title: "PECULIA PLATFORM",
    description: "Connects users, AI, and blockchain in a seamless ecosystem",
    icon: <Zap className="h-5 w-5" />,
    features: ["Community-Driven Predictions", "AI-Powered Token Evaluation", "Gamified Quest System"],
    position: "middle",
    color: "blue",
  },
  {
    id: "blockchain",
    title: "AI & BLOCKCHAIN",
    description: "Validates outcomes and secures transactions",
    icon: <Shield className="h-5 w-5" />,
    actions: ["Verify", "Reward"],
    position: "bottom",
    color: "purple",
  },
  {
    id: "ecosystem",
    title: "PECULIA ECOSYSTEM",
    icon: <Database className="h-5 w-5" />,
    subsystems: [
      {
        title: "Wager Engine",
        icon: <Dices className="h-3 w-3 text-white" />,
        description: "Community-Driven Predictions",
        features: ["Place wagers on verifiable future events", "AI agent swarm verifies outcomes autonomously"],
      },
      {
        title: "Pitch Arena",
        icon: <TrendingUp className="h-3 w-3 text-white" />,
        description: "Token Evaluation Platform",
        features: ["Pitch and evaluate token ideas", "Earn rewards for quality analysis"],
      },
      {
        title: "Quest System",
        icon: <Trophy className="h-3 w-3 text-white" />,
        description: "Gamified Tasks & Rewards",
        features: ["Complete tasks for impact and creativity", "Dynamic rewards based on contribution value"],
      },
    ],
    position: "right",
    color: "amber",
  },
]

const getColorClass = (color: string, type: "bg" | "text" | "border" | "shadow", opacity?: number) => {
  const opacityValue = opacity ? `/${opacity}` : ""

  switch (color) {
    case "green":
      return type === "shadow" ? "shadow-green-500/30" : `${type}-green-500${opacityValue}`
    case "blue":
      return type === "shadow" ? "shadow-blue-500/30" : `${type}-blue-500${opacityValue}`
    case "purple":
      return type === "shadow" ? "shadow-purple-500/30" : `${type}-purple-500${opacityValue}`
    case "amber":
      return type === "shadow" ? "shadow-amber-500/30" : `${type}-amber-500${opacityValue}`
    default:
      return type === "shadow" ? "shadow-green-500/30" : `${type}-green-500${opacityValue}`
  }
}

export default function HowItWorksSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")

      // Set animation complete after all animations have finished
      const timer = setTimeout(() => {
        setAnimationComplete(true)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [controls, isInView])

  // Floating particles animation
  const particleCount = 20
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* Floating particles */}
      {animationComplete &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white opacity-30 pointer-events-none"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              y: [
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
                Math.random() * 100 - 50,
              ],
              opacity: [0.1, 0.5, 0.3, 0.1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Interactive Workflow"
          badgeIcon={<Sparkles className="h-4 w-4" />}
          title="How Peculia Works"
          description="Our platform connects users, AI, and blockchain in a seamless ecosystem that rewards participation and verification."
        />

        {/* Restructured flow diagram for better responsiveness */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Main Flow Components - Left Column */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 gap-16 md:gap-24 relative">
                {/* SVG Flow Lines - Only visible on medium screens and up */}
                <div className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                  <svg className="w-full h-full" viewBox="0 0 800 500" fill="none" preserveAspectRatio="xMidYMid meet">
                    {/* Vertical line from USER to PLATFORM */}
                    <motion.path
                      d="M400 120 L400 220"
                      stroke="url(#gradient1)"
                      strokeWidth="3"
                      strokeDasharray="5,5"
                      variants={flowLines}
                      initial="hidden"
                      animate={controls}
                      custom={0}
                    />

                    {/* Vertical line from PLATFORM to AI & BLOCKCHAIN */}
                    <motion.path
                      d="M400 320 L400 420"
                      stroke="url(#gradient2)"
                      strokeWidth="3"
                      strokeDasharray="5,5"
                      variants={flowLines}
                      initial="hidden"
                      animate={controls}
                      custom={1}
                    />

                    {/* Horizontal line from PLATFORM to ECOSYSTEM */}
                    <motion.path
                      d="M500 270 L700 270"
                      stroke="url(#gradient3)"
                      strokeWidth="3"
                      strokeDasharray="5,5"
                      variants={flowLines}
                      initial="hidden"
                      animate={controls}
                      custom={2}
                    />

                    {/* Define gradients for the flow lines */}
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(16, 185, 129, 0.7)" />
                        <stop offset="100%" stopColor="rgba(59, 130, 246, 0.7)" />
                      </linearGradient>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.7)" />
                        <stop offset="100%" stopColor="rgba(139, 92, 246, 0.7)" />
                      </linearGradient>
                      <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.7)" />
                        <stop offset="100%" stopColor="rgba(251, 191, 36, 0.7)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* USER Section */}
                <motion.div
                  className="flex justify-center"
                  variants={boxVariants}
                  initial="hidden"
                  animate={controls}
                  custom={0}
                  onMouseEnter={() => setActiveSection("user")}
                  onMouseLeave={() => setActiveSection(null)}
                >
                  <div
                    className={cn(
                      "bg-background/30 backdrop-blur-sm border-2 rounded-full max-w-md w-full py-8 px-10 transition-all duration-300 transform relative overflow-hidden group",
                      activeSection === "user"
                        ? "border-green-500 scale-105 shadow-lg shadow-green-500/20"
                        : "border-white/20",
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Animated glow effect */}
                    <AnimatePresence>
                      {activeSection === "user" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute -inset-px rounded-full blur-md bg-green-500/20 z-0"
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center mr-3">
                          <span className="text-green-500 font-bold">1</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">USER</h3>
                      </div>
                      <p className="text-white/80 mb-6">Participates in predictions, evaluations, and quests</p>

                      <div className="flex justify-center space-x-4">
                        {ecosystemComponents[0].actions?.map((action, idx) => (
                          <motion.div
                            key={idx}
                            className="bg-background/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70"
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "rgba(16, 185, 129, 0.1)",
                              borderColor: "rgba(16, 185, 129, 0.3)",
                              color: "rgba(255, 255, 255, 0.9)",
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {action}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* PECULIA PLATFORM Section */}
                <motion.div
                  className="flex justify-center"
                  variants={boxVariants}
                  initial="hidden"
                  animate={controls}
                  custom={1}
                  onMouseEnter={() => setActiveSection("platform")}
                  onMouseLeave={() => setActiveSection(null)}
                >
                  <div
                    className={cn(
                      "bg-background/30 backdrop-blur-sm border-2 rounded-xl max-w-md w-full py-8 px-10 transition-all duration-300 transform relative overflow-hidden group",
                      activeSection === "platform"
                        ? "border-blue-500 scale-105 shadow-lg shadow-blue-500/20"
                        : "border-white/20",
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Animated glow effect */}
                    <AnimatePresence>
                      {activeSection === "platform" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute -inset-px rounded-xl blur-md bg-blue-500/20 z-0"
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center mr-3">
                          <span className="text-blue-500 font-bold">2</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">PECULIA PLATFORM</h3>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {ecosystemComponents[1].features?.map((item, index) => (
                          <motion.li
                            key={index}
                            className="flex items-center"
                            variants={itemVariants}
                            initial="hidden"
                            animate={controls}
                            custom={index + 1}
                            whileHover={{ x: 5 }}
                            onMouseEnter={() => setHoveredFeature(item)}
                            onMouseLeave={() => setHoveredFeature(null)}
                          >
                            <span
                              className={cn(
                                "inline-block w-1.5 h-1.5 rounded-full mr-2 transition-all duration-300",
                                hoveredFeature === item ? "bg-blue-500 w-2 h-2" : "bg-white",
                              )}
                            ></span>
                            <span
                              className={cn(
                                "text-white/80 transition-all duration-300",
                                hoveredFeature === item ? "text-blue-500" : "",
                              )}
                            >
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* AI & BLOCKCHAIN Section */}
                <motion.div
                  className="flex justify-center"
                  variants={boxVariants}
                  initial="hidden"
                  animate={controls}
                  custom={2}
                  onMouseEnter={() => setActiveSection("blockchain")}
                  onMouseLeave={() => setActiveSection(null)}
                >
                  <div
                    className={cn(
                      "bg-background/30 backdrop-blur-sm border-2 rounded-full max-w-md w-full py-8 px-10 transition-all duration-300 transform relative overflow-hidden group",
                      activeSection === "blockchain"
                        ? "border-purple-500 scale-105 shadow-lg shadow-purple-500/20"
                        : "border-white/20",
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Animated glow effect */}
                    <AnimatePresence>
                      {activeSection === "blockchain" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute -inset-px rounded-full blur-md bg-purple-500/20 z-0"
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-md bg-purple-500/10 flex items-center justify-center mr-3">
                          <span className="text-purple-500 font-bold">3</span>
                        </div>
                        <h3 className="text-xl font-bold text-white">AI & BLOCKCHAIN</h3>
                      </div>
                      <p className="text-white/80 mb-6">Validates outcomes and secures transactions</p>

                      <div className="flex justify-center space-x-4">
                        {ecosystemComponents[2].actions?.map((action, idx) => (
                          <motion.div
                            key={idx}
                            className="bg-background/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white/70"
                            whileHover={{
                              scale: 1.05,
                              backgroundColor: "rgba(139, 92, 246, 0.1)",
                              borderColor: "rgba(139, 92, 246, 0.3)",
                              color: "rgba(255, 255, 255, 0.9)",
                            }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {action}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* PECULIA ECOSYSTEM Section - Right Column */}
            <motion.div
              className="mt-16 md:mt-0"
              variants={boxVariants}
              initial="hidden"
              animate={controls}
              custom={3}
              onMouseEnter={() => setActiveSection("ecosystem")}
              onMouseLeave={() => setActiveSection(null)}
            >
              <div
                className={cn(
                  "bg-background/30 backdrop-blur-sm border-2 rounded-xl p-6 transition-all duration-300 transform relative overflow-hidden group h-full",
                  activeSection === "ecosystem"
                    ? "border-amber-500 scale-105 shadow-lg shadow-amber-500/20"
                    : "border-white/20",
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Animated glow effect */}
                <AnimatePresence>
                  {activeSection === "ecosystem" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute -inset-px rounded-xl blur-md bg-amber-500/20 z-0"
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-amber-500/10 text-amber-500 mb-6">
                    PECULIA ECOSYSTEM
                  </div>

                  <div className="space-y-6">
                    {/* Subsystems */}
                    {ecosystemComponents[3].subsystems?.map((subsystem, index) => (
                      <motion.div
                        key={index}
                        className="space-y-2"
                        variants={itemVariants}
                        initial="hidden"
                        animate={controls}
                        custom={index + 1}
                        whileHover={{
                          y: -5,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-md bg-amber-500/10 flex items-center justify-center mr-2">
                            {subsystem.icon}
                          </div>
                          <h4 className="text-white font-medium">{subsystem.title}</h4>
                        </div>
                        <div className="pl-8 text-sm">
                          <p className="text-white/70 mb-2">{subsystem.description}</p>
                          <div className="space-y-2">
                            {subsystem.features.map((feature, featureIdx) => (
                              <motion.div
                                key={featureIdx}
                                className="bg-background/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/80"
                                whileHover={{
                                  backgroundColor: "rgba(251, 191, 36, 0.1)",
                                  borderColor: "rgba(251, 191, 36, 0.3)",
                                  x: 5,
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              >
                                {feature}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
