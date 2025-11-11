"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, ChevronRight, HelpCircle } from "lucide-react"

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("general")

  const faqData = {
    general: [
      {
        question: "What is Peculia?",
        answer:
          "Peculia is a multi-chain Web3 platform that combines prediction markets, token pitching, quest systems, and quadratic governance. Our platform uses AI and blockchain technology to create a fair, transparent, and engaging ecosystem for users to participate in.",
      },
      {
        question: "How do I get started with Peculia?",
        answer:
          "Simply connect your wallet, complete our onboarding quest series, and claim your initial PPT tokens. After that, you can explore any of our core features: prediction markets, token pitching, quests, or governance.",
      },
      {
        question: "What chains does Peculia support?",
        answer:
          "Peculia supports multiple blockchains including Ethereum, Solana, Binance Smart Chain (BSC), and Polygon. Our unified interface allows users to interact with these chains seamlessly.",
      },
      {
        question: "Is Peculia open source?",
        answer:
          "Yes, Peculia's core components are open source and available on GitHub. We believe in transparency and community collaboration. However, some proprietary AI models remain closed source.",
      },
    ],
    predictions: [
      {
        question: "How do prediction markets work?",
        answer:
          "Prediction markets allow users to create and participate in wagers about future events. Our AI system generates odds based on available data, and outcomes are verified by a swarm of AI agents that analyze multiple data sources.",
      },
      {
        question: "How are outcomes verified?",
        answer:
          "Outcomes are verified by a swarm of AI agents that analyze multiple data sources and reach consensus on the result. All verification proofs are stored on IPFS for transparency and immutability.",
      },
      {
        question: "What is the fee structure?",
        answer:
          "The platform charges a 2% creation fee and a 1% settlement fee on prediction markets. These fees help maintain our AI verification system and support platform development.",
      },
      {
        question: "Can I create private prediction markets?",
        answer:
          "Yes, you can create private markets accessible only to specific wallets. This is perfect for private betting groups, corporate forecasting, or organization-specific predictions.",
      },
    ],
    tokens: [
      {
        question: "How does token pitching work?",
        answer:
          "Token pitching allows users to simulate and evaluate token ideas in a risk-free environment. Design tokenomics, set distribution parameters, and receive AI-powered feedback on your designs.",
      },
      {
        question: "What are PPT tokens?",
        answer:
          "PPT (Peculia Platform Tokens) are the native utility tokens of the Peculia ecosystem. They're used for governance voting, prediction market participation, quest rewards, and accessing premium features.",
      },
      {
        question: "How do I earn PPT tokens?",
        answer:
          "You can earn PPT tokens through: completing quests, participating in prediction markets, staking liquidity, governance voting, and referring friends. Our deflationary model ensures value retention.",
      },
      {
        question: "Can I trade PPT on exchanges?",
        answer:
          "Yes, PPT is listed on major centralized and decentralized exchanges. Check our website for current trading pairs and liquidity information.",
      },
    ],
    governance: [
      {
        question: "How does quadratic governance work?",
        answer:
          "Quadratic governance uses a square root formula (√PPT) to determine voting power. While users with more tokens still have influence, the relationship isn't linear, preventing whale dominance.",
      },
      {
        question: "Who can participate in governance?",
        answer:
          "Any user who holds PPT tokens can participate in governance. The minimum stake is 1 PPT token. Voting power is determined by the square root of your holdings.",
      },
      {
        question: "How often are governance votes held?",
        answer:
          "Governance votes are typically held weekly, with proposals submitted by community members. Critical decisions may require emergency votes that happen within 48 hours.",
      },
      {
        question: "What types of proposals can I submit?",
        answer:
          "Users can submit proposals for: feature development, tokenomics adjustments, partnership decisions, treasury allocations, and platform governance changes. There's a minimum 100 PPT stake to submit.",
      },
    ],
    quests: [
      {
        question: "What is the Quest System?",
        answer:
          "The Quest System is a gamified feature that rewards users for completing various tasks and missions on the platform. Quests range from simple onboarding tasks to complex contributions.",
      },
      {
        question: "How many quests are available?",
        answer:
          "We maintain 150+ active quests across all difficulty levels. New quests are added weekly, and seasonal special quests offer limited-time rewards.",
      },
      {
        question: "What can I do with XP?",
        answer:
          "XP unlocks new features, increases your governance tier, and provides special status. Higher XP levels grant access to beta features and exclusive community events.",
      },
      {
        question: "Are there seasonal quests?",
        answer:
          "Yes, we run seasonal quest campaigns that last 4 weeks with unique rewards and storylines. These rotate quarterly and often tie into major platform updates.",
      },
    ],
  }

  const filteredFaqs = faqData[activeCategory as keyof typeof faqData].filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen pt-20 pb-16 bg-black">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 space-y-12">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto pt-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
              <span className="text-sm text-emerald-400 flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Frequently Asked Questions
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Common Questions Answered
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-white/70 mb-8"
          >
            Find answers to your questions about Peculia, our features, and how to get the most out of the platform.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/50 focus:border-emerald-500/50 focus:outline-none transition-colors"
            />
          </motion.div>
        </motion.section>

        {/* Category Tabs and FAQ Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 bg-transparent p-0 h-auto mb-12">
              {["general", "predictions", "tokens", "governance", "quests"].map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="capitalize px-4 py-3 rounded-lg border border-white/10 bg-black text-white/70 data-[state=active]:bg-emerald-600 data-[state=active]:border-emerald-600 data-[state=active]:text-white transition-all duration-200"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(faqData).map(([category, faqs]) => (
              <TabsContent key={category} value={category} className="mt-0">
                {filteredFaqs.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <Accordion type="single" collapsible className="space-y-4">
                      {filteredFaqs.map((faq, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <AccordionItem
                            value={`item-${i}`}
                            className="border border-white/10 rounded-lg overflow-hidden hover:border-emerald-500/30 transition-colors"
                          >
                            <AccordionTrigger className="px-6 py-4 hover:bg-white/5 transition-colors">
                              <span className="text-left font-semibold text-white group-hover:text-emerald-400">
                                {faq.question}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-4 text-white/70 leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        </motion.div>
                      ))}
                    </Accordion>
                  </motion.div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-white/60">No results found for your search.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Still have questions? */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center py-12 border-t border-white/10"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Didn't find your answer?</h2>
          <p className="text-white/60 mb-8">We're here to help. Reach out to our support team.</p>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            Contact Support
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.section>
      </div>
    </div>
  )
}
