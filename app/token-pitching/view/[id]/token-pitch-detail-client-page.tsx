"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Share2,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Coins,
  History,
  Eye,
  FileText,
  Award,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useWeb3 } from "@/components/providers/web3-provider"
import { useMobile } from "@/hooks/use-mobile"

interface TokenPitchDetailClientPageProps {
  id: string
}

interface Feedback {
  id: string
  user: {
    id: string
    name: string
    avatar?: string
  }
  text: string
  timestamp: string
  rating: number
  likes: number
}

interface TokenPitchDetail {
  id: string
  name: string
  symbol: string
  description: string
  problem: string
  solution: string
  tokenomics: {
    totalSupply: string
    distribution: {
      team: number
      investors: number
      community: number
      ecosystem: number
      reserve: number
    }
  }
  creator: {
    id: string
    name: string
    avatar?: string
  }
  status: "pending" | "approved" | "rejected"
  createdAt: string
  updatedAt: string
  feedback: Feedback[]
  rating: {
    overall: number
    utility: number
    tokenomics: number
    team: number
    innovation: number
  }
  tags: string[]
  backgroundColor: string
}

export default function TokenPitchDetailClientPage({ id }: TokenPitchDetailClientPageProps) {
  const { connected, address } = useWeb3()
  const [tokenPitch, setTokenPitch] = useState<TokenPitchDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState("overview")
  const [userRating, setUserRating] = useState(0)
  const isMobile = useMobile()

  useEffect(() => {
    const fetchTokenPitch = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on the ID
      const mockTokenPitches: Record<string, TokenPitchDetail> = {
        "1": {
          id: "1",
          name: "DeFiDAO",
          symbol: "DDAO",
          description:
            "DeFiDAO is a decentralized governance token for DeFi protocols, enabling cross-protocol governance and coordination.",
          problem:
            "Current DeFi governance is siloed within individual protocols, leading to fragmentation and inefficient coordination across the ecosystem.",
          solution:
            "DeFiDAO creates a meta-governance layer that allows for coordinated governance across multiple DeFi protocols, enabling more efficient ecosystem-wide decision making.",
          tokenomics: {
            totalSupply: "100,000,000",
            distribution: {
              team: 15,
              investors: 20,
              community: 40,
              ecosystem: 20,
              reserve: 5,
            },
          },
          creator: {
            id: "creator1",
            name: "BlockchainDev",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          status: "pending",
          createdAt: "15 days ago",
          updatedAt: "2 days ago",
          feedback: [
            {
              id: "f1",
              user: {
                id: "reviewer1",
                name: "TokenExpert",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              text: "The concept is innovative, but I'm concerned about the tokenomics. The team allocation seems high compared to industry standards.",
              timestamp: "10 days ago",
              rating: 3,
              likes: 5,
            },
            {
              id: "f2",
              user: {
                id: "reviewer2",
                name: "DeFiAnalyst",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              text: "I like the cross-protocol governance idea. This could solve real coordination problems in DeFi. The technical implementation will be challenging though.",
              timestamp: "7 days ago",
              rating: 4,
              likes: 8,
            },
          ],
          rating: {
            overall: 3.8,
            utility: 4.2,
            tokenomics: 3.5,
            team: 3.7,
            innovation: 4.5,
          },
          tags: ["defi", "governance", "dao", "meta-governance", "cross-protocol"],
          backgroundColor: "#3b82f6",
        },
        "2": {
          id: "2",
          name: "GameFi Token",
          symbol: "GFT",
          description:
            "GameFi Token is a utility token for a cross-game metaverse ecosystem, allowing asset transfers between different blockchain games.",
          problem:
            "Current blockchain games operate in isolation, with no way to transfer value or assets between different gaming ecosystems.",
          solution:
            "GameFi Token creates a standardized protocol for cross-game asset transfers and a marketplace for trading in-game items across multiple blockchain games.",
          tokenomics: {
            totalSupply: "500,000,000",
            distribution: {
              team: 12,
              investors: 18,
              community: 45,
              ecosystem: 20,
              reserve: 5,
            },
          },
          creator: {
            id: "creator2",
            name: "GameDevPro",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          status: "approved",
          createdAt: "1 month ago",
          updatedAt: "5 days ago",
          feedback: [
            {
              id: "f3",
              user: {
                id: "reviewer3",
                name: "GameFiExpert",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              text: "This is exactly what the blockchain gaming space needs. The technical architecture is well thought out and the tokenomics are balanced.",
              timestamp: "20 days ago",
              rating: 5,
              likes: 12,
            },
            {
              id: "f4",
              user: {
                id: "reviewer4",
                name: "MetaverseBuilder",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              text: "I'm impressed with the cross-game functionality. The team has strong gaming industry experience which is crucial for adoption.",
              timestamp: "15 days ago",
              rating: 4,
              likes: 7,
            },
          ],
          rating: {
            overall: 4.5,
            utility: 4.8,
            tokenomics: 4.2,
            team: 4.6,
            innovation: 4.3,
          },
          tags: ["gaming", "metaverse", "nft", "cross-game", "marketplace"],
          backgroundColor: "#8b5cf6",
        },
      }

      // Get the token pitch based on the ID
      const tokenPitchData = mockTokenPitches[id]
      if (tokenPitchData) {
        setTokenPitch(tokenPitchData)
      }
      setIsLoading(false)
    }

    fetchTokenPitch()
  }, [id])

  const handleRatingChange = (rating: number) => {
    setUserRating(rating)
  }

  const submitFeedback = () => {
    // In a real app, this would submit feedback to the API
    alert(`Feedback submitted with rating: ${userRating}/5`)
    setUserRating(0)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-white/50 animate-pulse">Loading token pitch details...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!tokenPitch) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center items-center h-64">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Token Pitch Not Found</h2>
            <p className="text-white/70 mb-6">The token pitch you're looking for doesn't exist or has been removed.</p>
            <Link href="/token-pitching">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Token Pitching
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
            <Link href="/token-pitching" className="hover:text-white transition-colors">
              Token Pitching
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-white/90 truncate max-w-[200px]">{tokenPitch.name}</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href="/token-pitching">
              <Button variant="ghost" size="sm" className="mr-2 -ml-2">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back</span>
              </Button>
            </Link>
            <Badge
              className={
                tokenPitch.status === "approved"
                  ? "bg-green-500/20 text-green-500"
                  : tokenPitch.status === "rejected"
                    ? "bg-red-500/20 text-red-500"
                    : "bg-yellow-500/20 text-yellow-500"
              }
            >
              {tokenPitch.status.toUpperCase()}
            </Badge>
            <Badge className="ml-2 bg-blue-500/20 text-blue-500">TOKEN PITCH</Badge>
          </div>

          <motion.div
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {tokenPitch.name} <span className="text-blue-400">({tokenPitch.symbol})</span>
              </h1>
              <p className="text-white/80 mb-4 max-w-3xl">{tokenPitch.description}</p>
            </div>
            <div className="flex flex-col items-center bg-[#0a0a0a] p-4 rounded-lg border border-white/10">
              <div className="text-3xl font-bold text-blue-400 mb-1">{tokenPitch.rating.overall.toFixed(1)}</div>
              <div className="flex mb-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(tokenPitch.rating.overall) ? "text-yellow-500" : "text-white/20"
                    }`}
                    fill={star <= Math.round(tokenPitch.rating.overall) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <div className="text-white/60 text-sm">Overall Rating</div>
            </div>
          </motion.div>

          <div className="flex flex-wrap items-center text-sm text-white/70 mb-6">
            <div className="flex items-center mr-4 mb-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>Created {tokenPitch.createdAt}</span>
            </div>
            <div className="flex items-center mr-4 mb-2">
              <History className="h-4 w-4 mr-1" />
              <span>Updated {tokenPitch.updatedAt}</span>
            </div>
            <div className="flex items-center mr-4 mb-2">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{tokenPitch.feedback.length} Reviews</span>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={tokenPitch.creator.avatar} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {tokenPitch.creator.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-white/70 text-sm">Created by </span>
              <span className="text-white font-medium">{tokenPitch.creator.name}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {tokenPitch.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-white/5 text-white/70 border-white/10">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Token pitch details */}
          <div className="lg:col-span-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
              <TabsList className="bg-[#0a0a0a] border border-white/10">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-500"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="tokenomics"
                  className="data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-500"
                >
                  Tokenomics
                </TabsTrigger>
                <TabsTrigger
                  value="feedback"
                  className="data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-500"
                >
                  Feedback
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="bg-[#0a0a0a] border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-500" />
                      Token Overview
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Detailed information about the token pitch
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Problem Statement</h3>
                        <p className="text-white/80">{tokenPitch.problem}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Solution</h3>
                        <p className="text-white/80">{tokenPitch.solution}</p>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <h3 className="text-lg font-medium text-white mb-2">Rating Breakdown</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-white/70">Utility</span>
                              <span className="text-white">{tokenPitch.rating.utility.toFixed(1)}/5</span>
                            </div>
                            <Progress
                              value={(tokenPitch.rating.utility / 5) * 100}
                              className="h-2 bg-white/10"
                              indicatorClassName="bg-blue-500"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-white/70">Tokenomics</span>
                              <span className="text-white">{tokenPitch.rating.tokenomics.toFixed(1)}/5</span>
                            </div>
                            <Progress
                              value={(tokenPitch.rating.tokenomics / 5) * 100}
                              className="h-2 bg-white/10"
                              indicatorClassName="bg-blue-500"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-white/70">Team</span>
                              <span className="text-white">{tokenPitch.rating.team.toFixed(1)}/5</span>
                            </div>
                            <Progress
                              value={(tokenPitch.rating.team / 5) * 100}
                              className="h-2 bg-white/10"
                              indicatorClassName="bg-blue-500"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-white/70">Innovation</span>
                              <span className="text-white">{tokenPitch.rating.innovation.toFixed(1)}/5</span>
                            </div>
                            <Progress
                              value={(tokenPitch.rating.innovation / 5) * 100}
                              className="h-2 bg-white/10"
                              indicatorClassName="bg-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tokenomics" className="mt-6">
                <Card className="bg-[#0a0a0a] border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Coins className="h-5 w-5 mr-2 text-blue-500" />
                      Tokenomics
                    </CardTitle>
                    <CardDescription className="text-white/70">Token distribution and supply details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Total Supply</h3>
                        <div className="text-2xl font-bold text-blue-400">
                          {tokenPitch.tokenomics.totalSupply} {tokenPitch.symbol}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-white mb-4">Token Distribution</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-white/70">Team</span>
                                  <span className="text-white">{tokenPitch.tokenomics.distribution.team}%</span>
                                </div>
                                <Progress
                                  value={tokenPitch.tokenomics.distribution.team}
                                  className="h-2 bg-white/10"
                                  indicatorClassName="bg-blue-500"
                                />
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-white/70">Investors</span>
                                  <span className="text-white">{tokenPitch.tokenomics.distribution.investors}%</span>
                                </div>
                                <Progress
                                  value={tokenPitch.tokenomics.distribution.investors}
                                  className="h-2 bg-white/10"
                                  indicatorClassName="bg-purple-500"
                                />
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-white/70">Community</span>
                                  <span className="text-white">{tokenPitch.tokenomics.distribution.community}%</span>
                                </div>
                                <Progress
                                  value={tokenPitch.tokenomics.distribution.community}
                                  className="h-2 bg-white/10"
                                  indicatorClassName="bg-green-500"
                                />
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-white/70">Ecosystem</span>
                                  <span className="text-white">{tokenPitch.tokenomics.distribution.ecosystem}%</span>
                                </div>
                                <Progress
                                  value={tokenPitch.tokenomics.distribution.ecosystem}
                                  className="h-2 bg-white/10"
                                  indicatorClassName="bg-yellow-500"
                                />
                              </div>
                              <div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-white/70">Reserve</span>
                                  <span className="text-white">{tokenPitch.tokenomics.distribution.reserve}%</span>
                                </div>
                                <Progress
                                  value={tokenPitch.tokenomics.distribution.reserve}
                                  className="h-2 bg-white/10"
                                  indicatorClassName="bg-red-500"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="bg-[#1a1a1a] rounded-lg p-4">
                            <h4 className="text-white font-medium mb-3">Distribution Chart</h4>
                            <div className="aspect-square rounded-full relative overflow-hidden border border-white/10">
                              {/* Team slice */}
                              <div
                                className="absolute bg-blue-500"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  clipPath: `conic-gradient(from 0deg, transparent 0%, transparent ${100 - tokenPitch.tokenomics.distribution.team}%, blue ${100 - tokenPitch.tokenomics.distribution.team}%, blue 100%)`,
                                }}
                              ></div>

                              {/* Investors slice */}
                              <div
                                className="absolute bg-purple-500"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  clipPath: `conic-gradient(from ${tokenPitch.tokenomics.distribution.team * 3.6}deg, transparent 0%, transparent ${100 - tokenPitch.tokenomics.distribution.investors}%, purple ${100 - tokenPitch.tokenomics.distribution.investors}%, purple 100%)`,
                                }}
                              ></div>

                              {/* Community slice */}
                              <div
                                className="absolute bg-green-500"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  clipPath: `conic-gradient(from ${(tokenPitch.tokenomics.distribution.team + tokenPitch.tokenomics.distribution.investors) * 3.6}deg, transparent 0%, transparent ${100 - tokenPitch.tokenomics.distribution.community}%, green ${100 - tokenPitch.tokenomics.distribution.community}%, green 100%)`,
                                }}
                              ></div>

                              {/* Ecosystem slice */}
                              <div
                                className="absolute bg-yellow-500"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  clipPath: `conic-gradient(from ${(tokenPitch.tokenomics.distribution.team + tokenPitch.tokenomics.distribution.investors + tokenPitch.tokenomics.distribution.community) * 3.6}deg, transparent 0%, transparent ${100 - tokenPitch.tokenomics.distribution.ecosystem}%, yellow ${100 - tokenPitch.tokenomics.distribution.ecosystem}%, yellow 100%)`,
                                }}
                              ></div>

                              {/* Reserve slice */}
                              <div
                                className="absolute bg-red-500"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  clipPath: `conic-gradient(from ${(tokenPitch.tokenomics.distribution.team + tokenPitch.tokenomics.distribution.investors + tokenPitch.tokenomics.distribution.community + tokenPitch.tokenomics.distribution.ecosystem) * 3.6}deg, transparent 0%, transparent ${100 - tokenPitch.tokenomics.distribution.reserve}%, red ${100 - tokenPitch.tokenomics.distribution.reserve}%, red 100%)`,
                                }}
                              ></div>

                              {/* Center circle */}
                              <div className="absolute inset-0 m-auto w-1/2 h-1/2 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                                <span className="text-white font-medium text-sm">{tokenPitch.symbol}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feedback" className="mt-6">
                <Card className="bg-[#0a0a0a] border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
                      Feedback & Reviews
                    </CardTitle>
                    <CardDescription className="text-white/70">Community feedback on this token pitch</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {tokenPitch.feedback.map((feedback) => (
                        <div key={feedback.id} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                          <div className="flex items-start">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarImage src={feedback.user.avatar} />
                              <AvatarFallback className="bg-primary/20 text-primary">
                                {feedback.user.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="font-medium text-white">{feedback.user.name}</div>
                                <div className="text-white/60 text-xs">{feedback.timestamp}</div>
                              </div>
                              <div className="flex items-center mt-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${
                                      star <= feedback.rating ? "text-yellow-500" : "text-white/20"
                                    }`}
                                    fill={star <= feedback.rating ? "currentColor" : "none"}
                                  />
                                ))}
                                <span className="text-white/60 text-xs ml-2">{feedback.rating}/5</span>
                              </div>
                              <p className="mt-1 text-white/80">{feedback.text}</p>
                              <div className="flex items-center mt-2">
                                <Button variant="ghost" size="sm" className="h-8 px-2 text-white/60 hover:text-white">
                                  <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />
                                  <span className="text-xs">{feedback.likes}</span>
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
                        <h4 className="text-white font-medium mb-3">Leave Your Feedback</h4>
                        <div className="flex items-center mb-3">
                          <span className="text-white/70 mr-3">Rating:</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => handleRatingChange(star)}
                                className="focus:outline-none"
                              >
                                <Star
                                  className={`h-5 w-5 ${
                                    star <= userRating ? "text-yellow-500" : "text-white/20"
                                  } hover:text-yellow-500 transition-colors`}
                                  fill={star <= userRating ? "currentColor" : "none"}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <textarea
                          className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Share your thoughts on this token pitch..."
                          rows={3}
                        ></textarea>
                        <div className="flex justify-end mt-3">
                          <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            disabled={userRating === 0}
                            onClick={submitFeedback}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Submit Feedback
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-6 pt-4 border-t border-white/10 bg-[#1a1a1a] p-4 rounded-lg text-center">
                        <p className="text-white/70 mb-3">Connect your wallet to leave feedback</p>
                        <Button>Connect Wallet</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column - Actions and info */}
          <div>
            <Card className="bg-[#0a0a0a] border-white/10 text-white sticky top-24">
              <CardHeader>
                <CardTitle>Token Actions</CardTitle>
                <CardDescription className="text-white/70">Support or provide feedback on this token</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    <Award className="h-4 w-4 mr-2" />
                    Support This Token
                  </Button>

                  <Button variant="outline" className="w-full border-white/20 text-white">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Creator
                  </Button>

                  <div className="bg-[#1a1a1a] p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Token Status</h4>
                    <div className="flex items-center">
                      <Badge
                        className={
                          tokenPitch.status === "approved"
                            ? "bg-green-500/20 text-green-500"
                            : tokenPitch.status === "rejected"
                              ? "bg-red-500/20 text-red-500"
                              : "bg-yellow-500/20 text-yellow-500"
                        }
                      >
                        {tokenPitch.status === "approved" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : tokenPitch.status === "rejected" ? (
                          <XCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {tokenPitch.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-white/70 text-sm mt-2">
                      {tokenPitch.status === "approved"
                        ? "This token pitch has been approved and is ready for the next stage."
                        : tokenPitch.status === "rejected"
                          ? "This token pitch has been rejected. The creator can revise and resubmit."
                          : "This token pitch is currently under review by the community."}
                    </p>
                  </div>

                  <div className="bg-[#1a1a1a] p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Next Steps</h4>
                    <ul className="text-white/70 text-sm space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Token pitch submitted</span>
                      </li>
                      <li className="flex items-start">
                        {tokenPitch.feedback.length > 0 ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        )}
                        <span>Community feedback</span>
                      </li>
                      <li className="flex items-start">
                        {tokenPitch.status === "approved" ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        )}
                        <span>Token approval</span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Token launch</span>
                      </li>
                    </ul>
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

        {/* Similar token pitches */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Similar Token Pitches</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* This would be populated with actual related token pitches */}
            <Card className="bg-[#0a0a0a] border-white/10 text-white hover:border-blue-500/30 transition-colors">
              <CardHeader>
                <Badge className="w-fit bg-blue-500/20 text-blue-500 mb-2">DEFI</Badge>
                <CardTitle className="text-lg">LiquidityDAO</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4 line-clamp-2">
                  A decentralized liquidity protocol that enables cross-chain swaps with minimal slippage and low fees.
                </p>
                <div className="flex justify-between text-sm text-white/70 mb-4">
                  <span>4.2/5 Rating</span>
                  <span>12 Reviews</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-blue-500">Tokenomics</span>
                  <span>3.8/5</span>
                </div>
                <Progress value={76} className="h-2 bg-white/10" indicatorClassName="bg-blue-500" />
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#0a0a0a] border-white/10 text-white hover:border-blue-500/30 transition-colors">
              <CardHeader>
                <Badge className="w-fit bg-purple-500/20 text-purple-500 mb-2">GAMING</Badge>
                <CardTitle className="text-lg">MetaverseToken</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4 line-clamp-2">
                  A utility token for a cross-platform metaverse with integrated NFT marketplace and play-to-earn
                  mechanics.
                </p>
                <div className="flex justify-between text-sm text-white/70 mb-4">
                  <span>4.7/5 Rating</span>
                  <span>18 Reviews</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-purple-500">Innovation</span>
                  <span>4.9/5</span>
                </div>
                <Progress value={98} className="h-2 bg-white/10" indicatorClassName="bg-purple-500" />
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#0a0a0a] border-white/10 text-white hover:border-blue-500/30 transition-colors">
              <CardHeader>
                <Badge className="w-fit bg-green-500/20 text-green-500 mb-2">INFRASTRUCTURE</Badge>
                <CardTitle className="text-lg">ChainBridge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4 line-clamp-2">
                  A cross-chain infrastructure token that enables seamless asset transfers between different blockchain
                  networks.
                </p>
                <div className="flex justify-between text-sm text-white/70 mb-4">
                  <span>4.5/5 Rating</span>
                  <span>15 Reviews</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-green-500">Utility</span>
                  <span>4.6/5</span>
                </div>
                <Progress value={92} className="h-2 bg-white/10" indicatorClassName="bg-green-500" />
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
