"use client"

import Link from "next/link"
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
        <div className="flex justify-between items-center gap-2">
          <Link href={`/token-pitching/view/${pitch.id}`} className="flex-1">
            <Button size="sm" className="icon-button w-full">
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View</span>
            </Button>
          </Link>

          <Button
            size="sm"
            className="icon-button"
            onClick={(e) => {
              e.stopPropagation()
              alert(`Support token: ${pitch.name}`)
            }}
          >
            <Award className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Support</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default TokenPitchCard
