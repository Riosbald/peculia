"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Dices,
  Shield,
  Search,
  Lock,
  Globe,
  Users,
  Plus,
  Filter,
  ChevronDown,
  Coins,
  ThumbsUp,
  MessageSquare,
  Share2,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useWeb3 } from "@/components/providers/web3-provider"
import CreatePredictionModal from "@/components/prediction-markets/create-prediction-modal"
import EcosystemPageLayout from "@/components/layout/ecosystem-page-layout"
import HorizontalCardGrid from "@/components/ui/horizontal-card-grid"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type PredictionType = "all" | "public" | "private" | "invite-only" | "my-bets"
type PredictionCategory = "all" | "finance" | "politics" | "sports" | "technology" | "entertainment" | "other"

interface Participant {
  id: string
  name: string
  avatar?: string
}

interface Prediction {
  id: string
  title: string
  type: "public" | "private" | "invite-only"
  amount: number
  daysLeft: number
  participants: Participant[]
  category: PredictionCategory
  backgroundColor: string
}

export default function PredictionMarketsClientPage() {
  const { connected } = useWeb3()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<PredictionType>("all")
  const [activeCategory, setActiveCategory] = useState<PredictionCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load predictions
  useEffect(() => {
    const loadPredictions = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockPredictions: Prediction[] = [
        {
          id: "1",
          title: "Wizkid will win a Grammy Award in 2025",
          type: "private",
          amount: 2800,
          daysLeft: 110,
          participants: [
            { id: "1", name: "AfroBeats", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "2", name: "MusicFan", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "3", name: "WizkidFC", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "4", name: "GrammyExpert", avatar: "/placeholder.svg?height=40&width=40" },
          ],
          category: "entertainment",
          backgroundColor: "#7e22ce", // Purple
        },
        {
          id: "2",
          title: "Lagos traffic will reduce by 30% after implementation of new transport system",
          type: "public",
          amount: 4500,
          daysLeft: 15,
          participants: [
            { id: "5", name: "LagosResident", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "6", name: "TrafficAnalyst", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "7", name: "TransportGuru", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "8", name: "CityPlanner", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "9", name: "Commuter", avatar: "/placeholder.svg?height=40&width=40" },
          ],
          category: "other",
          backgroundColor: "#047857", // Green
        },
        {
          id: "3",
          title: "Dollar to Naira exchange rate will exceed 1:1500 by end of 2024",
          type: "invite-only",
          amount: 5000,
          daysLeft: 294,
          participants: [
            { id: "10", name: "ForexTrader", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "11", name: "EconomistNG", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "12", name: "FinanceExpert", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "13", name: "BankAnalyst", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "14", name: "InvestorPro", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "15", name: "MarketWatcher", avatar: "/placeholder.svg?height=40&width=40" },
          ],
          category: "finance",
          backgroundColor: "#9a3412", // Brown
        },
        {
          id: "4",
          title: "At least 3 African fintech startups will achieve unicorn status in 2025",
          type: "invite-only",
          amount: 3000,
          daysLeft: 294,
          participants: [
            { id: "16", name: "VentureCapital", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "17", name: "StartupFounder", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "18", name: "TechInvestor", avatar: "/placeholder.svg?height=40&width=40" },
          ],
          category: "finance",
          backgroundColor: "#166534", // Dark green
        },
        {
          id: "5",
          title: "Wizkid's next album will top Billboard World Albums chart",
          type: "private",
          amount: 1200,
          daysLeft: 45,
          participants: [
            { id: "19", name: "MusicCritic", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "20", name: "ChartAnalyst", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "21", name: "AfrobeatsLover", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "22", name: "RecordLabel", avatar: "/placeholder.svg?height=40&width=40" },
          ],
          category: "entertainment",
          backgroundColor: "#7e22ce", // Purple
        },
        {
          id: "6",
          title: "Democrats will win the 2024 US presidential election",
          type: "private",
          amount: 7800,
          daysLeft: 110,
          participants: [
            { id: "23", name: "PoliticalAnalyst", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "24", name: "HistoryBuff", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "25", name: "NewsJunkie", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "26", name: "ElectionExpert", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "27", name: "PollWatcher", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "28", name: "VotingAnalyst", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "29", name: "CampaignManager", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "30", name: "MediaSpecialist", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "31", name: "DebateCoach", avatar: "/placeholder.svg?height=40&width=40" },
            { id: "32", name: "StrategyConsultant", avatar: "/placeholder.svg?height=40&width=40" },
          ],
          category: "politics",
          backgroundColor: "#be123c", // Red
        },
      ]

      setPredictions(mockPredictions)
      setIsLoading(false)
    }

    loadPredictions()
  }, [])

  // Filter predictions based on active tab, category, and search query
  const filteredPredictions = predictions.filter((prediction) => {
    // Filter by type
    if (activeTab !== "all" && activeTab !== "my-bets") {
      if (prediction.type !== activeTab) return false
    }

    // Filter by category
    if (activeCategory !== "all" && prediction.category !== activeCategory) return false

    // Filter by search query
    if (searchQuery && !prediction.title.toLowerCase().includes(searchQuery.toLowerCase())) return false

    return true
  })

  return (
    <EcosystemPageLayout
      title="Prediction Markets"
      description="Create and participate in public or private prediction markets with AI-generated odds. Our platform uses AI swarm verification for real-time settlement with IPFS proofs."
      icon={<Dices className="h-6 w-6" />}
      particleColor="#7e22ce"
    >
      {/* How It Works Content */}
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-1">
            <span className="text-purple-500 font-bold">1</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Create or Join Predictions</h3>
            <p className="text-white/70">
              Create your own prediction market or join existing ones. Invite friends to private groups or participate
              in public markets.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-1">
            <span className="text-purple-500 font-bold">2</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Place Your Wager</h3>
            <p className="text-white/70">
              Stake PPT tokens on your prediction. Funds are locked in smart contract escrow until verification.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-1">
            <span className="text-purple-500 font-bold">3</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">AI Verification & Payout</h3>
            <p className="text-white/70">
              Our AI agent swarm verifies outcomes autonomously. Winners receive automatic payouts upon verification.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            className="bg-purple-500/20 text-purple-500 hover:bg-purple-500/30 border border-purple-500/30 px-6 py-2 text-base"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Prediction
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

      {/* Privacy Info Section */}
      <section className="py-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 bg-background/50 backdrop-blur-sm rounded-lg border border-purple-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ borderColor: "rgba(126, 34, 206, 0.4)", boxShadow: "0 8px 30px rgba(126, 34, 206, 0.2)" }}
            >
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-purple-500" />
                  <span className="text-white/80">Most Bets are private, shared just among friends</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-500" />
                  <span className="text-white/80">Public Bets can be invite-only</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-purple-500/30 text-purple-500 hover:bg-purple-500/10"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Prediction
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Explore Markets Section */}
      <HorizontalCardGrid
        title="Explore Markets"
        action={
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search bet..."
                className="pl-10 border-purple-500/20 bg-background/50 text-white placeholder:text-white/40 w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-purple-500/20 text-white hover:bg-purple-500/10">
                  <Filter className="h-4 w-4 mr-2" />
                  Category
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border-purple-500/20">
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "all" ? "bg-purple-500/10" : ""}`}
                  onClick={() => setActiveCategory("all")}
                >
                  All Categories
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "finance" ? "bg-purple-500/10" : ""}`}
                  onClick={() => setActiveCategory("finance")}
                >
                  Finance
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "politics" ? "bg-purple-500/10" : ""}`}
                  onClick={() => setActiveCategory("politics")}
                >
                  Politics
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "sports" ? "bg-purple-500/10" : ""}`}
                  onClick={() => setActiveCategory("sports")}
                >
                  Sports
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "technology" ? "bg-purple-500/10" : ""}`}
                  onClick={() => setActiveCategory("technology")}
                >
                  Technology
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "entertainment" ? "bg-purple-500/10" : ""}`}
                  onClick={() => setActiveCategory("entertainment")}
                >
                  Entertainment
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "other" ? "bg-purple-500/10" : ""}`}
                  onClick={() => setActiveCategory("other")}
                >
                  Other
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      >
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as PredictionType)} className="mb-8">
          <TabsList className="bg-background/20 border border-purple-500/20 p-1">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="public"
              className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
            >
              Public
            </TabsTrigger>
            <TabsTrigger
              value="private"
              className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
            >
              Private
            </TabsTrigger>
            <TabsTrigger
              value="invite-only"
              className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
            >
              Invite Only
            </TabsTrigger>
            <TabsTrigger
              value="my-bets"
              className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
            >
              My Bets
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-white/50 animate-pulse">Loading predictions...</div>
          </div>
        ) : (
          <>
            {filteredPredictions.length === 0 ? (
              <motion.div
                className="flex flex-col items-center justify-center h-64 bg-background/30 rounded-lg border border-purple-500/20 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Dices className="h-12 w-12 text-purple-500/30 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No predictions found</h3>
                <p className="text-white/60 text-center mb-6">
                  {searchQuery
                    ? "No predictions match your search criteria."
                    : "There are no predictions in this category yet."}
                </p>
                <Button
                  className="bg-purple-500/20 text-purple-500 hover:bg-purple-500/30 border border-purple-500/30"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create a Prediction
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredPredictions.map((prediction, index) => (
                  <motion.div
                    key={prediction.id}
                    className="p-4 border rounded-lg bg-background/50 backdrop-blur-sm"
                    style={{
                      borderColor: "rgba(126, 34, 206, 0.2)",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(126, 34, 206, 0.3)",
                      borderColor: "rgba(126, 34, 206, 0.5)",
                    }}
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-md bg-purple-500/20 flex items-center justify-center text-purple-500 mr-4">
                        🔮
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-bold text-lg">{prediction.title}</h3>

                          <div className="flex items-center space-x-2">
                            <Badge
                              className={`
                              ${
                                prediction.type === "public"
                                  ? "bg-green-500/20 text-green-500"
                                  : prediction.type === "private"
                                    ? "bg-blue-500/20 text-blue-500"
                                    : "bg-yellow-500/20 text-yellow-500"
                              } 
                              border-none text-xs py-1
                            `}
                            >
                              {prediction.type === "public" ? (
                                <Globe className="h-3 w-3 mr-1" />
                              ) : (
                                <Lock className="h-3 w-3 mr-1" />
                              )}
                              {prediction.type.toUpperCase()}
                            </Badge>

                            <Badge className="bg-purple-500/20 text-purple-500 border-none text-xs">
                              {prediction.category.charAt(0).toUpperCase() + prediction.category.slice(1)}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center mt-2 text-xs text-white/60">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{prediction.daysLeft} days left</span>
                          <span className="mx-2">•</span>
                          <span>{prediction.amount} PPT</span>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex -space-x-2">
                            {prediction.participants.slice(0, 5).map((participant) => (
                              <Avatar key={participant.id} className="h-6 w-6 border border-white/20">
                                <AvatarImage src={participant.avatar} />
                                <AvatarFallback className="bg-primary/20 text-primary text-[10px]">
                                  {participant.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {prediction.participants.length > 5 && (
                              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white/80 border border-white/20">
                                +{prediction.participants.length - 5}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
                              onClick={(e) => {
                                e.stopPropagation()
                                alert(`Liked prediction: ${prediction.title}`)
                              }}
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
                                alert(`Comment on prediction: ${prediction.title}`)
                              }}
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
                                alert(`Share prediction: ${prediction.title}`)
                              }}
                            >
                              <Share2 className="h-3.5 w-3.5 mr-1.5" />
                              <span className="text-xs">Share</span>
                            </Button>

                            <Button
                              size="sm"
                              className="h-8 bg-purple-500/20 text-purple-500 hover:bg-purple-500/30 border border-purple-500/30"
                              onClick={() => {
                                window.location.href = `/prediction-markets/view/${prediction.id}`
                              }}
                            >
                              <span className="text-xs">Join Bet</span>
                              <ArrowRight className="h-3 w-3 ml-1.5" />
                            </Button>
                          </div>
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

      {/* Features Section */}
      <section className="py-12 bg-background/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4 font-mono">Platform Features</h2>
            <p className="text-lg text-white/80">
              Our prediction markets combine AI verification, smart contracts, and social features for a seamless
              experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              className="bg-background/20 border border-purple-500/20 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(126, 34, 206, 0.3)",
                borderColor: "rgba(126, 34, 206, 0.5)",
              }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Users className="h-5 w-5" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Private Groups</h3>
              <p className="text-white/70">
                Create private prediction groups with friends. Invite-only access ensures your wagers stay within your
                circle.
              </p>
            </motion.div>

            <motion.div
              className="bg-background/20 border border-purple-500/20 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(126, 34, 206, 0.3)",
                borderColor: "rgba(126, 34, 206, 0.5)",
              }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Shield className="h-5 w-5" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">AI Verification</h3>
              <p className="text-white/70">
                Our AI swarm verifies outcomes by analyzing multiple data sources, ensuring fair and accurate
                settlements.
              </p>
            </motion.div>

            <motion.div
              className="bg-background/20 border border-purple-500/20 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(126, 34, 206, 0.3)",
                borderColor: "rgba(126, 34, 206, 0.5)",
              }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Coins className="h-5 w-5" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Contract Escrow</h3>
              <p className="text-white/70">
                All wagers are secured in smart contract escrow. Funds are only released after verified outcomes with
                auto-payouts.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Create Prediction Modal */}
      <CreatePredictionModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </EcosystemPageLayout>
  )
}
