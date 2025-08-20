"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, Dices, TrendingUp, Trophy, Vote, Sparkles } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ecosystemFeatures = [
  {
    id: "prediction-markets",
    title: "Prediction Markets",
    icon: <Dices className="h-5 w-5" />,
    description: "Create and participate in community-driven predictions with AI-generated odds.",
    benefits: [
      "Public and private prediction creation",
      "AI-generated odds based on real-time data",
      "Real-time settlement via AI swarm verification",
      "IPFS-based proof of outcomes",
    ],
    stats: [
      { label: "Active Markets", value: "1,200+" },
      { label: "Success Rate", value: "94%" },
      { label: "Total Volume", value: "$2.4M" },
    ],
    color: "green",
    bgPattern: "radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
  },
  {
    id: "token-pitching",
    title: "Token Pitching",
    icon: <TrendingUp className="h-5 w-5" />,
    description: "Simulate and evaluate token ideas with AI feedback and reputation scoring.",
    benefits: [
      "Risk-free token simulations",
      "AI-powered feedback and analysis",
      "Reputation scoring system",
      "Multi-chain performance tracking",
    ],
    stats: [
      { label: "Tokens Evaluated", value: "3,500+" },
      { label: "Avg. Feedback Score", value: "87/100" },
      { label: "Success Rate", value: "32%" },
    ],
    color: "blue",
    bgPattern: "radial-gradient(circle at 90% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
  },
  {
    id: "quest-system",
    title: "Quest System",
    icon: <Trophy className="h-5 w-5" />,
    description: "Complete gamified missions to earn XP, PPT rewards, and unlock governance tiers.",
    benefits: [
      "Gamified blockchain missions",
      "XP and PPT token rewards",
      "Unlockable governance tiers",
      "Skill-based progression system",
    ],
    stats: [
      { label: "Active Quests", value: "45+" },
      { label: "Completion Rate", value: "76%" },
      { label: "Total Rewards", value: "1.2M PPT" },
    ],
    color: "purple",
    bgPattern: "radial-gradient(circle at 10% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
  },
  {
    id: "quadratic-governance",
    title: "Quadratic Governance",
    icon: <Vote className="h-5 w-5" />,
    description: "Participate in fair governance with √(PPT) voting power to prevent whale dominance.",
    benefits: [
      "Square root voting mechanism",
      "Prevents whale dominance",
      "Democratic decision making",
      "Transparent on-chain voting",
    ],
    stats: [
      { label: "Governance Proposals", value: "120+" },
      { label: "Voter Participation", value: "68%" },
      { label: "Unique Voters", value: "12,400+" },
    ],
    color: "amber",
    bgPattern: "radial-gradient(circle at 90% 80%, rgba(251, 191, 36, 0.1) 0%, transparent 70%)",
  },
]

const getColorClass = (color: string, type: "bg" | "text" | "border", opacity?: number) => {
  const opacityValue = opacity ? `/${opacity}` : ""

  switch (color) {
    case "green":
      return `${type}-green-500${opacityValue}`
    case "blue":
      return `${type}-blue-500${opacityValue}`
    case "purple":
      return `${type}-purple-500${opacityValue}`
    case "amber":
      return `${type}-amber-500${opacityValue}`
    default:
      return `${type}-green-500${opacityValue}`
  }
}

