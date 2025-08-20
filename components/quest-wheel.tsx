"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Check, Lock, Star, Trophy, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWeb3 } from "@/components/providers/web3-provider"
import ParticleBackground from "@/components/ui/particle-background"

interface Quest {
  id: string
  title: string
  description: string
  reward: {
    ppt: number
    xp: number
  }
  progress: number
  total: number
  completed: boolean
  locked: boolean
  tier: number
  badge?: string
}

export default function QuestWheel() {
  const { connected, pptBalance } = useWeb3()
  const [quests, setQuests] = useState<Quest[]>([])
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null)
  const [selectedTier, setSelectedTier] = useState(1)
  const [userLevel, setUserLevel] = useState(1)
  const [userXP, setUserXP] = useState(0)
  const wheelRef = useRef<HTMLDivElement>(null)
  const [wheelRotation, setWheelRotation] = useState(0)

  // Load quests
  useEffect(() => {
    // Mock quests data
    const mockQuests: Quest[] = [
      {
        id: "1",
        title: "Early Bird",
        description: "Connect your wallet and claim your first PPT tokens",
        reward: { ppt: 100, xp: 50 },
        progress: 1,
        total: 1,
        completed: connected,
        locked: false,
        tier: 1,
        badge: "🐦",
      },
      {
        id: "2",
        title: "Prediction Novice",
        description: "Create your first prediction market",
        reward: { ppt: 200, xp: 100 },
        progress: 0,
        total: 1,
        completed: false,
        locked: false,
        tier: 1,
        badge: "🔮",
      },
      {
        id: "3",
        title: "Token Designer",
        description: "Simulate a token with a score above 80",
        reward: { ppt: 300, xp: 150 },
        progress: 0,
        total: 1,
        completed: false,
        locked: false,
        tier: 1,
        badge: "🎨",
      },
      {
        id: "4",
        title: "Multi-Chain Explorer",
        description: "Connect wallets from 3 different blockchains",
        reward: { ppt: 500, xp: 250 },
        progress: connected ? 1 : 0,
        total: 3,
        completed: false,
        locked: false,
        tier: 2,
        badge: "🌉",
      },
      {
        id: "5",
        title: "Governance Participant",
        description: "Cast your first quadratic vote",
        reward: { ppt: 400, xp: 200 },
        progress: 0,
        total: 1,
        completed: false,
        locked: false,
        tier: 2,
        badge: "🏛️",
      },
      {
        id: "6",
        title: "Prediction Master",
        description: "Win 5 prediction markets",
        reward: { ppt: 1000, xp: 500 },
        progress: 0,
        total: 5,
        completed: false,
        locked: true,
        tier: 3,
        badge: "🧙",
      },
      {
        id: "7",
        title: "Token Guru",
        description: "Achieve a reputation score of 50+",
        reward: { ppt: 1500, xp: 750 },
        progress: 0,
        total: 50,
        completed: false,
        locked: true,
        tier: 3,
        badge: "🧠",
      },
      {
        id: "8",
        title: "Community Leader",
        description: "Have 10 users follow your predictions",
        reward: { ppt: 2000, xp: 1000 },
        progress: 0,
        total: 10,
        completed: false,
        locked: true,
        tier: 4,
        badge: "👑",
      },
    ]

    setQuests(mockQuests)

    // Set first quest as active
    if (mockQuests.length > 0) {
      setActiveQuest(mockQuests[0])
    }
  }, [connected])

  // Calculate user level based on XP
  useEffect(() => {
    const level = Math.floor(Math.sqrt(userXP / 100)) + 1
    setUserLevel(level)
  }, [userXP])

  // Rotate wheel when selected tier changes
  useEffect(() => {
    const rotation = (selectedTier - 1) * -90
    setWheelRotation(rotation)
  }, [selectedTier])

  const claimReward = (quest: Quest) => {
    if (!connected || !quest.completed) return

    // Update quests
    setQuests(
      quests.map((q) => {
        if (q.id === quest.id) {
          return { ...q, completed: false }
        }
        return q
      }),
    )

    // Update XP
    setUserXP((prev) => prev + quest.reward.xp)

    // Show notification
    alert(`Claimed ${quest.reward.ppt} PPT and ${quest.reward.xp} XP!`)
  }

  const getQuestsByTier = (tier: number) => {
    return quests.filter((quest) => quest.tier === tier)
  }

  const getXpForNextLevel = () => {
    return (userLevel + 1) * (userLevel + 1) * 100 - userXP
  }

  const getXpProgress = () => {
    const currentLevelXp = userLevel * userLevel * 100
    const nextLevelXp = (userLevel + 1) * (userLevel + 1) * 100
    return ((userXP - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100
  }

  return (
    <div className="flex flex-col space-y-6 p-6 bg-background/30 rounded-lg border border-green-500/20 shadow-sm w-full relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleBackground color="#10b981" count={50} glowIntensity={0.4} />
      </div>

      <div className="flex justify-between items-center relative z-10">
        <h2 className="text-lg font-medium text-white">Quest System</h2>
        <div className="flex items-center space-x-2">
          <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
            <Star className="h-3 w-3 mr-1" />
            Level {userLevel}
          </Badge>
          <motion.span
            className="text-xs text-green-500 animate-count"
            key={userXP}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {userXP} XP
          </motion.span>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-2 relative z-10">
        <div className="w-full h-1.5 bg-background/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-500/60"
            initial={{ width: 0 }}
            animate={{ width: `${getXpProgress()}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="text-xs text-white/50 w-full flex justify-between">
          <span>Level {userLevel}</span>
          <span>
            {getXpForNextLevel()} XP to Level {userLevel + 1}
          </span>
        </div>
      </div>

      <div className="relative h-64 w-full overflow-hidden">
        <motion.div
          ref={wheelRef}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
          animate={{ rotate: wheelRotation }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          {[1, 2, 3, 4].map((tier) => (
            <div
              key={tier}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              style={{ transform: `rotate(${(tier - 1) * 90}deg)` }}
            >
              <motion.div
                className={`absolute top-0 w-24 h-24 rounded-full flex items-center justify-center 
                  ${selectedTier === tier ? "bg-green-500/20 border-2 border-green-500/60 green-glow" : "bg-background/30 border border-white/20"} 
                  transition-all duration-300 cursor-pointer`}
                style={{ transform: `translateY(-5rem)` }}
                onClick={() => setSelectedTier(tier)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <div className="text-xs text-white/70">Tier {tier}</div>
                  <div className="text-lg font-bold text-white">
                    {getQuestsByTier(tier).filter((q) => q.completed).length}/{getQuestsByTier(tier).length}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}

          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <motion.div
              className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center green-pulse"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(16, 185, 129, 0)",
                  "0 0 0 10px rgba(16, 185, 129, 0.2)",
                  "0 0 0 0 rgba(16, 185, 129, 0)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="text-center">
                <div className="text-xs text-white/70">Quests</div>
                <div className="text-lg font-bold text-white">
                  {quests.filter((q) => q.completed).length}/{quests.length}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="space-y-4 relative z-10">
        <h3 className="text-sm font-medium text-white">Tier {selectedTier} Quests</h3>

        <div className="space-y-3">
          {getQuestsByTier(selectedTier).map((quest) => (
            <motion.div
              key={quest.id}
              className={`p-3 border rounded-md ${
                quest.completed
                  ? "border-green-500/40 bg-green-500/10"
                  : quest.locked
                    ? "border-white/20 bg-background/30 opacity-70"
                    : "border-white/20 bg-background/40"
              }`}
              onClick={() => setActiveQuest(quest)}
              whileHover={{
                y: -2,
                boxShadow: quest.completed
                  ? "0 5px 15px rgba(16, 185, 129, 0.2)"
                  : "0 5px 15px rgba(255, 255, 255, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      quest.completed
                        ? "bg-green-500/20 text-green-500"
                        : quest.locked
                          ? "bg-white/5 text-white/30"
                          : "bg-white/10 text-white/60"
                    }`}
                  >
                    {quest.completed ? (
                      <Check className="h-4 w-4" />
                    ) : quest.locked ? (
                      <Lock className="h-4 w-4" />
                    ) : quest.badge ? (
                      <span>{quest.badge}</span>
                    ) : (
                      <Trophy className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h4 className="text-sm font-medium text-white">{quest.title}</h4>
                      {quest.locked && (
                        <Badge variant="outline" className="ml-2 text-[10px] py-0 h-4 border-white/30 text-white/60">
                          Locked
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-white/50 mt-0.5">{quest.description}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center text-xs text-white/70">
                    <Trophy className="h-3 w-3 mr-1" />
                    <span>{quest.reward.ppt} PPT</span>
                  </div>
                  <div className="flex items-center text-xs text-white/70 mt-0.5">
                    <Star className="h-3 w-3 mr-1" />
                    <span>{quest.reward.xp} XP</span>
                  </div>
                </div>
              </div>

              {!quest.completed && !quest.locked && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-white/50 mb-1">
                    <span>Progress</span>
                    <span>
                      {quest.progress}/{quest.total}
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-green-500/60"
                      initial={{ width: 0 }}
                      animate={{ width: `${(quest.progress / quest.total) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}

              {quest.completed && (
                <div className="mt-2 flex justify-end">
                  <Button
                    size="sm"
                    onClick={() => claimReward(quest)}
                    className="h-7 text-xs bg-green-500/20 text-green-500 hover:bg-green-500/30 border border-green-500/30"
                  >
                    <Gift className="h-3 w-3 mr-1" />
                    Claim Reward
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
