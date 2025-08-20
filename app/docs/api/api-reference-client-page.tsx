"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronRight, Book, Code, Terminal, ArrowRight, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function ApiReferenceClientPage() {
  const [activeSection, setActiveSection] = useState("introduction")
  const [activeTab, setActiveTab] = useState("predictions")
  const [copied, setCopied] = useState<string | null>(null)
  const router = useRouter()

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-[#0a0a0a] rounded-lg border border-white/10 p-4">
              <h3 className="text-white font-medium mb-4">API Reference</h3>
              <nav className="space-y-1">
                <button
                  onClick={() => scrollToSection("introduction")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "introduction"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Introduction</span>
                </button>
                <button
                  onClick={() => scrollToSection("authentication")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "authentication"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Authentication</span>
                </button>
                <button
                  onClick={() => scrollToSection("endpoints")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "endpoints"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>API Endpoints</span>
                </button>
                <button
                  onClick={() => scrollToSection("rate-limits")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "rate-limits"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Rate Limits</span>
                </button>
                <button
                  onClick={() => scrollToSection("error-handling")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "error-handling"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Error Handling</span>
                </button>
                <button
                  onClick={() => scrollToSection("webhooks")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "webhooks"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Webhooks</span>
                </button>
                <button
                  onClick={() => scrollToSection("sdks")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "sdks"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>SDKs & Libraries</span>
                </button>
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
                    <ArrowRight size={14} className="mr-2" />
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

                <section id="introduction" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      The Peculia API allows developers to integrate with our platform and build applications that
                      leverage our prediction markets, token pitching, quest system, and quadratic funding features.
                    </p>
                    <p>
                      Our API follows RESTful principles and uses standard HTTP methods and status codes. All responses
                      are returned in JSON format.
                    </p>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg mt-4">
                      <h3 className="text-white font-medium mb-2">Base URL</h3>
                      <div className="flex items-center bg-black p-3 rounded-md font-mono text-sm">
                        <code className="text-white/90 flex-1">https://api.peculia.io/v1</code>
                        <button
                          onClick={() => copyToClipboard("https://api.peculia.io/v1", "base-url")}
                          className="text-white/50 hover:text-white/80 transition-colors"
                        >
                          {copied === "base-url" ? <Check size={16} className="text-[#10b981]" /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="authentication" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Authentication</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      All API requests require authentication using an API key. You can generate an API key in your
                      account settings.
                    </p>
                    <p>
                      Include your API key in the <code className="bg-black px-1 py-0.5 rounded">Authorization</code>{" "}
                      header of your requests:
                    </p>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                      <h3 className="text-white font-medium mb-2">Example Request with Authentication</h3>
                      <div className="bg-black p-3 rounded-md font-mono text-sm overflow-x-auto">
                        {`fetch('https://api.peculia.io/v1/predictions', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})`}
                      </div>
                    </div>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg mt-4">
                      <h3 className="text-white font-medium mb-2">API Key Security</h3>
                      <ul className="list-disc pl-6 space-y-2 text-sm">
                        <li>Never expose your API key in client-side code or public repositories.</li>
                        <li>Use environment variables to store your API key in your applications.</li>
                        <li>Rotate your API keys periodically for enhanced security.</li>
                        <li>You can revoke API keys at any time from your account settings.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section id="endpoints" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">API Endpoints</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      The Peculia API is organized around the main features of our platform. Below are the available
                      endpoints for each feature:
                    </p>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                      <TabsList className="bg-[#1a1a1a] p-1 mb-6">
                        <TabsTrigger
                          value="predictions"
                          className="data-[state=active]:bg-[#10b981]/10 data-[state=active]:text-[#10b981]"
                        >
                          Prediction Markets
                        </TabsTrigger>
                        <TabsTrigger
                          value="tokens"
                          className="data-[state=active]:bg-[#10b981]/10 data-[state=active]:text-[#10b981]"
                        >
                          Token Pitching
                        </TabsTrigger>
                        <TabsTrigger
                          value="quests"
                          className="data-[state=active]:bg-[#10b981]/10 data-[state=active]:text-[#10b981]"
                        >
                          Quest System
                        </TabsTrigger>
                        <TabsTrigger
                          value="funding"
                          className="data-[state=active]:bg-[#10b981]/10 data-[state=active]:text-[#10b981]"
                        >
                          Quadratic Funding
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="predictions" className="space-y-6">
                        <div className="border border-white/10 rounded-md overflow-hidden">
                          <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10 flex justify-between items-center">
                            <h4 className="text-white font-medium">GET /predictions</h4>
                            <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">GET</span>
                          </div>
                          <div className="p-4">
                            <p className="mb-4">Retrieve a list of prediction markets.</p>
                            <h5 className="text-white font-medium mt-3 mb-2">Parameters</h5>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-white/10">
                                  <th className="text-left py-2 text-white/70">Name</th>
                                  <th className="text-left py-2 text-white/70">Type</th>
                                  <th className="text-left py-2 text-white/70">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">limit</td>
                                  <td className="py-2">integer</td>
                                  <td className="py-2">Maximum number of results (default: 20)</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">offset</td>
                                  <td className="py-2">integer</td>
                                  <td className="py-2">Number of results to skip (default: 0)</td>
                                </tr>
                                <tr>
                                  <td className="py-2">status</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Filter by status (active, resolved, all)</td>
                                </tr>
                              </tbody>
                            </table>

                            <h5 className="text-white font-medium mt-4 mb-2">Response</h5>
                            <div className="bg-black p-3 rounded-md font-mono text-sm overflow-x-auto">
                              {`{
  "predictions": [
    {
      "id": "pred_123456",
      "title": "Will ETH reach $5000 by end of 2023?",
      "description": "This market predicts whether Ethereum...",
      "created_at": "2023-05-15T10:30:00Z",
      "expires_at": "2023-12-31T23:59:59Z",
      "status": "active",
      "yes_amount": "1250.5",
      "no_amount": "850.75",
      "total_volume": "2101.25"
    },
    // More prediction markets...
  ],
  "total": 156,
  "limit": 20,
  "offset": 0
}`}
                            </div>
                          </div>
                        </div>

                        <div className="border border-white/10 rounded-md overflow-hidden">
                          <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10 flex justify-between items-center">
                            <h4 className="text-white font-medium">POST /predictions</h4>
                            <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded">POST</span>
                          </div>
                          <div className="p-4">
                            <p className="mb-4">Create a new prediction market.</p>
                            <h5 className="text-white font-medium mt-3 mb-2">Request Body</h5>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-white/10">
                                  <th className="text-left py-2 text-white/70">Name</th>
                                  <th className="text-left py-2 text-white/70">Type</th>
                                  <th className="text-left py-2 text-white/70">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">title</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Title of the prediction market</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">description</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Detailed description of the prediction</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">expires_at</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">ISO 8601 timestamp for expiration</td>
                                </tr>
                                <tr>
                                  <td className="py-2">initial_liquidity</td>
                                  <td className="py-2">number</td>
                                  <td className="py-2">Initial liquidity amount (optional)</td>
                                </tr>
                              </tbody>
                            </table>

                            <h5 className="text-white font-medium mt-4 mb-2">Example Request</h5>
                            <div className="bg-black p-3 rounded-md font-mono text-sm overflow-x-auto">
                              {`fetch('https://api.peculia.io/v1/predictions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Will BTC reach $100k by end of 2024?',
    description: 'This market predicts whether Bitcoin will reach...',
    expires_at: '2024-12-31T23:59:59Z',
    initial_liquidity: 500
  })
})`}
                            </div>
                          </div>
                        </div>

                        <div className="border border-white/10 rounded-md overflow-hidden">
                          <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10 flex justify-between items-center">
                            <h4 className="text-white font-medium">GET /predictions/{"{id}"}</h4>
                            <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">GET</span>
                          </div>
                          <div className="p-4">
                            <p className="mb-4">Retrieve a specific prediction market by ID.</p>
                            <h5 className="text-white font-medium mt-3 mb-2">Path Parameters</h5>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-white/10">
                                  <th className="text-left py-2 text-white/70">Name</th>
                                  <th className="text-left py-2 text-white/70">Type</th>
                                  <th className="text-left py-2 text-white/70">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="py-2">id</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Unique identifier of the prediction market</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="tokens" className="space-y-6">
                        <div className="border border-white/10 rounded-md overflow-hidden">
                          <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10 flex justify-between items-center">
                            <h4 className="text-white font-medium">GET /token-pitches</h4>
                            <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">GET</span>
                          </div>
                          <div className="p-4">
                            <p className="mb-4">Retrieve a list of token pitches.</p>
                            <h5 className="text-white font-medium mt-3 mb-2">Parameters</h5>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-white/10">
                                  <th className="text-left py-2 text-white/70">Name</th>
                                  <th className="text-left py-2 text-white/70">Type</th>
                                  <th className="text-left py-2 text-white/70">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">limit</td>
                                  <td className="py-2">integer</td>
                                  <td className="py-2">Maximum number of results (default: 20)</td>
                                </tr>
                                <tr>
                                  <td className="py-2">offset</td>
                                  <td className="py-2">integer</td>
                                  <td className="py-2">Number of results to skip (default: 0)</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="border border-white/10 rounded-md overflow-hidden">
                          <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10 flex justify-between items-center">
                            <h4 className="text-white font-medium">POST /token-pitches</h4>
                            <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded">POST</span>
                          </div>
                          <div className="p-4">
                            <p className="mb-4">Create a new token pitch.</p>
                            <h5 className="text-white font-medium mt-3 mb-2">Request Body</h5>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-white/10">
                                  <th className="text-left py-2 text-white/70">Name</th>
                                  <th className="text-left py-2 text-white/70">Type</th>
                                  <th className="text-left py-2 text-white/70">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">name</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Name of the token</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">symbol</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Token symbol (e.g., BTC, ETH)</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">description</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Detailed description of the token</td>
                                </tr>
                                <tr>
                                  <td className="py-2">use_case</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Primary use case for the token</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="border border-white/10 rounded-md overflow-hidden">
                          <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10 flex justify-between items-center">
                            <h4 className="text-white font-medium">POST /token-pitches/{"{id}"}/simulate</h4>
                            <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded">POST</span>
                          </div>
                          <div className="p-4">
                            <p className="mb-4">Run a simulation on a token pitch.</p>
                            <h5 className="text-white font-medium mt-3 mb-2">Request Body</h5>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-white/10">
                                  <th className="text-left py-2 text-white/70">Name</th>
                                  <th className="text-left py-2 text-white/70">Type</th>
                                  <th className="text-left py-2 text-white/70">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">initial_supply</td>
                                  <td className="py-2">number</td>
                                  <td className="py-2">Initial token supply</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">initial_price</td>
                                  <td className="py-2">number</td>
                                  <td className="py-2">Initial token price</td>
                                </tr>
                                <tr>
                                  <td className="py-2">simulation_period</td>
                                  <td className="py-2">integer</td>
                                  <td className="py-2">Number of days to simulate</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="quests" className="space-y-6">
                        <div className="border border-white/10 rounded-md overflow-hidden">
                          <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10 flex justify-between items-center">
                            <h4 className="text-white font-medium">GET /quests</h4>
                            <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">GET</span>
                          </div>
                          <div className="p-4">
                            <p className="mb-4">Retrieve a list of available quests.</p>
                            <h5 className="text-white font-medium mt-3 mb-2">Parameters</h5>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-white/10">
                                  <th className="text-left py-2 text-white/70">Name</th>
                                  <th className="text-left py-2 text-white/70">Type</th>
                                  <th className="text-left py-2 text-white/70">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">difficulty</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Filter by difficulty (beginner, intermediate, advanced)</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">status</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Filter by status (active, completed, expired)</td>
                                </tr>
                                <tr>
                                  <td className="py-2">category</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Filter by category (prediction, token, governance)</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="border border-white/10 rounded-md overflow-hidden">
                          <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10 flex justify-between items-center">
                            <h4 className="text-white font-medium">POST /quests/{"{id}"}/complete</h4>
                            <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded">POST</span>
                          </div>
                          <div className="p-4">
                            <p className="mb-4">Submit a quest completion for verification.</p>
                            <h5 className="text-white font-medium mt-3 mb-2">Path Parameters</h5>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-white/10">
                                  <th className="text-left py-2 text-white/70">Name</th>
                                  <th className="text-left py-2 text-white/70">Type</th>
                                  <th className="text-left py-2 text-white/70">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="py-2">id</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Unique identifier of the quest</td>
                                </tr>
                              </tbody>
                            </table>
                            <h5 className="text-white font-medium mt-4 mb-2">Request Body</h5>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-white/10">
                                  <th className="text-left py-2 text-white/70">Name</th>
                                  <th className="text-left py-2 text-white/70">Type</th>
                                  <th className="text-left py-2 text-white/70">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="py-2">proof</td>
                                  <td className="py-2">object</td>
                                  <td className="py-2">Proof of completion (varies by quest type)</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="funding" className="space-y-6">
                        <div className="border border-white/10 rounded-md overflow-hidden">
                          <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10 flex justify-between items-center">
                            <h4 className="text-white font-medium">GET /proposals</h4>
                            <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded">GET</span>
                          </div>
                          <div className="p-4">
                            <p className="mb-4">Retrieve a list of funding proposals.</p>
                            <h5 className="text-white font-medium mt-3 mb-2">Parameters</h5>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-white/10">
                                  <th className="text-left py-2 text-white/70">Name</th>
                                  <th className="text-left py-2 text-white/70">Type</th>
                                  <th className="text-left py-2 text-white/70">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">status</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Filter by status (active, funded, rejected)</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">category</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Filter by category (development, marketing, research)</td>
                                </tr>
                                <tr>
                                  <td className="py-2">sort_by</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Sort by field (created_at, funding_amount, votes)</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="border border-white/10 rounded-md overflow-hidden">
                          <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10 flex justify-between items-center">
                            <h4 className="text-white font-medium">POST /proposals</h4>
                            <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded">POST</span>
                          </div>
                          <div className="p-4">
                            <p className="mb-4">Create a new funding proposal.</p>
                            <h5 className="text-white font-medium mt-3 mb-2">Request Body</h5>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-white/10">
                                  <th className="text-left py-2 text-white/70">Name</th>
                                  <th className="text-left py-2 text-white/70">Type</th>
                                  <th className="text-left py-2 text-white/70">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">title</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Title of the proposal</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">description</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Detailed description of the proposal</td>
                                </tr>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">funding_amount</td>
                                  <td className="py-2">number</td>
                                  <td className="py-2">Requested funding amount</td>
                                </tr>
                                <tr>
                                  <td className="py-2">category</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Proposal category</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div className="border border-white/10 rounded-md overflow-hidden">
                          <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10 flex justify-between items-center">
                            <h4 className="text-white font-medium">POST /proposals/{"{id}"}/vote</h4>
                            <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded">POST</span>
                          </div>
                          <div className="p-4">
                            <p className="mb-4">Vote on a funding proposal using quadratic voting.</p>
                            <h5 className="text-white font-medium mt-3 mb-2">Request Body</h5>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-white/10">
                                  <th className="text-left py-2 text-white/70">Name</th>
                                  <th className="text-left py-2 text-white/70">Type</th>
                                  <th className="text-left py-2 text-white/70">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-white/10">
                                  <td className="py-2">vote_amount</td>
                                  <td className="py-2">number</td>
                                  <td className="py-2">Amount of voting power to allocate</td>
                                </tr>
                                <tr>
                                  <td className="py-2">direction</td>
                                  <td className="py-2">string</td>
                                  <td className="py-2">Vote direction (for, against)</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </section>

                <section id="rate-limits" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Rate Limits</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      The API is rate-limited to ensure fair usage and maintain service stability. The current limits
                      are:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>100 requests per minute for free tier users</li>
                      <li>1,000 requests per minute for premium tier users</li>
                      <li>Custom limits available for enterprise users</li>
                    </ul>
                    <p className="mt-3">Rate limit information is included in the response headers:</p>
                    <div className="bg-[#1a1a1a] p-3 rounded-md mt-2 font-mono text-sm">
                      {`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1620000000`}
                    </div>
                    <p className="mt-3">
                      If you exceed the rate limit, you'll receive a 429 Too Many Requests response with information
                      about when you can resume making requests.
                    </p>
                  </div>
                </section>

                <section id="error-handling" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Error Handling</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      The API uses standard HTTP status codes to indicate success or failure of requests. Error
                      responses include a JSON body with details about the error.
                    </p>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg mt-4">
                      <h3 className="text-white font-medium mb-2">Common Error Codes</h3>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-2 text-white/70">Status Code</th>
                            <th className="text-left py-2 text-white/70">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-white/10">
                            <td className="py-2">400 Bad Request</td>
                            <td className="py-2">The request was invalid or malformed</td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="py-2">401 Unauthorized</td>
                            <td className="py-2">Authentication failed or was not provided</td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="py-2">403 Forbidden</td>
                            <td className="py-2">You don't have permission to access the resource</td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="py-2">404 Not Found</td>
                            <td className="py-2">The requested resource doesn't exist</td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="py-2">429 Too Many Requests</td>
                            <td className="py-2">You've exceeded the rate limit</td>
                          </tr>
                          <tr>
                            <td className="py-2">500 Internal Server Error</td>
                            <td className="py-2">Something went wrong on our end</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg mt-4">
                      <h3 className="text-white font-medium mb-2">Error Response Format</h3>
                      <div className="bg-black p-3 rounded-md font-mono text-sm">
                        {`{
  "error": {
    "code": "invalid_request",
    "message": "The request was invalid",
    "details": "The 'title' field is required"
  }
}`}
                      </div>
                    </div>
                  </div>
                </section>

                <section id="webhooks" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Webhooks</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      Webhooks allow you to receive real-time notifications about events in the Peculia platform. You
                      can configure webhooks in your account settings.
                    </p>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg mt-4">
                      <h3 className="text-white font-medium mb-2">Available Events</h3>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-2 text-white/70">Event</th>
                            <th className="text-left py-2 text-white/70">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-white/10">
                            <td className="py-2">prediction.created</td>
                            <td className="py-2">A new prediction market has been created</td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="py-2">prediction.resolved</td>
                            <td className="py-2">A prediction market has been resolved</td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="py-2">token.pitched</td>
                            <td className="py-2">A new token pitch has been created</td>
                          </tr>
                          <tr className="border-b border-white/10">
                            <td className="py-2">quest.completed</td>
                            <td className="py-2">A user has completed a quest</td>
                          </tr>
                          <tr>
                            <td className="py-2">proposal.funded</td>
                            <td className="py-2">A funding proposal has been approved</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg mt-4">
                      <h3 className="text-white font-medium mb-2">Webhook Payload Example</h3>
                      <div className="bg-black p-3 rounded-md font-mono text-sm">
                        {`{
  "event": "prediction.created",
  "timestamp": "2023-06-15T14:32:10Z",
  "data": {
    "prediction_id": "pred_123456",
    "title": "Will ETH reach $5000 by end of 2023?",
    "created_by": "user_789012",
    "expires_at": "2023-12-31T23:59:59Z"
  }
}`}
                      </div>
                    </div>
                  </div>
                </section>

                <section id="sdks" className="mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">SDKs & Libraries</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      We provide official SDKs for several programming languages to make it easier to integrate with the
                      Peculia API:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2 flex items-center">
                          <Code size={16} className="mr-2" />
                          JavaScript/TypeScript
                        </h3>
                        <p className="text-sm mb-3">
                          Our JavaScript SDK works in both Node.js and browser environments.
                        </p>
                        <div className="bg-black p-2 rounded-md font-mono text-xs">npm install peculia-js</div>
                      </div>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2 flex items-center">
                          <Code size={16} className="mr-2" />
                          Python
                        </h3>
                        <p className="text-sm mb-3">Python SDK for server-side applications and data analysis.</p>
                        <div className="bg-black p-2 rounded-md font-mono text-xs">pip install peculia-python</div>
                      </div>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2 flex items-center">
                          <Code size={16} className="mr-2" />
                          Go
                        </h3>
                        <p className="text-sm mb-3">Go SDK for high-performance applications.</p>
                        <div className="bg-black p-2 rounded-md font-mono text-xs">
                          go get github.com/peculia/peculia-go
                        </div>
                      </div>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2 flex items-center">
                          <Code size={16} className="mr-2" />
                          Rust
                        </h3>
                        <p className="text-sm mb-3">Rust SDK for systems programming and blockchain applications.</p>
                        <div className="bg-black p-2 rounded-md font-mono text-xs">cargo add peculia-rs</div>
                      </div>
                    </div>
                    <p className="mt-4">
                      All SDKs are open source and available on our{" "}
                      <a href="#" className="text-[#10b981] hover:underline">
                        GitHub repository
                      </a>
                      . We welcome contributions from the community!
                    </p>
                  </div>
                </section>

                <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center">
                  <Button
                    onClick={() => router.push("/docs/getting-started")}
                    variant="outline"
                    className="text-white/70 border-white/10 hover:bg-white/5"
                  >
                    Previous: Getting Started
                  </Button>
                  <Button
                    onClick={() => router.push("/docs/cli")}
                    className="bg-[#10b981] text-black hover:bg-[#0d9668]"
                  >
                    Next: CLI Guide
                    <ChevronRight size={14} className="ml-1" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
