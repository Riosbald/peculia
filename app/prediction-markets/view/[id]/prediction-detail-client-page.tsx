"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  Clock,
  Dices,
  Users,
  Share2,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  ChevronRight,
  BarChart3,
  Coins,
  History,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useWeb3 } from "@/components/providers/web3-provider"
import { useMobile } from "@/hooks/use-mobile"

interface Participant {
  id: string
  name: string
  avatar?: string
  betAmount: number
  prediction: "yes" | "no"
  timestamp: string
}

interface Comment {
  id: string
  user: {
    id: string
    name: string
    avatar?: string
  }
  text: string
  timestamp: string
  likes: number
}

interface PredictionDetail {
  id: string
  title: string
  description: string
  type: "public" | "private" | "invite-only"
  category: string
  creator: {
    id: string
    name: string
    avatar?: string
  }
  totalAmount: number
  yesAmount: number
  noAmount: number
  participants: Participant[]
  comments: Comment[]
  createdAt: string
  expiresAt: string
  status: "active" | "resolved" | "expired"
  outcome?: "yes" | "no" | null
  backgroundColor: string
  odds: {
    yes: number
    no: number
  }
  verificationMethod: string
  tags: string[]
}

interface PredictionDetailClientPageProps {
  id: string
}

export default function PredictionDetailClientPage({ id }: PredictionDetailClientPageProps) {
  const { connected, address } = useWeb3()
  const [prediction, setPrediction] = useState<PredictionDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState("overview")
  const [betAmount, setBetAmount] = useState(100)
  const [betSide, setBetSide] = useState<"yes" | "no" | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const fetchPrediction = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on the ID
      const mockPredictions: Record<string, PredictionDetail> = {
        "1": {
          id: "1",
          title: "Wizkid will win a Grammy Award in 2025",
          description:
            "This prediction market is about whether Nigerian artist Wizkid will win a Grammy Award in any category during the 2025 Grammy Awards ceremony. The market will be resolved based on the official Grammy Awards results announced by the Recording Academy.",
          type: "private",
          category: "entertainment",
          creator: {
            id: "creator1",
            name: "AfroBeats",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          totalAmount: 2800,
          yesAmount: 1800,
          noAmount: 1000,
          participants: [
            {
              id: "1",
              name: "AfroBeats",
              avatar: "/placeholder.svg?height=40&width=40",
              betAmount: 500,
              prediction: "yes",
              timestamp: "2 days ago",
            },
            {
              id: "2",
              name: "MusicFan",
              avatar: "/placeholder.svg?height=40&width=40",
              betAmount: 300,
              prediction: "yes",
              timestamp: "1 day ago",
            },
            {
              id: "3",
              name: "WizkidFC",
              avatar: "/placeholder.svg?height=40&width=40",
              betAmount: 1000,
              prediction: "yes",
              timestamp: "12 hours ago",
            },
            {
              id: "4",
              name: "GrammyExpert",
              avatar: "/placeholder.svg?height=40&width=40",
              betAmount: 1000,
              prediction: "no",
              timestamp: "6 hours ago",
            },
          ],
          comments: [
            {
              id: "c1",
              user: {
                id: "2",
                name: "MusicFan",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              text: "Wizkid's recent album is amazing! I think he has a strong chance at the Grammys this year.",
              timestamp: "1 day ago",
              likes: 5,
            },
            {
              id: "c2",
              user: {
                id: "4",
                name: "GrammyExpert",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              text: "The competition is tough this year. While Wizkid is talented, there are many strong contenders in his categories.",
              timestamp: "6 hours ago",
              likes: 2,
            },
          ],
          createdAt: "3 days ago",
          expiresAt: "February 15, 2025",
          status: "active",
          backgroundColor: "#7e22ce",
          odds: {
            yes: 0.64,
            no: 0.36,
          },
          verificationMethod: "AI verification using official Grammy Awards results",
          tags: ["music", "awards", "afrobeats", "grammy", "wizkid"],
        },
        "2": {
          id: "2",
          title: "Lagos traffic will reduce by 30% after implementation of new transport system",
          description:
            "This prediction market is about whether the implementation of Lagos' new integrated transport system will reduce traffic congestion by at least 30% compared to current levels. The market will be resolved based on official traffic data from the Lagos State Transport Management Authority.",
          type: "public",
          category: "other",
          creator: {
            id: "creator2",
            name: "LagosResident",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          totalAmount: 4500,
          yesAmount: 1500,
          noAmount: 3000,
          participants: [
            {
              id: "5",
              name: "LagosResident",
              avatar: "/placeholder.svg?height=40&width=40",
              betAmount: 500,
              prediction: "yes",
              timestamp: "15 days ago",
            },
            {
              id: "6",
              name: "TrafficAnalyst",
              avatar: "/placeholder.svg?height=40&width=40",
              betAmount: 1000,
              prediction: "no",
              timestamp: "14 days ago",
            },
            {
              id: "7",
              name: "TransportGuru",
              avatar: "/placeholder.svg?height=40&width=40",
              betAmount: 1000,
              prediction: "yes",
              timestamp: "10 days ago",
            },
            {
              id: "8",
              name: "CityPlanner",
              avatar: "/placeholder.svg?height=40&width=40",
              betAmount: 1000,
              prediction: "no",
              timestamp: "7 days ago",
            },
            {
              id: "9",
              name: "Commuter",
              avatar: "/placeholder.svg?height=40&width=40",
              betAmount: 1000,
              prediction: "no",
              timestamp: "3 days ago",
            },
          ],
          comments: [
            {
              id: "c3",
              user: {
                id: "6",
                name: "TrafficAnalyst",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              text: "Based on historical data from similar implementations in other cities, a 30% reduction is highly optimistic.",
              timestamp: "14 days ago",
              likes: 8,
            },
            {
              id: "c4",
              user: {
                id: "7",
                name: "TransportGuru",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              text: "The new system addresses key bottlenecks. I believe we'll see significant improvements.",
              timestamp: "10 days ago",
              likes: 3,
            },
          ],
          createdAt: "15 days ago",
          expiresAt: "December 31, 2024",
          status: "active",
          backgroundColor: "#047857",
          odds: {
            yes: 0.33,
            no: 0.67,
          },
          verificationMethod:
            "AI verification using official traffic data from Lagos State Transport Management Authority",
          tags: ["lagos", "traffic", "transportation", "urban planning", "infrastructure"],
        },
        "3": {
          id: "3",
          title: "Dollar to Naira exchange rate will exceed 1:1500 by end of 2024",
          description:
            "This prediction market is about whether the USD to NGN exchange rate will exceed 1:1500 by December 31, 2024. The market will be resolved based on the official exchange rate published by the Central Bank of Nigeria.",
          type: "invite-only",
          category: "finance",
          creator: {
            id: "creator3",
            name: "ForexTrader",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          totalAmount: 5000,
          yesAmount: 3500,
          noAmount: 1500,
          participants: [
            {
              id: "10",
              name: "ForexTrader",
              avatar: "/placeholder.svg?height=40&width=40",
              betAmount: 1000,
              prediction: "yes",
              timestamp: "2 months ago",
            },
            {
              id: "11",
              name: "EconomistNG",
              avatar: "/placeholder.svg?height=40&width=40",
              betAmount: 500,
              prediction: "no",
              timestamp: "2 months ago",
            },
            {
              id: "12",
              name: "FinanceExpert",
              avatar: "/placeholder.svg?height=40&width=40",
              betAmount: 1000,
              prediction: "yes",
              timestamp: "1 month ago",
            },
            {
              id: "13",
              name: "BankAnalyst",
              avatar: "/placeholder.svg?height=40&width=40",
              betAmount: 500,
              prediction: "yes",
              timestamp: "3 weeks ago",
            },
            {
              id: "14",
              name: "InvestorPro",
              avatar: "/placeholder.svg?height=40&width=40",
              betAmount: 1000,
              prediction: "yes",
              timestamp: "2 weeks ago",
            },
            {
              id: "15",
              name: "MarketWatcher",
              avatar: "/placeholder.svg?height=40&width=40",
              betAmount: 1000,
              prediction: "no",
              timestamp: "1 week ago",
            },
          ],
          comments: [
            {
              id: "c5",
              user: {
                id: "10",
                name: "ForexTrader",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              text: "Given the current economic policies and inflation trends, I believe we'll see the Naira continue to depreciate significantly.",
              timestamp: "2 months ago",
              likes: 12,
            },
            {
              id: "c6",
              user: {
                id: "11",
                name: "EconomistNG",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              text: "The CBN's recent interventions might stabilize the currency before it reaches such extreme levels.",
              timestamp: "2 months ago",
              likes: 5,
            },
          ],
          createdAt: "2 months ago",
          expiresAt: "December 31, 2024",
          status: "active",
          backgroundColor: "#9a3412",
          odds: {
            yes: 0.7,
            no: 0.3,
          },
          verificationMethod: "AI verification using official exchange rate data from the Central Bank of Nigeria",
          tags: ["forex", "naira", "dollar", "exchange rate", "economy", "nigeria"],
        },
      }

      // Get the prediction based on the ID
      const predictionData = mockPredictions[id]
      if (predictionData) {
        setPrediction(predictionData)
      }
      setIsLoading(false)
    }

    fetchPrediction()
  }, [id])

  const handleBetSubmit = () => {
    if (!betSide || betAmount <= 0) return
    setShowConfirmation(true)
  }

  const confirmBet = () => {
    // In a real app, this would submit the bet to the blockchain
    alert(`Bet placed: ${betAmount} PPT on ${betSide}`)
    setShowConfirmation(false)
    setBetSide(null)
    setBetAmount(100)
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "public":
        return "PUBLIC"
      case "private":
        return "PRIVATE"
      case "invite-only":
        return "INVITE ONLY"
      default:
        return type.toUpperCase()
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "public":
        return "bg-green-500/20 text-green-500"
      case "private":
        return "bg-blue-500/20 text-blue-500"
      case "invite-only":
        return "bg-yellow-500/20 text-yellow-500"
      default:
        return "bg-white/20 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-500"
      case "resolved":
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
      case "resolved":
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
            <div className="text-white/50 animate-pulse">Loading prediction details...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!prediction) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center items-center h-64">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Prediction Not Found</h2>
            <p className="text-white/70 mb-6">The prediction you're looking for doesn't exist or has been removed.</p>
            <Link href="/prediction-markets">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Prediction Markets
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const yesPercentage = (prediction.yesAmount / prediction.totalAmount) * 100
  const noPercentage = (prediction.noAmount / prediction.totalAmount) * 100

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
            <Link href="/prediction-markets" className="hover:text-white transition-colors">
              Prediction Markets
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-white/90 truncate max-w-[200px]">{prediction.title}</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href="/prediction-markets">
              <Button variant="ghost" size="sm" className="mr-2 -ml-2">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back</span>
              </Button>
            </Link>
            <Badge className={getTypeColor(prediction.type)}>{getTypeLabel(prediction.type)}</Badge>
            <Badge className="ml-2 bg-white/10 text-white/90">
              {prediction.category.charAt(0).toUpperCase() + prediction.category.slice(1)}
            </Badge>
            <Badge className={`ml-2 ${getStatusColor(prediction.status)}`}>
              {getStatusIcon(prediction.status)}
              {prediction.status.toUpperCase()}
            </Badge>
          </div>

          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {prediction.title}
          </motion.h1>

          <div className="flex flex-wrap items-center text-sm text-white/70 mb-6">
            <div className="flex items-center mr-4 mb-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>Created {prediction.createdAt}</span>
            </div>
            <div className="flex items-center mr-4 mb-2">
              <Users className="h-4 w-4 mr-1" />
              <span>{prediction.participants.length} Participants</span>
            </div>
            <div className="flex items-center mr-4 mb-2">
              <Coins className="h-4 w-4 mr-1" />
              <span>{prediction.totalAmount} PPT Total Pool</span>
            </div>
            <div className="flex items-center mb-2">
              <History className="h-4 w-4 mr-1" />
              <span>Expires on {prediction.expiresAt}</span>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={prediction.creator.avatar} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {prediction.creator.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-white/70 text-sm">Created by </span>
              <span className="text-white font-medium">{prediction.creator.name}</span>
            </div>
          </div>

          <p className="text-white/80 mb-6 max-w-3xl">{prediction.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {prediction.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-white/5 text-white/70 border-white/10">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Prediction details */}
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
                  value="participants"
                  className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
                >
                  Participants
                </TabsTrigger>
                <TabsTrigger
                  value="discussion"
                  className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
                >
                  Discussion
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="bg-[#0a0a0a] border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
                      Current Prediction Stats
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      See how the community is betting on this prediction
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            <span className="text-green-500 font-medium mr-2">YES</span>
                            <span className="text-white/70 text-sm">{prediction.yesAmount} PPT</span>
                          </div>
                          <span className="text-white font-medium">{yesPercentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={yesPercentage} className="h-2 bg-white/10" indicatorClassName="bg-green-500" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            <span className="text-red-500 font-medium mr-2">NO</span>
                            <span className="text-white/70 text-sm">{prediction.noAmount} PPT</span>
                          </div>
                          <span className="text-white font-medium">{noPercentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={noPercentage} className="h-2 bg-white/10" indicatorClassName="bg-red-500" />
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <h4 className="text-white font-medium mb-2">Current Odds</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-[#1a1a1a] rounded-lg p-4 text-center">
                            <div className="text-green-500 text-2xl font-bold mb-1">
                              {(1 / prediction.odds.yes).toFixed(2)}x
                            </div>
                            <div className="text-white/70 text-sm">If YES wins</div>
                          </div>
                          <div className="bg-[#1a1a1a] rounded-lg p-4 text-center">
                            <div className="text-red-500 text-2xl font-bold mb-1">
                              {(1 / prediction.odds.no).toFixed(2)}x
                            </div>
                            <div className="text-white/70 text-sm">If NO wins</div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <h4 className="text-white font-medium mb-2">Verification Method</h4>
                        <p className="text-white/70">{prediction.verificationMethod}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0a0a0a] border-white/10 text-white mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Eye className="h-5 w-5 mr-2 text-purple-500" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {prediction.participants.slice(0, 3).map((participant) => (
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
                              <span className="text-white/60 text-xs ml-2">{participant.timestamp}</span>
                            </div>
                            <p className="text-white/80 text-sm">
                              Bet <span className="font-medium">{participant.betAmount} PPT</span> on{" "}
                              <span className={participant.prediction === "yes" ? "text-green-500" : "text-red-500"}>
                                {participant.prediction.toUpperCase()}
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-white/10 pt-4">
                    <Button variant="outline" className="w-full border-white/20 text-white">
                      View All Activity
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="participants" className="mt-6">
                <Card className="bg-[#0a0a0a] border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-purple-500" />
                      Participants ({prediction.participants.length})
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      People who have placed bets on this prediction
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {prediction.participants.map((participant) => (
                        <motion.div
                          key={participant.id}
                          className="flex items-start p-3 rounded-lg hover:bg-white/5 transition-colors"
                          whileHover={{ x: 5 }}
                        >
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
                                <div className="text-white/60 text-xs">{participant.timestamp}</div>
                              </div>
                              <Badge
                                className={
                                  participant.prediction === "yes"
                                    ? "bg-green-500/20 text-green-500"
                                    : "bg-red-500/20 text-red-500"
                                }
                              >
                                {participant.prediction.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="mt-1 text-white/80">
                              <span className="font-medium">{participant.betAmount} PPT</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussion" className="mt-6">
                <Card className="bg-[#0a0a0a] border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-purple-500" />
                      Discussion ({prediction.comments.length})
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Join the conversation about this prediction
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {prediction.comments.map((comment) => (
                        <div key={comment.id} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                          <div className="flex items-start">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarImage src={comment.user.avatar} />
                              <AvatarFallback className="bg-primary/20 text-primary">
                                {comment.user.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="font-medium text-white">{comment.user.name}</div>
                                <div className="text-white/60 text-xs">{comment.timestamp}</div>
                              </div>
                              <p className="mt-1 text-white/80">{comment.text}</p>
                              <div className="flex items-center mt-2">
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-white/60 hover:text-white">
                                  <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />
                                  <span className="text-xs">{comment.likes}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-white/60 hover:text-white">
                                  <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                                  <span className="text-xs">Reply</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {connected ? (
                      <div className="mt-6 pt-4 border-t border-white/10">
                        <div className="flex items-start">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarFallback className="bg-primary/20 text-primary">
                              {address?.substring(0, 2).toUpperCase() || "YO"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <textarea
                              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-purple-500"
                              placeholder="Add your thoughts..."
                              rows={3}
                            ></textarea>
                            <div className="flex justify-end mt-2">
                              <Button>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Post Comment
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-6 pt-4 border-t border-white/10 bg-[#1a1a1a] p-4 rounded-lg text-center">
                        <p className="text-white/70 mb-3">Connect your wallet to join the discussion</p>
                        <Button>Connect Wallet</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column - Place bet */}
          <div>
            <Card className="bg-[#0a0a0a] border-white/10 text-white sticky top-24">
              <CardHeader>
                <CardTitle>Place Your Bet</CardTitle>
                <CardDescription className="text-white/70">Choose your prediction and amount</CardDescription>
              </CardHeader>
              <CardContent>
                {prediction.status === "active" ? (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/70 mb-2">I predict this will happen:</label>
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            variant={betSide === "yes" ? "default" : "outline"}
                            className={
                              betSide === "yes"
                                ? "bg-green-500 hover:bg-green-600 text-black"
                                : "border-white/20 text-white hover:bg-green-500/10"
                            }
                            onClick={() => setBetSide("yes")}
                          >
                            YES
                          </Button>
                          <Button
                            variant={betSide === "no" ? "default" : "outline"}
                            className={
                              betSide === "no"
                                ? "bg-red-500 hover:bg-red-600 text-black"
                                : "border-white/20 text-white hover:bg-red-500/10"
                            }
                            onClick={() => setBetSide("no")}
                          >
                            NO
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/70 mb-2">Bet Amount (PPT):</label>
                        <div className="grid grid-cols-4 gap-2 mb-3">
                          {[100, 500, 1000, 2000].map((amount) => (
                            <Button
                              key={amount}
                              variant={betAmount === amount ? "default" : "outline"}
                              className={
                                betAmount === amount
                                  ? "bg-purple-500 hover:bg-purple-600 text-black"
                                  : "border-white/20 text-white hover:bg-purple-500/10"
                              }
                              onClick={() => setBetAmount(amount)}
                            >
                              {amount}
                            </Button>
                          ))}
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="5000"
                          step="100"
                          value={betAmount}
                          onChange={(e) => setBetAmount(Number.parseInt(e.target.value))}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-white/60 mt-1">
                          <span>100 PPT</span>
                          <span>5000 PPT</span>
                        </div>
                      </div>

                      {betSide && (
                        <div className="bg-[#1a1a1a] p-4 rounded-lg">
                          <h4 className="text-white font-medium mb-2">Potential Payout</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">If you win:</span>
                            <span className="text-xl font-bold text-purple-500">
                              {betSide === "yes"
                                ? (betAmount / prediction.odds.yes - betAmount).toFixed(0)
                                : (betAmount / prediction.odds.no - betAmount).toFixed(0)}{" "}
                              PPT
                            </span>
                          </div>
                          <div className="text-xs text-white/50 mt-1">Plus your initial {betAmount} PPT bet</div>
                        </div>
                      )}

                      {connected ? (
                        <Button
                          className="w-full bg-purple-500 hover:bg-purple-600 text-black"
                          size="lg"
                          disabled={!betSide}
                          onClick={handleBetSubmit}
                        >
                          <Dices className="h-4 w-4 mr-2" />
                          Place Bet
                        </Button>
                      ) : (
                        <Button className="w-full" size="lg">
                          Connect Wallet to Bet
                        </Button>
                      )}
                    </div>

                    {showConfirmation && (
                      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6 max-w-md w-full"
                        >
                          <h3 className="text-xl font-bold text-white mb-4">Confirm Your Bet</h3>
                          <div className="mb-6">
                            <p className="text-white/70 mb-4">
                              You are about to place a bet of{" "}
                              <span className="text-white font-medium">{betAmount} PPT</span> on{" "}
                              <span
                                className={
                                  betSide === "yes" ? "text-green-500 font-medium" : "text-red-500 font-medium"
                                }
                              >
                                {betSide?.toUpperCase()}
                              </span>
                              .
                            </p>
                            <div className="bg-[#1a1a1a] p-4 rounded-lg mb-4">
                              <div className="flex justify-between mb-2">
                                <span className="text-white/70">Bet Amount:</span>
                                <span className="text-white font-medium">{betAmount} PPT</span>
                              </div>
                              <div className="flex justify-between mb-2">
                                <span className="text-white/70">Potential Profit:</span>
                                <span className="text-purple-500 font-medium">
                                  {betSide === "yes"
                                    ? (betAmount / prediction.odds.yes - betAmount).toFixed(0)
                                    : (betAmount / prediction.odds.no - betAmount).toFixed(0)}{" "}
                                  PPT
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Total Potential Return:</span>
                                <span className="text-white font-medium">
                                  {betSide === "yes"
                                    ? (betAmount / prediction.odds.yes).toFixed(0)
                                    : (betAmount / prediction.odds.no).toFixed(0)}{" "}
                                  PPT
                                </span>
                              </div>
                            </div>
                            <p className="text-white/60 text-sm">
                              Your funds will be locked in the smart contract until this prediction is resolved.
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              className="flex-1 border-white/20 text-white"
                              onClick={() => setShowConfirmation(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="flex-1 bg-purple-500 hover:bg-purple-600 text-black"
                              onClick={confirmBet}
                            >
                              Confirm Bet
                            </Button>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/20 text-yellow-500 mb-4">
                      <AlertTriangle className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">Betting Closed</h3>
                    <p className="text-white/70 mb-4">
                      This prediction market is no longer accepting bets as it has been {prediction.status}.
                    </p>
                    <Link href="/prediction-markets">
                      <Button className="bg-purple-500 hover:bg-purple-600 text-black">Explore Other Markets</Button>
                    </Link>
                  </div>
                )}
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

        {/* Related predictions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Related Predictions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* This would be populated with actual related predictions */}
            <Card className="bg-[#0a0a0a] border-white/10 text-white hover:border-purple-500/30 transition-colors">
              <CardHeader>
                <Badge className="w-fit bg-green-500/20 text-green-500 mb-2">ENTERTAINMENT</Badge>
                <CardTitle className="text-lg">Will Davido win a Grammy Award in 2025?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-white/70 mb-4">
                  <span>3,200 PPT Pool</span>
                  <span>45 days left</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-green-500">YES</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-2 bg-white/10" indicatorClassName="bg-green-500" />
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#0a0a0a] border-white/10 text-white hover:border-purple-500/30 transition-colors">
              <CardHeader>
                <Badge className="w-fit bg-blue-500/20 text-blue-500 mb-2">FINANCE</Badge>
                <CardTitle className="text-lg">Will Bitcoin reach $100k before end of 2024?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-white/70 mb-4">
                  <span>8,500 PPT Pool</span>
                  <span>120 days left</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-green-500">YES</span>
                  <span>72%</span>
                </div>
                <Progress value={72} className="h-2 bg-white/10" indicatorClassName="bg-green-500" />
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#0a0a0a] border-white/10 text-white hover:border-purple-500/30 transition-colors">
              <CardHeader>
                <Badge className="w-fit bg-amber-500/20 text-amber-500 mb-2">POLITICS</Badge>
                <CardTitle className="text-lg">Will Nigeria have a new president before 2027?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm text-white/70 mb-4">
                  <span>5,800 PPT Pool</span>
                  <span>365 days left</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-red-500">NO</span>
                  <span>81%</span>
                </div>
                <Progress value={81} className="h-2 bg-white/10" indicatorClassName="bg-red-500" />
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
