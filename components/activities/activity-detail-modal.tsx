"use client"

import { useState } from "react"
import { X, Calendar, User, Tag, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface Activity {
  id: string
  type: "prediction" | "token-pitch" | "quest" | "funding"
  title: string
  description: string
  author: string
  timestamp: Date
  status: "active" | "completed" | "pending"
  category: string
  participants?: number
  reward?: string
  deadline?: Date
  tags?: string[]
  details?: {
    totalValue?: string
    currentBets?: number
    accuracy?: number
    progress?: number
    requirements?: string[]
    submissions?: number
  }
}

interface ActivityDetailModalProps {
  activity: Activity | null
  isOpen: boolean
  onClose: () => void
}

export default function ActivityDetailModal({ activity, isOpen, onClose }: ActivityDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!activity) return null

  const getStatusColor = (status: Activity["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "completed":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getTypeIcon = (type: Activity["type"]) => {
    switch (type) {
      case "prediction":
        return "🔮"
      case "token-pitch":
        return "🚀"
      case "quest":
        return "⚔️"
      case "funding":
        return "💰"
      default:
        return "📋"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{getTypeIcon(activity.type)}</span>
                <Badge variant="outline" className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
                <Badge variant="secondary">{activity.category}</Badge>
              </div>
              <DialogTitle className="text-xl font-bold leading-tight">{activity.title}</DialogTitle>
              <p className="text-muted-foreground mt-2 line-clamp-2">{activity.description}</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Author
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{activity.author}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Created
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{activity.timestamp.toLocaleDateString()}</p>
                  </CardContent>
                </Card>

                {activity.participants && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">Participants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium">{activity.participants}</p>
                    </CardContent>
                  </Card>
                )}

                {activity.reward && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium">Reward</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium">{activity.reward}</p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {activity.tags && activity.tags.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      Tags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {activity.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="details" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
                </CardContent>
              </Card>

              {activity.details && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activity.details.totalValue && (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-primary">{activity.details.totalValue}</p>
                      </CardContent>
                    </Card>
                  )}

                  {activity.details.currentBets && (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Current Bets</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{activity.details.currentBets}</p>
                      </CardContent>
                    </Card>
                  )}

                  {activity.details.accuracy && (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-green-500">{activity.details.accuracy}%</p>
                      </CardContent>
                    </Card>
                  )}

                  {activity.details.progress && (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Completed</span>
                            <span>{activity.details.progress}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${activity.details.progress}%` }}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {activity.details?.requirements && (
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {activity.details.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Activity created</p>
                        <p className="text-xs text-muted-foreground">{activity.timestamp.toLocaleString()}</p>
                      </div>
                    </div>

                    {activity.participants && activity.participants > 0 && (
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.participants} participants joined</p>
                          <p className="text-xs text-muted-foreground">Various times</p>
                        </div>
                      </div>
                    )}

                    {activity.status === "completed" && (
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Activity completed</p>
                          <p className="text-xs text-muted-foreground">Recently</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="gap-2">
              <ExternalLink className="h-4 w-4" />
              View Full Details
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
