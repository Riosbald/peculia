import type { Metadata } from "next"
import PredictionMarketsClientPage from "./PredictionMarketsClientPage"

export const metadata: Metadata = {
  title: "Prediction Markets | Peculia",
  description: "Create and participate in community-driven predictions with AI-generated odds on Peculia.",
}

export default function PredictionMarketsPage() {
  return <PredictionMarketsClientPage />
}
