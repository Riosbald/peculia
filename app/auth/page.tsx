import type { Metadata } from "next"
import AuthClientPage from "./auth-client-page"

export const metadata: Metadata = {
  title: "Authentication - Peculia",
  description: "Sign in or create your Peculia account to access prediction markets, token pitching, and more.",
}

export default function AuthPage() {
  return <AuthClientPage />
}
