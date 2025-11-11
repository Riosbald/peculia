"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Clock, Users, ArrowRight, MessageSquare, ThumbsUp, Share2, TrendingUp, Zap } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Prediction } from "@/data/predictions"
import { getCategoryColor, getStatusColor } from "@/utils/category-colors"
import { createInteractionHandlers, formatTimeLeft, formatNumber } from "@/utils/interaction-handlers"

interface PredictionListItemProps {
  prediction: Prediction
  index: number
  onUpdate: (id: string, updates: Partial<Prediction>) => void
}

export default function PredictionListItem({ prediction, index, onUpdate }: PredictionListItemProps) {
  const router = useRouter()
  const { handleLike, handleComment, handleShare, handleStake } = createInteractionHandlers()

  const categoryColors = getCategoryColor(prediction.category as any)
  const statusColors = getStatusColor(prediction.status)

  const handleStakeClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Simulate staking
    const stakeAmount = 100
    onUpdate(prediction.id, {
      totalStaked: prediction.totalStaked + stakeAmount,
      participants: prediction.participants + 1,
    })
    handleStake(prediction.id, prediction.title, stakeAmount, e)
  }

  const navigateToDetails = () => {
    router.push(`/prediction-markets/view/${prediction.id}`)
  }

  return (
    <motion.div
      className="p-4 border rounded-lg bg-background/50 backdrop-blur-sm cursor-pointer"
      style={{
        borderColor: "rgba(147, 51, 234, 0.2)",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)",
        borderColor: "rgba(147, 51, 234, 0.5)",
      }}
      onClick={navigateToDetails}
    >
      <div className="flex items-start">
        <div className="w-12 h-12 rounded-md bg-purple-500/20 flex items-center justify-center text-purple-500 mr-4">
          <TrendingUp className="h-6 w-6" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold text-lg">{prediction.title}</h3>

            <div className="flex items-center space-x-2">
              <Badge className={`${categoryColors.bg} ${categoryColors.text} border-none text-xs`}>
                {prediction.category}
              </Badge>

              <Badge className={`${statusColors.bg} ${statusColors.text} border-none text-xs`}>
                {prediction.status.charAt(0).toUpperCase() + prediction.status.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="flex items-center mt-2 text-xs text-white/60">
            <Avatar className="h-5 w-5 mr-1.5">
              <AvatarImage src={prediction.creator.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/20 text-primary text-[8px]">
                {prediction.creator.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{prediction.creator.name}</span>
            <span className="mx-2">•</span>
            <Clock className="h-3 w-3 mr-1" />
            <span>{formatTimeLeft(prediction.endDate)}</span>
            <span className="mx-2">•</span>
            <Users className="h-3 w-3 mr-1" />
            <span>{prediction.participants} participants</span>
          </div>

          <p className="text-white/80 my-3">{prediction.description}</p>

          {/* Odds Display */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-white/70 mb-2">
              <span>Market Odds</span>
              <span>
                Yes: {prediction.odds.yes}% • No: {prediction.odds.no}%
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden flex">
              <motion.div
                className="h-full bg-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${prediction.odds.yes}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.div
                className="h-full bg-red-500"
                initial={{ width: 0 }}
                animate={{ width: `${prediction.odds.no}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-white">{formatNumber(prediction.totalStaked)}</div>
              <div className="text-xs text-white/60">PPT Staked</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">{formatNumber(prediction.volume)}</div>
              <div className="text-xs text-white/60">Volume</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">{formatNumber(prediction.liquidity)}</div>
              <div className="text-xs text-white/60">Liquidity</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
                onClick={(e) => handleLike(prediction.id, prediction.title, e)}
              >
                <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">Like</span>
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
                onClick={(e) => handleComment(prediction.id, prediction.title, e)}
              >
                <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">Comment</span>
              </Button>

              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2 text-white/70 hover:text-white hover:bg-white/10"
                onClick={(e) => handleShare(prediction.id, prediction.title, e)}
              >
                <Share2 className="h-3.5 w-3.5 mr-1.5" />
                <span className="text-xs">Share</span>
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              {prediction.status === "active" && (
                <Button
                  size="sm"
                  className="h-8 bg-green-500/20 text-green-500 hover:bg-green-500/30 border border-green-500/30"
                  onClick={handleStakeClick}
                >
                  <Zap className="h-3.5 w-3.5 mr-1.5" />
                  Stake
                </Button>
              )}

              <Button
                size="sm"
                className="h-8 bg-purple-500/20 text-purple-500 hover:bg-purple-500/30 border border-purple-500/30"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateToDetails()
                }}
              >
                View Details
                <ArrowRight className="h-3 w-3 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
