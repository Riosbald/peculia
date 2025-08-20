"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Vote,
  Users,
  Share2,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Coins,
  History,
  Eye,
  FileText,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useWeb3 } from "@/components/providers/web3-provider"
import { useMobile } from "@/hooks/use-mobile"

interface ProposalDetailClientPageProps {
  id: string
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

interface Voter {
  id: string
  name: string
  avatar?: string
  vote: "for" | "against"
  votingPower: number
  timestamp: string
}

interface ProposalDetail {
  id: string
  title: string
  description: string
  fullDescription: string
  category: "platform" | "treasury" | "grants" | "protocol" | "community"
  creator: {
    id: string
    name: string
    avatar?: string
  }
  votingPower: {
    for: number
    against: number
  }
  voters: Voter[]
  comments: Comment[]
  createdAt: string
  expiresAt: string
  status: "active" | "passed" | "rejected" | "upcoming"
  implementation: string
  tags: string[]
  backgroundColor: string
}

export default function ProposalDetailClientPage({ id }: ProposalDetailClientPageProps) {
  const { connected, address } = useWeb3()
  const [proposal, setProposal] = useState<ProposalDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTab, setSelectedTab] = useState("overview")
  const [userVote, setUserVote] = useState<"for" | "against" | null>(null)
  const [userVotingPower, setUserVotingPower] = useState(0)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const fetchProposal = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data based on the ID
      const mockProposals: Record<string, ProposalDetail> = {
        "1": {
          id: "1",
          title: "Increase Prediction Market Fee from 1% to 1.5%",
          description:
            "Proposal to increase the platform fee on prediction markets to fund more community initiatives.",
          fullDescription: `
            ## Background
            
            The current platform fee for prediction markets is set at 1%. This fee is used to fund platform development, maintenance, and community initiatives. However, as the platform has grown, we've identified additional community initiatives that would benefit from increased funding.
            
            ## Proposal
            
            This proposal suggests increasing the platform fee from 1% to 1.5%. The additional 0.5% would be allocated specifically to community initiatives, including:
            
            1. Educational content creation
            2. Community-led events and hackathons
            3. Grants for developers building on the platform
            4. Marketing and outreach efforts
            
            ## Financial Impact
            
            Based on current platform usage, this fee increase would generate an additional 50,000 PPT per month for community initiatives. This would allow us to fund approximately 10 additional community projects per month.
            
            ## Implementation Timeline
            
            If approved, the fee increase would be implemented within 30 days of the proposal passing. All prediction markets created after the implementation date would be subject to the new fee structure.
          `,
          category: "platform",
          creator: {
            id: "creator1",
            name: "GovernanceDAO",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          votingPower: {
            for: 12500,
            against: 8700,
          },
          voters: [
            {
              id: "v1",
              name: "GovernanceExpert",
              avatar: "/placeholder.svg?height=40&width=40",
              vote: "for",
              votingPower: 500,
              timestamp: "3 days ago",
            },
            {
              id: "v2",
              name: "PlatformUser",
              avatar: "/placeholder.svg?height=40&width=40",
              vote: "against",
              votingPower: 300,
              timestamp: "2 days ago",
            },
            {
              id: "v3",
              name: "CommunityBuilder",
              avatar: "/placeholder.svg?height=40&width=40",
              vote: "for",
              votingPower: 800,
              timestamp: "1 day ago",
            },
          ],
          comments: [
            {
              id: "c1",
              user: {
                id: "u1",
                name: "PredictionExpert",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              text: "I support this proposal as it will provide much-needed funding for community initiatives. The 0.5% increase is minimal for users but will have a significant impact on our ability to grow the platform.",
              timestamp: "2 days ago",
              likes: 15,
            },
            {
              id: "c2",
              user: {
                id: "u2",
                name: "TokenHolder",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              text: "I'm concerned that increasing fees might discourage new users from joining the platform. Could we consider alternative funding sources?",
              timestamp: "1 day ago",
              likes: 8,
            },
          ],
          createdAt: "5 days ago",
          expiresAt: "2 days from now",
          status: "active",
          implementation: "Smart contract update to adjust fee parameters",
          tags: ["fees", "platform", "community", "funding"],
          backgroundColor: "#eab308",
        },
        "2": {
          id: "2",
          title: "Fund Community Education Program with 50,000 PPT",
          description: "Allocate treasury funds to create educational content about prediction markets and tokenomics.",
          fullDescription: `
            ## Background
            
            Education is a critical component of platform adoption. Many potential users are unfamiliar with prediction markets, tokenomics, and blockchain technology in general. By creating high-quality educational content, we can lower the barrier to entry and increase platform adoption.
            
            ## Proposal
            
            This proposal suggests allocating 50,000 PPT from the treasury to fund a comprehensive educational program. The program would include:
            
            1. Video tutorials on how to use the platform
            2. Written guides on prediction markets and tokenomics
            3. Interactive workshops and webinars
            4. Translations of educational materials into multiple languages
            
            ## Expected Outcomes
            
            We expect this educational program to result in:
            
            - 20% increase in new user registrations
            - 15% increase in user retention
            - 25% increase in prediction market participation
            
            ## Implementation Timeline
            
            If approved, the educational program would begin within 14 days of the proposal passing. Content would be released on a regular schedule over the course of 6 months.
          `,
          category: "treasury",
          creator: {
            id: "creator2",
            name: "EducationDAO",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          votingPower: {
            for: 18900,
            against: 3200,
          },
          voters: [
            {
              id: "v4",
              name: "EducationAdvocate",
              avatar: "/placeholder.svg?height=40&width=40",
              vote: "for",
              votingPower: 700,
              timestamp: "4 days ago",
            },
            {
              id: "v5",
              name: "TreasuryGuardian",
              avatar: "/placeholder.svg?height=40&width=40",
              vote: "against",
              votingPower: 500,
              timestamp: "3 days ago",
            },
            {
              id: "v6",
              name: "ContentCreator",
              avatar: "/placeholder.svg?height=40&width=40",
              vote: "for",
              votingPower: 600,
              timestamp: "2 days ago",
            },
          ],
          comments: [
            {
              id: "c3",
              user: {
                id: "u3",
                name: "NewUser",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              text: "As a new user, I would greatly benefit from educational content. It took me a while to understand how prediction markets work, and I'm still learning about tokenomics.",
              timestamp: "3 days ago",
              likes: 20,
            },
            {
              id: "c4",
              user: {
                id: "u4",
                name: "TreasuryWatcher",
                avatar: "/placeholder.svg?height=40&width=40",
              },
              text: "While I support education, 50,000 PPT seems high. Could we start with a smaller amount and scale based on results?",
              timestamp: "2 days ago",
              likes: 5,
            },
          ],
          createdAt: "7 days ago",
          expiresAt: "3 days from now",
          status: "active",
          implementation: "Multi-signature treasury transaction",
          tags: ["education", "treasury", "content", "community"],
          backgroundColor: "#eab308",
        },
      }

      // Get the proposal based on the ID
      const proposalData = mockProposals[id]
      if (proposalData) {
        setProposal(proposalData)
        // Simulate user voting power if connected
        if (connected) {
          setUserVotingPower(Math.floor(Math.sqrt(1225))) // Assuming 1225 PPT tokens
        }
      }
      setIsLoading(false)
    }

    fetchProposal()
  }, [id, connected])

  const handleVote = (vote: "for" | "against") => {
    setUserVote(vote)
    setShowConfirmation(true)
  }

  const confirmVote = () => {
    if (!userVote) return

    // In a real app, this would submit the vote to the blockchain
    alert(`Vote cast: ${userVote.toUpperCase()} with ${userVotingPower} voting power`)
    setShowConfirmation(false)

    // Update the proposal with the user's vote
    if (proposal) {
      const updatedVotingPower = {
        ...proposal.votingPower,
        [userVote]: proposal.votingPower[userVote] + userVotingPower,
      }

      const updatedVoters = [
        ...proposal.voters,
        {
          id: address || "user",
          name: "You",
          vote: userVote,
          votingPower: userVotingPower,
          timestamp: "Just now",
        },
      ]

      setProposal({
        ...proposal,
        votingPower: updatedVotingPower,
        voters: updatedVoters,
      })
    }
  }

  const getCategoryColor = (category: string) => {
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
        return "bg-white/20 text-white"
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
        return "bg-white/20 text-white"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-3 w-3 mr-1" />
      case "passed":
        return <CheckCircle className="h-3 w-3 mr-1" />
      case "rejected":
        return <XCircle className="h-3 w-3 mr-1" />
      case "upcoming":
        return <Info className="h-3 w-3 mr-1" />
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-white/50 animate-pulse">Loading proposal details...</div>
          </div>
        </div>
      </div>
    )
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center items-center h-64">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Proposal Not Found</h2>
            <p className="text-white/70 mb-6">The proposal you're looking for doesn't exist or has been removed.</p>
            <Link href="/quadratic-funding">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Governance
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const forPercentage = (proposal.votingPower.for / (proposal.votingPower.for + proposal.votingPower.against)) * 100
  const againstPercentage =
    (proposal.votingPower.against / (proposal.votingPower.for + proposal.votingPower.against)) * 100

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
            <Link href="/quadratic-funding" className="hover:text-white transition-colors">
              Governance
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="text-white/90 truncate max-w-[200px]">{proposal.title}</span>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href="/quadratic-funding">
              <Button variant="ghost" size="sm" className="mr-2 -ml-2">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back</span>
              </Button>
            </Link>
            <Badge className={getCategoryColor(proposal.category)}>{proposal.category.toUpperCase()}</Badge>
            <Badge className={`ml-2 ${getStatusColor(proposal.status)}`}>
              {getStatusIcon(proposal.status)}
              {proposal.status.toUpperCase()}
            </Badge>
          </div>

          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {proposal.title}
          </motion.h1>

          <p className="text-white/80 mb-6 max-w-3xl">{proposal.description}</p>

          <div className="flex flex-wrap items-center text-sm text-white/70 mb-6">
            <div className="flex items-center mr-4 mb-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>Created {proposal.createdAt}</span>
            </div>
            <div className="flex items-center mr-4 mb-2">
              <Users className="h-4 w-4 mr-1" />
              <span>{proposal.voters.length} Voters</span>
            </div>
            <div className="flex items-center mr-4 mb-2">
              <Coins className="h-4 w-4 mr-1" />
              <span>{proposal.votingPower.for + proposal.votingPower.against} Total Voting Power</span>
            </div>
            <div className="flex items-center mb-2">
              <History className="h-4 w-4 mr-1" />
              <span>Expires {proposal.expiresAt}</span>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={proposal.creator.avatar} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {proposal.creator.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-white/70 text-sm">Created by </span>
              <span className="text-white font-medium">{proposal.creator.name}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {proposal.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-white/5 text-white/70 border-white/10">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Proposal details */}
          <div className="lg:col-span-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
              <TabsList className="bg-[#0a0a0a] border border-white/10">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-500"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="voters"
                  className="data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-500"
                >
                  Voters
                </TabsTrigger>
                <TabsTrigger
                  value="discussion"
                  className="data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-500"
                >
                  Discussion
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="bg-[#0a0a0a] border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-yellow-500" />
                      Proposal Details
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Detailed information about this governance proposal
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Current Voting Results</h3>
                        <div className="bg-[#1a1a1a] p-4 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <span className="text-green-500 font-medium mr-2">FOR</span>
                              <span className="text-white/70 text-sm">{proposal.votingPower.for} Voting Power</span>
                            </div>
                            <span className="text-white font-medium">{forPercentage.toFixed(1)}%</span>
                          </div>
                          <Progress
                            value={forPercentage}
                            className="h-2 bg-white/10"
                            indicatorClassName="bg-green-500"
                          />

                          <div className="flex justify-between mb-2 mt-4">
                            <div className="flex items-center">
                              <span className="text-red-500 font-medium mr-2">AGAINST</span>
                              <span className="text-white/70 text-sm">{proposal.votingPower.against} Voting Power</span>
                            </div>
                            <span className="text-white font-medium">{againstPercentage.toFixed(1)}%</span>
                          </div>
                          <Progress
                            value={againstPercentage}
                            className="h-2 bg-white/10"
                            indicatorClassName="bg-red-500"
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">Full Description</h3>
                        <div className="prose prose-invert max-w-none">
                          <div className="bg-[#1a1a1a] p-4 rounded-lg text-white/80 whitespace-pre-line">
                            {proposal.fullDescription}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <h3 className="text-lg font-medium text-white mb-2">Implementation Details</h3>
                        <p className="text-white/80">{proposal.implementation}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="voters" className="mt-6">
                <Card className="bg-[#0a0a0a] border-white/10 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-yellow-500" />
                      Voters ({proposal.voters.length})
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      People who have cast their votes on this proposal
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {proposal.voters.map((voter) => (
                        <motion.div
                          key={voter.id}
                          className="flex items-start p-3 rounded-lg hover:bg-white/5 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={voter.avatar} />
                            <AvatarFallback className="bg-primary/20 text-primary">
                              {voter.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-white">{voter.name}</div>
                                <div className="text-white/60 text-xs">{voter.timestamp}</div>
                              </div>
                              <Badge
                                className={
                                  voter.vote === "for" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                                }
                              >
                                {voter.vote.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="mt-1 text-white/80">
                              <span className="font-medium">{voter.votingPower} Voting Power</span>
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
                      <MessageSquare className="h-5 w-5 mr-2 text-yellow-500" />
                      Discussion ({proposal.comments.length})
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Join the conversation about this proposal
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {proposal.comments.map((comment) => (
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
                              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg p-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-yellow-500"
                              placeholder="Add your thoughts..."
                              rows={3}
                            ></textarea>
                            <div className="flex justify-end mt-2">
                              <Button className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border border-yellow-500/30">
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

          {/* Right column - Actions and info */}
          <div>
            <Card className="bg-[#0a0a0a] border-white/10 text-white sticky top-24">
              <CardHeader>
                <CardTitle>Cast Your Vote</CardTitle>
                <CardDescription className="text-white/70">
                  Your vote is weighted by the square root of your PPT holdings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {proposal.status === "active" ? (
                  <>
                    {connected ? (
                      <div className="space-y-4">
                        <div className="bg-[#1a1a1a] p-4 rounded-lg">
                          <h4 className="text-white font-medium mb-2">Your Voting Power</h4>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white/70">PPT Balance</span>
                            <span className="text-white">1,225 PPT</span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/70">Voting Power</span>
                            <span className="text-white">{userVotingPower} (√1,225)</span>
                          </div>
                          <div className="text-xs text-white/50">
                            Quadratic voting gives you voting power equal to the square root of your PPT holdings
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border border-green-500/30"
                            onClick={() => handleVote("for")}
                          >
                            <Zap className="h-4 w-4 mr-2" />
                            Vote FOR
                          </Button>
                          <Button
                            className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30"
                            onClick={() => handleVote("against")}
                          >
                            <Zap className="h-4 w-4 mr-2" />
                            Vote AGAINST
                          </Button>
                        </div>

                        <div className="bg-[#1a1a1a] p-4 rounded-lg">
                          <h4 className="text-white font-medium mb-2">Current Results</h4>
                          <div className="flex justify-between mb-1">
                            <span className="text-green-500">FOR</span>
                            <span>{forPercentage.toFixed(1)}%</span>
                          </div>
                          <Progress
                            value={forPercentage}
                            className="h-2 bg-white/10"
                            indicatorClassName="bg-green-500"
                          />
                          <div className="flex justify-between mb-1 mt-2">
                            <span className="text-red-500">AGAINST</span>
                            <span>{againstPercentage.toFixed(1)}%</span>
                          </div>
                          <Progress
                            value={againstPercentage}
                            className="h-2 bg-white/10"
                            indicatorClassName="bg-red-500"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Vote className="h-12 w-12 text-white/30 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-white mb-2">Connect to Vote</h3>
                        <p className="text-white/70 mb-4">Connect your wallet to cast your vote on this proposal.</p>
                        <Button>Connect Wallet</Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500/20 text-yellow-500 mb-4">
                      {proposal.status === "passed" ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : proposal.status === "rejected" ? (
                        <XCircle className="h-6 w-6" />
                      ) : (
                        <Clock className="h-6 w-6" />
                      )}
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">
                      {proposal.status === "passed"
                        ? "Proposal Passed"
                        : proposal.status === "rejected"
                          ? "Proposal Rejected"
                          : "Voting Not Started"}
                    </h3>
                    <p className="text-white/70 mb-4">
                      {proposal.status === "passed"
                        ? "This proposal has been approved and will be implemented."
                        : proposal.status === "rejected"
                          ? "This proposal has been rejected and will not be implemented."
                          : "Voting for this proposal has not started yet."}
                    </p>
                    <Link href="/quadratic-funding">
                      <Button className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border border-yellow-500/30">
                        View Other Proposals
                      </Button>
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

        {/* Similar proposals */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Similar Proposals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* This would be populated with actual related proposals */}
            <Card className="bg-[#0a0a0a] border-white/10 text-white hover:border-yellow-500/30 transition-colors">
              <CardHeader>
                <Badge className="w-fit bg-blue-500/20 text-blue-500 mb-2">PLATFORM</Badge>
                <CardTitle className="text-lg">Reduce Platform Fee for New Users</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4 line-clamp-2">
                  Proposal to reduce platform fees for new users during their first month to encourage adoption.
                </p>
                <div className="flex justify-between text-sm text-white/70 mb-4">
                  <span>10,500 Voting Power</span>
                  <span>Active</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-green-500">FOR</span>
                  <span>65%</span>
                </div>
                <Progress value={65} className="h-2 bg-white/10" indicatorClassName="bg-green-500" />
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#0a0a0a] border-white/10 text-white hover:border-yellow-500/30 transition-colors">
              <CardHeader>
                <Badge className="w-fit bg-green-500/20 text-green-500 mb-2">TREASURY</Badge>
                <CardTitle className="text-lg">Allocate Funds for Marketing Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4 line-clamp-2">
                  Proposal to allocate 100,000 PPT for a comprehensive marketing campaign to increase platform
                  visibility.
                </p>
                <div className="flex justify-between text-sm text-white/70 mb-4">
                  <span>15,200 Voting Power</span>
                  <span>Active</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-green-500">FOR</span>
                  <span>72%</span>
                </div>
                <Progress value={72} className="h-2 bg-white/10" indicatorClassName="bg-green-500" />
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>

            <Card className="bg-[#0a0a0a] border-white/10 text-white hover:border-yellow-500/30 transition-colors">
              <CardHeader>
                <Badge className="w-fit bg-purple-500/20 text-purple-500 mb-2">GRANTS</Badge>
                <CardTitle className="text-lg">Developer Grants Program</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 mb-4 line-clamp-2">
                  Proposal to establish a grants program for developers building integrations with the platform.
                </p>
                <div className="flex justify-between text-sm text-white/70 mb-4">
                  <span>18,900 Voting Power</span>
                  <span>Active</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-green-500">FOR</span>
                  <span>88%</span>
                </div>
                <Progress value={88} className="h-2 bg-white/10" indicatorClassName="bg-green-500" />
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Vote Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-white mb-4">Confirm Your Vote</h3>
            <div className="mb-6">
              <p className="text-white/70 mb-4">
                You are about to cast a vote{" "}
                <span className={userVote === "for" ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                  {userVote?.toUpperCase()}
                </span>{" "}
                this proposal with <span className="text-white font-medium">{userVotingPower} voting power</span>.
              </p>
              <div className="bg-[#1a1a1a] p-4 rounded-lg mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-white/70">Proposal:</span>
                  <span className="text-white font-medium">{proposal.title}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/70">Your Vote:</span>
                  <span className={userVote === "for" ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                    {userVote?.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Voting Power:</span>
                  <span className="text-yellow-500 font-medium">{userVotingPower}</span>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                This action cannot be undone. Your vote will be recorded on the blockchain.
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
                className="flex-1 bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border border-yellow-500/30"
                onClick={confirmVote}
              >
                Confirm Vote
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
