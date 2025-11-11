"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Lock, Globe, Clock, Eye, PlusCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface Participant {
  id: string
  name: string
  avatar?: string
}

interface PredictionCardProps {
  prediction: {
    id: string
    title: string
    type: "public" | "private" | "invite-only"
    amount: number
    daysLeft: number
    participants: Participant[]
    category: string
    backgroundColor: string
  }
}

export default function PredictionCard({ prediction }: PredictionCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getTypeLabel = () => {
    switch (prediction.type) {
      case "public":
        return "PUBLIC"
      case "private":
        return "PRIVATE"
      case "invite-only":
        return "INVITE ONLY"
    }
  }

  const getTypeIcon = () => {
    switch (prediction.type) {
      case "public":
        return <Globe className="h-3 w-3 mr-1" />
      case "private":
      case "invite-only":
        return <Lock className="h-3 w-3 mr-1" />
    }
  }

  const getCategoryLabel = () => {
    return prediction.category.charAt(0).toUpperCase() + prediction.category.slice(1)
  }

  // Show max 5 participants, with +X for additional
  const visibleParticipants = prediction.participants.slice(0, 5)
  const additionalCount = Math.max(0, prediction.participants.length - 5)

  return (
    <motion.div
      className="vertical-card h-full"
      style={{ backgroundColor: prediction.backgroundColor }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="vertical-card-header">
        <div className="flex justify-between items-start">
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
            {getTypeIcon()}
            {getTypeLabel()}
          </Badge>
          <div className="flex items-center text-white/90 font-medium">
            <span className="text-sm">{prediction.amount} PPT</span>
          </div>
        </div>
      </div>

      <div className="vertical-card-body">
        <div className="mb-2 text-white/80 text-xs flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>{prediction.daysLeft} days left</span>
        </div>

        <h3 className="text-white font-bold text-lg mb-4">{prediction.title}</h3>

        <div className="flex mb-4">
          <div className="flex -space-x-2">
            {visibleParticipants.map((participant, index) => (
              <Avatar key={participant.id} className="h-6 w-6 border border-white/20">
                <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary/20 text-primary text-[10px]">
                  {participant.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
            {additionalCount > 0 && (
              <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white/80 border border-white/20">
                +{additionalCount}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <Badge className="bg-white/10 text-white/80 border-none text-xs">{getCategoryLabel()}</Badge>
        </div>
      </div>

      <div className="vertical-card-footer">
        <div className="flex justify-between items-center gap-2">
          <Link href={`/prediction-markets/view/${prediction.id}`} className="flex-1">
            <Button size="sm" className="icon-button w-full">
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View Details</span>
              <span className="sm:hidden">View</span>
            </Button>
          </Link>

          <Link href={`/prediction-markets/view/${prediction.id}`} className="flex-1">
            <Button size="sm" className="icon-button w-full">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Join Bet</span>
              <span className="sm:hidden">Join</span>
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
