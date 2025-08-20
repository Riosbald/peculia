import type { Metadata } from "next"
import PredictionDetailClientPage from "./prediction-detail-client-page"

interface PredictionDetailPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Prediction Details | Peculia",
  description: "View detailed information about this prediction market and place your bets.",
}

export default function PredictionDetailPage({ params }: PredictionDetailPageProps) {
  return <PredictionDetailClientPage id={params.id} />
}
