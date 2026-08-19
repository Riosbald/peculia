"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Vote,
  Search,
  Filter,
  ChevronDown,
  Plus,
  Clock,
  Users,
  ArrowRight,
  MessageSquare,
  ThumbsUp,
  Share2,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useWeb3 } from "@/components/providers/web3-provider"
import EcosystemPageLayout from "@/components/layout/ecosystem-page-layout"
import HorizontalCardGrid from "@/components/ui/horizontal-card-grid"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

type ProposalType = "all" | "active" | "completed" | "upcoming"
type ProposalCategory = "all" | "platform" | "treasury" | "grants" | "protocol" | "community" | "governance"

interface Proposal {
  id: string
  title: string
  description: string
  type: ProposalType
  category: ProposalCategory
  creator: {
    name: string
    avatar?: string
  }
  votingPower: {
    for: number
    against: number
  }
  participants: number
  timeLeft?: string
  status: "active" | "passed" | "rejected" | "upcoming"
  backgroundColor?: string
}

export default function QuadraticFundingClientPage() {
  const router = useRouter()
  const { connected } = useWeb3()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<ProposalType>("all")
  const [activeCategory, setActiveCategory] = useState<ProposalCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load proposals
  useEffect(() => {
    const loadProposals = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockProposals: Proposal[] = [
        {
          id: "1",
          title: "Increase Prediction Market Fee from 1% to 1.5%",
          description:
            "Proposal to increase the platform fee on prediction markets to fund more community initiatives.",
          type: "active",
          category: "platform",
          creator: {
            name: "GovernanceDAO",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          votingPower: {
            for: 12500,
            against: 8700,
          },
          participants: 156,
          timeLeft: "3 days",
          status: "active",
          backgroundColor: "#eab308",
        },
        {
          id: "2",
          title: "Fund Community Education Program with 50,000 PPT",
          description: "Allocate treasury funds to create educational content about prediction markets and tokenomics.",
          type: "active",
          category: "treasury",
          creator: {
            name: "EducationDAO",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          votingPower: {
            for: 18900,
            against: 3200,
          },
          participants: 203,
          timeLeft: "5 days",
          status: "active",
          backgroundColor: "#eab308",
        },
        {
          id: "3",
          title: "Add Multi-Chain Support for Polygon and Solana",
          description:
            "Expand platform capabilities to support prediction markets and token pitching on additional chains.",
          type: "active",
          category: "protocol",
          creator: {
            name: "TechCouncil",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          votingPower: {
            for: 22400,
            against: 5600,
          },
          participants: 245,
          timeLeft: "2 days",
          status: "active",
          backgroundColor: "#eab308",
        },
        {
          id: "4",
          title: "Implement Quadratic Voting for All Platform Decisions",
          description: "Extend quadratic voting beyond funding to all governance decisions to prevent whale dominance.",
          type: "completed",
          category: "governance",
          creator: {
            name: "DemocracyDAO",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          votingPower: {
            for: 28700,
            against: 4300,
          },
          participants: 312,
          status: "passed",
          backgroundColor: "#eab308",
        },
        {
          id: "5",
          title: "Create Grants Program for AI Integration Projects",
          description: "Establish a 100,000 PPT grants program for developers building AI tools for the platform.",
          type: "completed",
          category: "grants",
          creator: {
            name: "AICouncil",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          votingPower: {
            for: 19500,
            against: 12800,
          },
          participants: 278,
          status: "passed",
          backgroundColor: "#eab308",
        },
        {
          id: "6",
          title: "Reduce Staking Requirements for Token Pitching",
          description: "Lower the minimum stake required to create a token pitch from 500 PPT to 250 PPT.",
          type: "completed",
          category: "platform",
          creator: {
            name: "TokenDAO",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          votingPower: {
            for: 9800,
            against: 15600,
          },
          participants: 187,
          status: "rejected",
          backgroundColor: "#eab308",
        },
        {
          id: "7",
          title: "Launch Community Ambassador Program",
          description: "Create a program to reward active community members who help onboard new users.",
          type: "upcoming",
          category: "community",
          creator: {
            name: "CommunityDAO",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          votingPower: {
            for: 0,
            against: 0,
          },
          participants: 0,
          timeLeft: "Starts in 2 days",
          status: "upcoming",
          backgroundColor: "#eab308",
        },
        {
          id: "8",
          title: "Integrate with Chainlink for External Data Verification",
          description: "Partner with Chainlink to improve the accuracy of prediction market outcomes.",
          type: "upcoming",
          category: "protocol",
          creator: {
            name: "OracleDAO",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          votingPower: {
            for: 0,
            against: 0,
          },
          participants: 0,
          timeLeft: "Starts in 5 days",
          status: "upcoming",
          backgroundColor: "#eab308",
        },
      ]

      setProposals(mockProposals)
      setIsLoading(false)
    }

    loadProposals()
  }, [])

  // Filter proposals based on active tab, category, and search query
  const filteredProposals = proposals.filter((proposal) => {
    // Filter by type
    if (activeTab !== "all" && proposal.type !== activeTab) return false

    // Filter by category
    if (activeCategory !== "all" && proposal.category !== activeCategory) return false

    // Filter by search query
    if (searchQuery && !proposal.title.toLowerCase().includes(searchQuery.toLowerCase())) return false

    return true
  })

  const getCategoryColor = (category: ProposalCategory) => {
    switch (category) {
      case "platform":
        return "bg-blue-500/20 text-blue-500"
      case "treasury":
        return "bg-green-500/20 text-green-500"
      case "grants":
        return "bg-purple-500/20 text-purple-500"
      case "protocol":
        return "bg-pink-500/20 text-pink-500"
      case "community":
        return "bg-orange-500/20 text-orange-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500/20 text-blue-500"
      case "passed":
        return "bg-green-500/20 text-green-500"
      case "rejected":
        return "bg-red-500/20 text-red-500"
      case "upcoming":
        return "bg-yellow-500/20 text-yellow-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Liked!",
      description: `You liked the proposal: ${proposals.find((p) => p.id === id)?.title}`,
    })
  }

  const handleComment = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Comment",
      description: `Add a comment to the proposal: ${proposals.find((p) => p.id === id)?.title}`,
    })
  }

  const handleShare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Shared!",
      description: `The proposal has been shared: ${proposals.find((p) => p.id === id)?.title}`,
    })
  }

  const handleVote = (id: string, voteType: "for" | "against", e: React.MouseEvent) => {
    e.stopPropagation()

    // Update the proposal with the user's vote
    setProposals((prev) =>
      prev.map((proposal) => {
        if (proposal.id === id) {
          const updatedVotingPower = {
            ...proposal.votingPower,
            [voteType]: proposal.votingPower[voteType] + 35, // Assuming 35 is the user's voting power
          }
          return {
            ...proposal,
            votingPower: updatedVotingPower,
            participants: proposal.participants + 1,
          }
        }
        return proposal
      }),
    )

    toast({
      title: `Voted ${voteType.toUpperCase()}!`,
      description: `You voted ${voteType} the proposal: ${proposals.find((p) => p.id === id)?.title}`,
    })
  }

  const navigateToDetails = (id: string) => {
    router.push(`/quadratic-funding/view/${id}`)
  }

  const handleCreateProposal = () => {
    toast({
      title: "Create Proposal",
      description: "The proposal creation modal would open here",
    })
    setIsCreateModalOpen(true)
  }

  return (
    <EcosystemPageLayout
      title="Quadratic Governance"
      description="Participate in fair governance with √(PPT) voting power to prevent whale dominance. Our quadratic voting system ensures democratic decision-making."
      icon={<Vote className="h-6 w-6" />}
      particleColor="#eab308"
    >
      {/* How It Works Content */}
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3 mt-1">
            <span className="text-yellow-500 font-bold">1</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Browse Active Proposals</h3>
            <p className="text-white/70">
              Explore governance proposals across different categories that shape the future of the platform.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3 mt-1">
            <span className="text-yellow-500 font-bold">2</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Cast Your Vote</h3>
            <p className="text-white/70">
              Vote with your square root voting power (√PPT) to ensure fair representation regardless of token holdings.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3 mt-1">
            <span className="text-yellow-500 font-bold">3</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Submit Your Own Proposals</h3>
            <p className="text-white/70">
              Create governance proposals to suggest improvements or changes to the platform.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border border-yellow-500/30 px-6 py-2 text-base"
            onClick={handleCreateProposal}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Proposal
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

      {/* Quadratic Voting Explainer */}
      <section className="py-12 bg-background/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-5xl mx-auto bg-background/20 border border-yellow-500/20 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ borderColor: "rgba(234, 179, 8, 0.3)", boxShadow: "0 8px 30px rgba(234, 179, 8, 0.1)" }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-4 font-mono">How Quadratic Voting Works</h2>
                <p className="text-white/80 mb-4">
                  Quadratic voting gives users voting power equal to the square root of their PPT holdings. This
                  prevents large token holders from dominating governance decisions.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-md bg-yellow-500/10 flex items-center justify-center mr-4 text-yellow-500 font-mono">
                      100
                    </div>
                    <div>
                      <div className="text-white font-medium">100 PPT = 10 Votes</div>
                      <div className="text-white/60 text-sm">√100 = 10 voting power</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-md bg-yellow-500/10 flex items-center justify-center mr-4 text-yellow-500 font-mono">
                      10K
                    </div>
                    <div>
                      <div className="text-white font-medium">10,000 PPT = 100 Votes</div>
                      <div className="text-white/60 text-sm">√10,000 = 100 voting power</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-md bg-yellow-500/10 flex items-center justify-center mr-4 text-yellow-500 font-mono">
                      1M
                    </div>
                    <div>
                      <div className="text-white font-medium">1,000,000 PPT = 1,000 Votes</div>
                      <div className="text-white/60 text-sm">√1,000,000 = 1,000 voting power</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border border-yellow-500/30"
                    onClick={() => {
                      toast({
                        title: "Learn More",
                        description: "Navigating to detailed information about quadratic voting",
                      })
                    }}
                  >
                    Learn More About Quadratic Voting
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>

              <div className="w-full md:w-1/3">
                <motion.div
                  className="bg-background/30 border border-yellow-500/20 rounded-lg p-4"
                  whileHover={{ scale: 1.02, borderColor: "rgba(234, 179, 8, 0.4)" }}
                >
                  <h3 className="text-lg font-medium text-white mb-3">Your Voting Power</h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-white/70 mb-1">
                        <span>PPT Balance</span>
                        <span>1,225 PPT</span>
                      </div>
                      <Progress value={100} className="h-1.5 bg-white/10" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm text-white/70 mb-1">
                        <span>Voting Power</span>
                        <span>35 Votes (√1,225)</span>
                      </div>
                      <Progress value={35} className="h-1.5 bg-white/10" />
                    </div>

                    <div className="pt-2">
                      <Button
                        className="w-full bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border border-yellow-500/30"
                        onClick={() => {
                          toast({
                            title: "Cast Vote",
                            description: "Select a proposal to cast your vote",
                          })
                        }}
                      >
                        <Vote className="h-4 w-4 mr-2" />
                        Cast Your Vote
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Governance Proposals Section */}
      <HorizontalCardGrid
        title="Governance Proposals"
        description="Browse and vote on proposals that shape the future of the platform. Your vote is weighted by the square root of your PPT holdings."
        action={
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                placeholder="Search proposals..."
                className="pl-10 border-yellow-500/20 bg-background/50 text-white placeholder:text-white/40 w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-yellow-500/20 text-white hover:bg-yellow-500/10">
                  <Filter className="h-4 w-4 mr-2" />
                  Category
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border-yellow-500/20">
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "all" ? "bg-yellow-500/10" : ""}`}
                  onClick={() => setActiveCategory("all")}
                >
                  All Categories
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "platform" ? "bg-yellow-500/10" : ""}`}
                  onClick={() => setActiveCategory("platform")}
                >
                  Platform
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "treasury" ? "bg-yellow-500/10" : ""}`}
                  onClick={() => setActiveCategory("treasury")}
                >
                  Treasury
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "grants" ? "bg-yellow-500/10" : ""}`}
                  onClick={() => setActiveCategory("grants")}
                >
                  Grants
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "protocol" ? "bg-yellow-500/10" : ""}`}
                  onClick={() => setActiveCategory("protocol")}
                >
                  Protocol
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-white/80 cursor-pointer ${activeCategory === "community" ? "bg-yellow-500/10" : ""}`}
                  onClick={() => setActiveCategory("community")}
                >
                  Community
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      >
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ProposalType)} className="mb-8">
          <TabsList className="bg-background/20 border border-yellow-500/20 p-1">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-500"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-500"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-500"
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-500"
            >
              Upcoming
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-white/50 animate-pulse">Loading proposals...</div>
          </div>
        ) : (
          <>
            {filteredProposals.length === 0 ? (
              <motion.div
                className="flex flex-col items-center justify-center h-64 bg-background/30 rounded-lg border border-yellow-500/20 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Vote className="h-12 w-12 text-yellow-500/30 mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">No proposals found</h3>
                <p className="text-white/60 text-center mb-6">
                  {searchQuery
                    ? "No proposals match your search criteria."
                    : "There are no proposals in this category yet."}
                </p>
                <Button
                  className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border border-yellow-500/30"
                  onClick={handleCreateProposal}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create a Proposal
                </Button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredProposals.map((proposal, index) => (
                  <motion.div
                    key={proposal.id}
                    className="p-4 border rounded-lg bg-background/50 backdrop-blur-sm cursor-pointer"
                    style={{
                      borderColor: "rgba(234, 179, 8, 0.2)",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(234, 179, 8, 0.3)",
                      borderColor: "rgba(234, 179, 8, 0.5)",
                    }}
                    onClick={() => navigateToDetails(proposal.id)}
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-md bg-yellow-500/20 flex items-center justify-center text-yellow-500 mr-4">
                        <Vote className="h-6 w-6" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-bold text-lg">{proposal.title}</h3>

                          <div className="flex items-center space-x-2">
                            <Badge className={`${getCategoryColor(proposal.category)} border-none text-xs`}>
                              {proposal.category.charAt(0).toUpperCase() + proposal.category.slice(1)}
                            </Badge>

                            <Badge className={`${getStatusColor(proposal.status)} border-none text-xs`}>
                              {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center mt-2 text-xs text-white/60">
                          <Avatar className="h-5 w-5 mr-1.5">
                            <AvatarImage src={proposal.creator.avatar} />
                            <AvatarFallback className="bg-primary/20 text-primary text-[8px]">
                              {proposal.creator.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{proposal.creator.name}</span>
                          <span className="mx-2">•</span>
                          {proposal.timeLeft && (
                            <>
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{proposal.timeLeft}</span>
                              <span className="mx-2">•</span>
                            </>
                          )}
                          <Users className="h-3 w-3 mr-1" />
                          <span>{proposal.participants} participants</span>
                        </div>

                        <p className="text-white/80 my-3">{proposal.description}</p>

                        {proposal.status !== "upcoming" && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-white/70 mb-1">
                              <span>Voting Results</span>
                              <span>
                                {proposal.votingPower.for} For / {proposal.votingPower.against} Against
                              </span>
                            </div>
                            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden flex">
                              <motion.div
                                className="h-full bg-green-500"
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${(proposal.votingPower.for / (proposal.votingPower.for + proposal.votingPower.against)) * 100}%`,
                                }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                              />
                              <motion.div
                                className="h-full bg-red-500"
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${(proposal.votingPower.against / (proposal.votingPower.for + proposal.votingPower.against)) * 100}%`,
                                }}
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
                              onClick={(e) => handleLike(proposal.id, e)}
                            >
                              <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />
                              <span className="text-xs">Like</span>
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
                              onClick={(e) => handleComment(proposal.id, e)}
                            >
                              <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                              <span className="text-xs">Comment</span>
                            </Button>

                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
                              onClick={(e) => handleShare(proposal.id, e)}
                            >
                              <Share2 className="h-3.5 w-3.5 mr-1.5" />
                              <span className="text-xs">Share</span>
                            </Button>
                          </div>

                          {proposal.status === "active" ? (
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                className="h-8 bg-green-500/20 text-green-500 hover:bg-green-500/30 border border-green-500/30"
                                onClick={(e) => handleVote(proposal.id, "for", e)}
                              >
                                <Zap className="h-3.5 w-3.5 mr-1.5" />
                                Vote For
                              </Button>

                              <Button
                                size="sm"
                                className="h-8 bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30"
                                onClick={(e) => handleVote(proposal.id, "against", e)}
                              >
                                <Zap className="h-3.5 w-3.5 mr-1.5" />
                                Vote Against
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              className="h-8 bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border border-yellow-500/30"
                              onClick={(e) => {
                                e.stopPropagation()
                                navigateToDetails(proposal.id)
                              }}
                            >
                              View Details
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

      {/* Voting Stats Section */}
      <section className="py-12 bg-background/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4 font-mono">Governance Statistics</h2>
            <p className="text-lg text-white/80">Platform-wide governance metrics and participation statistics.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              className="bg-background/20 border border-yellow-500/20 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(234, 179, 8, 0.3)",
                borderColor: "rgba(234, 179, 8, 0.5)",
              }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/10 text-yellow-500 mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Vote className="h-5 w-5" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Governance Proposals</h3>
              <div className="text-3xl font-bold text-yellow-500 mb-2">120+</div>
              <p className="text-white/70">Total proposals submitted since platform launch, with 68% passing rate.</p>
            </motion.div>

            <motion.div
              className="bg-background/20 border border-yellow-500/20 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(234, 179, 8, 0.3)",
                borderColor: "rgba(234, 179, 8, 0.5)",
              }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/10 text-yellow-500 mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Users className="h-5 w-5" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Unique Voters</h3>
              <div className="text-3xl font-bold text-yellow-500 mb-2">12,400+</div>
              <p className="text-white/70">
                Active participants in governance with an average participation rate of 68%.
              </p>
            </motion.div>

            <motion.div
              className="bg-background/20 border border-yellow-500/20 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(234, 179, 8, 0.3)",
                borderColor: "rgba(234, 179, 8, 0.5)",
              }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/10 text-yellow-500 mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Zap className="h-5 w-5" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Voting Power</h3>
              <div className="text-3xl font-bold text-yellow-500 mb-2">1.2M</div>
              <p className="text-white/70">Total quadratic voting power used across all governance decisions.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </EcosystemPageLayout>
  )
}
