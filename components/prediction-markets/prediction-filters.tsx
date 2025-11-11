"use client"

import { Search, Filter, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { PredictionFilter, PredictionCategory } from "@/hooks/use-predictions"

interface PredictionFiltersProps {
  filter: PredictionFilter
  setFilter: (filter: PredictionFilter) => void
  category: PredictionCategory
  setCategory: (category: PredictionCategory) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  totalCount: number
  filteredCount: number
}

export default function PredictionFilters({
  filter,
  setFilter,
  category,
  setCategory,
  searchQuery,
  setSearchQuery,
  totalCount,
  filteredCount,
}: PredictionFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            placeholder="Search predictions..."
            className="pl-10 border-purple-500/20 bg-background/50 text-white placeholder:text-white/40"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-purple-500/20 text-white hover:bg-purple-500/10 bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Category
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-md border-purple-500/20">
            <DropdownMenuItem
              className={`text-white/80 cursor-pointer ${category === "all" ? "bg-purple-500/10" : ""}`}
              onClick={() => setCategory("all")}
            >
              All Categories
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`text-white/80 cursor-pointer ${category === "Cryptocurrency" ? "bg-purple-500/10" : ""}`}
              onClick={() => setCategory("Cryptocurrency")}
            >
              Cryptocurrency
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`text-white/80 cursor-pointer ${category === "Technology" ? "bg-purple-500/10" : ""}`}
              onClick={() => setCategory("Technology")}
            >
              Technology
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`text-white/80 cursor-pointer ${category === "Business" ? "bg-purple-500/10" : ""}`}
              onClick={() => setCategory("Business")}
            >
              Business
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`text-white/80 cursor-pointer ${category === "Space" ? "bg-purple-500/10" : ""}`}
              onClick={() => setCategory("Space")}
            >
              Space
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center justify-between">
        <Tabs value={filter} onValueChange={(value) => setFilter(value as PredictionFilter)}>
          <TabsList className="bg-background/20 border border-purple-500/20 p-1">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="resolved"
              className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
            >
              Resolved
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-purple-500/10 data-[state=active]:text-purple-500"
            >
              Upcoming
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Results Count */}
        <div className="text-sm text-white/60">
          Showing {filteredCount} of {totalCount} predictions
        </div>
      </div>
    </div>
  )
}
