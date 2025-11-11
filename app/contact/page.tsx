"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, MessageSquare, Zap, Twitter, Send, CheckCircle2, ArrowRight } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitted(true)
    setIsLoading(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "", category: "general" })
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-black">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-1/3 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute bottom-32 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 space-y-16">
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
              <span className="text-sm text-emerald-400">Get in Touch</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Let's Talk
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-white/70 mb-8"
          >
            Have questions about Peculia? Want to collaborate? We'd love to hear from you. Reach out through any of
            these channels.
          </motion.p>
        </motion.section>

        {/* Contact Channels */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
        >
          {[
            {
              icon: Mail,
              title: "Email",
              value: "hello@peculia.io",
              description: "General inquiries and support",
              href: "mailto:hello@peculia.io",
            },
            {
              icon: MessageSquare,
              title: "Discord",
              value: "Join Community",
              description: "Real-time support & discussions",
              href: "https://discord.gg/peculia",
            },
            {
              icon: Twitter,
              title: "Twitter",
              value: "@peculia_io",
              description: "Updates & announcements",
              href: "https://twitter.com/peculia_io",
            },
          ].map((channel, i) => (
            <motion.a
              key={i}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="vertical-card group hover:scale-105 transition-transform"
            >
              <div className="p-6 space-y-4 text-center">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto group-hover:border-emerald-500/60 transition-colors">
                  <channel.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{channel.title}</h3>
                  <p className="text-emerald-400 font-medium mt-2">{channel.value}</p>
                  <p className="text-white/60 text-sm mt-1">{channel.description}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-2xl mx-auto"
        >
          <div className="border border-emerald-500/20 rounded-lg p-8 md:p-12 bg-gradient-to-br from-emerald-500/5 to-blue-500/5">
            <h2 className="text-3xl font-bold text-white mb-2">Send us a Message</h2>
            <p className="text-white/60 mb-8">We'll get back to you within 24 hours.</p>

            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-4"
                >
                  <CheckCircle2 className="w-16 h-16 text-emerald-400" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-white/60">Thanks for reaching out. We'll be in touch soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/50 focus:border-emerald-500/50 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/50 focus:border-emerald-500/50 focus:outline-none transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:border-emerald-500/50 focus:outline-none transition-colors"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="support">Support Request</option>
                    <option value="business">Business Partnership</option>
                    <option value="bug">Report Bug</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/50 focus:border-emerald-500/50 focus:outline-none transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/50 focus:border-emerald-500/50 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us everything..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 h-auto disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        className="mr-2"
                      >
                        <Zap className="w-5 h-5" />
                      </motion.div>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </motion.div>

        {/* FAQ Links */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center border-t border-white/10 pt-12"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h3>
          <p className="text-white/60 mb-6">Check our FAQ for quick answers to common questions.</p>
          <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
            View FAQ
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
