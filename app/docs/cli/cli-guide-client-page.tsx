"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronRight, Book, Code, Terminal, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function GettingStartedClientPage() {
  const [activeSection, setActiveSection] = useState("introduction")
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

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 bg-[#0a0a0a] rounded-lg border border-white/10 p-4">
              <h3 className="text-white font-medium mb-4">Getting Started</h3>
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
                  onClick={() => scrollToSection("prerequisites")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "prerequisites"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Prerequisites</span>
                </button>
                <button
                  onClick={() => scrollToSection("account-setup")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "account-setup"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Account Setup</span>
                </button>
                <button
                  onClick={() => scrollToSection("wallet-connection")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "wallet-connection"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Wallet Connection</span>
                </button>
                <button
                  onClick={() => scrollToSection("ecosystem-overview")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "ecosystem-overview"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Ecosystem Overview</span>
                </button>
                <button
                  onClick={() => scrollToSection("first-steps")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "first-steps"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>First Steps</span>
                </button>
                <button
                  onClick={() => scrollToSection("next-steps")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "next-steps"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Next Steps</span>
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold text-white mb-6">Getting Started with Peculia</h1>

                <section id="introduction" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      Welcome to Peculia, a multi-chain Web3 platform that enables decentralized prediction markets, token
                      pitching, and quadratic governance across multiple blockchains. This guide will help you get started
                      with the platform and explore its features.
                    </p>
                    <p>
                      Peculia is designed to be intuitive and user-friendly, even for those new to Web3. Our platform
                      combines several innovative features to create a unique ecosystem for decentralized applications and
                      governance.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2">Prediction Markets</h3>
                        <p className="text-sm text-white/70">
                          Create and participate in AI-verified predictions about future events, with real-time market data
                          and transparent resolution.
                        </p>
                      </div>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2">Token Pitching</h3>
                        <p className="text-sm text-white/70">
                          Simulate and evaluate token ideas before launching them, with comprehensive tokenomics analysis and
                          community feedback.
                        </p>
                      </div>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2">Quest System</h3>
                        <p className="text-sm text-white/70">
                          Complete missions to earn rewards and governance rights, with gamified experiences that encourage
                          platform participation.
                        </p>
                      </div>
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2">Quadratic Funding</h3>
                        <p className="text-sm text-white/70">
                          Fair governance with square root of proportional voting power, ensuring that collective preferences
                          are accurately represented.
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
                        <strong>Web3 Wallet:</strong> You'll need a Web3 wallet like MetaMask, WalletConnect, or any other
                        compatible wallet to interact with the blockchain features of Peculia.
                      </li>
                      <li>
                        <strong>Cryptocurrency:</strong> Depending on the blockchain you choose to interact with, you'll need
                        some cryptocurrency for gas fees (ETH for Ethereum, MATIC for Polygon, etc.).
                      </li>
                      <li>
                        <strong>Basic Understanding:</strong> While Peculia is designed to be user-friendly, a basic
                        understanding of blockchain concepts will be helpful.
                      </li>
                    </ul>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg mt-4">
                      <h3 className="text-white font-medium mb-2">Supported Wallets</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        <li className="flex items-center text-white/70">
                          <CheckCircle size={14} className="text-[#10b981] mr-2" />
                          MetaMask
                        </li>
                        <li className="flex items-center text-white/70">
                          <CheckCircle size={14} className="text-[#10b981] mr-2" />
                          WalletConnect
                        </li>
                        <li className="flex items-center text-white/70">
                          <CheckCircle size={14} className="text-[#10b981] mr-2" />
                          Coinbase Wallet
                        </li>
                        <li className="flex items-center text-white/70">
                          <CheckCircle size={14} className="text-[#10b981] mr-2" />
                          Trust Wallet
                        </li>
                        <li className="flex items-center text-white/70">
                          <CheckCircle size={14} className="text-[#10b981] mr-2" />
                          Rainbow
                        </li>
                        <li className="flex items-center text-white/70">
                          <CheckCircle size={14} className="text-[#10b981] mr-2" />
                          Ledger Live
                        </li>
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
                        <strong>Choose Your Registration Method:</strong> You can sign up using your email address or connect
                        directly with your Web3 wallet.
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
                        <strong>Set Your Preferences:</strong> Configure your notification settings, privacy preferences, and
                        other account options.
                      </li>
                    </ol>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg mt-4">
                      <h3 className="text-white font-medium mb-2">Security Recommendations</h3>
                      <ul className="space-y-2 text-sm text-white/70">
                        <li className="flex items-start">
                          <CheckCircle size={14} className="text-[#10b981] mr-2 mt-1" />
                          <span>
                            Use a strong, unique password that you don't use for other services.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={14} className="text-[#10b981
