import type { Metadata } from "next"
import TokenPitchingClientPage from "./TokenPitchingClientPage"

export const metadata: Metadata = {
  title: "Token Pitching | Peculia",
  description: "Simulate and evaluate token ideas with AI feedback and reputation scoring on Peculia.",
}

export default function TokenPitchingPage() {
  return <TokenPitchingClientPage />
}
