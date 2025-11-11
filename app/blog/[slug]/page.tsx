"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Calendar, User } from "lucide-react"
import Link from "next/link"

export default function BlogArticle() {
  const params = useParams()

  return (
    <div className="min-h-screen pt-20 pb-16 bg-black">
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/blog">
            <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Article Title Goes Here</h1>
            <div className="flex items-center gap-6 text-white/60 border-b border-white/10 pb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Author Name</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>January 15, 2024</span>
              </div>
              <button className="ml-auto text-emerald-400 hover:text-emerald-300 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <img src="/featured-article-image.jpg" alt="Article cover" className="w-full rounded-lg" />

          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-lg text-white/80 leading-relaxed">
              This is where the full article content would be displayed. The article layout provides a clean, readable
              experience for our blog readers.
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              In a real implementation, this content would be dynamically loaded based on the article slug from your
              blog CMS or database.
            </p>
          </div>

          <div className="border-t border-white/10 pt-8">
            <h3 className="text-2xl font-bold text-white mb-4">Read More</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/blog"
                className="p-4 rounded-lg border border-white/10 hover:border-emerald-500/30 transition-colors group"
              >
                <h4 className="font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  Previous Article
                </h4>
                <p className="text-white/60 text-sm">Read the previous story</p>
              </Link>
              <Link
                href="/blog"
                className="p-4 rounded-lg border border-white/10 hover:border-emerald-500/30 transition-colors group"
              >
                <h4 className="font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">
                  Next Article
                </h4>
                <p className="text-white/60 text-sm">Read the next story</p>
              </Link>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  )
}
