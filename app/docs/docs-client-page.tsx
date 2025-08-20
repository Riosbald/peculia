"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Book, Code, Terminal, ArrowRight, Search, FileText, Zap, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function DocsClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("getting-started")
  const router = useRouter()
  const pathname = usePathname()

  const documentationSections = [
    {
      title: "Getting Started",
      description: "Learn the basics of Peculia and get up and running quickly",
      icon: Book,
      href: "/docs/getting-started",
      color: "text-[#10b981]",
      bgColor: "bg-[#10b981]/10",
    },
    {
      title: "API Reference",
      description: "Complete API documentation with examples and endpoints",
      icon: Code,
      href: "/docs/api",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      title: "CLI Guide",
      description: "Command-line interface documentation and usage examples",
      icon: Terminal,
      href: "/docs/cli",
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
  ]

  const quickLinks = [
    { title: "Platform Overview", href: "/docs/getting-started#introduction" },
    { title: "Wallet Connection", href: "/docs/getting-started#wallet-connection" },
    { title: "Prediction Markets API", href: "/docs/api#prediction-markets" },
    { title: "Token Pitching API", href: "/docs/api#token-pitching" },
    { title: "CLI Installation", href: "/docs/cli#installation" },
    { title: "CLI Commands", href: "/docs/cli#commands" },
  ]

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
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Everything you need to know about building with Peculia. From getting started to advanced API usage.
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
            <Input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1a1a1a] border-white/20 text-white placeholder:text-white/40"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {documentationSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={section.href}>
                <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all duration-300 group h-full">
                  <div
                    className={`${section.bgColor} ${section.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                  >
                    <section.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#10b981] transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-white/70 mb-4">{section.description}</p>
                  <div className="flex items-center text-[#10b981] group-hover:translate-x-1 transition-transform">
                    <span className="text-sm">Learn more</span>
                    <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Quick Links</h2>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center text-white/70 hover:text-white transition-colors group"
                >
                  <FileText size={16} className="mr-3 text-[#10b981]" />
                  <span className="group-hover:translate-x-1 transition-transform">{link.title}</span>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-white mb-4">Platform Features</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Zap className="text-[#10b981] mr-3 mt-1" size={16} />
                <div>
                  <h3 className="text-white font-medium">Prediction Markets</h3>
                  <p className="text-sm text-white/70">AI-verified predictions with real-time market data</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="text-[#10b981] mr-3 mt-1" size={16} />
                <div>
                  <h3 className="text-white font-medium">Token Pitching</h3>
                  <p className="text-sm text-white/70">Simulate and evaluate token ideas with community feedback</p>
                </div>
              </div>
              <div className="flex items-start">
                <FileText className="text-[#10b981] mr-3 mt-1" size={16} />
                <div>
                  <h3 className="text-white font-medium">Quadratic Funding</h3>
                  <p className="text-sm text-white/70">Fair governance with proportional voting power</p>
                </div>
              </div>
            </div>
          </motion.div>

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
                    className="flex-1 data-[state=active]:bg-blue-400/10 data-[state=active]:text-blue-400"
                    onClick={() => navigateToSection("api")}
                  >
                    API Reference
                  </TabsTrigger>
                  <TabsTrigger
                    value="cli"
                    className="flex-1 data-[state=active]:bg-purple-400/10 data-[state=active]:text-purple-400"
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
