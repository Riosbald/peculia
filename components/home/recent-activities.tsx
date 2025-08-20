"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowRight, Dices, TrendingUp, Trophy, Vote, User, Clock, Activity, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { SectionHeader } from "@/components/ui/section-header"

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

export default function RecentActivitiesSection() {
  const [activities, setActivities] = useState<ActivityType[]>([])
  const [showAll, setShowAll] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()
  const isMobile = useMobile()

  // Show 5 activities initially, all when expanded
  const displayedActivities = showAll ? activities : activities.slice(0, 5)

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

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
    ]

    setActivities(mockActivities)
  }, [])

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
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-white/10 text-white/70 border-white/20"
    }
  }

  const getTypeColor = (type: ActivityType["type"]) => {
    switch (type) {
      case "prediction":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "token":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "quest":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "governance":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      default:
        return "bg-white/10 text-white/70 border-white/20"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-black relative overflow-hidden">
      {/* Simplified background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-green-500/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-blue-500/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Live Updates"
          badgeIcon={<Activity className="h-4 w-4" />}
          title="Recent Activities"
          description="See what's happening on the Peculia platform in real-time."
        />

        <div className="max-w-4xl mx-auto">
          <motion.div className="space-y-3" variants={containerVariants} initial="hidden" animate={controls}>
            {displayedActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                custom={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.2 },
                }}
                className="bg-[#0a0a0a] border border-white/10 hover:border-green-500/30 rounded-lg p-4 transition-all duration-300 cursor-pointer group"
                onClick={() => window.open(`/activities/${activity.id}`, "_blank")}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 border border-white/20 flex-shrink-0">
                    <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-white/10 text-white text-xs">
                      {activity.user.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-medium text-white text-sm">{activity.user.name}</span>
                      <Badge variant="outline" className={cn("text-xs px-2 py-0.5", getTypeColor(activity.type))}>
                        <div className="flex items-center gap-1">
                          {getActivityIcon(activity.type)}
                          <span className="capitalize">{activity.type}</span>
                        </div>
                      </Badge>
                      {activity.status && (
                        <Badge variant="outline" className={cn("text-xs px-2 py-0.5", getStatusColor(activity.status))}>
                          {activity.status}
                        </Badge>
                      )}
                    </div>

                    <h4 className="text-white/90 font-medium mb-1 group-hover:text-white transition-colors">
                      {activity.title}
                    </h4>
                    <p className="text-white/60 text-sm mb-3 line-clamp-2">{activity.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-white/50">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{activity.timestamp}</span>
                        </div>
                        {activity.amount && (
                          <div
                            className={cn(
                              "font-medium px-2 py-1 rounded-md",
                              activity.type === "prediction"
                                ? "bg-green-500/10 text-green-400"
                                : activity.type === "token"
                                  ? "bg-blue-500/10 text-blue-400"
                                  : activity.type === "quest"
                                    ? "bg-purple-500/10 text-purple-400"
                                    : "bg-amber-500/10 text-amber-400",
                            )}
                          >
                            +{activity.amount} PPT
                          </div>
                        )}
                      </div>

                      <ExternalLink className="h-4 w-4 text-white/30 group-hover:text-green-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Single, clear action button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 text-center"
          >
            {!showAll && activities.length > 5 ? (
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 hover:border-green-500/30 bg-transparent"
                onClick={() => setShowAll(true)}
              >
                Show {activities.length - 5} More Activities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Link href="/activities">
                <Button
                  variant="green"
                  className="bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30"
                >
                  View All Activities
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
