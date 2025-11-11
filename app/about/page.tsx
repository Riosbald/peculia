"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Users, Zap, Target, Globe, Heart, Lightbulb, ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-black">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 space-y-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto pt-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
              <span className="text-sm text-emerald-400">About Peculia</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Curiosity Fuels the Future
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-white/70 mb-8 leading-relaxed"
          >
            At Peculia, we believe the future of Web3 belongs to communities, not concentrated powers. We're building an
            AI-powered ecosystem where prediction, innovation, and governance converge to democratize opportunity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 h-auto text-lg">
              Explore Platform
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: Target,
              title: "Our Mission",
              description:
                "Democratize access to market insights, token innovation, and governance by leveraging AI and blockchain technology.",
            },
            {
              icon: Heart,
              title: "Our Vision",
              description:
                "A world where collective intelligence outpaces individual expertise, and every participant has a voice in shaping outcomes.",
            },
            {
              icon: Globe,
              title: "Our Commitment",
              description:
                "Build with radical transparency, protect user interests above all, and ensure fairness remains at the core of every decision.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="vertical-card group"
            >
              <div className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-500/60 transition-colors">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Core Values */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="py-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Core Values</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              These principles guide every decision we make and every line of code we write.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Zap,
                title: "Innovation",
                description: "We embrace cutting-edge AI and blockchain to solve problems no one else dares attempt.",
              },
              {
                icon: Users,
                title: "Community First",
                description: "Every feature, every decision, every line of code is designed to empower our users.",
              },
              {
                icon: Target,
                title: "Radical Fairness",
                description: "Quadratic voting, equal voice, no whale dominance. Democracy in action.",
              },
              {
                icon: Lightbulb,
                title: "Transparency",
                description: "IPFS proofs, on-chain records, open source—nothing hidden, everything verifiable.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex gap-4 p-6 rounded-lg border border-white/10 hover:border-emerald-500/30 transition-colors"
              >
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <value.icon className="h-6 w-6 text-emerald-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{value.title}</h3>
                  <p className="text-white/60 text-sm">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Platform Impact */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="py-12 border-t border-white/10"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Platform Impact</h2>
            <p className="text-xl text-white/60">
              Since launch, Peculia has enabled thousands to participate in fairer, more transparent markets.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "47K+", label: "Active Participants" },
              { number: "$89M", label: "Total Volume" },
              { number: "12.3K", label: "Predictions Made" },
              { number: "94.2%", label: "Average Accuracy" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                className="text-center p-6 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40 transition-colors"
              >
                <div className="text-4xl font-bold text-emerald-400 mb-2">{stat.number}</div>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="text-center py-16 border-t border-white/10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Join the Revolution?</h2>
          <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
            Start exploring Peculia today and be part of a community reshaping Web3 governance.
          </p>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 h-auto text-lg">
            Get Started Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.section>
      </div>
    </div>
  )
}