export default function EcosystemSection() {
  const [activeTab, setActiveTab] = useState("prediction-markets")
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)
  const controls = useAnimation()

  const inView = useInView(sectionRef, { once: false, amount: 0.3 })

  useEffect(() => {
    if (inView) {
      setIsInView(true)
      controls.start("visible")
    }
  }, [inView, controls])

  const activeFeature = ecosystemFeatures.find((f) => f.id === activeTab) || ecosystemFeatures[0]

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const benefitVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: 0.2 + i * 0.1 },
    }),
    hover: {
      scale: 1.03,
      x: 5,
      transition: { duration: 0.2 },
    },
  }

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: 0.4 + i * 0.1, type: "spring" },
    }),
    hover: {
      y: -5,
      scale: 1.05,
      transition: { duration: 0.2, type: "spring" },
    },
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background/30 relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: activeFeature.bgPattern }}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isInView &&
          Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute rounded-full",
                getColorClass(activeFeature.color, "bg", 20),
                i % 3 === 0 ? "h-3 w-3" : i % 3 === 1 ? "h-5 w-5" : "h-2 w-2",
              )}
              initial={{
                x: Math.random() * 100 - 50 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0,
              }}
              animate={{
                x: `calc(${Math.random() * 100 - 50}% + ${Math.random() * 200 - 100}px)`,
                y: `calc(${Math.random() * 100}% - ${Math.random() * 200}px)`,
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center mb-3 bg-green-500/10 px-4 py-1 rounded-full">
            <Sparkles className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-green-500 text-sm font-medium">Explore Our Features</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 font-mono">
            <span className="relative">
              Peculia Ecosystem
              <motion.span
                className="absolute -bottom-2 left-0 h-1 bg-green-500/50 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
          <p className="text-lg text-primary/80">
            Our platform combines prediction markets, token evaluation, quests, and governance into a seamless ecosystem
            powered by AI and blockchain.
          </p>
        </motion.div>

        <Tabs
          defaultValue="prediction-markets"
          value={activeTab}
          onValueChange={setActiveTab}
          className="max-w-5xl mx-auto"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-background/20 p-1 rounded-lg border border-primary/10 mb-8">
            {ecosystemFeatures.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className={cn(
                  "flex items-center gap-2 py-3 rounded-md transition-all duration-300",
                  "data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
                  "hover:bg-primary/5",
                )}
              >
                <motion.div whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.2 }} transition={{ duration: 0.5 }}>
                  {feature.icon}
                </motion.div>
                <span className="hidden md:inline">{feature.title}</span>
                {activeTab === feature.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-green-500"
                    layoutId="activeTab"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            {ecosystemFeatures.map((feature) => (
              <TabsContent key={feature.id} value={feature.id} className="mt-8 outline-none">
                <motion.div
                  key={feature.id}
                  variants={containerVariants}
                  initial="hidden"
                  animate={controls}
                  exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                  className="space-y-8"
                >
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col md:flex-row items-start justify-between gap-6 bg-background/30 border border-primary/10 rounded-xl p-6 backdrop-blur-sm"
                  >
                    <div className="flex-1">
                      <div className="flex items-center">
                        <motion.div
                          className={cn(
                            "inline-flex items-center justify-center w-12 h-12 rounded-lg mr-4",
                            getColorClass(feature.color, "bg", 10),
                            getColorClass(feature.color, "text"),
                          )}
                          whileHover={{
                            scale: 1.1,
                            rotate: [0, 5, -5, 0],
                            boxShadow: `0 0 15px ${
                              feature.color === "green"
                                ? "rgba(16, 185, 129, 0.5)"
                                : feature.color === "blue"
                                  ? "rgba(59, 130, 246, 0.5)"
                                  : feature.color === "purple"
                                    ? "rgba(139, 92, 246, 0.5)"
                                    : "rgba(251, 191, 36, 0.5)"
                            }`,
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white font-mono">{feature.title}</h3>
                      </div>

                      <motion.p variants={itemVariants} className="text-white/80 text-lg mt-4 mb-6">
                        {feature.description}
                      </motion.p>

                      <h4 className="text-lg font-medium text-white mb-4">Key Benefits</h4>
                      <ul className="space-y-3">
                        {feature.benefits.map((benefit, index) => (
                          <motion.li
                            key={index}
                            custom={index}
                            variants={benefitVariants}
                            whileHover="hover"
                            onHoverStart={() => setHoveredBenefit(index)}
                            onHoverEnd={() => setHoveredBenefit(null)}
                            className={cn(
                              "flex items-start p-3 rounded-lg transition-all duration-300",
                              hoveredBenefit === index ? getColorClass(feature.color, "bg", 5) : "",
                            )}
                          >
                            <div
                              className={cn(
                                "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3",
                                getColorClass(feature.color, "bg", 10),
                              )}
                            >
                              <span
                                className={cn(
                                  "inline-block w-1.5 h-1.5 rounded-full",
                                  getColorClass(feature.color, "bg"),
                                )}
                              ></span>
                            </div>
                            <span className="text-white/80">{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <motion.div
                      variants={itemVariants}
                      className={cn(
                        "w-full md:w-2/5 bg-background/20 border rounded-lg p-6 h-full",
                        getColorClass(feature.color, "border", 10),
                      )}
                    >
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-4">
                          <h4 className="text-lg font-medium text-white">Key Metrics</h4>
                          <div className="grid grid-cols-3 gap-4">
                            {feature.stats.map((stat, index) => (
                              <motion.div
                                key={index}
                                custom={index}
                                variants={statVariants}
                                whileHover="hover"
                                className="text-center"
                              >
                                <div className={cn("text-xl font-bold", getColorClass(feature.color, "text"))}>
                                  {stat.value}
                                </div>
                                <div className="text-xs text-white/60">{stat.label}</div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-medium text-white">Activity</h4>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-white/70">Last 24 hours</span>
                              <span className={cn("font-medium", getColorClass(feature.color, "text"))}>
                                +{Math.floor(Math.random() * 100)}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                className={getColorClass(feature.color, "bg")}
                                initial={{ width: 0, height: "100%" }}
                                animate={{ width: `${Math.floor(Math.random() * 60) + 40}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              ></motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex justify-center mt-8">
                    <Button
                      className={cn(
                        "relative overflow-hidden group px-6 py-2 text-base border",
                        getColorClass(feature.color, "bg", 20),
                        getColorClass(feature.color, "text"),
                        getColorClass(feature.color, "border", 30),
                        `hover:${getColorClass(feature.color, "bg", 30)}`,
                      )}
                      onClick={() => (window.location.href = `/${feature.id}`)}
                    >
                      <span className="relative z-10 flex items-center">
                        Explore {feature.title}
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                          className="ml-2"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </span>
                      <span
                        className={cn(
                          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                          getColorClass(feature.color, "bg", 10),
                        )}
                      ></span>
                    </Button>
                  </motion.div>
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  )
}
