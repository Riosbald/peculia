"use client"

import { useState, useEffect, useCallback } from "react"
import { Clock, Users, TrendingUp, Eye } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useWebSocket } from "@/hooks/use-websocket"
import { useNotifications } from "@/hooks/use-notifications"
import ActivityDetailModal, { type Activity } from "@/components/activities/activity-detail-modal"

/**
 * Generates mock activity data for demonstration purposes
 */
const generateMockActivity = (): Activity => {
  const types: Activity["type"][] = ["prediction", "token-pitch", "quest", "funding"]
  const statuses: Activity["status"][] = ["active", "completed", "pending"]
  const categories = ["Technology", "Finance", "Gaming", "Art", "Music", "Sports"]

  const type = types[Math.floor(Math.random() * types.length)]
  const status = statuses[Math.floor(Math.random() * statuses.length)]
  const category = categories[Math.floor(Math.random() * categories.length)]

  const titles = {
    prediction: ["Will Bitcoin reach $100k?", "Next US President prediction", "Tesla stock forecast"],
    "token-pitch": ["Revolutionary DeFi Protocol", "AI-powered Trading Bot", "Green Energy Token"],
    quest: ["Complete 10 trades", "Refer 5 friends", "Stake for 30 days"],
    funding: ["Open Source Development", "Community Education", "Research Grant"],
  }

  const title = titles[type][Math.floor(Math.random() * titles[type].length)]

  return {
    id: Math.random().toString(36).substr(2, 9),
    type,
    title,
    description: `This is a ${type} activity in the ${category} category. Join now to participate and earn rewards!`,
    author: `User${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    status,
    category,
    participants: Math.floor(Math.random() * 500) + 10,
    reward: `${Math.floor(Math.random() * 1000) + 100} SATORI`,
    tags: ["trending", "popular", category.toLowerCase()],
    details: {
      totalValue: `$${(Math.random() * 10000 + 1000).toFixed(0)}`,
      currentBets: Math.floor(Math.random() * 100) + 5,
      accuracy: Math.floor(Math.random() * 40) + 60,
      progress: Math.floor(Math.random() * 100),
      requirements: ["Minimum stake of 100 SATORI", "Complete KYC verification", "Hold tokens for minimum 7 days"],
      submissions: Math.floor(Math.random() * 50) + 1,
    },
  }
}

/**
 * Individual activity card component with responsive design
 */
const ActivityCard = ({
  activity,
  onClick,
}: {
  activity: Activity
  onClick: () => void
}) => {
  const getStatusColor = (status: Activity["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getTypeIcon = (type: Activity["type"]) => {
    switch (type) {
      case "prediction":
        return "🔮"
      case "token-pitch":
        return "🚀"
      case "quest":
        return "⚔️"
      case "funding":
        return "💰"
      default:
        return "📋"
    }
  }

  return (
    <Card
      className="cursor-pointer transition-all duration-200 border-border/50 bg-card/50 backdrop-blur-sm"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-lg flex-shrink-0">{getTypeIcon(activity.type)}</span>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm leading-tight line-clamp-2">{activity.title}</h3>
            </div>
          </div>
          <Badge variant="outline" className={`${getStatusColor(activity.status)} text-xs flex-shrink-0`}>
            {activity.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{activity.description}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{activity.timestamp.toLocaleDateString()}</span>
          </div>
          {activity.participants && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{activity.participants}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {activity.category}
          </Badge>
          {activity.reward && <span className="text-xs font-medium text-primary">{activity.reward}</span>}
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Main Recent Activities component with real-time updates and infinite scroll
 */
export default function RecentActivities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const { addNotification } = useNotifications()

  /**
   * Handles new activity messages from WebSocket
   */
  const handleNewActivity = useCallback(
    (data: any) => {
      if (data.type === "new_activity") {
        const newActivity = generateMockActivity()
        setActivities((prev) => [newActivity, ...prev.slice(0, 19)]) // Keep only 20 most recent

        addNotification({
          type: "info",
          title: "New Activity",
          message: `New ${data.activityType || "activity"} has been created!`,
        })
      }
    },
    [addNotification],
  )

  /**
   * WebSocket connection for real-time updates
   */
  const { sendMessage } = useWebSocket({
    url: "wss://api.satori.com/ws",
    onMessage: handleNewActivity,
    onConnect: () => {
      console.log("Connected to activity feed")
    },
    onError: (error) => {
      console.warn("WebSocket connection failed, using mock data")
    },
  })

  /**
   * Loads initial activities data
   */
  const loadInitialActivities = useCallback(() => {
    setIsLoading(true)

    // Simulate API call with mock data
    setTimeout(() => {
      const mockActivities = Array.from({ length: 12 }, generateMockActivity).sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
      )

      setActivities(mockActivities)
      setIsLoading(false)
    }, 1000)
  }, [])

  /**
   * Loads more activities for infinite scroll
   */
  const loadMoreActivities = useCallback(() => {
    if (!hasMore) return

    setTimeout(() => {
      const moreActivities = Array.from({ length: 6 }, generateMockActivity)
      setActivities((prev) => [...prev, ...moreActivities])

      // Simulate reaching end of data
      if (activities.length > 30) {
        setHasMore(false)
      }
    }, 500)
  }, [hasMore, activities.length])

  /**
   * Handles activity card click
   */
  const handleActivityClick = useCallback((activity: Activity) => {
    setSelectedActivity(activity)
    setIsModalOpen(true)
  }, [])

  /**
   * Closes activity detail modal
   */
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
    setSelectedActivity(null)
  }, [])

  // Load initial data on mount
  useEffect(() => {
    loadInitialActivities()
  }, [loadInitialActivities])

  // Simulate periodic new activities
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance every 10 seconds
        handleNewActivity({ type: "new_activity", activityType: "prediction" })
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [handleNewActivity])

  if (isLoading) {
    return (
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Recent Activities</h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
              Stay updated with the latest activities across our ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Recent Activities</h2>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Stay updated with the latest activities across our ecosystem. Join predictions, discover new tokens,
              complete quests, and participate in funding rounds.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} onClick={() => handleActivityClick(activity)} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center">
              <Button variant="outline" onClick={loadMoreActivities} className="gap-2 bg-transparent">
                <Eye className="h-4 w-4" />
                Load More Activities
              </Button>
            </div>
          )}

          {!hasMore && activities.length > 0 && (
            <div className="text-center text-muted-foreground text-sm">You've reached the end of recent activities</div>
          )}
        </div>
      </section>

      <ActivityDetailModal activity={selectedActivity} isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
