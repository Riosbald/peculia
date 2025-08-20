"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, Users, ArrowRight, MessageSquare, ThumbsUp, Share2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ActivityCardProps {
  activity: {
    id: string
    title: string
    type: "prediction" | "token" | "quest" | "governance"
    creator: {
      name: string
      avatar?: string
    }
    timeAgo: string
    participants: number
    comments: number
    likes: number
    category: string
    status?: string
    backgroundColor?: string
  }
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(activity.likes)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLiked) {
      setLikeCount((prev) => prev + 1)
    } else {
      setLikeCount((prev) => prev - 1)
    }
    setIsLiked(!isLiked)
    alert(`${isLiked ? "Unliked" : "Liked"} activity: ${activity.title}`)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    alert(`Share activity: ${activity.title}`)
  }

  const getTypeIcon = () => {
    switch (activity.type) {
      case "prediction":
        return (
          <div className="w-10 h-10 rounded-md bg-purple-500/20 flex items-center justify-center text-purple-500">
            🔮
          </div>
        )
      case "token":
        return (
          <div className="w-10 h-10 rounded-md bg-green-500/20 flex items-center justify-center text-green-500">💰</div>
        )
      case "quest":
        return (
          <div className="w-10 h-10 rounded-md bg-blue-500/20 flex items-center justify-center text-blue-500">🏆</div>
        )
      case "governance":
        return (
          <div className="w-10 h-10 rounded-md bg-yellow-500/20 flex items-center justify-center text-yellow-500">
            🏛️
          </div>
        )
    }
  }

  const getTypeColor = () => {
    switch (activity.type) {
      case "prediction":
        return "bg-purple-500/20 text-purple-500"
      case "token":
        return "bg-green-500/20 text-green-500"
      case "quest":
        return "bg-blue-500/20 text-blue-500"
      case "governance":
        return "bg-yellow-500/20 text-yellow-500"
    }
  }

  const getStatusColor = () => {
    if (!activity.status) return ""

    switch (activity.status.toLowerCase()) {
      case "active":
        return "bg-green-500/20 text-green-500"
      case "completed":
        return "bg-blue-500/20 text-blue-500"
      case "pending":
        return "bg-yellow-500/20 text-yellow-500"
      case "closed":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  return (
    <motion.div
      className="p-4 border rounded-lg bg-background/50 backdrop-blur-sm"
      style={{
        borderColor: isHovered ? "rgba(16, 185, 129, 0.5)" : "rgba(255, 255, 255, 0.1)",
        backgroundColor: activity.backgroundColor || "rgba(0, 0, 0, 0.7)",
      }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => (window.location.href = `/activity/${activity.id}`)}
      layout
    >
      <div className="flex items-start">
        {getTypeIcon()}

        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold">{activity.title}</h3>

            <div className="flex items-center space-x-2">
              <Badge className={`${getTypeColor()} border-none text-xs`}>
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
              </Badge>

              {activity.status && (
                <Badge className={`${getStatusColor()} border-none text-xs`}>{activity.status}</Badge>
              )}
            </div>
          </div>

          <div className="flex items-center mt-2 text-xs text-white/60">
            <Avatar className="h-5 w-5 mr-1.5">
              <AvatarImage src={activity.creator.avatar} />
              <AvatarFallback className="bg-primary/20 text-primary text-[8px]">
                {activity.creator.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{activity.creator.name}</span>
            <span className="mx-2">•</span>
            <Clock className="h-3 w-3 mr-1" />
            <span>{activity.timeAgo}</span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-white/70">
                <Users className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">{activity.participants}</span>
              </div>

              <div className="flex items-center text-white/70">
                <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">{activity.comments}</span>
              </div>

              <Button
                size="sm"
                variant="ghost"
                className={`h-7 px-2 ${isLiked ? "text-green-500" : "text-white/70"}`}
                onClick={handleLike}
              >
                <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />
                <motion.span
                  key={likeCount}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs"
                >
                  {likeCount}
                </motion.span>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" className="h-7 px-2 text-white/70" onClick={handleShare}>
                <Share2 className="h-3.5 w-3.5" />
              </Button>

              <Button
                size="sm"
                className="h-7 bg-green-500/20 text-green-500 hover:bg-green-500/30 border border-green-500/30"
                onClick={() => {
                  // Determine the correct URL based on activity type
                  let url = "/"
                  switch (activity.type) {
                    case "prediction":
                      url = `/prediction-markets/view/${activity.id}`
                      break
                    case "token":
                      url = `/token-pitching/view/${activity.id}`
                      break
                    case "quest":
                      url = `/quest-system/view/${activity.id}`
                      break
                    case "governance":
                      url = `/quadratic-funding/view/${activity.id}`
                      break
                  }
                  window.location.href = url
                }}
              >
                <span className="text-xs">View</span>
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
