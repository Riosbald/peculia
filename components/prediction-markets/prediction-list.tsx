"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"
import type { Prediction } from "@/data/predictions"
import PredictionListItem from "./prediction-list-item"

interface PredictionListProps {
  predictions: Prediction[]
  isLoading: boolean
  error: string | null
  onUpdatePrediction: (id: string, updates: Partial<Prediction>) => void
}

export default function PredictionList({ predictions, isLoading, error, onUpdatePrediction }: PredictionListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white/50 animate-pulse">Loading predictions...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-background/30 rounded-lg border border-red-500/20 p-6">
        <div className="text-red-500 mb-2">Error loading predictions</div>
        <div className="text-white/60 text-center">{error}</div>
      </div>
    )
  }

  if (predictions.length === 0) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-64 bg-background/30 rounded-lg border border-purple-500/20 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <TrendingUp className="h-12 w-12 text-purple-500/30 mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">No predictions found</h3>
        <p className="text-white/60 text-center">
          No predictions match your current filters. Try adjusting your search criteria.
        </p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      {predictions.map((prediction, index) => (
        <PredictionListItem key={prediction.id} prediction={prediction} index={index} onUpdate={onUpdatePrediction} />
      ))}
    </div>
  )
}
