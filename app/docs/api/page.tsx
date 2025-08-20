import type { Metadata } from "next"
import ApiReferenceClientPage from "./api-reference-client-page"

export const metadata: Metadata = {
  title: "API Reference - Peculia Documentation",
  description: "Complete API documentation for Peculia including endpoints, authentication, and examples.",
}

export default function ApiReferencePage() {
  return <ApiReferenceClientPage />
}
