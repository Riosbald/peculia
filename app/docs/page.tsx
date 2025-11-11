import type { Metadata } from "next"
import DocsClientPage from "./docs-client-page"

export const metadata: Metadata = {
  title: "Documentation | Peculia",
  description: "Comprehensive documentation for the Peculia multi-chain Web3 platform",
}

export default function DocsPage() {
  return <DocsClientPage />
}
