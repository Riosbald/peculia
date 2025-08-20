"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, Award } from "lucide-react"

interface TokenPitch {
  id: string
  name: string
  description: string
}

interface TokenPitchCardProps {
  pitch: TokenPitch
}

const TokenPitchCard: React.FC<TokenPitchCardProps> = ({ pitch }) => {
  return (
    <Card className="w-[380px] shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>{pitch.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{pitch.description}</CardDescription>
      </CardContent>

      <div className="card-footer">
        <div className="flex justify-between items-center">
          <Button
            size="sm"
            className="icon-button"
            onClick={() => {
              window.location.href = `/token-pitching/view/${pitch.id}`
            }}
          >
            <Eye className="h-3.5 w-3.5" />
            View Details
          </Button>

          <Button
            size="sm"
            className="icon-button"
            onClick={(e) => {
              e.stopPropagation()
              alert(`Support token: ${pitch.name}`)
            }}
          >
            <Award className="h-3.5 w-3.5" />
            Support
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default TokenPitchCard
