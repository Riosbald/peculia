import type { Metadata } from "next"
import QuestDetailClientPage from "./quest-detail-client-page"

interface QuestDetailPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Quest Details | Peculia",
  description: "View detailed information about this quest and track your progress.",
}

export default function QuestDetailPage({ params }: QuestDetailPageProps) {
  return <QuestDetailClientPage id={params.id} />
}
