import type React from "react"
import { toast } from "@/hooks/use-toast"

export interface InteractionHandlers {
  handleLike: (id: string, title: string, e: React.MouseEvent) => void
  handleDislike: (id: string, title: string, e: React.MouseEvent) => void
  handleComment: (id: string, title: string, e: React.MouseEvent) => void
  handleShare: (id: string, title: string, e: React.MouseEvent) => void
  handleStake: (id: string, title: string, amount: number, e: React.MouseEvent) => void
}

export function createInteractionHandlers(): InteractionHandlers {
  const handleLike = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Liked!",
      description: `You liked: ${title}`,
    })
  }

  const handleDislike = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Disliked",
      description: `You disliked: ${title}`,
    })
  }

  const handleComment = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Comment",
      description: `Add a comment to: ${title}`,
    })
  }

  const handleShare = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Shared!",
      description: `${title} has been shared`,
    })
  }

  const handleStake = (id: string, title: string, amount: number, e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Staked!",
      description: `You staked ${amount} PPT on: ${title}`,
    })
  }

  return {
    handleLike,
    handleDislike,
    handleComment,
    handleShare,
    handleStake,
  }
}

export function formatTimeLeft(endDate: string): string {
  const now = new Date()
  const end = new Date(endDate)
  const diff = end.getTime() - now.getTime()

  if (diff <= 0) return "Ended"

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  if (days > 0) return `${days} day${days > 1 ? "s" : ""}`
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""}`
  return "Less than 1 hour"
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}
