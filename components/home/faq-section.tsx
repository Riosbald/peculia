"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "What is Peculia?",
    answer:
      "Peculia is a multi-chain Web3 platform that combines prediction markets, token pitching, quest systems, and quadratic governance. Our platform uses AI and blockchain technology to create a fair, transparent, and engaging ecosystem for users to participate in.",
  },
  {
    question: "How do prediction markets work?",
    answer:
      "Prediction markets on Peculia allow users to create and participate in wagers about future events. Our AI system generates odds based on available data, and outcomes are verified by a swarm of AI agents that analyze multiple data sources. All verification proofs are stored on IPFS for transparency and immutability.",
  },
  {
    question: "What chains does Peculia support?",
    answer:
      "Peculia supports multiple blockchains including Ethereum, Solana, Binance Smart Chain (BSC), and Polygon. Our unified interface allows users to interact with these chains seamlessly, and we plan to add support for more chains in the future.",
  },
  {
    question: "What are PPT tokens?",
    answer:
      "PPT (Peculia Platform Tokens) are the native utility tokens of the Peculia ecosystem. They're used for governance voting, prediction market participation, quest rewards, and accessing premium features. PPT tokens follow a deflationary model with cross-chain burns to maintain value.",
  },
  {
    question: "How does quadratic governance work?",
    answer:
      "Quadratic governance uses a square root formula (√PPT) to determine voting power. This means that while users with more tokens still have more influence, the relationship isn't linear. This prevents whale dominance while still rewarding token holders, creating a more democratic governance system.",
  },
  {
    question: "What is the Quest System?",
    answer:
      "The Quest System is a gamified feature that rewards users for completing various tasks and missions on the platform. Quests range from simple onboarding tasks to complex contributions. Completing quests earns you XP and PPT tokens, which unlock higher governance tiers and platform benefits.",
  },
  {
    question: "How does token pitching work?",
    answer:
      "Token pitching allows users to simulate and evaluate token ideas in a risk-free environment. Users can design tokenomics, set distribution parameters, and receive AI-powered feedback on their designs. Successful pitches earn reputation points, which unlock additional platform features.",
  },
  {
    question: "Is Peculia open source?",
    answer:
      "Yes, Peculia's core components are open source and available on GitHub. We believe in transparency and community collaboration. However, some proprietary AI models and specific platform features remain closed source to protect our competitive advantage.",
  },
]

export default function FAQSection() {
  const [openItem, setOpenItem] = useState<string | undefined>(undefined)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-green-500/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-radial from-blue-500/5 to-transparent"></div>
      </div>

      {/* Floating particles */}
      {isInView &&
        Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute rounded-full bg-green-500/20",
              i % 3 === 0 ? "h-3 w-3" : i % 3 === 1 ? "h-5 w-5" : "h-2 w-2",
            )}
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              x: `calc(${Math.random() * 100 - 50}% + ${Math.random() * 200 - 100}px)`,
              y: `calc(${Math.random() * 100}% - ${Math.random() * 200}px)`,
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center mb-3 bg-green-500/10 px-4 py-1 rounded-full">
            <HelpCircle className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-green-500 text-sm font-medium">Common Questions</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4 font-mono">
            <span className="relative">
              Frequently Asked Questions
              <motion.span
                className="absolute -bottom-2 left-0 h-1 bg-green-500/50 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>
          <p className="text-lg text-primary/80">Everything you need to know about Peculia and how it works.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div variants={containerVariants} initial="hidden" animate={controls} className="space-y-4">
            <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem} className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className={cn(
                      "border rounded-lg overflow-hidden transition-all duration-300",
                      openItem === `item-${index}`
                        ? "border-green-500/30 bg-background/30 shadow-lg shadow-green-500/10"
                        : hoveredItem === index
                          ? "border-primary/20 bg-background/20"
                          : "border-primary/10 bg-background/20",
                    )}
                  >
                    <AccordionTrigger className="px-6 py-4 text-left font-medium text-primary hover:bg-primary/5 hover:no-underline group">
                      <div className="flex items-center w-full">
                        {hoveredItem === index && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="mr-2"
                          >
                            <Sparkles className="h-4 w-4 text-green-500" />
                          </motion.div>
                        )}
                        <span
                          className={cn(
                            "transition-all duration-300",
                            openItem === `item-${index}` ? "text-green-500" : "",
                          )}
                        >
                          {faq.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-primary/80">
                      <AnimatePresence>
                        {openItem === `item-${index}` && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="relative">
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500/30 to-green-500/0 rounded-full"></div>
                              <p className="pl-4">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
