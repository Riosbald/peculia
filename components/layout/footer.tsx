"use client"

import Link from "next/link"
import { Github, Twitter, DiscIcon as Discord, Linkedin, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#1e1e1e] py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description - Full width on mobile */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center">
              <motion.div
                className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mr-2 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.span
                  className="text-black font-bold text-lg"
                  initial={{ y: 0 }}
                  whileHover={{ y: [-2, 0, -2] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  P
                </motion.span>
              </motion.div>
              <span className="text-xl font-bold text-white font-mono">Peculia</span>
            </div>
            <p className="text-sm text-[#a0a0a0]">
              Join Peculia's community-driven platform where AI, blockchain, and gamification converge.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://twitter.com/peculia"
                className="text-[#a0a0a0] hover:text-[#10b981] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a
                href="https://discord.gg/peculia"
                className="text-[#a0a0a0] hover:text-[#10b981] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Discord"
              >
                <Discord size={20} />
              </motion.a>
              <motion.a
                href="https://github.com/peculia"
                className="text-[#a0a0a0] hover:text-[#10b981] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/company/peculia"
                className="text-[#a0a0a0] hover:text-[#10b981] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </div>

          {/* Navigation Links - Responsive Grid */}
          <div className="space-y-4">
            <h3 className="font-medium text-white text-lg mb-2">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/prediction-markets"
                  className="text-sm text-[#a0a0a0] hover:text-[#10b981] transition-colors flex items-center group"
                >
                  <span>Prediction Markets</span>
                  <motion.span
                    className="opacity-0 group-hover:opacity-100 ml-1"
                    initial={{ x: -5 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={12} />
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link
                  href="/token-pitching"
                  className="text-sm text-[#a0a0a0] hover:text-[#10b981] transition-colors flex items-center group"
                >
                  <span>Token Pitching</span>
                  <motion.span
                    className="opacity-0 group-hover:opacity-100 ml-1"
                    initial={{ x: -5 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={12} />
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link
                  href="/quest-system"
                  className="text-sm text-[#a0a0a0] hover:text-[#10b981] transition-colors flex items-center group"
                >
                  <span>Quest System</span>
                  <motion.span
                    className="opacity-0 group-hover:opacity-100 ml-1"
                    initial={{ x: -5 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={12} />
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link
                  href="/quadratic-funding"
                  className="text-sm text-[#a0a0a0] hover:text-[#10b981] transition-colors flex items-center group"
                >
                  <span>Quadratic Funding</span>
                  <motion.span
                    className="opacity-0 group-hover:opacity-100 ml-1"
                    initial={{ x: -5 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={12} />
                  </motion.span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-white text-lg mb-2">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-[#a0a0a0] hover:text-[#10b981] transition-colors flex items-center group"
                >
                  <span>Documentation</span>
                  <motion.span
                    className="opacity-0 group-hover:opacity-100 ml-1"
                    initial={{ x: -5 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={12} />
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/api"
                  className="text-sm text-[#a0a0a0] hover:text-[#10b981] transition-colors flex items-center group"
                >
                  <span>API Reference</span>
                  <motion.span
                    className="opacity-0 group-hover:opacity-100 ml-1"
                    initial={{ x: -5 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={12} />
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-[#a0a0a0] hover:text-[#10b981] transition-colors flex items-center group"
                >
                  <span>FAQ</span>
                  <motion.span
                    className="opacity-0 group-hover:opacity-100 ml-1"
                    initial={{ x: -5 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={12} />
                  </motion.span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-white text-lg mb-2">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[#a0a0a0] hover:text-[#10b981] transition-colors flex items-center group"
                >
                  <span>About Us</span>
                  <motion.span
                    className="opacity-0 group-hover:opacity-100 ml-1"
                    initial={{ x: -5 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={12} />
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-[#a0a0a0] hover:text-[#10b981] transition-colors flex items-center group"
                >
                  <span>Blog</span>
                  <motion.span
                    className="opacity-0 group-hover:opacity-100 ml-1"
                    initial={{ x: -5 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={12} />
                  </motion.span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[#a0a0a0] hover:text-[#10b981] transition-colors flex items-center group"
                >
                  <span>Contact</span>
                  <motion.span
                    className="opacity-0 group-hover:opacity-100 ml-1"
                    initial={{ x: -5 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight size={12} />
                  </motion.span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and Legal - Stack on mobile */}
        <div className="mt-8 pt-6 border-t border-[#1e1e1e] flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-[#606060] mb-4 sm:mb-0">
            &copy; {new Date().getFullYear()} Peculia. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="text-xs text-[#606060] hover:text-[#10b981] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-[#606060] hover:text-[#10b981] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
