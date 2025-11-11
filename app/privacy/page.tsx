"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-black">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/">
            <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back Home
            </Button>
          </Link>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="prose prose-invert max-w-none"
        >
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-white/60">Last updated: January 2024</p>
          </div>

          <div className="space-y-8 text-white/80">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
              <p>
                Peculia ("we", "us", "our", or "Company") operates the Peculia platform and website. This page informs
                you of our policies regarding the collection, use, and disclosure of personal data when you use our
                Service and the choices you have associated with that data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Types of Data Collected</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Personal Data</h3>
                  <p>
                    While using our Service, we may ask you to provide us with certain personally identifiable
                    information that can be used to contact or identify you ("Personal Data"). This may include:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Email address</li>
                    <li>Wallet addresses</li>
                    <li>Usage data and transaction history</li>
                    <li>Device information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Usage Data</h3>
                  <p>
                    We may also collect information on how the Service is accessed and used ("Usage Data"). This may
                    include information such as your computer's Internet Protocol address, browser type, browser
                    version, the pages you visit, and the time and date of your visit.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Use of Data</h2>
              <p>Peculia uses the collected data for various purposes:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features</li>
                <li>To provide customer care and support</li>
                <li>To gather analysis or valuable information so we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical and security issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Security of Data</h2>
              <p>
                The security of your data is important to us, but remember that no method of transmission over the
                Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable
                means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <div className="mt-4 p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="font-semibold text-white mb-2">Peculia Legal Team</p>
                <p>Email: legal@peculia.io</p>
              </div>
            </section>
          </div>
        </motion.article>
      </div>
    </div>
  )
}
