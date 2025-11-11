import type { Metadata } from "next"
import CliGuideClientPage from "./cli-guide-client-page"

export const metadata: Metadata = {
  title: "CLI Guide | Peculia Documentation",
  description: "Command-line interface documentation for the Peculia platform",
}

export default function CliGuidePage() {
  return <CliGuideClientPage />
}
