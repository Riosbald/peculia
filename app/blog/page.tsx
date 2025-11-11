"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Search, ArrowRight, TrendingUp } from "lucide-react"

const blogArticles = [
  {
    id: 1,
    title: "The Future of Decentralized Prediction Markets",
    excerpt:
      "Exploring how AI and blockchain are revolutionizing the way we forecast future events with accuracy and transparency.",
    category: "Technology",
    author: "Sarah Chen",
    date: "2024-01-15",
    readTime: "8 min read",
    image: "/prediction-markets-ai-blockchain.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Quadratic Voting: Democracy in Action",
    excerpt:
      "Understanding how square root voting prevents whale dominance and creates truly democratic governance systems.",
    category: "Governance",
    author: "Marcus Rodriguez",
    date: "2024-01-12",
    readTime: "6 min read",
    image: "/governance-voting-systems.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "Gamification in Web3: Lessons from Peculia",
    excerpt:
      "How quest systems and rewards mechanics are driving user engagement and platform adoption in decentralized applications.",
    category: "Product",
    author: "Emma Walsh",
    date: "2024-01-10",
    readTime: "7 min read",
    image: "/gamification-web3-quests.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Token Pitching: The New Evaluation Framework",
    excerpt:
      "Discover how AI-powered token analysis is changing the way projects evaluate their tokenomics and community fit.",
    category: "Tokens",
    author: "Alex Kumar",
    date: "2024-01-08",
    readTime: "9 min read",
    image: "/token-evaluation-framework.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Cross-Chain Interoperability: Breaking Down Silos",
    excerpt:
      "How Peculia's multi-chain architecture is enabling seamless experiences across Ethereum, Solana, BSC, and Polygon.",
    category: "Technology",
    author: "Jordan Liu",
    date: "2024-01-05",
    readTime: "10 min read",
    image: "/cross-chain-interoperability.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "Community Spotlight: January Achievements",
    excerpt:
      "Celebrating the amazing accomplishments of our community members and their contributions to the Peculia ecosystem.",
    category: "Community",
    author: "The Peculia Team",
    date: "2024-01-03",
    readTime: "5 min read",
    image: "/community-collaboration.png",
    featured: false,
  },
]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = ["all", "Technology", "Governance", "Product", "Tokens", "Community"]

  const filteredArticles = useMemo(
    () =>
      blogArticles.filter((article) => {
        const matchesSearch =
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
        return matchesSearch && matchesCategory
      }),
    [searchTerm, selectedCategory],
  )

  const featuredArticles = filteredArticles.filter((a) => a.featured)
  const regularArticles = filteredArticles.filter((a) => !a.featured)

  return (
    <div className="min-h-screen pt-20 pb-16 bg-black">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/3 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
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
              <span className="text-sm text-emerald-400 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Insights & Updates
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Peculia Blog
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-white/70 mb-8"
          >
            Explore insights, updates, and deep dives into prediction markets, governance, and the future of Web3.
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
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/50 focus:border-emerald-500/50 focus:outline-none transition-colors"
            />
          </motion.div>
        </motion.section>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full capitalize transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-emerald-600 text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Featured Stories</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="vertical-card group cursor-pointer overflow-hidden h-full"
                >
                  <div className="relative h-48 md:h-56 overflow-hidden bg-gradient-to-br from-emerald-500/10 to-blue-500/10">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute top-4 left-4 bg-emerald-600">{article.category}</Badge>
                  </div>
                  <div className="p-6 space-y-4 flex flex-col flex-1">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-2">
                        {article.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">{article.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-white/60 mt-auto pt-4 border-t border-white/10">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString()}
                      </div>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Regular Articles */}
        {regularArticles.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8">Latest Articles</h2>
            <div className="space-y-4">
              {regularArticles.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  className="flex gap-4 p-4 rounded-lg border border-white/10 hover:border-emerald-500/30 hover:bg-white/5 transition-all duration-200 cursor-pointer group"
                >
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-24 h-24 rounded object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <Badge variant="outline" className="flex-shrink-0">
                        {article.category}
                      </Badge>
                    </div>
                    <p className="text-white/60 text-sm line-clamp-2 mb-2">{article.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-white/50">
                      <span>{article.author}</span>
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg">No articles found matching your search.</p>
          </div>
        )}

        {/* Subscribe CTA */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center py-12 border-t border-white/10"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-white/60 mb-8">Subscribe to receive the latest Peculia insights and platform updates.</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-black border border-white/10 text-white placeholder-white/50 focus:border-emerald-500/50 focus:outline-none transition-colors"
            />
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
