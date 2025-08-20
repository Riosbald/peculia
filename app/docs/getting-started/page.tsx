import type { Metadata } from "next"
import GettingStartedClientPage from "./getting-started-client-page"

export const metadata: Metadata = {
  title: "Getting Started - Peculia Documentation",
  description:
    "Learn how to get started with Peculia, including account setup, wallet connection, and platform overview.",
}

export default function GettingStartedPage() {
  return <GettingStartedClientPage />
}
