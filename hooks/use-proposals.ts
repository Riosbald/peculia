"use client"

import { useState, useEffect, useMemo } from "react"
import { mockProposals, type Proposal } from "@/data/proposals"

export type ProposalFilter = "all" | "active" | "completed" | "upcoming"
export type ProposalCategory = "all" | "platform" | "treasury" | "grants" | "protocol" | "community"

export function useProposals() {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<ProposalFilter>("all")
  const [category, setCategory] = useState<ProposalCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Simulate API call
  useEffect(() => {
    const loadProposals = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setProposals(mockProposals)
      } catch (err) {
        setError("Failed to load proposals")
      } finally {
        setIsLoading(false)
      }
    }

    loadProposals()
  }, [])

  // Filter proposals based on current filters
  const filteredProposals = useMemo(() => {
    return proposals.filter((proposal) => {
      // Filter by status
      if (filter !== "all" && proposal.type !== filter) return false

      // Filter by category
      if (category !== "all" && proposal.category !== category) return false

      // Filter by search query
      if (searchQuery && !proposal.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      return true
    })
  }, [proposals, filter, category, searchQuery])

  // Vote on proposal
  const voteOnProposal = (id: string, voteType: "for" | "against", votingPower = 35) => {
    setProposals((prev) =>
      prev.map((proposal) => {
        if (proposal.id === id) {
          const updatedVotingPower = {
            ...proposal.votingPower,
            [voteType]: proposal.votingPower[voteType] + votingPower,
          }
          return {
            ...proposal,
            votingPower: updatedVotingPower,
            participants: proposal.participants + 1,
          }
        }
        return proposal
      }),
    )
  }

  return {
    proposals: filteredProposals,
    isLoading,
    error,
    filter,
    setFilter,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    voteOnProposal,
    totalCount: proposals.length,
    filteredCount: filteredProposals.length,
  }
}
