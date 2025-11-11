"use client"

import Link from "next/link"
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
        <div className="flex justify-between items-center gap-2">
          <Link href={`/quest-system/view/${quest.id}`} className="flex-1">
            <Button size="sm" className="icon-button w-full">
              <Eye className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">View Details</span>
              <span className="sm:hidden">View</span>
            </Button>
          </Link>

          <Link href={`/quest-system/view/${quest.id}`} className="flex-1">
            <Button size="sm" className="icon-button w-full">
              <Trophy className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Start Quest</span>
              <span className="sm:hidden">Start</span>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default QuestCard
