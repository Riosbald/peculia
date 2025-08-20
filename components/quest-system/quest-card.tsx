"use client"

import type React from "react"
import { Card, CardHeader, CardBody } from "@nextui-org/react"
import { Button } from "@nextui-org/react"
import { Eye, Trophy } from "lucide-react"

interface Quest {
  id: string
  title: string
  description: string
  reward: string
}

interface QuestCardProps {
  quest: Quest
}

const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  return (
    <Card>
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{quest.title}</p>
        </div>
      </CardHeader>
      <CardBody>
        <p>{quest.description}</p>
      </CardBody>

      <div className="card-footer">
        <div className="flex justify-between items-center">
          <Button
            size="sm"
            className="icon-button"
            onClick={() => {
              window.location.href = `/quest-system/view/${quest.id}`
            }}
          >
            <Eye className="h-3.5 w-3.5" />
            View Details
          </Button>

          <Button
            size="sm"
            className="icon-button"
            onClick={() => {
              window.location.href = `/quest-system/view/${quest.id}`
            }}
          >
            <Trophy className="h-3.5 w-3.5" />
            Start Quest
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default QuestCard
