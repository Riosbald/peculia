"use client"

import { useState, useEffect } from "react"
import { TrendingUp, ThumbsUp, MessageCircle, Share2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Prediction {
  id: string
  user: {
    name: string
    avatar?: string
    address: string
  }
  question: string
  category: string
  odds: {
    yes: number
    no: number
  }
  wagerAmount: number
  expiryDate: string
  likes: number
  comments: number
  isLiked: boolean
  isFriend: boolean
}

export default function SocialFeed() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [activeTab, setActiveTab] = useState("trending")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading predictions
    const loadPredictions = async () => {
      setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock prediction data
      const mockPredictions: Prediction[] = [
        {
          id: "1",
          user: {
            name: "CryptoQueen",
            avatar: "/placeholder.svg?height=40&width=40",
            address: "0x1234...5678",
          },
          question: "Will Bitcoin break $100k before the end of 2025?",
          category: "crypto",
          odds: { yes: 0.65, no: 0.35 },
          wagerAmount: 800,
          expiryDate: "2025-12-31",
          likes: 42,
          comments: 7,
          isLiked: false,
          isFriend: true,
        },
        {
          id: "2",
          user: {
            name: "BlockchainDev",
            avatar: "/placeholder.svg?height=40&width=40",
            address: "0xabcd...ef12",
          },
          question: "Will Ethereum finalize EIP-4844 by Q3?",
          category: "governance",
          odds: { yes: 0.78, no: 0.22 },
          wagerAmount: 500,
          expiryDate: "2025-09-30",
          likes: 31,
          comments: 12,
          isLiked: true,
          isFriend: false,
        },
        {
          id: "3",
          user: {
            name: "DeFiWhale",
            avatar: "/placeholder.svg?height=40&width=40",
            address: "0x7890...1234",
          },
          question: "Will Taylor Swift release a new album in 2025?",
          category: "music",
          odds: { yes: 0.82, no: 0.18 },
          wagerAmount: 350,
          expiryDate: "2025-12-31",
          likes: 67,
          comments: 23,
          isLiked: false,
          isFriend: true,
        },
        {
          id: "4",
          user: {
            name: "SolanaMaxi",
            avatar: "/placeholder.svg?height=40&width=40",
            address: "solana:abcdef",
          },
          question: "Will the LA Lakers win the NBA championship?",
          category: "sports",
          odds: { yes: 0.45, no: 0.55 },
          wagerAmount: 600,
          expiryDate: "2025-06-30",
          likes: 28,
          comments: 15,
          isLiked: false,
          isFriend: false,
        },
      ]

      setPredictions(mockPredictions)
      setIsLoading(false)
    }

    loadPredictions()
  }, [])

  const handleLike = (id: string) => {
    setPredictions(
      predictions.map((pred) => {
        if (pred.id === id) {
          return {
            ...pred,
            likes: pred.isLiked ? pred.likes - 1 : pred.likes + 1,
            isLiked: !pred.isLiked,
          }
        }
        return pred
      }),
    )
  }

  const getFilteredPredictions = () => {
    switch (activeTab) {
      case "trending":
        return [...predictions].sort((a, b) => b.likes - a.likes)
      case "friends":
        return predictions.filter((pred) => pred.isFriend)
      default:
        return predictions
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "crypto":
        return <TrendingUp className="h-3 w-3" />
      case "sports":
        return <span>🏆</span>
      case "music":
        return <span>🎵</span>
      case "governance":
        return <span>🏛️</span>
      default:
        return <span>📊</span>
    }
  }

  return (
    <div className="flex flex-col space-y-4 p-6 bg-background/30 rounded-lg border border-primary/20 shadow-sm w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-primary/80">(prediction feed)</h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[200px]">
          <TabsList className="bg-background/50 border border-primary/20">
            <TabsTrigger
              value="trending"
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="friends" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <Users className="h-3 w-3 mr-1" />
              Friends
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="text-primary/50 animate-pulse">Loading predictions...</div>
        </div>
      ) : (
        <div className="space-y-4">
          {getFilteredPredictions().map((prediction) => (
            <div key={prediction.id} className="p-4 border border-primary/20 rounded-lg bg-background/40 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8 border border-primary/20">
                    <AvatarImage src={prediction.user.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {prediction.user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-primary/90">{prediction.user.name}</span>
                      {prediction.isFriend && (
                        <Badge
                          variant="outline"
                          className="ml-2 text-[10px] py-0 h-4 border-primary/30 text-primary/60"
                        >
                          Friend
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-primary/50">{prediction.user.address}</div>
                  </div>
                </div>
                <Badge className="bg-primary/10 text-primary/80 hover:bg-primary/20 border-none flex items-center space-x-1">
                  {getCategoryIcon(prediction.category)}
                  <span className="capitalize">{prediction.category}</span>
                </Badge>
              </div>

              <div className="text-primary/90 font-medium">{prediction.question}</div>

              <div className="grid grid-cols-2 gap-4 bg-background/30 p-2 rounded-md">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{(prediction.odds.yes * 100).toFixed(0)}%</div>
                  <div className="text-xs text-primary/50">Yes</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">{(prediction.odds.no * 100).toFixed(0)}%</div>
                  <div className="text-xs text-primary/50">No</div>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-primary/50">
                <div>{prediction.wagerAmount} PPT wagered</div>
                <div>Expires: {new Date(prediction.expiryDate).toLocaleDateString()}</div>
              </div>

              <div className="flex justify-between pt-2 border-t border-primary/10">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-xs ${prediction.isLiked ? "text-primary" : "text-primary/50"} hover:bg-primary/10`}
                  onClick={() => handleLike(prediction.id)}
                >
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  {prediction.likes}
                </Button>
                <Button variant="ghost" size="sm" className="text-xs text-primary/50 hover:bg-primary/10">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  {prediction.comments}
                </Button>
                <Button variant="ghost" size="sm" className="text-xs text-primary/50 hover:bg-primary/10">
                  <Share2 className="h-3 w-3 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
