import type { Metadata } from "next"
import ApiReferenceClientPage from "./api-reference-client-page"

export const metadata: Metadata = {
  title: "API Reference | Peculia Documentation",
  description: "Comprehensive API documentation for the Peculia platform",
}

export default function ApiReferencePage() {
  return <ApiReferenceClientPage />
}
