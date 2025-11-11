"use client"

import React, { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  TrendingUp,
  Users,
  Shield,
  Zap,
  Target,
  Award,
  BarChart3,
  Coins,
  Trophy,
  Vote,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Brain,
  Globe,
  Lock,
} from "lucide-react"
import { SectionHeader } from "@/components/ui/section-header"

interface EcosystemFeature {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  stats: Array<{
    label: string
    value: string
    icon: React.ReactNode
  }>
  benefits: Array<{
    title: string
    description: string
    icon: React.ReactNode
  }>
  features: string[]
}

const ecosystemFeatures: EcosystemFeature[] = [
  {
    id: "prediction-markets",
    title: "Prediction Markets",
    description:
      "Create and participate in decentralized prediction markets with AI-powered insights and real-time settlement.",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "emerald",
    stats: [
      { label: "Active Markets", value: "2,847", icon: <BarChart3 className="w-4 h-4" /> },
      { label: "Total Volume", value: "$12.4M", icon: <Coins className="w-4 h-4" /> },
      { label: "Accuracy Rate", value: "94.2%", icon: <Target className="w-4 h-4" /> },
      { label: "Participants", value: "18,392", icon: <Users className="w-4 h-4" /> },
    ],
    benefits: [
      {
        title: "AI-Powered Odds",
        description: "Get real-time odds calculated by our AI swarm intelligence system",
        icon: <Brain className="w-5 h-5" />,
      },
      {
        title: "Instant Settlement",
        description: "Automated settlement through decentralized oracle networks",
        icon: <Zap className="w-5 h-5" />,
      },
      {
        title: "Global Markets",
        description: "Access prediction markets from around the world",
        icon: <Globe className="w-5 h-5" />,
      },
      {
        title: "Secure Trading",
        description: "Trade with confidence using our battle-tested smart contracts",
        icon: <Shield className="w-5 h-5" />,
      },
    ],
    features: [
      "Create public and private prediction markets",
      "AI-generated odds based on real-time data analysis",
      "Automated settlement via AI swarm verification",
      "IPFS-based immutable proof of outcomes",
      "Cross-chain compatibility for maximum reach",
    ],
  },
  {
    id: "token-pitching",
    title: "Token Pitching",
    description:
      "Pitch and evaluate tokens in a risk-free environment with AI-powered analysis and community feedback.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "blue",
    stats: [
      { label: "Tokens Pitched", value: "1,234", icon: <Sparkles className="w-4 h-4" /> },
      { label: "Success Rate", value: "78.5%", icon: <TrendingUp className="w-4 h-4" /> },
      { label: "AI Accuracy", value: "91.3%", icon: <Brain className="w-4 h-4" /> },
      { label: "Community Votes", value: "45,678", icon: <Vote className="w-4 h-4" /> },
    ],
    benefits: [
      {
        title: "Risk-Free Testing",
        description: "Test your token concepts without financial risk",
        icon: <Shield className="w-5 h-5" />,
      },
      {
        title: "AI Analysis",
        description: "Get detailed AI-powered feedback on your token pitch",
        icon: <Brain className="w-5 h-5" />,
      },
      {
        title: "Community Feedback",
        description: "Receive valuable insights from the crypto community",
        icon: <Users className="w-5 h-5" />,
      },
      {
        title: "Performance Tracking",
        description: "Monitor your pitch performance across multiple metrics",
        icon: <BarChart3 className="w-5 h-5" />,
      },
    ],
    features: [
      "Risk-free token simulation environment",
      "AI-powered pitch analysis and feedback",
      "Community voting and reputation system",
      "Multi-chain performance tracking",
      "Detailed analytics and insights dashboard",
    ],
  },
  {
    id: "quest-system",
    title: "Quest System",
    description: "Complete gamified missions to earn rewards, unlock features, and climb the governance ladder.",
    icon: <Trophy className="w-6 h-6" />,
    color: "purple",
    stats: [
      { label: "Active Quests", value: "156", icon: <Trophy className="w-4 h-4" /> },
      { label: "Completed", value: "8,923", icon: <CheckCircle className="w-4 h-4" /> },
      { label: "Rewards Paid", value: "2.1M PPT", icon: <Award className="w-4 h-4" /> },
      { label: "Participants", value: "12,456", icon: <Users className="w-4 h-4" /> },
    ],
    benefits: [
      {
        title: "Gamified Learning",
        description: "Learn blockchain concepts through engaging quests",
        icon: <Trophy className="w-5 h-5" />,
      },
      {
        title: "Token Rewards",
        description: "Earn PPT tokens and XP for completing missions",
        icon: <Award className="w-5 h-5" />,
      },
      {
        title: "Skill Progression",
        description: "Unlock new abilities and governance tiers",
        icon: <TrendingUp className="w-5 h-5" />,
      },
      {
        title: "Community Challenges",
        description: "Participate in collaborative community missions",
        icon: <Users className="w-5 h-5" />,
      },
    ],
    features: [
      "Gamified blockchain missions and challenges",
      "XP and PPT token reward system",
      "Unlockable governance tiers and privileges",
      "Skill-based progression and achievements",
      "Collaborative community quest campaigns",
    ],
  },
  {
    id: "quadratic-governance",
    title: "Quadratic Governance",
    description: "Participate in fair, democratic governance using quadratic voting to prevent whale dominance.",
    icon: <Vote className="w-6 h-6" />,
    color: "amber",
    stats: [
      { label: "Active Proposals", value: "23", icon: <Vote className="w-4 h-4" /> },
      { label: "Total Votes", value: "156,789", icon: <CheckCircle className="w-4 h-4" /> },
      { label: "Participation", value: "67.8%", icon: <Users className="w-4 h-4" /> },
      { label: "Decisions Made", value: "342", icon: <Award className="w-4 h-4" /> },
    ],
    benefits: [
      {
        title: "Democratic Voting",
        description: "Fair voting system that prevents whale manipulation",
        icon: <Vote className="w-5 h-5" />,
      },
      {
        title: "Transparent Process",
        description: "All votes and decisions recorded on-chain",
        icon: <Globe className="w-5 h-5" />,
      },
      {
        title: "Community Power",
        description: "Every voice matters in platform governance",
        icon: <Users className="w-5 h-5" />,
      },
      {
        title: "Secure Voting",
        description: "Cryptographically secure voting mechanisms",
        icon: <Lock className="w-5 h-5" />,
      },
    ],
    features: [
      "Square root voting mechanism for fairness",
      "Prevents whale dominance in governance",
      "Transparent on-chain voting records",
      "Democratic decision making process",
      "Community-driven platform evolution",
    ],
  },
]

