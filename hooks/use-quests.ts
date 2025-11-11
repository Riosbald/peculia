"use client"

import { useState, useEffect, useMemo } from "react"
import { mockQuests, type Quest } from "@/data/quests"

export type QuestFilter = "all" | "active" | "completed" | "locked"
export type QuestCategory = "all" | "onboarding" | "prediction" | "token" | "governance" | "community"

export function useQuests() {
  const [quests, setQuests] = useState<Quest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<QuestFilter>("all")
  const [category, setCategory] = useState<QuestCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Simulate API call
  useEffect(() => {
    const loadQuests = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setQuests(mockQuests)
      } catch (err) {
        setError("Failed to load quests")
      } finally {
        setIsLoading(false)
      }
    }

    loadQuests()
  }, [])

  // Filter quests based on current filters
  const filteredQuests = useMemo(() => {
    return quests.filter((quest) => {
      // Filter by status
      if (filter === "completed" && !quest.completed) return false
      if (filter === "active" && (quest.completed || quest.locked)) return false
      if (filter === "locked" && !quest.locked) return false

      // Filter by category
      if (category !== "all" && quest.category !== category) return false

      // Filter by search query
      if (searchQuery && !quest.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      return true
    })
  }, [quests, filter, category, searchQuery])

  // Update quest progress
  const updateQuestProgress = (id: string, progress: number) => {
    setQuests((prev) =>
      prev.map((quest) => {
        if (quest.id === id) {
          const completed = progress >= quest.total
          return { ...quest, progress, completed }
        }
        return quest
      }),
    )
  }

  // Complete quest
  const completeQuest = (id: string) => {
    setQuests((prev) =>
      prev.map((quest) => (quest.id === id ? { ...quest, completed: true, progress: quest.total } : quest)),
    )
  }

  return {
    quests: filteredQuests,
    isLoading,
    error,
    filter,
    setFilter,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    updateQuestProgress,
    completeQuest,
    totalCount: quests.length,
    filteredCount: filteredQuests.length,
  }
}
