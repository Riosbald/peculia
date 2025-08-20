import type { Metadata } from "next"
import QuadraticFundingClientPage from "./quadratic-funding-client-page"

export const metadata: Metadata = {
  title: "Quadratic Governance | Peculia",
  description: "Participate in fair governance with √(PPT) voting power to prevent whale dominance on Peculia.",
}

export default function QuadraticFundingPage() {
  return <QuadraticFundingClientPage />
}