const getColorClasses = (color: string) => {
  const colorMap = {
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
      hover: "hover:bg-emerald-500/20",
      glow: "shadow-emerald-500/20",
    },
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      text: "text-blue-400",
      hover: "hover:bg-blue-500/20",
      glow: "shadow-blue-500/20",
    },
    purple: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      text: "text-purple-400",
      hover: "hover:bg-purple-500/20",
      glow: "shadow-purple-500/20",
    },
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      text: "text-amber-400",
      hover: "hover:bg-amber-500/20",
      glow: "shadow-amber-500/20",
    },
  }
  return colorMap[color as keyof typeof colorMap] || colorMap.emerald
}

const FloatingParticles = React.memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 8 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-white/20 rounded-full"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        animate={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
    ))}
  </div>
))

FloatingParticles.displayName = "FloatingParticles"

const StatCard = React.memo(({ stat, color }: { stat: any; color: string }) => {
  const colorClasses = getColorClasses(color)

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${colorClasses.bg} ${colorClasses.border} border rounded-lg p-3 sm:p-4 text-center transition-all duration-200`}
    >
      <div className={`${colorClasses.text} mb-2 flex justify-center`}>{stat.icon}</div>
      <div className="text-lg sm:text-xl font-bold text-white mb-1">{stat.value}</div>
      <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
    </motion.div>
  )
})

StatCard.displayName = "StatCard"

const BenefitsList = React.memo(({ benefits, color }: { benefits: any[]; color: string }) => {
  const colorClasses = getColorClasses(color)

  return (
    <div className="space-y-3 sm:space-y-4">
      {benefits.map((benefit, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex items-start space-x-3 p-3 sm:p-4 rounded-lg ${colorClasses.bg} ${colorClasses.border} border transition-all duration-200 hover:scale-105`}
        >
          <div className={`${colorClasses.text} mt-1 flex-shrink-0`}>{benefit.icon}</div>
          <div>
            <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">{benefit.title}</h4>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{benefit.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
})

