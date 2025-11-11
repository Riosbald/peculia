"use client"

import { useState, useEffect, useMemo } from "react"
import { mockPredictions, type Prediction } from "@/data/predictions"

export type PredictionFilter = "all" | "active" | "resolved" | "upcoming"
export type PredictionCategory = "all" | "Cryptocurrency" | "Technology" | "Business" | "Space"

export function usePredictions() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<PredictionFilter>("all")
  const [category, setCategory] = useState<PredictionCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Simulate API call
  useEffect(() => {
    const loadPredictions = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setPredictions(mockPredictions)
      } catch (err) {
        setError("Failed to load predictions")
      } finally {
        setIsLoading(false)
      }
    }

    loadPredictions()
  }, [])

  // Filter predictions based on current filters
  const filteredPredictions = useMemo(() => {
    return predictions.filter((prediction) => {
      // Filter by status
      if (filter !== "all" && prediction.status !== filter) return false

      // Filter by category
      if (category !== "all" && prediction.category !== category) return false

      // Filter by search query
      if (searchQuery && !prediction.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      return true
    })
  }, [predictions, filter, category, searchQuery])

  // Update prediction (for likes, stakes, etc.)
  const updatePrediction = (id: string, updates: Partial<Prediction>) => {
    setPredictions((prev) =>
      prev.map((prediction) => (prediction.id === id ? { ...prediction, ...updates } : prediction)),
    )
  }

  return {
    predictions: filteredPredictions,
    isLoading,
    error,
    filter,
    setFilter,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    updatePrediction,
    totalCount: predictions.length,
    filteredCount: filteredPredictions.length,
  }
}
