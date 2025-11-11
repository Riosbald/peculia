"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronRight, Book, Code, Terminal, ArrowRight, CheckCircle } from "lucide-react"
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
                    <div className="bg-[#1a1a1a] p-4 rounded-lg mt-4">
                      <h3 className="text-white font-medium mb-2">Security Recommendations</h3>
                      <ul className="space-y-2 text-sm text-white/70">
                        <li className="flex items-start">
                          <CheckCircle size={14} className="text-[#10b981] mr-2 mt-1" />
                          <span>Use a strong, unique password that you don't use for other services.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={14} className="text-[#10b981] mr-2 mt-1" />
                          <span>Enable two-factor authentication (2FA) for an additional layer of security.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={14} className="text-[#10b981] mr-2 mt-1" />
                          <span>Keep your wallet's recovery phrase in a secure, offline location.</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle size={14} className="text-[#10b981] mr-2 mt-1" />
                          <span>
                            Be cautious of phishing attempts and always verify you're on the official Peculia website.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section id="wallet-connection" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Wallet Connection</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      To fully utilize Peculia's features, you'll need to connect your Web3 wallet. Here's how to
                      connect your wallet:
                    </p>
                    <ol className="list-decimal pl-6 space-y-4">
                      <li>
                        <strong>Click the "Connect Wallet" Button:</strong> Look for the Connect Wallet button in the
                        top right corner of the navigation bar.
                      </li>
                      <li>
                        <strong>Select Your Wallet Provider:</strong> Choose from the list of supported wallet
                        providers.
                      </li>
                      <li>
                        <strong>Approve the Connection:</strong> Your wallet will prompt you to approve the connection
                        to Peculia. Review the permissions and approve.
                      </li>
                      <li>
                        <strong>Select Network:</strong> Choose which blockchain network you want to use (Ethereum,
                        Polygon, etc.).
                      </li>
                    </ol>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg mt-4">
                      <h3 className="text-white font-medium mb-2">Code Example: Connecting with Web3</h3>
                      <div className="bg-black p-3 rounded-md font-mono text-sm overflow-x-auto">
                        {`// Example code for connecting a wallet using Web3
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

// Define supported chains
const injected = new InjectedConnector({
  supportedChainIds: [1, 137, 56, 42161] // Ethereum, Polygon, BSC, Arbitrum
});

function ConnectWalletButton() {
  const { activate, active } = useWeb3React();

  const connectWallet = async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <button onClick={connectWallet} disabled={active}>
      {active ? 'Connected' : 'Connect Wallet'}
    </button>
  );
}`}
                      </div>
                    </div>
                  </div>
                </section>

                <section id="ecosystem-overview" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Ecosystem Overview</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      Peculia's ecosystem consists of four main components, each offering unique functionality and value
                      to users:
                    </p>

                    <div className="space-y-6 mt-4">
                      <div className="bg-[#1a1a1a] p-5 rounded-lg">
                        <h3 className="text-xl text-white font-medium mb-3">Prediction Markets</h3>
                        <p className="mb-3">
                          Peculia's prediction markets allow users to create and participate in markets that predict the
                          outcome of future events. These markets are resolved using AI verification to ensure accuracy
                          and fairness.
                        </p>
                        <h4 className="text-white font-medium mb-2">Key Features:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-white/70">
                          <li>Create markets for any verifiable future event</li>
                          <li>Trade outcome shares using cryptocurrency</li>
                          <li>Earn rewards for accurate predictions</li>
                          <li>AI-verified resolution process</li>
                          <li>Real-time market data and analytics</li>
                        </ul>
                        <Button
                          onClick={() => router.push("/prediction-markets")}
                          className="mt-4 bg-[#10b981]/20 text-[#10b981] hover:bg-[#10b981]/30"
                          variant="outline"
                        >
                          Explore Prediction Markets
                          <ArrowRight size={14} className="ml-2" />
                        </Button>
                      </div>

                      <div className="bg-[#1a1a1a] p-5 rounded-lg">
                        <h3 className="text-xl text-white font-medium mb-3">Token Pitching</h3>
                        <p className="mb-3">
                          The token pitching feature allows users to propose and simulate token ideas before launching
                          them. This provides valuable feedback and helps refine tokenomics models.
                        </p>
                        <h4 className="text-white font-medium mb-2">Key Features:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-white/70">
                          <li>Create detailed token proposals</li>
                          <li>Simulate token economics with various parameters</li>
                          <li>Receive community feedback and ratings</li>
                          <li>Compare different token models</li>
                          <li>Visualize token performance projections</li>
                        </ul>
                        <Button
                          onClick={() => router.push("/token-pitching")}
                          className="mt-4 bg-[#10b981]/20 text-[#10b981] hover:bg-[#10b981]/30"
                          variant="outline"
                        >
                          Explore Token Pitching
                          <ArrowRight size={14} className="ml-2" />
                        </Button>
                      </div>

                      <div className="bg-[#1a1a1a] p-5 rounded-lg">
                        <h3 className="text-xl text-white font-medium mb-3">Quest System</h3>
                        <p className="mb-3">
                          The quest system gamifies participation in the Peculia ecosystem. Users can complete various
                          missions to earn rewards, badges, and governance rights.
                        </p>
                        <h4 className="text-white font-medium mb-2">Key Features:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-white/70">
                          <li>Complete missions for rewards</li>
                          <li>Earn badges and achievements</li>
                          <li>Unlock governance rights</li>
                          <li>Track progress on your profile</li>
                          <li>Compete in leaderboards</li>
                        </ul>
                        <Button
                          onClick={() => router.push("/quest-system")}
                          className="mt-4 bg-[#10b981]/20 text-[#10b981] hover:bg-[#10b981]/30"
                          variant="outline"
                        >
                          Explore Quest System
                          <ArrowRight size={14} className="ml-2" />
                        </Button>
                      </div>

                      <div className="bg-[#1a1a1a] p-5 rounded-lg">
                        <h3 className="text-xl text-white font-medium mb-3">Quadratic Funding</h3>
                        <p className="mb-3">
                          Peculia's quadratic funding mechanism ensures fair governance by using the square root of
                          proportional voting power. This prevents wealth concentration and ensures that collective
                          preferences are accurately represented.
                        </p>
                        <h4 className="text-white font-medium mb-2">Key Features:</h4>
                        <ul className="list-disc pl-6 space-y-1 text-white/70">
                          <li>Square root voting power (√PPT)</li>
                          <li>Democratic proposal submission</li>
                          <li>Transparent funding allocation</li>
                          <li>Real-time voting analytics</li>
                          <li>Cross-chain governance capabilities</li>
                        </ul>
                        <Button
                          onClick={() => router.push("/quadratic-funding")}
                          className="mt-4 bg-[#10b981]/20 text-[#10b981] hover:bg-[#10b981]/30"
                          variant="outline"
                        >
                          Explore Quadratic Funding
                          <ArrowRight size={14} className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="first-steps" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">First Steps</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      Now that you understand the Peculia ecosystem, here are some recommended first steps to get
                      started:
                    </p>
                    <ol className="list-decimal pl-6 space-y-4">
                      <li>
                        <strong>Complete Your Profile:</strong> Add details to your profile to personalize your
                        experience and build trust with other users.
                      </li>
                      <li>
                        <strong>Explore the Dashboard:</strong> Familiarize yourself with the dashboard interface and
                        available features.
                      </li>
                      <li>
                        <strong>Join a Prediction Market:</strong> Participate in an existing prediction market to
                        understand how they work.
                      </li>
                      <li>
                        <strong>Complete a Beginner Quest:</strong> Start with simple quests to earn your first rewards
                        and learn the platform mechanics.
                      </li>
                      <li>
                        <strong>Review Token Pitches:</strong> Browse existing token pitches to see how the community
                        evaluates token ideas.
                      </li>
                    </ol>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg mt-4">
                      <h3 className="text-white font-medium mb-2">Beginner's Checklist</h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full border border-[#10b981] flex items-center justify-center mr-3">
                            <CheckCircle size={12} className="text-[#10b981]" />
                          </div>
                          <span className="text-white/70">Create and verify your account</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full border border-[#10b981] flex items-center justify-center mr-3">
                            <CheckCircle size={12} className="text-[#10b981]" />
                          </div>
                          <span className="text-white/70">Connect your Web3 wallet</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full border border-[#10b981] flex items-center justify-center mr-3">
                            <CheckCircle size={12} className="text-[#10b981]" />
                          </div>
                          <span className="text-white/70">Complete your profile information</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full border border-[#10b981] flex items-center justify-center mr-3">
                            <CheckCircle size={12} className="text-[#10b981]" />
                          </div>
                          <span className="text-white/70">Participate in your first prediction market</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full border border-[#10b981] flex items-center justify-center mr-3">
                            <CheckCircle size={12} className="text-[#10b981]" />
                          </div>
                          <span className="text-white/70">Complete the "Welcome to Peculia" quest</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="next-steps" className="mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">Next Steps</h2>
                  <div className="text-white/80 space-y-4">
                    <p>Once you're comfortable with the basics, here are some advanced activities to explore:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Create Your Own Prediction Market:</strong> Propose a prediction market about a future
                        event you're knowledgeable about.
                      </li>
                      <li>
                        <strong>Pitch a Token Idea:</strong> Use the token simulator to create and share your own token
                        concept.
                      </li>
                      <li>
                        <strong>Participate in Governance:</strong> Vote on proposals using the quadratic funding
                        mechanism.
                      </li>
                      <li>
                        <strong>Complete Advanced Quests:</strong> Take on more challenging quests for greater rewards.
                      </li>
                      <li>
                        <strong>Explore the API:</strong> If you're a developer, check out our API documentation to
                        build on top of Peculia.
                      </li>
                    </ul>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <Link href="/docs/api" className="block">
                        <div className="bg-[#1a1a1a] p-4 rounded-lg hover:bg-[#1a1a1a]/80 transition-colors h-full">
                          <h3 className="text-white font-medium mb-2 flex items-center">
                            <Code size={16} className="mr-2" />
                            API Reference
                          </h3>
                          <p className="text-sm text-white/70">
                            Explore our comprehensive API documentation for developers.
                          </p>
                        </div>
                      </Link>
                      <Link href="/docs/cli" className="block">
                        <div className="bg-[#1a1a1a] p-4 rounded-lg hover:bg-[#1a1a1a]/80 transition-colors h-full">
                          <h3 className="text-white font-medium mb-2 flex items-center">
                            <Terminal size={16} className="mr-2" />
                            CLI Guide
                          </h3>
                          <p className="text-sm text-white/70">
                            Learn how to use our command-line interface for advanced operations.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </section>

                <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center">
                  <Button
                    onClick={() => router.push("/docs")}
                    variant="outline"
                    className="text-white/70 border-white/10 hover:bg-white/5"
                  >
                    Back to Documentation
                  </Button>
                  <Button
                    onClick={() => router.push("/docs/api")}
                    className="bg-[#10b981] text-black hover:bg-[#0d9668]"
                  >
                    Next: API Reference
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
