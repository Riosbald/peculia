"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Trophy,
  Users,
  Share2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Coins,
  History,
  Eye,
  CheckSquare,
  Lock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useWeb3 } from "@/components/providers/web3-provider"
import { useMobile } from "@/hooks/use-mobile"

interface QuestDetailClientPageProps {
  id: string
}

interface QuestStep {
  id: string
  title: string
  description: string
  completed: boolean
  reward?: number
}

interface QuestParticipant {
  id: string
  name: string
  avatar?: string
  progress: number
  completedAt?: string
}

interface QuestDetail {
  id: string
  title: string
  description: string
  category: "beginner" | "intermediate" | "advanced" | "special"
  difficulty: "easy" | "medium" | "hard" | "expert"
  totalReward: number
  creator: {
    id: string
    name: string
    avatar?: string
  }
  status: "active" | "completed" | "expired"
  startDate: string
  endDate: string
  participants: QuestParticipant[]
  steps: QuestStep[]
  completionRate: number
  tags: string[]
  backgroundColor: string
}

export default function QuestDetailClientPage({ id }: QuestDetailClientPageProps) {
  const { connected, address } = useWeb3()
  const [quest, setQuest] = useState<QuestDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState("overview")
  const [userProgress, setUserProgress] = useState(0)
  const isMobile = useMobile()

  useEffect(() => {
    const fetchQuest = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on the ID
      const mockQuests: Record<string, QuestDetail> = {
        "1": {
          id: "1",
          title: "Early Bird: Connect Wallet & Claim First PPT",
          description:
            "Welcome to Peculia! Complete this beginner quest to get started with our platform. Connect your wallet, claim your first PPT tokens, and learn the basics of our ecosystem.",
          category: "beginner",
          difficulty: "easy",
          totalReward: 100,
          creator: {
            id: "creator1",
            name: "QuestMaster",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          status: "active",
          startDate: "January 1, 2024",
          endDate: "December 31, 2024",
          participants: [
            {
              id: "p1",
              name: "NewUser42",
              avatar: "/placeholder.svg?height=40&width=40",
              progress: 100,
              completedAt: "45 minutes ago",
            },
            {
              id: "p2",
              name: "BlockchainBeginner",
              avatar: "/placeholder.svg?height=40&width=40",
              progress: 66,
            },
            {
              id: "p3",
              name: "CryptoNewbie",
              avatar: "/placeholder.svg?height=40&width=40",
              progress: 33,
            },
          ],
          steps: [
            {
              id: "s1",
              title: "Connect Your Wallet",
              description: "Connect your Ethereum wallet to the Peculia platform.",
              completed: true,
              reward: 20,
            },
            {
              id: "s2",
              title: "Claim Your First PPT Tokens",
              description: "Claim your first 50 PPT tokens from the faucet.",
              completed: false,
              reward: 30,
            },
            {
              id: "s3",
              title: "Visit the Prediction Markets Page",
              description: "Explore the prediction markets page to learn how it works.",
              completed: false,
              reward: 50,
            },
          ],
          completionRate: 42,
          tags: ["beginner", "onboarding", "wallet", "tokens"],
          backgroundColor: "#8b5cf6",
        },
        "2": {
          id: "2",
          title: "Community Builder: Invite Friends to Peculia",
          description:
            "Help grow the Peculia community by inviting friends to join the platform. The more friends you invite, the more rewards you'll earn!",
          category: "intermediate",
          difficulty: "medium",
          totalReward: 250,
          creator: {
            id: "creator1",
            name: "QuestMaster",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          status: "active",
          startDate: "January 15, 2024",
          endDate: "December 31, 2024",
          participants: [
            {
              id: "p4",
              name: "SocialButterfly",
              avatar: "/placeholder.svg?height=40&width=40",
              progress: 100,
              completedAt: "2 days ago",
            },
            {
              id: "p5",
              name: "NetworkKing",
              avatar: "/placeholder.svg?height=40&width=40",
              progress: 80,
            },
            {
              id: "p6",
              name: "CommunityChampion",
              avatar: "/placeholder.svg?height=40&width=40",
              progress: 60,
            },
            {
              id: "p7",
              name: "Influencer101",
              avatar: "/placeholder.svg?height=40&width=40",
              progress: 40,
            },
          ],
          steps: [
            {
              id: "s4",
              title: "Generate Your Referral Link",
              description: "Generate a unique referral link that you can share with friends.",
              completed: false,
              reward: 50,
            },
            {
              id: "s5",
              title: "Invite 3 Friends",
              description: "Have 3 friends sign up using your referral link.",
              completed: false,
              reward: 100,
            },
            {
              id: "s6",
              title: "Help a Friend Complete Their First Prediction",
              description: "Guide one of your referred friends to complete their first prediction.",
              completed: false,
              reward: 100,
            },
          ],
          completionRate: 35,
          tags: ["community", "referral", "growth", "social"],
          backgroundColor: "#10b981",
        },
      }

      // Get the quest based on the ID
      const questData = mockQuests[id]
      if (questData) {
        setQuest(questData)
        // Simulate user progress if connected
        if (connected) {
          const progress = Math.floor(Math.random() * 100)
          setUserProgress(progress)
        }
      }
      setIsLoading(false)
    }

    fetchQuest()
  }, [id, connected])

  const completeStep = (stepId: string) => {
    if (!quest) return

    // Update the quest steps
    const updatedSteps = quest.steps.map((step) => {
      if (step.id === stepId) {
        return { ...step, completed: true }
      }
      return step
    })

    // Calculate new progress
    const completedSteps = updatedSteps.filter((step) => step.completed).length
    const newProgress = Math.round((completedSteps / updatedSteps.length) * 100)

    // Update the quest
    setQuest({
      ...quest,
      steps: updatedSteps,
    })

    // Update user progress
    setUserProgress(newProgress)

    // Show completion message
    if (newProgress === 100) {
      alert("Congratulations! You've completed the quest and earned " + quest.totalReward + " PPT!")
    } else {
      const step = updatedSteps.find((s) => s.id === stepId)
      if (step && step.reward) {
        alert("Step completed! You've earned " + step.reward + " PPT!")
      }
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "beginner":
        return "bg-green-500/20 text-green-500"
      case "intermediate":
        return "bg-blue-500/20 text-blue-500"
      case "advanced":
        return "bg-purple-500/20 text-purple-500"
      case "special":
        return "bg-yellow-500/20 text-yellow-500"
      default:
        return "bg-white/20 text-white"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/20 text-green-500"
      case "medium":
        return "bg-yellow-500/20 text-yellow-500"
      case "hard":
        return "bg-orange-500/20 text-orange-500"
      case "expert":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-white/20 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-500"
      case "completed":
        return "bg-blue-500/20 text-blue-500"
      case "expired":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-white/20 text-white"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-3 w-3 mr-1" />
      case "completed":
        return <Info className="h-3 w-3 mr-1" />
      case "expired":
        return <XCircle className="h-3 w-3 mr-1" />
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-white/50 animate-pulse">Loading quest details...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!quest) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center items-center h-64">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Quest Not Found</h2>
            <p className="text-white/70 mb-6">The quest you're looking for doesn't exist or has been removed.</p>
            <Link href="/quest-system">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Quests
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href="/quest-system" className="hover:text-white transition-colors">
              Quests
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-white/90 truncate max-w-[200px]">{quest.title}</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href="/quest-system">
              <Button variant="ghost" size="sm" className="mr-2 -ml-2">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back</span>
              </Button>
            </Link>
            <Badge className={getCategoryColor(quest.category)}>{quest.category.toUpperCase()}</Badge>
            <Badge className={`ml-2 ${getDifficultyColor(quest.difficulty)}`}>{quest.difficulty.toUpperCase()}</Badge>
            <Badge className={`ml-2 ${getStatusColor(quest.status)}`}>
              {getStatusIcon(quest.status)}
              {quest.status.toUpperCase()}
            </Badge>
          </div>

          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {quest.title}
          </motion.h1>

          <p className="text-white/80 mb-6 max-w-3xl">{quest.description}</p>

          <div className="flex flex-wrap items-center text-sm text-white/70 mb-6">
            <div className="flex items-center mr-4 mb-2">
              <Trophy className="h-4 w-4 mr-1" />
              <span>{quest.totalReward} PPT Reward</span>
            </div>
            <div className="flex items-center mr-4 mb-2">
              <Users className="h-4 w-4 mr-1" />
              <span>{quest.participants.length} Participants</span>
            </div>
            <div className="flex items-center mr-4 mb-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>Started on {quest.startDate}</span>
            </div>
            <div className="flex items-center mb-2">
              <History className="h-4 w-4 mr-1" />
              <span>Ends on {quest.endDate}</span>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={quest.creator.avatar} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {quest.creator.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-white/70 text-sm">Created by </span>
              <span className="text-white font-medium">{quest.creator.name}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {quest.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-white/5 text-white/70 border-white/10">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Quest details */}
          <div className="lg:col-span-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
              <TabsList className="bg-[#0a0a0a] border border-white/10">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="steps"
                  className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
                >
                  Quest Steps
                </TabsTrigger>
                <TabsTrigger
                  value="leaderboard"
                  className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
                >
                  Leaderboard
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="bg-[#0a0a0a] border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-purple-500" />
                      Quest Overview
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Complete all steps to earn {quest.totalReward} PPT
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Quest Progress</h3>
                        <div className="bg-[#1a1a1a] p-4 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <span className="text-white/70">Overall Completion</span>
                            <span className="text-white font-medium">{quest.completionRate}%</span>
                          </div>
                          <Progress
                            value={quest.completionRate}
                            className="h-2 bg-white/10"
                            indicatorClassName="bg-purple-500"
                          />
                          <p className="text-white/60 text-sm mt-2">
                            {quest.completionRate}% of participants have completed this quest
                          </p>
                        </div>
                      </div>

                      {connected && (
                        <div>
                          <h3 className="text-lg font-medium text-white mb-2">Your Progress</h3>
                          <div className="bg-[#1a1a1a] p-4 rounded-lg">
                            <div className="flex justify-between mb-2">
                              <span className="text-white/70">Your Completion</span>
                              <span className="text-white font-medium">{userProgress}%</span>
                            </div>
                            <Progress
                              value={userProgress}
                              className="h-2 bg-white/10"
                              indicatorClassName="bg-green-500"
                            />
                            <p className="text-white/60 text-sm mt-2">
                              {userProgress === 100
                                ? "Congratulations! You've completed this quest."
                                : `You've completed ${userProgress}% of this quest. Keep going!`}
                            </p>
                          </div>
                        </div>
                      )}

                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Quest Steps Summary</h3>
                        <div className="space-y-3">
                          {quest.steps.map((step, index) => (
                            <div key={step.id} className="flex items-start">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                                  step.completed ? "bg-green-500/20 text-green-500" : "bg-white/10 text-white/70"
                                }`}
                              >
                                {step.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                              </div>
                              <div>
                                <div className="font-medium text-white">{step.title}</div>
                                <div className="text-white/70 text-sm">{step.reward} PPT Reward</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <h3 className="text-lg font-medium text-white mb-2">Recent Completions</h3>
                        <div className="space-y-4">
                          {quest.participants
                            .filter((p) => p.completedAt)
                            .slice(0, 3)
                            .map((participant) => (
                              <div key={participant.id} className="flex items-start">
                                <Avatar className="h-8 w-8 mr-3">
                                  <AvatarImage src={participant.avatar} />
                                  <AvatarFallback className="bg-primary/20 text-primary">
                                    {participant.name.substring(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center">
                                    <span className="font-medium text-white">{participant.name}</span>
                                    <span className="text-white/60 text-xs ml-2">{participant.completedAt}</span>
                                  </div>
                                  <p className="text-white/80 text-sm">
                                    Completed the quest and earned{" "}
                                    <span className="font-medium">{quest.totalReward} PPT</span>
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="steps" className="mt-6">
                <Card className="bg-[#0a0a0a] border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckSquare className="h-5 w-5 mr-2 text-purple-500" />
                      Quest Steps
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Complete all steps in order to earn the full reward
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {quest.steps.map((step, index) => (
                        <div
                          key={step.id}
                          className={`border rounded-lg p-4 ${
                            step.completed ? "border-green-500/30 bg-green-500/5" : "border-white/10 bg-[#1a1a1a]"
                          }`}
                        >
                          <div className="flex items-start">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                                step.completed ? "bg-green-500/20 text-green-500" : "bg-white/10 text-white/70"
                              }`}
                            >
                              {step.completed ? <CheckCircle className="h-5 w-5" /> : index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-white">{step.title}</h3>
                                <Badge
                                  className={
                                    step.completed ? "bg-green-500/20 text-green-500" : "bg-white/10 text-white/70"
                                  }
                                >
                                  {step.completed ? "COMPLETED" : "PENDING"}
                                </Badge>
                              </div>
                              <p className="text-white/70 mt-1 mb-3">{step.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Coins className="h-4 w-4 text-purple-500 mr-1" />
                                  <span className="text-white/80">
                                    Reward: <span className="font-medium text-purple-500">{step.reward} PPT</span>
                                  </span>
                                </div>
                                {connected && !step.completed && (
                                  <Button
                                    size="sm"
                                    className="bg-purple-500 hover:bg-purple-600 text-white"
                                    onClick={() => completeStep(step.id)}
                                  >
                                    Complete Step
                                  </Button>
                                )}
                                {step.completed && (
                                  <div className="flex items-center text-green-500">
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    <span>Completed</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="leaderboard" className="mt-6">
                <Card className="bg-[#0a0a0a] border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-purple-500" />
                      Leaderboard
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      See who's completed or making progress on this quest
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {quest.participants
                        .sort((a, b) => b.progress - a.progress)
                        .map((participant, index) => (
                          <motion.div
                            key={participant.id}
                            className="flex items-start p-3 rounded-lg hover:bg-white/5 transition-colors"
                            whileHover={{ x: 5 }}
                          >
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 text-white font-medium">
                              {index + 1}
                            </div>
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={participant.avatar} />
                              <AvatarFallback className="bg-primary/20 text-primary">
                                {participant.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium text-white">{participant.name}</div>
                                  <div className="text-white/60 text-xs">
                                    {participant.completedAt ? `Completed ${participant.completedAt}` : "In progress"}
                                  </div>
                                </div>
                                <Badge
                                  className={
                                    participant.progress === 100
                                      ? "bg-green-500/20 text-green-500"
                                      : "bg-blue-500/20 text-blue-500"
                                  }
                                >
                                  {participant.progress}%
                                </Badge>
                              </div>
                              <div className="mt-2">
                                <Progress
                                  value={participant.progress}
                                  className="h-2 bg-white/10"
                                  indicatorClassName={participant.progress === 100 ? "bg-green-500" : "bg-blue-500"}
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column - Actions and info */}
          <div>
            <Card className="bg-[#0a0a0a] border-white/10 text-white sticky top-24">
              <CardHeader>
                <CardTitle>Quest Actions</CardTitle>
                <CardDescription className="text-white/70">Start or track your progress on this quest</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {connected ? (
                    <>
                      {userProgress === 100 ? (
                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <h3 className="text-lg font-medium text-white mb-1">Quest Completed!</h3>
                          <p className="text-white/70 mb-3">
                            You've earned {quest.totalReward} PPT for completing this quest.
                          </p>
                          <Button variant="outline" className="border-white/20 text-white">
                            View Rewards
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="bg-[#1a1a1a] p-4 rounded-lg">
                            <h4 className="text-white font-medium mb-2">Your Progress</h4>
                            <div className="flex justify-between mb-2">
                              <span className="text-white/70">Completion</span>
                              <span className="text-white font-medium">{userProgress}%</span>
                            </div>
                            <Progress
                              value={userProgress}
                              className="h-2 bg-white/10"
                              indicatorClassName="bg-purple-500"
                            />
                            <p className="text-white/60 text-sm mt-2">
                              {userProgress > 0
                                ? `You've made progress! Continue to earn the full reward.`
                                : "Start the quest to earn rewards."}
                            </p>
                          </div>

                          <Button
                            className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                            size="lg"
                            onClick={() => {
                              if (userProgress === 0) {
                                // Start the quest
                                setUserProgress(33)
                                completeStep(quest.steps[0].id)
                              } else {
                                // Continue the quest
                                window.location.href = "#steps"
                                setSelectedTab("steps")
                              }
                            }}
                          >
                            <Trophy className="h-4 w-4 mr-2" />
                            {userProgress === 0 ? "Start Quest" : "Continue Quest"}
                          </Button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <Lock className="h-12 w-12 text-white/30 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-white mb-2">Connect to Start</h3>
                      <p className="text-white/70 mb-4">
                        Connect your wallet to start this quest and earn {quest.totalReward} PPT.
                      </p>
                      <Button className="bg-purple-500 hover:bg-purple-600 text-white">Connect Wallet</Button>
                    </div>
                  )}

                  <div className="bg-[#1a1a1a] p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Quest Rewards</h4>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/70">Total Reward</span>
                      <span className="text-xl font-bold text-purple-500">{quest.totalReward} PPT</span>
                    </div>
                    <div className="space-y-2">
                      {quest.steps.map((step) => (
                        <div key={step.id} className="flex justify-between text-sm">
                          <span className="text-white/60">{step.title}</span>
                          <span className="text-white/80">{step.reward} PPT</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#1a1a1a] p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Quest Status</h4>
                    <div className="flex items-center">
                      <Badge className={getStatusColor(quest.status)}>
                        {getStatusIcon(quest.status)}
                        {quest.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-white/70 text-sm mt-2">
                      {quest.status === "active"
                        ? `This quest is active until ${quest.endDate}.`
                        : quest.status === "completed"
                          ? "This quest has been completed by you."
                          : "This quest has expired and is no longer available."}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/10 pt-4">
                <div className="w-full flex justify-between items-center">
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                    <Eye className="h-4 w-4 mr-2" />
                    Watch
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Similar quests */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Similar Quests</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* This would be populated with actual related quests */}
            <Card className="bg-[#0a0a0a] border-white/10 text-white hover:border-purple-500/30 transition-colors">
              <CardHeader>
                <Badge className="w-fit bg-green-500/20 text-green-500 mb-2">BEGINNER</Badge>
                <CardTitle className="text-lg">Complete Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4 line-clamp-2">
                  Set up your profile with a username, avatar, and bio to earn your first rewards.
                </p>
                <div className="flex justify-between text-sm text-white/70 mb-4">
                  <span>50 PPT Reward</span>
                  <span>Easy</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-purple-500">Completion Rate</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2 bg-white/10" indicatorClassName="bg-purple-500" />
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Quest</Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#0a0a0a] border-white/10 text-white hover:border-purple-500/30 transition-colors">
              <CardHeader>
                <Badge className="w-fit bg-blue-500/20 text-blue-500 mb-2">INTERMEDIATE</Badge>
                <CardTitle className="text-lg">Make Your First Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4 line-clamp-2">
                  Create or join your first prediction market and place a bet to earn rewards.
                </p>
                <div className="flex justify-between text-sm text-white/70 mb-4">
                  <span>150 PPT Reward</span>
                  <span>Medium</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-purple-500">Completion Rate</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2 bg-white/10" indicatorClassName="bg-purple-500" />
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Quest</Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#0a0a0a] border-white/10 text-white hover:border-purple-500/30 transition-colors">
              <CardHeader>
                <Badge className="w-fit bg-purple-500/20 text-purple-500 mb-2">ADVANCED</Badge>
                <CardTitle className="text-lg">Create a Token Pitch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4 line-clamp-2">
                  Design and submit your own token pitch to the community for feedback and rewards.
                </p>
                <div className="flex justify-between text-sm text-white/70 mb-4">
                  <span>300 PPT Reward</span>
                  <span>Hard</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-purple-500">Completion Rate</span>
                  <span>22%</span>
                </div>
                <Progress value={22} className="h-2 bg-white/10" indicatorClassName="bg-purple-500" />
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Quest</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
