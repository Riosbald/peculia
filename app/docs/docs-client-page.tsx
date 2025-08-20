"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Book, Code, Terminal, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function DocsClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("getting-started")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Set active tab based on pathname
    if (pathname.includes("/getting-started")) {
      setActiveTab("getting-started")
    } else if (pathname.includes("/api")) {
      setActiveTab("api")
    } else if (pathname.includes("/cli")) {
      setActiveTab("cli")
    }
  }, [pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
  }

  const navigateToSection = (section: string) => {
    router.push(`/docs/${section}`)
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-white/80 max-w-3xl">
            Comprehensive guides, API references, and resources to help you build with Peculia.
          </p>

          <form onSubmit={handleSearch} className="mt-6 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
              <Input
                type="text"
                placeholder="Search documentation..."
                className="pl-10 bg-[#0a0a0a] border-white/10 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 bg-[#10b981] text-black hover:bg-[#0d9668]"
                size="sm"
              >
                Search
              </Button>
            </div>
          </form>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-[#0a0a0a] rounded-lg border border-white/10 p-4 sticky top-24">
              <h3 className="text-white font-medium mb-4">Documentation</h3>
              <nav className="space-y-1">
                <button
                  onClick={() => navigateToSection("getting-started")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeTab === "getting-started"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Book size={16} className="mr-2" />
                  <span>Getting Started</span>
                </button>
                <button
                  onClick={() => navigateToSection("api")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeTab === "api"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Code size={16} className="mr-2" />
                  <span>API Reference</span>
                </button>
                <button
                  onClick={() => navigateToSection("cli")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeTab === "cli"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Terminal size={16} className="mr-2" />
                  <span>CLI Guide</span>
                </button>
              </nav>

              <div className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-white font-medium mb-3">Resources</h4>
                <div className="space-y-2">
                  <a
                    href="#"
                    className="flex items-center px-3 py-2 text-sm rounded-md text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <ChevronRight size={14} className="mr-2" />
                    <span>GitHub Repository</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-3 py-2 text-sm rounded-md text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <ChevronRight size={14} className="mr-2" />
                    <span>Community Forum</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-3 py-2 text-sm rounded-md text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <ChevronRight size={14} className="mr-2" />
                    <span>Discord Server</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-[#0a0a0a] rounded-lg border border-white/10 p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full bg-[#1a1a1a] p-1 mb-6">
                  <TabsTrigger
                    value="getting-started"
                    className="flex-1 data-[state=active]:bg-[#10b981]/10 data-[state=active]:text-[#10b981]"
                    onClick={() => navigateToSection("getting-started")}
                  >
                    Getting Started
                  </TabsTrigger>
                  <TabsTrigger
                    value="api"
                    className="flex-1 data-[state=active]:bg-[#10b981]/10 data-[state=active]:text-[#10b981]"
                    onClick={() => navigateToSection("api")}
                  >
                    API Reference
                  </TabsTrigger>
                  <TabsTrigger
                    value="cli"
                    className="flex-1 data-[state=active]:bg-[#10b981]/10 data-[state=active]:text-[#10b981]"
                    onClick={() => navigateToSection("cli")}
                  >
                    CLI Guide
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="getting-started" className="text-white/80 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">Getting Started with Peculia</h2>
                    <p>
                      Welcome to Peculia, a multi-chain Web3 platform that enables decentralized prediction markets,
                      token pitching, and quadratic governance across multiple blockchains. This guide will help you get
                      started with the platform.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">What is Peculia?</h3>
                    <p>
                      Peculia is a comprehensive Web3 platform that combines several innovative features to create a
                      unique ecosystem for decentralized applications and governance:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>
                        <strong>Prediction Markets:</strong> Create and participate in AI-verified predictions about
                        future events.
                      </li>
                      <li>
                        <strong>Token Pitching:</strong> Simulate and evaluate token ideas before launching them.
                      </li>
                      <li>
                        <strong>Quest System:</strong> Complete missions to earn rewards and governance rights.
                      </li>
                      <li>
                        <strong>Quadratic Funding:</strong> Fair governance with square root of proportional voting
                        power.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Prerequisites</h3>
                    <p>Before you begin, ensure you have the following:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>A Web3 wallet (MetaMask, WalletConnect, etc.)</li>
                      <li>Basic understanding of blockchain concepts</li>
                      <li>Some cryptocurrency for gas fees (depending on the blockchain you choose)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Quick Start Guide</h3>
                    <ol className="list-decimal pl-6 mt-2 space-y-4">
                      <li>
                        <strong>Create an Account</strong>
                        <p className="mt-1">
                          Sign up for a Peculia account using your email or connect directly with your Web3 wallet.
                        </p>
                      </li>
                      <li>
                        <strong>Connect Your Wallet</strong>
                        <p className="mt-1">
                          Connect your preferred Web3 wallet to interact with the Peculia platform.
                        </p>
                        <div className="bg-[#1a1a1a] p-3 rounded-md mt-2 font-mono text-sm">
                          {`// Example wallet connection
await window.ethereum.request({ method: 'eth_requestAccounts' });`}
                        </div>
                      </li>
                      <li>
                        <strong>Explore the Ecosystem</strong>
                        <p className="mt-1">
                          Navigate through the different sections of Peculia to understand how each feature works.
                        </p>
                      </li>
                      <li>
                        <strong>Participate in Your First Activity</strong>
                        <p className="mt-1">
                          Join a prediction market, create a token pitch, or participate in quadratic funding.
                        </p>
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Next Steps</h3>
                    <p>Once you're familiar with the basics, explore our more detailed guides on specific features:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <a href="#" className="block p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#1a1a1a]/80 transition-colors">
                        <h4 className="text-white font-medium mb-2">Prediction Markets Guide</h4>
                        <p className="text-sm text-white/70">
                          Learn how to create and participate in decentralized prediction markets.
                        </p>
                      </a>
                      <a href="#" className="block p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#1a1a1a]/80 transition-colors">
                        <h4 className="text-white font-medium mb-2">Token Pitching Tutorial</h4>
                        <p className="text-sm text-white/70">
                          Discover how to create and evaluate token ideas using our simulator.
                        </p>
                      </a>
                      <a href="#" className="block p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#1a1a1a]/80 transition-colors">
                        <h4 className="text-white font-medium mb-2">Quest System Overview</h4>
                        <p className="text-sm text-white/70">
                          Understand how to complete quests and earn rewards in the ecosystem.
                        </p>
                      </a>
                      <a href="#" className="block p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#1a1a1a]/80 transition-colors">
                        <h4 className="text-white font-medium mb-2">Quadratic Funding Explained</h4>
                        <p className="text-sm text-white/70">
                          Learn about our fair governance system and how to participate.
                        </p>
                      </a>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="api" className="text-white/80 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">API Reference</h2>
                    <p>
                      The Peculia API allows developers to integrate with our platform and build applications that
                      leverage our prediction markets, token pitching, quest system, and quadratic funding features.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Authentication</h3>
                    <p>
                      All API requests require authentication using an API key. You can generate an API key in your
                      account settings.
                    </p>
                    <div className="bg-[#1a1a1a] p-3 rounded-md mt-3 font-mono text-sm">
                      {`// Example API request with authentication
fetch('https://api.peculia.io/v1/predictions', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})`}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Prediction Markets API</h3>
                    <p>
                      The Prediction Markets API allows you to create, query, and interact with prediction markets on
                      the Peculia platform.
                    </p>

                    <div className="mt-4 space-y-4">
                      <div className="border border-white/10 rounded-md overflow-hidden">
                        <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10">
                          <h4 className="text-white font-medium">GET /v1/predictions</h4>
                        </div>
                        <div className="p-4">
                          <p className="mb-2">Retrieve a list of prediction markets.</p>
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
                          <div className="bg-[#1a1a1a] p-3 rounded-md font-mono text-sm">
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
                        <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10">
                          <h4 className="text-white font-medium">POST /v1/predictions</h4>
                        </div>
                        <div className="p-4">
                          <p className="mb-2">Create a new prediction market.</p>
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
                          <div className="bg-[#1a1a1a] p-3 rounded-md font-mono text-sm">
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
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Token Pitching API</h3>
                    <p>
                      The Token Pitching API allows you to create and manage token pitches, as well as run simulations
                      on token economics.
                    </p>

                    <div className="mt-4 space-y-4">
                      <div className="border border-white/10 rounded-md overflow-hidden">
                        <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10">
                          <h4 className="text-white font-medium">GET /v1/token-pitches</h4>
                        </div>
                        <div className="p-4">
                          <p className="mb-2">Retrieve a list of token pitches.</p>
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
                        <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10">
                          <h4 className="text-white font-medium">POST /v1/token-pitches/{"{id}"}/simulate</h4>
                        </div>
                        <div className="p-4">
                          <p className="mb-2">Run a simulation on a token pitch.</p>
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
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Rate Limits</h3>
                    <p>The API is rate-limited to ensure fair usage. The current limits are:</p>
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
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Error Handling</h3>
                    <p>
                      The API uses standard HTTP status codes to indicate success or failure of requests. Error
                      responses include a JSON body with details about the error.
                    </p>
                    <div className="bg-[#1a1a1a] p-3 rounded-md mt-3 font-mono text-sm">
                      {`{
  "error": {
    "code": "invalid_request",
    "message": "The request was invalid",
    "details": "The 'title' field is required"
  }
}`}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="cli" className="text-white/80 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4">CLI Guide</h2>
                    <p>
                      The Peculia Command Line Interface (CLI) provides developers with a powerful tool to interact with
                      the Peculia platform directly from their terminal.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Installation</h3>
                    <p>You can install the Peculia CLI using npm or yarn:</p>
                    <div className="bg-[#1a1a1a] p-3 rounded-md mt-3 font-mono text-sm">
                      {`# Using npm
npm install -g peculia-cli

# Using yarn
yarn global add peculia-cli`}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Authentication</h3>
                    <p>Before using the CLI, you need to authenticate with your Peculia account:</p>
                    <div className="bg-[#1a1a1a] p-3 rounded-md mt-3 font-mono text-sm">{`peculia login`}</div>
                    <p className="mt-3">
                      This will open a browser window where you can log in to your Peculia account. After successful
                      authentication, the CLI will store your API key locally.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Basic Commands</h3>
                    <p>Here are some basic commands to get you started with the Peculia CLI:</p>

                    <div className="mt-4 space-y-4">
                      <div className="border border-white/10 rounded-md overflow-hidden">
                        <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10">
                          <h4 className="text-white font-medium">peculia help</h4>
                        </div>
                        <div className="p-4">
                          <p>Display help information and a list of available commands.</p>
                        </div>
                      </div>

                      <div className="border border-white/10 rounded-md overflow-hidden">
                        <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10">
                          <h4 className="text-white font-medium">peculia predictions list</h4>
                        </div>
                        <div className="p-4">
                          <p>List all prediction markets with optional filtering.</p>
                          <h5 className="text-white font-medium mt-3 mb-2">Options</h5>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-white/10">
                                <th className="text-left py-2 text-white/70">Option</th>
                                <th className="text-left py-2 text-white/70">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-white/10">
                                <td className="py-2">--limit=&lt;number&gt;</td>
                                <td className="py-2">Maximum number of results to return</td>
                              </tr>
                              <tr className="border-b border-white/10">
                                <td className="py-2">--status=&lt;status&gt;</td>
                                <td className="py-2">Filter by status (active, resolved, all)</td>
                              </tr>
                              <tr>
                                <td className="py-2">--format=&lt;format&gt;</td>
                                <td className="py-2">Output format (table, json, csv)</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="border border-white/10 rounded-md overflow-hidden">
                        <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10">
                          <h4 className="text-white font-medium">peculia token-pitch create</h4>
                        </div>
                        <div className="p-4">
                          <p>Create a new token pitch with interactive prompts.</p>
                          <h5 className="text-white font-medium mt-3 mb-2">Example</h5>
                          <div className="bg-[#1a1a1a] p-3 rounded-md font-mono text-sm">
                            {`$ peculia token-pitch create
? Token Name: MyAwesomeToken
? Token Symbol: MAT
? Initial Supply: 1000000
? Token Description: A revolutionary token for...
? Use Case: DeFi lending platform
Creating token pitch... Done!
Token pitch created with ID: tp_123456`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Advanced Usage</h3>
                    <p>The CLI supports more advanced operations for power users and developers:</p>

                    <div className="mt-4 space-y-4">
                      <div className="border border-white/10 rounded-md overflow-hidden">
                        <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10">
                          <h4 className="text-white font-medium">peculia deploy</h4>
                        </div>
                        <div className="p-4">
                          <p>Deploy a smart contract to interact with the Peculia platform.</p>
                          <h5 className="text-white font-medium mt-3 mb-2">Options</h5>
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-white/10">
                                <th className="text-left py-2 text-white/70">Option</th>
                                <th className="text-left py-2 text-white/70">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-white/10">
                                <td className="py-2">--network=&lt;network&gt;</td>
                                <td className="py-2">Target blockchain network (ethereum, polygon, etc.)</td>
                              </tr>
                              <tr>
                                <td className="py-2">--contract=&lt;path&gt;</td>
                                <td className="py-2">Path to the contract file</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="border border-white/10 rounded-md overflow-hidden">
                        <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/10">
                          <h4 className="text-white font-medium">peculia simulate</h4>
                        </div>
                        <div className="p-4">
                          <p>Run a token simulation with custom parameters.</p>
                          <h5 className="text-white font-medium mt-3 mb-2">Example</h5>
                          <div className="bg-[#1a1a1a] p-3 rounded-md font-mono text-sm">
                            {`$ peculia simulate --token-id=tp_123456 --days=365 --initial-price=0.1 --growth-rate=0.05
Running simulation... Done!
Simulation results saved to simulation_tp_123456_20230615.json`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Configuration</h3>
                    <p>You can configure the CLI behavior using a configuration file or environment variables:</p>
                    <div className="bg-[#1a1a1a] p-3 rounded-md mt-3 font-mono text-sm">
                      {`# Create a config file
$ peculia config init

# Set default network
$ peculia config set network polygon

# Set output format
$ peculia config set format json`}
                    </div>
                    <p className="mt-3">Alternatively, you can use environment variables:</p>
                    <div className="bg-[#1a1a1a] p-3 rounded-md mt-2 font-mono text-sm">
                      {`export PECULIA_API_KEY=your_api_key
export PECULIA_NETWORK=polygon
export PECULIA_OUTPUT_FORMAT=json`}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">Troubleshooting</h3>
                    <p>If you encounter issues with the CLI, try these troubleshooting steps:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>
                        <strong>Check your authentication:</strong> Run <code>peculia whoami</code> to verify your login
                        status.
                      </li>
                      <li>
                        <strong>Update the CLI:</strong> Run <code>npm update -g peculia-cli</code> to ensure you have
                        the latest version.
                      </li>
                      <li>
                        <strong>Enable debug mode:</strong> Run commands with <code>--debug</code> flag for verbose
                        output.
                      </li>
                      <li>
                        <strong>Reset configuration:</strong> Run <code>peculia config reset</code> to reset to default
                        settings.
                      </li>
                    </ul>
                    <p className="mt-3">
                      For more help, run <code>peculia support</code> to generate a diagnostic report that you can share
                      with our support team.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
