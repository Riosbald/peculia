"use client"

import { useState } from "react"
import { Filter, X, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Checkbox } from "@/components/ui/checkbox"

export interface ActivityFilters {
  search: string
  type: string[]
  status: string[]
  category: string[]
  dateRange: {
    from: string
    to: string
  }
  author: string
  sortBy: "newest" | "oldest" | "popular" | "alphabetical"
}

interface ActivityFiltersProps {
  filters: ActivityFilters
  onFiltersChange: (filters: ActivityFilters) => void
  onClearFilters: () => void
  className?: string
}

const activityTypes = [
  { value: "prediction", label: "Predictions", icon: "🔮" },
  { value: "token-pitch", label: "Token Pitches", icon: "🚀" },
  { value: "quest", label: "Quests", icon: "⚔️" },
  { value: "funding", label: "Funding", icon: "💰" },
]

const statusOptions = [
  { value: "active", label: "Active", color: "text-green-500" },
  { value: "completed", label: "Completed", color: "text-blue-500" },
  { value: "pending", label: "Pending", color: "text-yellow-500" },
]

const categoryOptions = ["Technology", "Finance", "Gaming", "Art", "Music", "Sports", "Education", "Health"]

export default function ActivityFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  className = "",
}: ActivityFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilters = (updates: Partial<ActivityFilters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const toggleArrayFilter = (key: keyof Pick<ActivityFilters, "type" | "status" | "category">, value: string) => {
    const currentArray = filters[key] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]

    updateFilters({ [key]: newArray })
  }

  const hasActiveFilters =
    filters.search ||
    filters.type.length > 0 ||
    filters.status.length > 0 ||
    filters.category.length > 0 ||
    filters.author ||
    filters.dateRange.from ||
    filters.dateRange.to

  return (
    <Card className={className}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <CardTitle className="text-base">Filters</CardTitle>
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2">
                  Active
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-xs h-7">
                  Clear all
                </Button>
              )}
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  {isExpanded ? "Hide" : "Show"}
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
        </CardHeader>

        <CollapsibleContent className="lg:block">
          <CardContent className="space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search" className="text-sm font-medium">
                Search
              </Label>
              <Input
                id="search"
                placeholder="Search activities..."
                value={filters.search}
                onChange={(e) => updateFilters({ search: e.target.value })}
                className="w-full"
              />
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Sort by</Label>
              <Select
                value={filters.sortBy}
                onValueChange={(value: ActivityFilters["sortBy"]) => updateFilters({ sortBy: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="popular">Most popular</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Activity Types */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Activity Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {activityTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type.value}`}
                      checked={filters.type.includes(type.value)}
                      onCheckedChange={() => toggleArrayFilter("type", type.value)}
                    />
                    <Label
                      htmlFor={`type-${type.value}`}
                      className="text-sm font-normal cursor-pointer flex items-center gap-1"
                    >
                      <span>{type.icon}</span>
                      {type.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Status</Label>
              <div className="space-y-2">
                {statusOptions.map((status) => (
                  <div key={status.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status.value}`}
                      checked={filters.status.includes(status.value)}
                      onCheckedChange={() => toggleArrayFilter("status", status.value)}
                    />
                    <Label
                      htmlFor={`status-${status.value}`}
                      className={`text-sm font-normal cursor-pointer ${status.color}`}
                    >
                      {status.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Category</Label>
              <div className="grid grid-cols-2 gap-2">
                {categoryOptions.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.category.includes(category)}
                      onCheckedChange={() => toggleArrayFilter("category", category)}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="author" className="text-sm font-medium flex items-center gap-1">
                <User className="h-3 w-3" />
                Author
              </Label>
              <Input
                id="author"
                placeholder="Filter by author..."
                value={filters.author}
                onChange={(e) => updateFilters({ author: e.target.value })}
              />
            </div>

            {/* Date Range */}
            <div className="space-y-3">
              <Label className="text-sm font-medium flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Date Range
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="date-from" className="text-xs text-muted-foreground">
                    From
                  </Label>
                  <Input
                    id="date-from"
                    type="date"
                    value={filters.dateRange.from}
                    onChange={(e) =>
                      updateFilters({
                        dateRange: { ...filters.dateRange, from: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="date-to" className="text-xs text-muted-foreground">
                    To
                  </Label>
                  <Input
                    id="date-to"
                    type="date"
                    value={filters.dateRange.to}
                    onChange={(e) =>
                      updateFilters({
                        dateRange: { ...filters.dateRange, to: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="space-y-2 pt-4 border-t">
                <Label className="text-sm font-medium">Active Filters</Label>
                <div className="flex flex-wrap gap-1">
                  {filters.type.map((type) => (
                    <Badge key={type} variant="secondary" className="text-xs">
                      {activityTypes.find((t) => t.value === type)?.label}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-3 w-3 p-0 ml-1 hover:bg-transparent"
                        onClick={() => toggleArrayFilter("type", type)}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </Badge>
                  ))}
                  {filters.status.map((status) => (
                    <Badge key={status} variant="secondary" className="text-xs">
                      {statusOptions.find((s) => s.value === status)?.label}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-3 w-3 p-0 ml-1 hover:bg-transparent"
                        onClick={() => toggleArrayFilter("status", status)}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </Badge>
                  ))}
                  {filters.category.map((category) => (
                    <Badge key={category} variant="secondary" className="text-xs">
                      {category}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-3 w-3 p-0 ml-1 hover:bg-transparent"
                        onClick={() => toggleArrayFilter("category", category)}
                      >
                        <X className="h-2 w-2" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
