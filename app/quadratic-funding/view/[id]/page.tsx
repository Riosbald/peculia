import type { Metadata } from "next"
import ProposalDetailClientPage from "./proposal-detail-client-page"

type Props = {
  params: { id: string }
}

export const metadata: Metadata = {
  title: "Proposal Details | Peculia",
  description: "View detailed information about this governance proposal",
}

export default function ProposalDetailPage({ params }: Props) {
  return <ProposalDetailClientPage id={params.id} />
}
