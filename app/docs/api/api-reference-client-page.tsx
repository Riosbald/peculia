"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Book, Terminal, Copy, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ApiReferenceClientPage() {
  const [activeSection, setActiveSection] = useState("overview")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const CodeBlock = ({ code, language, id }: { code: string; language: string; id: string }) => (
    <div className="bg-[#1a1a1a] rounded-lg border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0a0a0a] border-b border-white/10">
        <span className="text-sm text-white/70">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(code, id)}
          className="text-white/70 hover:text-white"
        >
          {copiedCode === id ? <CheckCircle size={16} /> : <Copy size={16} />}
        </Button>
      </div>
      <pre className="p-4 text-sm text-white/90 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-[#0a0a0a] rounded-lg border border-white/10 p-4">
              <h3 className="text-white font-medium mb-4">API Reference</h3>
              <nav className="space-y-1">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "authentication", label: "Authentication" },
                  { id: "prediction-markets", label: "Prediction Markets" },
                  { id: "token-pitching", label: "Token Pitching" },
                  { id: "quest-system", label: "Quest System" },
                  { id: "quadratic-funding", label: "Quadratic Funding" },
                  { id: "webhooks", label: "Webhooks" },
                  { id: "rate-limits", label: "Rate Limits" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      activeSection === item.id
                        ? "bg-[#10b981]/10 text-[#10b981]"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-white font-medium mb-3">Documentation</h4>
                <div className="space-y-2">
                  <Link
                    href="/docs"
                    className="flex items-center px-3 py-2 text-sm rounded-md text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Book size={14} className="mr-2" />
                    <span>Documentation Home</span>
                  </Link>
                  <Link
                    href="/docs/getting-started"
                    className="flex items-center px-3 py-2 text-sm rounded-md text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Book size={14} className="mr-2" />
                    <span>Getting Started</span>
                  </Link>
                  <Link
                    href="/docs/cli"
                    className="flex items-center px-3 py-2 text-sm rounded-md text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Terminal size={14} className="mr-2" />
                    <span>CLI Guide</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-[#0a0a0a] rounded-lg border border-white/10 p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <h1 className="text-3xl font-bold text-white mb-6">API Reference</h1>

                <section id="overview" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      The Peculia API provides programmatic access to all platform features including prediction
                      markets, token pitching, quest systems, and quadratic funding. Our REST API uses JSON for data
                      exchange and follows standard HTTP conventions.
                    </p>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                      <h3 className="text-white font-medium mb-2">Base URL</h3>
                      <code className="text-[#10b981]">https://api.peculia.com/v1</code>
                    </div>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                      <h3 className="text-white font-medium mb-2">Content Type</h3>
                      <code className="text-[#10b981]">application/json</code>
                    </div>
                  </div>
                </section>

                <section id="authentication" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Authentication</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      Peculia API uses API keys for authentication. You can generate an API key from your account
                      dashboard. Include your API key in the Authorization header of your requests.
                    </p>
                    <CodeBlock
                      id="auth-example"
                      language="bash"
                      code={`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.peculia.com/v1/prediction-markets`}
                    />
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                      <h3 className="text-white font-medium mb-2">Getting Your API Key</h3>
                      <ol className="list-decimal pl-6 space-y-1 text-sm">
                        <li>Log in to your Peculia account</li>
                        <li>Navigate to Account Settings</li>
                        <li>Go to the API section</li>
                        <li>Click "Generate New API Key"</li>
                        <li>Copy and securely store your key</li>
                      </ol>
                    </div>
                  </div>
                </section>

                <section id="prediction-markets" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Prediction Markets</h2>
                  <div className="text-white/80 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">List Prediction Markets</h3>
                      <p className="mb-3">Retrieve a list of all active prediction markets.</p>
                      <CodeBlock
                        id="list-markets"
                        language="bash"
                        code={`GET /prediction-markets

curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.peculia.com/v1/prediction-markets`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Create Prediction Market</h3>
                      <p className="mb-3">Create a new prediction market.</p>
                      <CodeBlock
                        id="create-market"
                        language="bash"
                        code={`POST /prediction-markets

curl -X POST \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Will Bitcoin reach $100k by end of 2024?",
    "description": "Prediction about Bitcoin price target",
    "endDate": "2024-12-31T23:59:59Z",
    "category": "cryptocurrency"
  }' \\
  https://api.peculia.com/v1/prediction-markets`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Place Bet</h3>
                      <p className="mb-3">Place a bet on a prediction market.</p>
                      <CodeBlock
                        id="place-bet"
                        language="bash"
                        code={`POST /prediction-markets/{id}/bets

curl -X POST \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "outcome": "yes",
    "amount": "100",
    "currency": "USDC"
  }' \\
  https://api.peculia.com/v1/prediction-markets/123/bets`}
                      />
                    </div>
                  </div>
                </section>

                <section id="token-pitching" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Token Pitching</h2>
                  <div className="text-white/80 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">List Token Pitches</h3>
                      <p className="mb-3">Get all token pitches with optional filtering.</p>
                      <CodeBlock
                        id="list-pitches"
                        language="bash"
                        code={`GET /token-pitches?category=defi&status=active

curl -H "Authorization: Bearer YOUR_API_KEY" \\
  "https://api.peculia.com/v1/token-pitches?category=defi&status=active"`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Create Token Pitch</h3>
                      <p className="mb-3">Submit a new token pitch for community evaluation.</p>
                      <CodeBlock
                        id="create-pitch"
                        language="bash"
                        code={`POST /token-pitches

curl -X POST \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "EcoToken",
    "symbol": "ECO",
    "description": "Carbon credit tokenization platform",
    "totalSupply": "1000000000",
    "category": "sustainability",
    "tokenomics": {
      "distribution": {
        "public": 40,
        "team": 20,
        "ecosystem": 30,
        "treasury": 10
      }
    }
  }' \\
  https://api.peculia.com/v1/token-pitches`}
                      />
                    </div>
                  </div>
                </section>

                <section id="quest-system" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Quest System</h2>
                  <div className="text-white/80 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">List Available Quests</h3>
                      <p className="mb-3">Get all available quests for the authenticated user.</p>
                      <CodeBlock
                        id="list-quests"
                        language="bash"
                        code={`GET /quests

curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.peculia.com/v1/quests`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Complete Quest</h3>
                      <p className="mb-3">Mark a quest as completed and claim rewards.</p>
                      <CodeBlock
                        id="complete-quest"
                        language="bash"
                        code={`POST /quests/{id}/complete

curl -X POST \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "proof": "transaction_hash_or_verification_data"
  }' \\
  https://api.peculia.com/v1/quests/456/complete`}
                      />
                    </div>
                  </div>
                </section>

                <section id="quadratic-funding" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Quadratic Funding</h2>
                  <div className="text-white/80 space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">List Funding Rounds</h3>
                      <p className="mb-3">Get all active quadratic funding rounds.</p>
                      <CodeBlock
                        id="list-funding"
                        language="bash"
                        code={`GET /quadratic-funding

curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://api.peculia.com/v1/quadratic-funding`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-3">Submit Proposal</h3>
                      <p className="mb-3">Submit a proposal for quadratic funding.</p>
                      <CodeBlock
                        id="submit-proposal"
                        language="bash"
                        code={`POST /quadratic-funding/{roundId}/proposals

curl -X POST \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Open Source DeFi Analytics Tool",
    "description": "Building analytics tools for DeFi protocols",
    "fundingGoal": "50000",
    "category": "tooling"
  }' \\
  https://api.peculia.com/v1/quadratic-funding/round-1/proposals`}
                      />
                    </div>
                  </div>
                </section>

                <section id="webhooks" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Webhooks</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      Webhooks allow you to receive real-time notifications when events occur on the Peculia platform.
                    </p>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                      <h3 className="text-white font-medium mb-2">Supported Events</h3>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>prediction_market.created</li>
                        <li>prediction_market.resolved</li>
                        <li>token_pitch.submitted</li>
                        <li>quest.completed</li>
                        <li>funding_round.started</li>
                      </ul>
                    </div>
                    <CodeBlock
                      id="webhook-example"
                      language="json"
                      code={`{
  "event": "prediction_market.resolved",
  "data": {
    "id": "123",
    "title": "Will Bitcoin reach $100k by end of 2024?",
    "outcome": "no",
    "resolvedAt": "2024-12-31T23:59:59Z"
  },
  "timestamp": "2024-12-31T23:59:59Z"
}`}
                    />
                  </div>
                </section>

                <section id="rate-limits" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Rate Limits</h2>
                  <div className="text-white/80 space-y-4">
                    <p>To ensure fair usage and platform stability, the Peculia API implements rate limiting.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2">Standard Tier</h3>
                        <ul className="text-sm space-y-1">
                          <li>1,000 requests per hour</li>
                          <li>10 requests per second</li>
                        </ul>
                      </div>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2">Premium Tier</h3>
                        <ul className="text-sm space-y-1">
                          <li>10,000 requests per hour</li>
                          <li>100 requests per second</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                      <h3 className="text-white font-medium mb-2">Rate Limit Headers</h3>
                      <pre className="text-sm text-white/70">
                        {`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200`}
                      </pre>
                    </div>
                  </div>
                </section>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
