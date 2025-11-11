"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
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
            <h1 className="text-5xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-white/60">Last updated: January 2024</p>
          </div>

          <div className="space-y-8 text-white/80">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using the Peculia platform ("Service"), you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above, please do not use this
                service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on
                Peculia's platform for personal, non-commercial transitory viewing only. This is the grant of a license,
                not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the platform</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Disclaimer</h2>
              <p>
                The materials on Peculia's platform are provided on an 'as is' basis. Peculia makes no warranties,
                expressed or implied, and hereby disclaims and negates all other warranties including, without
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Limitations</h2>
              <p>
                In no event shall Peculia or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on Peculia's platform, even if Peculia or a Peculia authorized representative has
                been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on Peculia's platform could include technical, typographical, or photographic
                errors. Peculia does not warrant that any of the materials on its platform are accurate, complete, or
                current. Peculia may make changes to the materials contained on its platform at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Links</h2>
              <p>
                Peculia has not reviewed all of the sites linked to its platform and is not responsible for the contents
                of any such linked site. The inclusion of any link does not imply endorsement by Peculia of the site.
                Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Modifications</h2>
              <p>
                Peculia may revise these terms of service for its platform at any time without notice. By using this
                platform, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the relevant
                jurisdiction, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
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
