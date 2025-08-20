import type { Metadata } from "next"
import QuestSystemClientPage from "./quest-system-client-page"

export const metadata: Metadata = {
  title: "Quest System | Peculia",
  description: "Complete gamified missions to earn XP, PPT rewards, and unlock governance tiers on Peculia.",
}

export default function QuestSystemPage() {
  return <QuestSystemClientPage />
}
