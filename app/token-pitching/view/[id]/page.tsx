import type { Metadata } from "next"
import TokenPitchDetailClientPage from "./token-pitch-detail-client-page"

interface TokenPitchDetailPageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Token Pitch Details | Peculia",
  description: "View detailed information about this token pitch and provide feedback.",
}

export default function TokenPitchDetailPage({ params }: TokenPitchDetailPageProps) {
  return <TokenPitchDetailClientPage id={params.id} />
}
