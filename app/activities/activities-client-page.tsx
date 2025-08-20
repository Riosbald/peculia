"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Dices,
  Filter,
  Search,
  TrendingUp,
  Trophy,
  Vote,
  User,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface ActivityType {
  id: string
  type: "prediction" | "token" | "quest" | "governance"
  title: string
  description: string
  user: {
    name: string
    avatar?: string
  }
  timestamp: string
  amount?: number
  status?: "success" | "pending" | "failed"
}

export default function ActivitiesClientPage() {
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [filteredActivities, setFilteredActivities] = useState<ActivityType[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [hoveredActivity, setHoveredActivity] = useState<string | null>(null)
  const activitiesPerPage = 10
  const isMobile = useMobile()

  useEffect(() => {
    // Mock data - in a real app, this would be fetched from an API
    const mockActivities: ActivityType[] = [
      {
        id: "1",
        type: "prediction",
        title: "Created a new prediction market",
        description: "Will ETH reach $5,000 before July 2025?",
        user: {
          name: "CryptoQueen",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        timestamp: "2 minutes ago",
        amount: 500,
        status: "pending",
      },
      {
        id: "2",
        type: "token",
        title: "Submitted a token pitch",
        description: "DeFiDAO: Decentralized governance for DeFi protocols",
        user: {
          name: "BlockchainDev",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        timestamp: "15 minutes ago",
        status: "success",
      },
      {
        id: "3",
        type: "quest",
        title: "Completed a quest",
        description: "Early Bird: Connected wallet and claimed first PPT tokens",
        user: {
          name: "NewUser42",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        timestamp: "45 minutes ago",
        amount: 100,
        status: "success",
      },
      {
        id: "4",
        type: "governance",
        title: "Cast a quadratic vote",
        description: "Proposal #23: Add support for Avalanche blockchain",
        user: {
          name: "GovernanceGuru",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        timestamp: "1 hour ago",
        status: "success",
      },
      {
        id: "5",
        type: "prediction",
        title: "Won a prediction market",
        description: "Will BTC stay above $60k for the entire month?",
        user: {
          name: "SatoshiFan",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        timestamp: "3 hours ago",
        amount: 1250,
        status: "success",
      },
      {
        id: "6",
        type: "token",
        title: "Received token evaluation",
        description: "MetaDAO: Your token design scored 92/100",
        user: {
          name: "TokenDesigner",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        timestamp: "4 hours ago",
        status: "success",
      },
      {
        id: "7",
        type: "quest",
        title: "Created a new quest",
        description: "Community Builder: Invite 5 friends to join Peculia",
        user: {
          name: "QuestMaster",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        timestamp: "5 hours ago",
        amount: 250,
        status: "pending",
      },
      {
        id: "8",
        type: "prediction",
        title: "Placed a prediction",
        description: "Will Solana reach $200 by end of Q2?",
        user: {
          name: "SolanaFan",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        timestamp: "6 hours ago",
        amount: 350,
        status: "success",
      },
      {
        id: "9",
        type: "governance",
        title: "Created a proposal",
        description: "Add support for Polygon zkEVM",
        user: {
          name: "PolygonDev",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        timestamp: "8 hours ago",
        status: "pending",
      },
      {
        id: "10",
        type: "token",
        title: "Updated token pitch",
        description: "GameFi Token: Added tokenomics details",
        user: {
          name: "GameDevPro",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        timestamp: "10 hours ago",
        status: "success",
      },
      {
        id: "11",
        type: "quest",
        title: "Completed advanced quest",
        description: "Prediction Pro: Created 5 successful prediction markets",
        user: {
          name: "PredictionMaster",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        timestamp: "12 hours ago",
        amount: 500,
        status: "success",
      },
      {
        id: "12",
        type: "prediction",
        title: "Market resolved",
        description: "Will Bitcoin halving happen before April 20?",
        user: {
          name: "BitcoinExpert",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        timestamp: "1 day ago",
        amount: 2000,
        status: "success",
      },
      {
        id: "13",
        type: "governance",
        title: "Proposal passed",
        description: "Implement cross-chain bridge with Arbitrum",
        user: {
          name: "BridgeBuilder",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        timestamp: "1 day ago",
        status: "success",
      },
      {
        id: "14",
        type: "token",
        title: "Token pitch rejected",
        description: "MemeToken: Insufficient utility and tokenomics",
        user: {
          name: "MemeCreator",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        timestamp: "2 days ago",
        status: "failed",
      },
      {
        id: "15",
        type: "quest",
        title: "Quest expired",
        description: "Early Adopter: Refer 10 users in first week",
        user: {
          name: "SlowAdopter",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        timestamp: "2 days ago",
        status: "failed",
      },
    ]

    setActivities(mockActivities)
    setFilteredActivities(mockActivities)
  }, [])

  useEffect(() => {
    let result = activities

    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (activity) =>
          activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.user.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter((activity) => activity.type === typeFilter)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((activity) => activity.status === statusFilter)
    }

    setFilteredActivities(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, typeFilter, statusFilter, activities])

  const getActivityIcon = (type: ActivityType["type"]) => {
    switch (type) {
      case "prediction":
        return <Dices className="h-4 w-4" />
      case "token":
        return <TrendingUp className="h-4 w-4" />
      case "quest":
        return <Trophy className="h-4 w-4" />
      case "governance":
        return <Vote className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getStatusColor = (status?: ActivityType["status"]) => {
    switch (status) {
      case "success":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "failed":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      default:
        return "bg-white/10 text-white border-white/20"
    }
  }

  const getTypeColor = (type: ActivityType["type"]) => {
    switch (type) {
      case "prediction":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "token":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "quest":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "governance":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      default:
        return "bg-white/10 text-white border-white/20"
    }
  }

  // Pagination logic
  const indexOfLastActivity = currentPage * activitiesPerPage
  const indexOfFirstActivity = indexOfLastActivity - activitiesPerPage
  const currentActivities = filteredActivities.slice(indexOfFirstActivity, indexOfLastActivity)
  const totalPages = Math.ceil(filteredActivities.length / activitiesPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center mb-2">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="mr-2 -ml-2">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    <span>Back</span>
                  </Button>
                </Link>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                  <Activity className="h-3 w-3 mr-1" />
                  <span>Platform Activity</span>
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">All Activities</h1>
              <p className="text-white/70">Track all activities and transactions happening on the Peculia platform</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="border-white/20 text-white">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Filter by Date</span>
              </Button>
              <Button variant="green">
                <Activity className="h-4 w-4 mr-2" />
                <span>My Activities</span>
              </Button>
            </div>
          </div>

          {/* Search and filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  type="text"
                  placeholder="Search activities..."
                  className="pl-10 bg-[#0a0a0a] border-white/10 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="prediction">Predictions</SelectItem>
                  <SelectItem value="token">Tokens</SelectItem>
                  <SelectItem value="quest">Quests</SelectItem>
                  <SelectItem value="governance">Governance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-[#0a0a0a] border-white/10 text-white">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="bg-[#0a0a0a] border border-white/10">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-500"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="predictions"
                className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-500"
              >
                Predictions
              </TabsTrigger>
              <TabsTrigger
                value="tokens"
                className="data-[state=active]:bg-blue-500/10 data-[state=active]:text-blue-500"
              >
                Tokens
              </TabsTrigger>
              <TabsTrigger
                value="quests"
                className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
              >
                Quests
              </TabsTrigger>
              <TabsTrigger
                value="governance"
                className="data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-500"
              >
                Governance
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              {/* Activities list */}
              <div className="space-y-4">
                {currentActivities.length > 0 ? (
                  currentActivities.map((activity) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{
                        scale: 1.01,
                        transition: { duration: 0.2 },
                      }}
                      onMouseEnter={() => setHoveredActivity(activity.id)}
                      onMouseLeave={() => setHoveredActivity(null)}
                      className={cn(
                        "bg-[#0a0a0a] border rounded-lg p-4 flex items-start transition-all duration-300 relative overflow-hidden",
                        hoveredActivity === activity.id
                          ? `border-${activity.type === "prediction" ? "green" : activity.type === "token" ? "blue" : activity.type === "quest" ? "purple" : "amber"}-500/30`
                          : "border-white/10",
                      )}
                    >
                      {/* Background glow effect on hover */}
                      <AnimatePresence>
                        {hoveredActivity === activity.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                              "absolute inset-0 blur-md opacity-10",
                              activity.type === "prediction"
                                ? "bg-green-500"
                                : activity.type === "token"
                                  ? "bg-blue-500"
                                  : activity.type === "quest"
                                    ? "bg-purple-500"
                                    : "bg-amber-500",
                            )}
                          />
                        )}
                      </AnimatePresence>

                      {/* Animated sparkle effect on hover */}
                      <AnimatePresence>
                        {hoveredActivity === activity.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute top-2 right-2"
                          >
                            <Sparkles
                              className={cn(
                                "h-4 w-4",
                                activity.type === "prediction"
                                  ? "text-green-500"
                                  : activity.type === "token"
                                    ? "text-blue-500"
                                    : activity.type === "quest"
                                      ? "text-purple-500"
                                      : "text-amber-500",
                              )}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Avatar className="h-10 w-10 mr-4 border border-white/10">
                        <AvatarImage src={activity.user.avatar} />
                        <AvatarFallback className="bg-white/10 text-white">
                          {activity.user.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-1">
                          <span className="font-medium text-white truncate mr-2">{activity.user.name}</span>
                          <Badge variant="outline" className={cn("text-xs", getTypeColor(activity.type))}>
                            <div className="flex items-center">
                              {getActivityIcon(activity.type)}
                              <span className="ml-1 capitalize">{activity.type}</span>
                            </div>
                          </Badge>
                          {activity.status && (
                            <Badge variant="outline" className={`ml-2 text-xs ${getStatusColor(activity.status)}`}>
                              {activity.status}
                            </Badge>
                          )}
                        </div>

                        <p className="text-white/90 mb-1">{activity.title}</p>
                        <p className="text-white/70 text-sm mb-2">{activity.description}</p>

                        <div className="flex items-center text-xs text-white/60">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{activity.timestamp}</span>
                          {activity.amount && (
                            <motion.span
                              className={cn(
                                "ml-3 font-medium",
                                activity.type === "prediction"
                                  ? "text-green-500"
                                  : activity.type === "token"
                                    ? "text-blue-500"
                                    : activity.type === "quest"
                                      ? "text-purple-500"
                                      : "text-amber-500",
                              )}
                              whileHover={{ scale: 1.1 }}
                            >
                              {activity.amount} PPT
                            </motion.span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-[#0a0a0a] rounded-lg border border-white/10">
                    <Activity className="h-12 w-12 mx-auto text-white/30 mb-4" />
                    <h3 className="text-xl font-medium text-white mb-2">No activities found</h3>
                    <p className="text-white/60 mb-4">Try adjusting your filters or search query</p>
                    <Button
                      variant="outline"
                      className="border-white/20 text-white"
                      onClick={() => {
                        setSearchQuery("")
                        setTypeFilter("all")
                        setStatusFilter("all")
                      }}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      <span>Clear Filters</span>
                    </Button>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {filteredActivities.length > activitiesPerPage && (
                <div className="flex justify-center mt-8">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="border-white/20 text-white"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                      <Button
                        key={number}
                        variant={currentPage === number ? "default" : "outline"}
                        size="sm"
                        onClick={() => paginate(number)}
                        className={
                          currentPage === number
                            ? "bg-green-500 text-black hover:bg-green-600"
                            : "border-white/20 text-white"
                        }
                      >
                        {number}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="border-white/20 text-white"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Other tab contents would be similar but filtered by type */}
            <TabsContent value="predictions">
              {/* Similar structure as "all" but filtered for predictions */}
            </TabsContent>
            <TabsContent value="tokens">{/* Similar structure as "all" but filtered for tokens */}</TabsContent>
            <TabsContent value="quests">{/* Similar structure as "all" but filtered for quests */}</TabsContent>
            <TabsContent value="governance">{/* Similar structure as "all" but filtered for governance */}</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
