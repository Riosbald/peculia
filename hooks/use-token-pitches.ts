"use client"

import { useState, useEffect, useMemo } from "react"
import { mockTokenPitches, type TokenPitch } from "@/data/token-pitches"

export type TokenPitchFilter = "trending" | "newest" | "top-rated"
export type TokenPitchChain = "all" | "Ethereum" | "Solana" | "Polygon" | "BSC"

export function useTokenPitches() {
  const [tokenPitches, setTokenPitches] = useState<TokenPitch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<TokenPitchFilter>("trending")
  const [chain, setChain] = useState<TokenPitchChain>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Simulate API call
  useEffect(() => {
    const loadTokenPitches = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setTokenPitches(mockTokenPitches)
      } catch (err) {
        setError("Failed to load token pitches")
      } finally {
        setIsLoading(false)
      }
    }

    loadTokenPitches()
  }, [])

  // Filter and sort token pitches
  const filteredTokenPitches = useMemo(() => {
    const filtered = tokenPitches.filter((pitch) => {
      // Filter by chain
      if (chain !== "all" && pitch.chain !== chain) return false

      // Filter by search query
      if (
        searchQuery &&
        !pitch.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !pitch.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      return true
    })

    // Sort based on filter
    switch (filter) {
      case "trending":
        return filtered.sort((a, b) => b.likes + b.staked - (a.likes + a.staked))
      case "newest":
        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case "top-rated":
        return filtered.sort((a, b) => b.aiScore + b.communityScore - (a.aiScore + a.communityScore))
      default:
        return filtered
    }
  }, [tokenPitches, filter, chain, searchQuery])

  // Update token pitch (for likes, stakes, etc.)
  const updateTokenPitch = (id: string, updates: Partial<TokenPitch>) => {
    setTokenPitches((prev) => prev.map((pitch) => (pitch.id === id ? { ...pitch, ...updates } : pitch)))
  }

  return {
    tokenPitches: filteredTokenPitches,
    isLoading,
    error,
    filter,
    setFilter,
    chain,
    setChain,
    searchQuery,
    setSearchQuery,
    updateTokenPitch,
    totalCount: tokenPitches.length,
    filteredCount: filteredTokenPitches.length,
  }
}
