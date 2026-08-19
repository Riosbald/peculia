"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Music, Calendar, Trophy, Mic, Filter, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import PredictionCard from "@/components/prediction-markets/prediction-card"
import ParticleBackground from "@/components/ui/particle-background"
import CreatePredictionModal from "@/components/prediction-markets/create-prediction-modal"

type WizkidPrediction = {
  id: string
  title: string
  type: "public" | "private" | "invite-only"
  amount: number
  daysLeft: number
  participants: { id: string; name: string; avatar: string }[]
  category: string
  backgroundColor: string
}

// Mock data for Wizkid predictions
const wizkidPredictions: WizkidPrediction[] = [
  {
    id: "w1",
    title: "Will Wizkid release a new album before the end of 2023?",
    type: "public",
    amount: 500,
    daysLeft: 45,
    participants: [
      { id: "u1", name: "Alex", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u2", name: "Maria", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u3", name: "John", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u4", name: "Sarah", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u5", name: "David", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u6", name: "Lisa", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    category: "music",
    backgroundColor: "linear-gradient(to bottom right, rgba(139, 92, 246, 0.2), rgba(0, 0, 0, 0.9))",
  },
  {
    id: "w2",
    title: "Will Wizkid win a Grammy Award in 2024?",
    type: "public",
    amount: 1000,
    daysLeft: 120,
    participants: [
      { id: "u1", name: "Alex", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u7", name: "Michael", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u8", name: "Emma", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    category: "awards",
    backgroundColor: "linear-gradient(to bottom right, rgba(16, 185, 129, 0.2), rgba(0, 0, 0, 0.9))",
  },
  {
    id: "w3",
    title: "Will Wizkid collaborate with Beyoncé again in 2023?",
    type: "public",
    amount: 750,
    daysLeft: 60,
    participants: [
      { id: "u2", name: "Maria", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u4", name: "Sarah", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u9", name: "James", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u10", name: "Olivia", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    category: "collaboration",
    backgroundColor: "linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(0, 0, 0, 0.9))",
  },
  {
    id: "w4",
    title: "Will Wizkid's next single reach #1 on Billboard Global 200?",
    type: "private",
    amount: 1200,
    daysLeft: 30,
    participants: [
      { id: "u1", name: "Alex", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u3", name: "John", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u11", name: "Daniel", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    category: "charts",
    backgroundColor: "linear-gradient(to bottom right, rgba(236, 72, 153, 0.2), rgba(0, 0, 0, 0.9))",
  },
  {
    id: "w5",
    title: "Will Wizkid announce a world tour in the next 3 months?",
    type: "public",
    amount: 600,
    daysLeft: 90,
    participants: [
      { id: "u5", name: "David", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u7", name: "Michael", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u12", name: "Sophia", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u13", name: "William", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u14", name: "Ava", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    category: "tour",
    backgroundColor: "linear-gradient(to bottom right, rgba(245, 158, 11, 0.2), rgba(0, 0, 0, 0.9))",
  },
  {
    id: "w6",
    title: "Will Wizkid perform at Coachella 2024?",
    type: "invite-only",
    amount: 900,
    daysLeft: 150,
    participants: [
      { id: "u2", name: "Maria", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "u8", name: "Emma", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    category: "performance",
    backgroundColor: "linear-gradient(to bottom right, rgba(239, 68, 68, 0.2), rgba(0, 0, 0, 0.9))",
  },
]

export default function WizkidPredictionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredPredictions, setFilteredPredictions] = useState(wizkidPredictions)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    let filtered = wizkidPredictions

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((prediction) => prediction.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter((prediction) => prediction.category === activeCategory)
    }

    setFilteredPredictions(filtered)
  }, [searchQuery, activeCategory])

  return (
    <div className="min-h-screen pt-20 pb-16 relative">
      <div className="absolute inset-0 z-0">
        <ParticleBackground color="#8b5cf6" count={100} glowIntensity={0.6} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-4">
              <Music className="h-10 w-10 text-purple-500" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Wizkid Predictions</h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Create and participate in prediction markets related to Afro-beat musician Wizkid
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button className="bg-purple-500 text-white hover:bg-purple-600" onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Prediction
            </Button>
          </motion.div>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <Input
                type="text"
                placeholder="Search predictions..."
                className="pl-10 bg-background/50 border-white/20 text-white placeholder:text-white/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-white/70" />
              <span className="text-sm text-white/70">Filter:</span>
              <Button
                variant={activeCategory === "all" ? "purple" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("all")}
              >
                All
              </Button>
              <Button
                variant={activeCategory === "music" ? "purple" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("music")}
              >
                <Music className="h-3.5 w-3.5 mr-1.5" />
                Music
              </Button>
              <Button
                variant={activeCategory === "awards" ? "purple" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("awards")}
              >
                <Trophy className="h-3.5 w-3.5 mr-1.5" />
                Awards
              </Button>
              <Button
                variant={activeCategory === "performance" ? "purple" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("performance")}
              >
                <Mic className="h-3.5 w-3.5 mr-1.5" />
                Performance
              </Button>
              <Button
                variant={activeCategory === "tour" ? "purple" : "outline"}
                size="sm"
                onClick={() => setActiveCategory("tour")}
              >
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                Tour
              </Button>
            </div>
          </div>

          <Tabs defaultValue="active" className="w-full">
            <TabsList className="bg-background/30 border border-white/10 p-1">
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-500"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="trending"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-500"
              >
                Trending
              </TabsTrigger>
              <TabsTrigger
                value="newest"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-500"
              >
                Newest
              </TabsTrigger>
              <TabsTrigger
                value="ending-soon"
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-500"
              >
                Ending Soon
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPredictions.length > 0 ? (
                  filteredPredictions.map((prediction) => (
                    <motion.div
                      key={prediction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <PredictionCard prediction={prediction} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-white/50" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">No predictions found</h3>
                    <p className="text-white/60">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="trending" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPredictions
                  .slice()
                  .sort((a, b) => b.participants.length - a.participants.length)
                  .map((prediction) => (
                    <motion.div
                      key={prediction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <PredictionCard prediction={prediction} />
                    </motion.div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="newest" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPredictions
                  .slice()
                  .reverse()
                  .map((prediction) => (
                    <motion.div
                      key={prediction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <PredictionCard prediction={prediction} />
                    </motion.div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="ending-soon" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPredictions
                  .slice()
                  .sort((a, b) => a.daysLeft - b.daysLeft)
                  .map((prediction) => (
                    <motion.div
                      key={prediction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <PredictionCard prediction={prediction} />
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <CreatePredictionModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  )
}