BenefitsList.displayName = "BenefitsList"

const FeatureContent = React.memo(({ feature }: { feature: EcosystemFeature }) => {
  const colorClasses = getColorClasses(feature.color)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
    >
      {/* Left Column - Stats and Features */}
      <div className="space-y-6">
        {/* Stats Grid */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Key Metrics
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {feature.stats.map((stat, index) => (
              <StatCard key={index} stat={stat} color={feature.color} />
            ))}
          </div>
        </div>

        {/* Features List */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Core Features
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {feature.features.map((featureItem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <CheckCircle className={`w-4 h-4 ${colorClasses.text} mt-1 flex-shrink-0`} />
                <span className="text-gray-300 text-sm sm:text-base leading-relaxed">{featureItem}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Benefits */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2" />
          Key Benefits
        </h3>
        <BenefitsList benefits={feature.benefits} color={feature.color} />
      </div>
    </motion.div>
  )
})

FeatureContent.displayName = "FeatureContent"

export default function EcosystemSection() {
  const [activeTab, setActiveTab] = useState("prediction-markets")
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const activeFeature = useMemo(
    () => ecosystemFeatures.find((f) => f.id === activeTab) || ecosystemFeatures[0],
    [activeTab],
  )

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value)
  }, [])

  const handleTabKeyDown = useCallback((event: React.KeyboardEvent, value: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setActiveTab(value)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-black overflow-hidden"
      role="region"
      aria-labelledby="ecosystem-heading"
    >
      {/* Background Effects */}
      {isInView && <FloatingParticles />}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Platform Features"
          badgeIcon={<Sparkles className="h-4 w-4" />}
          title="Peculia Ecosystem"
          description="Our platform combines prediction markets, token evaluation, quests, and governance into a seamless ecosystem powered by AI and blockchain technology."
        />

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          {/* Tab Navigation */}
          <TabsList
            className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-8 sm:mb-12 bg-transparent p-0 h-auto"
            role="tablist"
            aria-label="Ecosystem features"
          >
            {ecosystemFeatures.map((feature) => {
              const colorClasses = getColorClasses(feature.color)
              const isActive = activeTab === feature.id

              return (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${feature.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onKeyDown={(e) => handleTabKeyDown(e, feature.id)}
                  className={`
                    flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 
                    rounded-lg border transition-all duration-300 min-h-[80px] sm:min-h-[100px]
                    ${
                      isActive
                        ? `${colorClasses.bg} ${colorClasses.border} ${colorClasses.text} shadow-lg ${colorClasses.glow}`
                        : "bg-gray-900/50 border-gray-700 text-gray-400 hover:bg-gray-800/50 hover:border-gray-600"
                    }
                    data-[state=active]:bg-transparent
                  `}
                >
                  <div className="mb-2 transition-transform duration-200 group-hover:scale-110">{feature.icon}</div>
                  <span className="text-xs sm:text-sm font-medium text-center leading-tight">{feature.title}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {ecosystemFeatures.map((feature) => (
              <TabsContent
                key={feature.id}
                value={feature.id}
                role="tabpanel"
                id={`panel-${feature.id}`}
                aria-labelledby={`tab-${feature.id}`}
                className="mt-0 focus:outline-none"
              >
                {activeTab === feature.id && (
                  <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
                    <CardContent className="p-4 sm:p-6 md:p-8">
                      {/* Feature Header */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-center mb-6 sm:mb-8"
                      >
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full ${getColorClasses(feature.color).bg} ${getColorClasses(feature.color).border} border mb-4`}
                        >
                          <div className={`${getColorClasses(feature.color).text} scale-125`}>{feature.icon}</div>
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">{feature.title}</h3>
                        <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                          {feature.description}
                        </p>
                      </motion.div>

                      {/* Feature Content */}
                      <FeatureContent feature={feature} />

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="text-center mt-6 sm:mt-8"
                      >
                        <Button
                          className={`${getColorClasses(feature.color).bg} ${getColorClasses(feature.color).text} ${getColorClasses(feature.color).hover} border ${getColorClasses(feature.color).border} px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 hover:scale-105`}
                          aria-label={`Explore ${feature.title}`}
                        >
                          Explore {feature.title}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  )
}
