"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronRight, Book, Code } from "lucide-react"

export default function CliGuideClientPage() {
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
              <h3 className="text-white font-medium mb-4">CLI Guide</h3>
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
                  onClick={() => scrollToSection("installation")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "installation"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Installation</span>
                </button>
                <button
                  onClick={() => scrollToSection("basic-commands")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "basic-commands"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Basic Commands</span>
                </button>
                <button
                  onClick={() => scrollToSection("advanced-usage")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "advanced-usage"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Advanced Usage</span>
                </button>
                <button
                  onClick={() => scrollToSection("troubleshooting")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    activeSection === "troubleshooting"
                      ? "bg-[#10b981]/10 text-[#10b981]"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Troubleshooting</span>
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
                    <ChevronRight size={14} className="mr-2" />
                    <span>Getting Started</span>
                  </Link>
                  <Link
                    href="/docs/api"
                    className="flex items-center px-3 py-2 text-sm rounded-md text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <Code size={14} className="mr-2" />
                    <span>API Reference</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-[#0a0a0a] rounded-lg border border-white/10 p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <h1 className="text-3xl font-bold text-white mb-6">Peculia CLI Guide</h1>

                <section id="introduction" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
                  <div className="text-white/80 space-y-4">
                    <p>
                      The Peculia CLI (Command-Line Interface) is a powerful tool for developers and advanced users to
                      interact with the Peculia platform directly from the terminal. This guide covers installation,
                      basic commands, and advanced usage patterns.
                    </p>
                    <p>
                      Whether you're building integrations, managing predictions, or automating workflows, the CLI
                      provides a flexible and efficient way to interact with all Peculia features.
                    </p>
                  </div>
                </section>

                <section id="installation" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Installation</h2>
                  <div className="text-white/80 space-y-4">
                    <p>Install the Peculia CLI using npm or yarn:</p>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <code className="text-[#10b981]">npm install -g @peculia/cli</code>
                    </div>
                    <p>Or with yarn:</p>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <code className="text-[#10b981]">yarn global add @peculia/cli</code>
                    </div>
                    <p>Verify installation:</p>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <code className="text-[#10b981]">peculia --version</code>
                    </div>
                  </div>
                </section>

                <section id="basic-commands" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Basic Commands</h2>
                  <div className="text-white/80 space-y-4">
                    <div className="space-y-4">
                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2">Authentication</h3>
                        <div className="bg-black p-3 rounded font-mono text-sm text-[#10b981] overflow-x-auto">
                          <code>peculia login</code>
                        </div>
                        <p className="text-sm text-white/70 mt-2">Authenticate with your Peculia account.</p>
                      </div>

                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2">List Predictions</h3>
                        <div className="bg-black p-3 rounded font-mono text-sm text-[#10b981] overflow-x-auto">
                          <code>peculia predictions list</code>
                        </div>
                        <p className="text-sm text-white/70 mt-2">Display all active predictions.</p>
                      </div>

                      <div className="bg-[#1a1a1a] p-4 rounded-lg">
                        <h3 className="text-white font-medium mb-2">Create Prediction</h3>
                        <div className="bg-black p-3 rounded font-mono text-sm text-[#10b981] overflow-x-auto">
                          <code>peculia predictions create --title "Event Name" --deadline 2024-12-31</code>
                        </div>
                        <p className="text-sm text-white/70 mt-2">Create a new prediction event.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="advanced-usage" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Advanced Usage</h2>
                  <div className="text-white/80 space-y-4">
                    <p>The CLI supports batch operations and scripting:</p>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                      <h3 className="text-white font-medium mb-3">Batch Operations</h3>
                      <div className="bg-black p-3 rounded font-mono text-sm text-[#10b981] overflow-x-auto">
                        <code>peculia batch --file predictions.json</code>
                      </div>
                      <p className="text-sm text-white/70 mt-2">Process multiple operations from a JSON file.</p>
                    </div>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg mt-4">
                      <h3 className="text-white font-medium mb-3">Export Data</h3>
                      <div className="bg-black p-3 rounded font-mono text-sm text-[#10b981] overflow-x-auto">
                        <code>peculia export --format csv --output data.csv</code>
                      </div>
                      <p className="text-sm text-white/70 mt-2">Export platform data in various formats.</p>
                    </div>
                  </div>
                </section>

                <section id="troubleshooting" className="mb-12">
                  <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
                  <div className="text-white/80 space-y-4">
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                      <h3 className="text-white font-medium mb-2">Command Not Found</h3>
                      <p className="text-sm text-white/70">
                        Ensure the CLI is properly installed and your PATH includes the npm global bin directory. Try
                        reinstalling with:{" "}
                        <code className="bg-black px-2 py-1 rounded text-[#10b981]">npm install -g @peculia/cli</code>
                      </p>
                    </div>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                      <h3 className="text-white font-medium mb-2">Authentication Errors</h3>
                      <p className="text-sm text-white/70">
                        Clear your stored credentials and login again:{" "}
                        <code className="bg-black px-2 py-1 rounded text-[#10b981]">
                          peculia logout && peculia login
                        </code>
                      </p>
                    </div>
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                      <h3 className="text-white font-medium mb-2">Network Issues</h3>
                      <p className="text-sm text-white/70">
                        Check your internet connection and ensure you have access to the Peculia servers. Test with:{" "}
                        <code className="bg-black px-2 py-1 rounded text-[#10b981]">peculia status</code>
                      </p>
                    </div>
                  </div>
                </section>

                <div className="mt-12 p-6 bg-[#10b981]/10 border border-[#10b981]/20 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Need Help?</h3>
                  <p className="text-white/70 text-sm">
                    For additional support, visit our{" "}
                    <Link href="/contact" className="text-[#10b981] hover:underline">
                      contact page
                    </Link>{" "}
                    or check the{" "}
                    <Link href="/docs" className="text-[#10b981] hover:underline">
                      main documentation
                    </Link>
                    .
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
