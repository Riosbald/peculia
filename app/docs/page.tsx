import type { Metadata } from "next"
import DocsClientPage from "./docs-client-page"

export const metadata: Metadata = {
  title: "Documentation - Peculia",
  description:
    "Complete documentation for the Peculia platform including getting started guides, API reference, and CLI documentation.",
}

export default function DocsPage() {
  return <DocsClientPage />
}
