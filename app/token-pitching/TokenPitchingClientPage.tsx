"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  TrendingUp,
  Plus,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Search,
  Filter,
  ChevronDown,
  BarChart3,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useWeb3 } from "@/components/providers/web3-provider"
import TokenSimulator from "@/components/token-simulator"
import CreateTokenPitchModal from "@/components/token-pitching/create-token-pitch-modal"
import EcosystemPageLayout from "@/components/layout/ecosystem-page-layout"
import HorizontalCardGrid from "@/components/ui/horizontal-card-grid"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface TokenPitch {
  id: string
  name: string
  symbol: string
  chain: string
  description: string
  aiScore: number
  communityScore: number
  simulation: string
  creator: {
    name: string
    avatar?: string
    reputation: number
  }
  comments: number
  likes: number
  dislikes: number
  staked: number
}

export default function TokenPitchingClientPage() {
  const router = useRouter()
  const { connected } = useWeb3()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("trending")
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [tokenPitches, setTokenPitches] = useState<TokenPitch[]>([
    {
      id: "1",
      name: "ClimateDAO Token",
      symbol: "CDT",
      chain: "Ethereum",
      description:
        "A governance token for funding climate change initiatives with carbon offset mechanisms and quadratic voting.",
      aiScore: 92,
      communityScore: 78,
      simulation: "+45%",
      creator: {
        name: "TokenDesigner",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 87,
      },
      comments: 24,
      likes: 156,
      dislikes: 12,
      staked: 5600,
    },
    {
      id: "2",
      name: "DecentraLearn",
      symbol: "DLEARN",
      chain: "Solana",
      description:
        "A decentralized education platform token that rewards learners and educators through proof-of-knowledge mechanisms.",
      aiScore: 89,
      communityScore: 82,
      simulation: "+38%",
      creator: {
        name: "EduBlockchain",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 75,
      },
      comments: 31,
      likes: 142,
      dislikes: 8,
      staked: 4200,
    },
    {
      id: "3",
      name: "SupplyChainX",
      symbol: "SCX",
      chain: "Polygon",
      description:
        "Tokenizing supply chain verification with IoT integration for transparent product tracking and authenticity.",
      aiScore: 87,
      communityScore: 75,
      simulation: "+29%",
      creator: {
        name: "LogisticsGuru",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 68,
      },
      comments: 19,
      likes: 98,
      dislikes: 15,
      staked: 3100,
    },
    {
      id: "4",
      name: "HealthDAO",
      symbol: "HDAO",
      chain: "BSC",
      description: "Decentralized healthcare data management with privacy-preserving features and patient incentives.",
      aiScore: 85,
      communityScore: 79,
      simulation: "+32%",
      creator: {
        name: "MedTech",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 72,
      },
      comments: 27,
      likes: 115,
      dislikes: 9,
      staked: 3800,
    },
    {
      id: "5",
      name: "ArtistCollective",
      symbol: "ARTC",
      chain: "Ethereum",
      description:
        "Supporting digital artists through fractional ownership and royalty distribution on secondary sales.",
      aiScore: 83,
      communityScore: 88,
      simulation: "+41%",
      creator: {
        name: "CreativeDAO",
        avatar: "/placeholder.svg?height=40&width=40",
        reputation: 81,
      },
      comments: 35,
      likes: 178,
      dislikes: 7,
      staked: 4900,
    },
  ])

  // Filter token pitches based on active tab, category, and search query
  const filteredPitches = tokenPitches.filter((pitch) => {
    // Filter by category (chain)
    if (activeCategory !== "all" && pitch.chain.toLowerCase() !== activeCategory.toLowerCase()) return false

    // Filter by search query
    if (
      searchQuery &&
      !pitch.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !pitch.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    return true
  })

  // Handle like, dislike, comment, share, and compare actions
  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setTokenPitches((prev) => prev.map((pitch) => (pitch.id === id ? { ...pitch, likes: pitch.likes + 1 } : pitch)))
    toast({
      title: "Liked!",
      description: `You liked ${tokenPitches.find((p) => p.id === id)?.name}`,
    })
  }

  const handleDislike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setTokenPitches((prev) =>
      prev.map((pitch) => (pitch.id === id ? { ...pitch, dislikes: pitch.dislikes + 1 } : pitch)),
    )
    toast({
      title: "Disliked",
      description: `You disliked ${tokenPitches.find((p) => p.id === id)?.name}`,
    })
  }

  const handleComment = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Comment",
      description: `Add a comment to ${tokenPitches.find((p) => p.id === id)?.name}`,
    })
  }

  const handleShare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Shared!",
      description: `${tokenPitches.find((p) => p.id === id)?.name} has been shared`,
    })
  }

  const handleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Compare",
      description: `Comparing ${tokenPitches.find((p) => p.id === id)?.name} with other tokens`,
    })
  }

  const navigateToDetails = (id: string) => {
    router.push(`/token-pitching/view/${id}`)
  }

  return (
    <EcosystemPageLayout
      title="Token Pitching"
      description="Simulate and evaluate token ideas in a risk-free environment with AI feedback and reputation scoring. Test your tokenomics across multiple chains before launching."
      icon={<TrendingUp className="h-6 w-6" />}
      particleColor="#10b981"
    >
      {/* How It Works Content */}
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-1">
            <span className="text-green-500 font-bold">1</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Design Your Token</h3>
            <p className="text-white/70">
              Create your token's economics, distribution, and utility in our risk-free simulator.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-1">
            <span className="text-green-500 font-bold">2</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Get AI & Community Feedback</h3>
            <p className="text-white/70">
              Receive detailed AI analysis and peer-to-peer "roasting" to improve your design.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3 mt-1">
            <span className="text-green-500 font-bold">3</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Stake & Earn Reputation</h3>
            <p className="text-white/70">Stake on promising tokens and earn reputation points for quality designs.</p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border border-green-500/30 px-6 py-2 text-base"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Pitch Your Token
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

      {/* Token Pitches Section */}
      <HorizontalCardGrid
        title="Token Pitches"
        action={
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search tokens..."
                className="pl-10 border-green-500/20 bg-background/50 text-white placeholder:text-white/40 w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-green-500/20 text-white hover:bg-green-500/10">
                  <Filter className="h-4 w-4 mr-2" />
                  Chain
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border-green-500/20">
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "all" ? "bg-green-500/10" : ""}`}
                  onClick={() => setActiveCategory("all")}
                >
                  All Chains
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "ethereum" ? "bg-green-500/10" : ""}`}
                  onClick={() => setActiveCategory("ethereum")}
                >
                  Ethereum
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "solana" ? "bg-green-500/10" : ""}`}
                  onClick={() => setActiveCategory("solana")}
                >
                  Solana
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "polygon" ? "bg-green-500/10" : ""}`}
                  onClick={() => setActiveCategory("polygon")}
                >
                  Polygon
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "bsc" ? "bg-green-500/10" : ""}`}
                  onClick={() => setActiveCategory("bsc")}
                >
                  BSC
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[300px]">
              <TabsList className="bg-background/20 border border-green-500/10 p-1">
                <TabsTrigger
                  value="trending"
                  className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-500"
                >
                  Trending
                </TabsTrigger>
                <TabsTrigger
                  value="newest"
                  className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-500"
                >
                  Newest
                </TabsTrigger>
                <TabsTrigger
                  value="top-rated"
                  className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-500"
                >
                  Top Rated
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/30"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Pitch
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          {filteredPitches.map((pitch, index) => (
            <motion.div
              key={pitch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="p-4 border rounded-lg bg-background/50 backdrop-blur-sm cursor-pointer"
              style={{
                borderColor: "rgba(16, 185, 129, 0.2)",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)",
                borderColor: "rgba(16, 185, 129, 0.5)",
              }}
              onClick={() => navigateToDetails(pitch.id)}
            >
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-md bg-green-500/20 flex items-center justify-center text-green-500 mr-4">
                  <TrendingUp className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        {pitch.name} <span className="text-white/60">({pitch.symbol})</span>
                      </h3>
                      <div className="flex items-center mt-1">
                        <Badge className="bg-green-500/10 text-green-500 border-none mr-2">{pitch.chain}</Badge>
                        <div className="flex items-center text-white/60 text-sm">
                          <span>by</span>
                          <div className="flex items-center ml-1">
                            <Avatar className="h-5 w-5 mr-1">
                              <AvatarImage src={pitch.creator.avatar} />
                              <AvatarFallback className="bg-primary/20 text-primary text-[10px]">
                                {pitch.creator.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span>{pitch.creator.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="flex flex-col items-center justify-center bg-green-500/10 rounded-full w-14 h-14"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <motion.span
                          className="text-lg font-bold text-green-500"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {pitch.aiScore}
                        </motion.span>
                        <span className="text-[10px] text-white/60">AI Score</span>
                      </motion.div>

                      <motion.div
                        className="flex flex-col items-center justify-center bg-blue-500/10 rounded-full w-14 h-14"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <motion.span
                          className="text-lg font-bold text-blue-500"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {pitch.communityScore}
                        </motion.span>
                        <span className="text-[10px] text-white/60">Community</span>
                      </motion.div>
                    </div>
                  </div>

                  <p className="text-white/80 my-3">{pitch.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-white/70">
                        <span>Tokenomics</span>
                        <span>72/100</span>
                      </div>
                      <Progress value={72} className="h-1.5 bg-white/10" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-white/70">
                        <span>Use Case</span>
                        <span>85/100</span>
                      </div>
                      <Progress value={85} className="h-1.5 bg-white/10" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-white/70">
                        <span>Team</span>
                        <span>64/100</span>
                      </div>
                      <Progress value={64} className="h-1.5 bg-white/10" />
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-white/60" />
                        <span className="text-white/80">{pitch.comments}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4 text-white/60" />
                        <span className="text-white/80">{pitch.likes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsDown className="h-4 w-4 text-white/60" />
                        <span className="text-white/80">{pitch.dislikes}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-white/60" />
                        <span className="text-white/80">{pitch.staked} PPT</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/70 hover:text-white hover:bg-white/5"
                        onClick={(e) => handleLike(pitch.id, e)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Like
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white/70 hover:text-white hover:bg-white/5"
                        onClick={(e) => handleShare(pitch.id, e)}
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-500/20 text-green-500 hover:bg-green-500/10"
                        onClick={(e) => handleCompare(pitch.id, e)}
                      >
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Compare
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border border-green-500/30"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigateToDetails(pitch.id)
                        }}
                      >
                        View Details
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </HorizontalCardGrid>

      {/* Token Simulator Section */}
      <section id="simulator" className="py-12 bg-background/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4 font-mono">Token Simulator</h2>
            <p className="text-lg text-white/80">
              Design your token and receive AI feedback on its potential performance.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <TokenSimulator />
          </div>
        </div>
      </section>

      {/* Create Token Pitch Modal */}
      <CreateTokenPitchModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </EcosystemPageLayout>
  )
}
