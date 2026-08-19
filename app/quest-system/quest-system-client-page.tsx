"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Trophy,
  Star,
  Search,
  Filter,
  ChevronDown,
  Plus,
  Clock,
  Users,
  Gift,
  ArrowRight,
  MessageSquare,
  ThumbsUp,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useWeb3 } from "@/components/providers/web3-provider"
import CreateQuestModal from "@/components/quest-system/create-quest-modal"
import QuestWheel from "@/components/quest-wheel"
import EcosystemPageLayout from "@/components/layout/ecosystem-page-layout"
import HorizontalCardGrid from "@/components/ui/horizontal-card-grid"

type QuestType = "all" | "active" | "completed" | "locked"
type QuestCategory = "all" | "onboarding" | "prediction" | "token" | "governance" | "community"

interface Quest {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "special" | "achievement" | "onboarding"
  category: QuestCategory
  reward: {
    ppt: number
    xp: number
  }
  progress: number
  total: number
  timeLeft?: string
  completed: boolean
  locked: boolean
  participants: number
  backgroundColor?: string
}

export default function QuestSystemClientPage() {
  const { connected } = useWeb3()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<QuestType>("all")
  const [activeCategory, setActiveCategory] = useState<QuestCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [quests, setQuests] = useState<Quest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load quests
  useEffect(() => {
    const loadQuests = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockQuests: Quest[] = [
        {
          id: "1",
          title: "Complete Your Profile",
          description: "Fill out all profile fields and set up your avatar to establish your identity.",
          type: "onboarding",
          category: "onboarding",
          reward: {
            ppt: 50,
            xp: 100,
          },
          progress: 3,
          total: 5,
          completed: false,
          locked: false,
          participants: 1245,
          backgroundColor: "#047857",
        },
        {
          id: "2",
          title: "Create Your First Prediction",
          description: "Create a prediction market with at least 100 PPT staked to learn the platform.",
          type: "onboarding",
          category: "prediction",
          reward: {
            ppt: 100,
            xp: 200,
          },
          progress: 0,
          total: 1,
          completed: false,
          locked: false,
          participants: 876,
          backgroundColor: "#7e22ce",
        },
        {
          id: "3",
          title: "Participate in 5 Predictions",
          description: "Join and stake in at least 5 different prediction markets to earn rewards.",
          type: "weekly",
          category: "prediction",
          reward: {
            ppt: 250,
            xp: 500,
          },
          progress: 2,
          total: 5,
          timeLeft: "3 days",
          completed: false,
          locked: false,
          participants: 543,
          backgroundColor: "#7e22ce",
        },
        {
          id: "4",
          title: "Pitch a Token Idea",
          description: "Create a token simulation and receive at least 10 community ratings.",
          type: "special",
          category: "token",
          reward: {
            ppt: 300,
            xp: 750,
          },
          progress: 0,
          total: 1,
          completed: false,
          locked: false,
          participants: 321,
          backgroundColor: "#10b981",
        },
        {
          id: "5",
          title: "Vote on 3 Governance Proposals",
          description: "Participate in platform governance by voting on active proposals.",
          type: "weekly",
          category: "governance",
          reward: {
            ppt: 150,
            xp: 300,
          },
          progress: 1,
          total: 3,
          timeLeft: "5 days",
          completed: false,
          locked: false,
          participants: 987,
          backgroundColor: "#eab308",
        },
        {
          id: "6",
          title: "Invite 3 Friends",
          description: "Invite friends to join Peculia and earn rewards when they sign up.",
          type: "special",
          category: "community",
          reward: {
            ppt: 200,
            xp: 400,
          },
          progress: 1,
          total: 3,
          completed: false,
          locked: false,
          participants: 654,
          backgroundColor: "#ec4899",
        },
        {
          id: "7",
          title: "Achieve 1000 XP",
          description: "Reach 1000 XP to unlock advanced platform features and higher rewards.",
          type: "achievement",
          category: "onboarding",
          reward: {
            ppt: 500,
            xp: 0,
          },
          progress: 450,
          total: 1000,
          completed: false,
          locked: false,
          participants: 432,
          backgroundColor: "#047857",
        },
        {
          id: "8",
          title: "Stake 1000 PPT in Token Pitches",
          description: "Stake a total of 1000 PPT across different token pitches.",
          type: "achievement",
          category: "token",
          reward: {
            ppt: 200,
            xp: 500,
          },
          progress: 0,
          total: 1000,
          completed: false,
          locked: true,
          participants: 210,
          backgroundColor: "#10b981",
        },
      ]

      setQuests(mockQuests)
      setIsLoading(false)
    }

    loadQuests()
  }, [])

  // Filter quests based on active tab, category, and search query
  const filteredQuests = quests.filter((quest) => {
    // Filter by type
    if (activeTab === "completed" && !quest.completed) return false
    if (activeTab === "active" && (quest.completed || quest.locked)) return false
    if (activeTab === "locked" && !quest.locked) return false

    // Filter by category
    if (activeCategory !== "all" && quest.category !== activeCategory) return false

    // Filter by search query
    if (searchQuery && !quest.title.toLowerCase().includes(searchQuery.toLowerCase())) return false

    return true
  })

  const getCategoryColor = (category: QuestCategory) => {
    switch (category) {
      case "onboarding":
        return "bg-blue-500/20 text-blue-500"
      case "prediction":
        return "bg-purple-500/20 text-purple-500"
      case "token":
        return "bg-green-500/20 text-green-500"
      case "governance":
        return "bg-yellow-500/20 text-yellow-500"
      case "community":
        return "bg-pink-500/20 text-pink-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  return (
    <EcosystemPageLayout
      title="Quest System"
      description="Complete gamified missions to earn XP, PPT rewards, and unlock governance tiers. Our quest system makes blockchain interactions fun and rewarding."
      icon={<Trophy className="h-6 w-6" />}
      particleColor="#3b82f6"
    >
      {/* How It Works Content */}
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-1">
            <span className="text-blue-500 font-bold">1</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Browse Available Quests</h3>
            <p className="text-white/70">
              Explore daily, weekly, and special quests across different categories to find missions that match your
              interests.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-1">
            <span className="text-blue-500 font-bold">2</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Complete Quest Objectives</h3>
            <p className="text-white/70">
              Follow the quest instructions to complete objectives. Your progress is tracked automatically on-chain.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3 mt-1">
            <span className="text-blue-500 font-bold">3</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Claim Your Rewards</h3>
            <p className="text-white/70">
              Once completed, claim your PPT tokens and XP. Accumulate XP to level up and unlock governance tiers.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border border-blue-500/30 px-6 py-2 text-base"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Custom Quest
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
              className="ml-2"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>
      </div>

      {/* Quest Wheel Section */}
      <section className="py-12 bg-background/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4 font-mono">Quest Wheel</h2>
            <p className="text-lg text-white/80">
              Spin the wheel to discover random quests with bonus rewards. Each spin costs 50 PPT.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <QuestWheel />
          </div>
        </div>
      </section>

      {/* Available Quests Section */}
      <HorizontalCardGrid
        title="Available Quests"
        description="Complete quests to earn PPT tokens and XP. Level up to unlock higher tier quests and governance privileges."
        action={
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search quests..."
                className="pl-10 border-blue-500/20 bg-background/50 text-white placeholder:text-white/40 w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-blue-500/20 text-white hover:bg-blue-500/10">
                  <Filter className="h-4 w-4 mr-2" />
                  Category
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border-blue-500/20">
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "all" ? "bg-blue-500/10" : ""}`}
                  onClick={() => setActiveCategory("all")}
                >
                  All Categories
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "onboarding" ? "bg-blue-500/10" : ""}`}
                  onClick={() => setActiveCategory("onboarding")}
                >
                  Onboarding
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "prediction" ? "bg-blue-500/10" : ""}`}
                  onClick={() => setActiveCategory("prediction")}
                >
                  Prediction
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "token" ? "bg-blue-500/10" : ""}`}
                  onClick={() => setActiveCategory("token")}
                >
                  Token
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "governance" ? "bg-blue-500/10" : ""}`}
                  onClick={() => setActiveCategory("governance")}
                >
                  Governance
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "community" ? "bg-blue-500/10" : ""}`}
                  onClick={() => setActiveCategory("community")}
                >
                  Community
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      >
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as QuestType)} className="mb-8">
          <TabsList className="bg-background/20 border border-blue-500/20 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-500">
              All
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-500"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-500"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="locked"
              className="data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-500"
            >
              Locked
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-white/50 animate-pulse">Loading quests...</div>
          </div>
        ) : (
          <>
            {filteredQuests.length === 0 ? (
              <motion.div
                className="flex flex-col items-center justify-center h-64 bg-background/30 rounded-lg border border-blue-500/20 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Trophy className="h-12 w-12 text-blue-500/30 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No quests found</h3>
                <p className="text-white/60 text-center mb-6">
                  {searchQuery ? "No quests match your search criteria." : "There are no quests in this category yet."}
                </p>
                <Button
                  className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border border-blue-500/30"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create a Quest
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredQuests.map((quest, index) => (
                  <motion.div
                    key={quest.id}
                    className="p-4 border rounded-lg bg-background/50 backdrop-blur-sm"
                    style={{
                      borderColor: quest.locked ? "rgba(156, 163, 175, 0.2)" : "rgba(59, 130, 246, 0.2)",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      opacity: quest.locked ? 0.7 : 1,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: quest.locked ? 0.7 : 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{
                      y: quest.locked ? 0 : -5,
                      boxShadow: quest.locked ? "none" : "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
                      borderColor: quest.locked ? "rgba(156, 163, 175, 0.2)" : "rgba(59, 130, 246, 0.5)",
                    }}
                  >
                    <div className="flex items-start">
                      <div
                        className={`w-12 h-12 rounded-md ${
                          quest.completed
                            ? "bg-green-500/20 text-green-500"
                            : quest.locked
                              ? "bg-gray-500/20 text-gray-500"
                              : "bg-blue-500/20 text-blue-500"
                        } flex items-center justify-center mr-4`}
                      >
                        {quest.completed ? "✓" : quest.locked ? "🔒" : "🏆"}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-bold text-lg">{quest.title}</h3>

                          <div className="flex items-center space-x-2">
                            <Badge className={`${getCategoryColor(quest.category)} border-none text-xs`}>
                              {quest.category.charAt(0).toUpperCase() + quest.category.slice(1)}
                            </Badge>

                            {quest.completed && (
                              <Badge className="bg-green-500/20 text-green-500 border-none text-xs">Completed</Badge>
                            )}

                            {quest.locked && (
                              <Badge className="bg-gray-500/20 text-gray-400 border-none text-xs">Locked</Badge>
                            )}

                            {quest.timeLeft && !quest.completed && !quest.locked && (
                              <div className="flex items-center text-xs text-white/60">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                {quest.timeLeft}
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-white/80 my-3">{quest.description}</p>

                        <div className="flex items-center mb-4">
                          <div className="flex items-center mr-6">
                            <Trophy className="h-4 w-4 text-yellow-500 mr-1.5" />
                            <span className="text-sm font-medium text-white">{quest.reward.ppt} PPT</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-blue-500 mr-1.5" />
                            <span className="text-sm font-medium text-white">{quest.reward.xp} XP</span>
                          </div>
                          <div className="flex items-center ml-6">
                            <Users className="h-4 w-4 text-white/60 mr-1.5" />
                            <span className="text-sm text-white/70">{quest.participants} participants</span>
                          </div>
                        </div>

                        {!quest.completed && !quest.locked && (
                          <div className="mt-2 mb-4">
                            <div className="flex justify-between text-xs text-white/60 mb-1">
                              <span>Progress</span>
                              <span>
                                {quest.progress}/{quest.total}
                              </span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-blue-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(quest.progress / quest.total) * 100}%` }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
                              onClick={(e) => {
                                e.stopPropagation()
                                alert(`Liked quest: ${quest.title}`)
                              }}
                              disabled={quest.locked}
                            >
                              <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />
                              <span className="text-xs">Like</span>
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
                              onClick={(e) => {
                                e.stopPropagation()
                                alert(`Comment on quest: ${quest.title}`)
                              }}
                              disabled={quest.locked}
                            >
                              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                              <span className="text-xs">Comment</span>
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
                              onClick={(e) => {
                                e.stopPropagation()
                                alert(`Share quest: ${quest.title}`)
                              }}
                              disabled={quest.locked}
                            >
                              <Share2 className="h-3.5 w-3.5 mr-1.5" />
                              <span className="text-xs">Share</span>
                            </Button>
                          </div>

                          {quest.completed ? (
                            <Button
                              size="sm"
                              className="h-8 bg-green-500/20 text-green-500 hover:bg-green-500/30 border border-green-500/30"
                              onClick={() => {
                                alert(`Claimed reward: ${quest.reward.ppt} PPT`)
                              }}
                            >
                              <Gift className="h-4 w-4 mr-1.5" />
                              Claim Reward
                            </Button>
                          ) : quest.locked ? (
                            <Button
                              size="sm"
                              className="h-8 bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border border-gray-500/30"
                              disabled
                            >
                              <span className="text-xs">Locked</span>
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="h-8 bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border border-blue-500/30"
                              onClick={() => {
                                window.location.href = `/quest-system/view/${quest.id}`
                              }}
                            >
                              <span className="text-xs">Start Quest</span>
                              <ArrowRight className="h-3 w-3 ml-1.5" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </HorizontalCardGrid>

      {/* Leaderboard Section */}
      <section className="py-12 bg-background/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4 font-mono">Quest Leaderboard</h2>
            <p className="text-lg text-white/80">
              Top performers in the quest system. Complete more quests to climb the ranks.
            </p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto bg-background/20 border border-blue-500/20 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-4 bg-blue-500/10 border-b border-blue-500/20">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-1 text-white/70 text-sm font-medium">Rank</div>
                <div className="col-span-5 text-white/70 text-sm font-medium">User</div>
                <div className="col-span-2 text-white/70 text-sm font-medium text-center">XP</div>
                <div className="col-span-2 text-white/70 text-sm font-medium text-center">Quests</div>
                <div className="col-span-2 text-white/70 text-sm font-medium text-center">Level</div>
              </div>
            </div>

            <div className="divide-y divide-blue-500/10">
              {[
                {
                  rank: 1,
                  name: "CryptoExplorer",
                  avatar: "/placeholder.svg?height=40&width=40",
                  xp: 12500,
                  quests: 45,
                  level: 25,
                },
                {
                  rank: 2,
                  name: "BlockchainGuru",
                  avatar: "/placeholder.svg?height=40&width=40",
                  xp: 10800,
                  quests: 38,
                  level: 22,
                },
                {
                  rank: 3,
                  name: "TokenMaster",
                  avatar: "/placeholder.svg?height=40&width=40",
                  xp: 9200,
                  quests: 35,
                  level: 19,
                },
                {
                  rank: 4,
                  name: "PredictionPro",
                  avatar: "/placeholder.svg?height=40&width=40",
                  xp: 8500,
                  quests: 32,
                  level: 17,
                },
                {
                  rank: 5,
                  name: "QuestHunter",
                  avatar: "/placeholder.svg?height=40&width=40",
                  xp: 7800,
                  quests: 29,
                  level: 16,
                },
              ].map((user, index) => (
                <motion.div
                  key={index}
                  className="p-4 hover:bg-blue-500/5 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1 font-bold text-white">{user.rank}</div>
                    <div className="col-span-5">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-blue-500/20 text-blue-500 text-xs">
                            {user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-white">{user.name}</span>
                      </div>
                    </div>
                    <div className="col-span-2 text-center font-medium text-white">{user.xp.toLocaleString()}</div>
                    <div className="col-span-2 text-center text-white">{user.quests}</div>
                    <div className="col-span-2 text-center">
                      <Badge className="bg-blue-500/20 text-blue-500 border-none">Level {user.level}</Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Create Quest Modal */}
      <CreateQuestModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </EcosystemPageLayout>
  )
}
