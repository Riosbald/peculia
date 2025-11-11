"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Plus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePredictions } from "@/hooks/use-predictions"
import { useWeb3 } from "@/components/providers/web3-provider"
import CreatePredictionModal from "@/components/prediction-markets/create-prediction-modal"
import EcosystemPageLayout from "@/components/layout/ecosystem-page-layout"
import HorizontalCardGrid from "@/components/ui/horizontal-card-grid"
import PredictionFilters from "@/components/prediction-markets/prediction-filters"
import PredictionList from "@/components/prediction-markets/prediction-list"

export default function PredictionMarketsClientPage() {
  const { connected } = useWeb3()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const {
    predictions,
    isLoading,
    error,
    filter,
    setFilter,
    category,
    setCategory,
    searchQuery,
    setSearchQuery,
    updatePrediction,
    totalCount,
    filteredCount,
  } = usePredictions()

  return (
    <EcosystemPageLayout
      title="Prediction Markets"
      description="Create and participate in AI-verified prediction markets with real-time odds and automated settlement. Stake on outcomes and earn rewards for accurate predictions."
      icon={<TrendingUp className="h-6 w-6" />}
      particleColor="#9333ea"
    >
      {/* How It Works Content */}
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-1">
            <span className="text-purple-500 font-bold">1</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Browse Active Markets</h3>
            <p className="text-white/70">
              Explore prediction markets across various categories with AI-powered odds calculation.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-1">
            <span className="text-purple-500 font-bold">2</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Stake on Outcomes</h3>
            <p className="text-white/70">
              Use PPT tokens to stake on YES or NO outcomes. Your stake influences market odds.
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-1">
            <span className="text-purple-500 font-bold">3</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">Earn from Accurate Predictions</h3>
            <p className="text-white/70">
              Win rewards when your predictions are correct. Markets settle automatically via AI verification.
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            className="bg-purple-500/20 text-purple-500 hover:bg-purple-500/30 border border-purple-500/30 px-6 py-2 text-base"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Prediction
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
              className="ml-2"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>
      </div>

      {/* Prediction Markets Section */}
      <HorizontalCardGrid
        title="Prediction Markets"
        description="Browse and participate in AI-verified prediction markets with real-time odds and automated settlement."
        action={
          <Button
            className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border border-purple-500/30"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Prediction
          </Button>
        }
      >
        <PredictionFilters
          filter={filter}
          setFilter={setFilter}
          category={category}
          setCategory={setCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalCount={totalCount}
          filteredCount={filteredCount}
        />

        <PredictionList
          predictions={predictions}
          isLoading={isLoading}
          error={error}
          onUpdatePrediction={updatePrediction}
        />
      </HorizontalCardGrid>

      {/* AI Insights Section */}
      <section className="py-12 bg-background/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4 font-mono">AI-Powered Insights</h2>
            <p className="text-lg text-white/80">
              Our AI swarm intelligence analyzes market data to provide real-time odds and predictions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              className="bg-background/20 border border-purple-500/20 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)",
                borderColor: "rgba(147, 51, 234, 0.5)",
              }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <TrendingUp className="h-5 w-5" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Real-Time Odds</h3>
              <div className="text-3xl font-bold text-purple-500 mb-2">94.2%</div>
              <p className="text-white/70">Average prediction accuracy powered by AI analysis of market data.</p>
            </motion.div>

            <motion.div
              className="bg-background/20 border border-purple-500/20 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)",
                borderColor: "rgba(147, 51, 234, 0.5)",
              }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Auto Settlement</h3>
              <div className="text-3xl font-bold text-purple-500 mb-2">100%</div>
              <p className="text-white/70">Markets settle automatically through decentralized oracle verification.</p>
            </motion.div>

            <motion.div
              className="bg-background/20 border border-purple-500/20 rounded-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(147, 51, 234, 0.3)",
                borderColor: "rgba(147, 51, 234, 0.5)",
              }}
            >
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 text-purple-500 mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Plus className="h-5 w-5" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Active Markets</h3>
              <div className="text-3xl font-bold text-purple-500 mb-2">{totalCount}+</div>
              <p className="text-white/70">Live prediction markets across multiple categories and timeframes.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Create Prediction Modal */}
      <CreatePredictionModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </EcosystemPageLayout>
  )
}
