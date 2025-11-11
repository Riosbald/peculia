import type { Metadata } from "next"
import GettingStartedClientPage from "./getting-started-client-page"

export const metadata: Metadata = {
  title: "Getting Started | Peculia Documentation",
  description: "Learn the basics of the Peculia multi-chain Web3 platform",
}

export default function GettingStartedPage() {
  return <GettingStartedClientPage />
}
