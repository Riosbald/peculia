"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Book, Code, Terminal, CheckCircle, Users, Zap } from "lucide-react"

export default function GettingStartedClientPage() {
  const [activeSection, setActiveSection] = useState("introduction")

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-[#0a0a0a] rounded-lg border border-white/10 p-4">
              <h3 className="text-white font-medium mb-4">Getting Started</h3>
              <nav className="space-y-1">
                {[
                  { id: "introduction", label: "Introduction" },
                  { id: "prerequisites", label: "Prerequisites" },
                  { id: "account-setup", label: "Account Setup" },
                  { id: "wallet-connection", label: "Wallet Connection" },
                  { id: "ecosystem-overview", label: "Ecosystem Overview" },
                  { id: "first-steps", label: "First Steps" },
                  { id: "next-steps", label: "Next Steps" },
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
                    href="/docs/api"
                    className="flex items-center px-3 py-2 text-sm rounded-md text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Code size={14} className="mr-2" />
                    <span>API Reference</span>
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
                <h1 className="text-3xl font-bold text-white mb-6">Getting Started with Peculia</h1>

                <section id="introduction" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      Welcome to Peculia, a multi-chain Web3 platform that enables decentralized prediction markets,
                      token pitching, and quadratic governance across multiple blockchains. This guide will help you get
                      started with the platform and explore its features.
                    </p>
                    <p>
                      Peculia is designed to be intuitive and user-friendly, even for those new to Web3. Our platform
                      combines several innovative features to create a unique ecosystem for decentralized applications
                      and governance.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2">Prediction Markets</h3>
                        <p className="text-sm text-white/70">
                          Create and participate in AI-verified predictions about future events, with real-time market
                          data and transparent resolution.
                        </p>
                      </div>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2">Token Pitching</h3>
                        <p className="text-sm text-white/70">
                          Simulate and evaluate token ideas before launching them, with comprehensive tokenomics
                          analysis and community feedback.
                        </p>
                      </div>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2">Quest System</h3>
                        <p className="text-sm text-white/70">
                          Complete missions to earn rewards and governance rights, with gamified experiences that
                          encourage platform participation.
                        </p>
                      </div>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2">Quadratic Funding</h3>
                        <p className="text-sm text-white/70">
                          Fair governance with square root of proportional voting power, ensuring that collective
                          preferences are accurately represented.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="prerequisites" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Prerequisites</h2>
                  <div className="text-white/80 space-y-4">
                    <p>Before you begin using Peculia, ensure you have the following:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Web3 Wallet:</strong> You'll need a Web3 wallet like MetaMask, WalletConnect, or any
                        other compatible wallet to interact with the blockchain features of Peculia.
                      </li>
                      <li>
                        <strong>Cryptocurrency:</strong> Depending on the blockchain you choose to interact with, you'll
                        need some cryptocurrency for gas fees (ETH for Ethereum, MATIC for Polygon, etc.).
                      </li>
                      <li>
                        <strong>Basic Understanding:</strong> While Peculia is designed to be user-friendly, a basic
                        understanding of blockchain concepts will be helpful.
                      </li>
                    </ul>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg mt-4">
                      <h3 className="text-white font-medium mb-2">Supported Wallets</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        {["MetaMask", "WalletConnect", "Coinbase Wallet", "Trust Wallet", "Rainbow", "Ledger Live"].map(
                          (wallet) => (
                            <li key={wallet} className="flex items-center text-white/70">
                              <CheckCircle size={14} className="text-[#10b981] mr-2" />
                              {wallet}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </section>

                <section id="account-setup" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Account Setup</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      Setting up your Peculia account is quick and straightforward. Follow these steps to create your
                      account:
                    </p>
                    <ol className="list-decimal pl-6 space-y-4">
                      <li>
                        <strong>Visit the Sign Up Page:</strong> Navigate to the{" "}
                        <Link href="/signup" className="text-[#10b981] hover:underline">
                          Sign Up page
                        </Link>{" "}
                        to begin the registration process.
                      </li>
                      <li>
                        <strong>Choose Your Registration Method:</strong> You can sign up using your email address or
                        connect directly with your Web3 wallet.
                      </li>
                      <li>
                        <strong>Complete Your Profile:</strong> Add your username, profile picture, and other details to
                        personalize your account.
                      </li>
                      <li>
                        <strong>Verify Your Email:</strong> If you signed up with email, verify your email address by
                        clicking the link sent to your inbox.
                      </li>
                      <li>
                        <strong>Set Your Preferences:</strong> Configure your notification settings, privacy
                        preferences, and other account options.
                      </li>
                    </ol>
                  </div>
                </section>

                <section id="wallet-connection" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Wallet Connection</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      Connecting your Web3 wallet is essential for participating in blockchain-based features. Here's
                      how to connect your wallet:
                    </p>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                      <h3 className="text-white font-medium mb-3">Step-by-Step Wallet Connection</h3>
                      <ol className="list-decimal pl-6 space-y-3 text-sm">
                        <li>Click the "Connect Wallet" button in the top navigation bar</li>
                        <li>Select your preferred wallet from the list of supported options</li>
                        <li>Approve the connection request in your wallet application</li>
                        <li>Sign the message to verify ownership of your wallet address</li>
                        <li>Your wallet is now connected and ready to use</li>
                      </ol>
                    </div>
                  </div>
                </section>

                <section id="ecosystem-overview" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Ecosystem Overview</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      Peculia consists of several interconnected modules that work together to create a comprehensive
                      Web3 experience:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <Zap className="text-[#10b981] mr-2" size={20} />
                          <h3 className="text-white font-medium">Prediction Markets</h3>
                        </div>
                        <p className="text-sm text-white/70 mb-3">
                          Create and trade predictions on future events with AI verification and transparent resolution.
                        </p>
                        <Link href="/prediction-markets" className="text-[#10b981] text-sm hover:underline">
                          Explore Markets →
                        </Link>
                      </div>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <div className="flex items-center mb-3">
                          <Users className="text-[#10b981] mr-2" size={20} />
                          <h3 className="text-white font-medium">Token Pitching</h3>
                        </div>
                        <p className="text-sm text-white/70 mb-3">
                          Simulate token economics and get community feedback before launching your project.
                        </p>
                        <Link href="/token-pitching" className="text-[#10b981] text-sm hover:underline">
                          Start Pitching →
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="first-steps" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">First Steps</h2>
                  <div className="text-white/80 space-y-4">
                    <p>Now that you're set up, here are some recommended first steps:</p>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <CheckCircle className="text-[#10b981] mr-3 mt-1" size={16} />
                        <div>
                          <h3 className="text-white font-medium">Explore the Dashboard</h3>
                          <p className="text-sm text-white/70">
                            Visit your portfolio to see an overview of all platform activities and your participation.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="text-[#10b981] mr-3 mt-1" size={16} />
                        <div>
                          <h3 className="text-white font-medium">Join a Prediction Market</h3>
                          <p className="text-sm text-white/70">
                            Start with a small prediction to understand how the markets work.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <CheckCircle className="text-[#10b981] mr-3 mt-1" size={16} />
                        <div>
                          <h3 className="text-white font-medium">Complete Your First Quest</h3>
                          <p className="text-sm text-white/70">
                            Earn rewards and learn about the platform through our quest system.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="next-steps" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Next Steps</h2>
                  <div className="text-white/80 space-y-4">
                    <p>Ready to dive deeper? Here are some advanced features to explore:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link
                        href="/docs/api"
                        className="bg-[#1a1a1a] p-4 rounded-lg hover:bg-[#2a2a2a] transition-colors"
                      >
                        <h3 className="text-white font-medium mb-2">API Documentation</h3>
                        <p className="text-sm text-white/70">
                          Learn how to integrate Peculia into your own applications.
                        </p>
                      </Link>
                      <Link
                        href="/docs/cli"
                        className="bg-[#1a1a1a] p-4 rounded-lg hover:bg-[#2a2a2a] transition-colors"
                      >
                        <h3 className="text-white font-medium mb-2">CLI Tools</h3>
                        <p className="text-sm text-white/70">
                          Use command-line tools for advanced platform interactions.
                        </p>
                      </Link>
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
