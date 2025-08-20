"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowUpRight, ArrowDownRight, Zap, RefreshCw, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWeb3 } from "@/components/providers/web3-provider"
import { ChainType } from "@/components/providers/web3-provider"
import ParticleBackground from "@/components/ui/particle-background"
import { useRouter } from "next/navigation"

interface TokenData {
  name: string
  symbol: string
  initialPrice: number
  marketCap: number
  chain: ChainType
  description: string
  useCase: string
  tokenomics: {
    totalSupply: number
    initialDistribution: {
      team: number
      investors: number
      community: number
      liquidity: number
    }
  }
}

interface SimulationPoint {
  day: number
  price: number
  marketCap: number
  volume: number
}

interface AIFeedback {
  score: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  reputationChange: number
}

export default function TokenSimulator() {
  const router = useRouter()
  const { connected, chainType } = useWeb3()
  const [tokenData, setTokenData] = useState<TokenData>({
    name: "",
    symbol: "",
    initialPrice: 0.01,
    marketCap: 1000000,
    chain: ChainType.ETHEREUM,
    description: "",
    useCase: "",
    tokenomics: {
      totalSupply: 100000000,
      initialDistribution: {
        team: 20,
        investors: 30,
        community: 40,
        liquidity: 10,
      },
    },
  })
  const [simulationData, setSimulationData] = useState<SimulationPoint[]>([])
  const [aiFeedback, setAIFeedback] = useState<AIFeedback | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [activeTab, setActiveTab] = useState("ethereum")
  const [reputation, setReputation] = useState(0)
  const chartRef = useRef<HTMLDivElement>(null)

  // Update active tab when chain type changes
  useEffect(() => {
    if (chainType) {
      setActiveTab(chainType.toLowerCase())
    }
  }, [chainType])

  // Run simulation when token data changes
  const runSimulation = async () => {
    if (!tokenData.name || !tokenData.symbol || !tokenData.description) {
      alert("Please fill in all required fields")
      return
    }

    setIsSimulating(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate simulation data
      const days = 90
      const volatility = Math.random() * 0.1 + 0.05
      const trend = Math.random() * 0.2 - 0.1
      const data: SimulationPoint[] = []

      let currentPrice = tokenData.initialPrice
      let currentMarketCap = tokenData.marketCap

      for (let i = 0; i <= days; i++) {
        // Add some randomness to price
        const change = (Math.random() - 0.5) * volatility + trend / days
        currentPrice = Math.max(0.000001, currentPrice * (1 + change))
        currentMarketCap = currentPrice * tokenData.tokenomics.totalSupply

        data.push({
          day: i,
          price: currentPrice,
          marketCap: currentMarketCap,
          volume: currentMarketCap * (Math.random() * 0.2 + 0.05),
        })
      }

      setSimulationData(data)

      // Generate AI feedback
      const strengths = []
      const weaknesses = []
      const suggestions = []

      // Analyze token name and symbol
      if (tokenData.name.length <= 6) {
        strengths.push("Short, memorable token name")
      } else {
        weaknesses.push("Consider a shorter, more memorable token name")
      }

      // Analyze description
      if (tokenData.description.length > 200) {
        strengths.push("Comprehensive token description")
      } else {
        weaknesses.push("Expand your token description for better clarity")
      }

      // Analyze tokenomics
      if (tokenData.tokenomics.initialDistribution.team > 25) {
        weaknesses.push("Team allocation is higher than recommended (>25%)")
        suggestions.push("Consider reducing team allocation to improve token distribution")
      } else {
        strengths.push("Balanced team token allocation")
      }

      if (tokenData.tokenomics.initialDistribution.community < 30) {
        weaknesses.push("Community allocation is lower than ideal (<30%)")
        suggestions.push("Increase community allocation to foster adoption")
      } else {
        strengths.push("Strong community-focused token distribution")
      }

      // Calculate score based on analysis
      const score = Math.min(
        100,
        Math.max(
          0,
          60 +
            strengths.length * 10 -
            weaknesses.length * 8 +
            (tokenData.description.length > 100 ? 10 : 0) +
            (tokenData.tokenomics.initialDistribution.community > 35 ? 15 : 0),
        ),
      )

      // Calculate reputation change
      const reputationChange = Math.floor(score / 20)

      setAIFeedback({
        score,
        strengths,
        weaknesses,
        suggestions,
        reputationChange,
      })

      // Update reputation
      setReputation((prev) => prev + reputationChange)
    } catch (error) {
      console.error("Simulation error:", error)
    } finally {
      setIsSimulating(false)
    }
  }

  // Use useCallback to memoize the handleInputChange function
  const handleInputChange = useCallback((field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setTokenData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent as keyof TokenData],
          [child]: value,
        },
      }))
    } else if (field.includes("tokenomics.initialDistribution.")) {
      const distributionField = field.split(".").pop() as string
      setTokenData((prevData) => ({
        ...prevData,
        tokenomics: {
          ...prevData.tokenomics,
          initialDistribution: {
            ...prevData.tokenomics.initialDistribution,
            [distributionField]: value,
          },
        },
      }))
    } else {
      setTokenData((prevData) => ({
        ...prevData,
        [field]: value,
      }))
    }
  }, [])

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(2)}K`
    } else {
      return `$${value.toFixed(2)}`
    }
  }

  const getPerformanceColor = () => {
    if (!simulationData || simulationData.length < 2) return "text-primary/50"

    const firstPrice = simulationData[0].price
    const lastPrice = simulationData[simulationData.length - 1].price
    const percentChange = ((lastPrice - firstPrice) / firstPrice) * 100

    if (percentChange > 0) return "text-green-500"
    if (percentChange < 0) return "text-red-500"
    return "text-primary/50"
  }

  const getPerformanceIcon = () => {
    if (!simulationData || simulationData.length < 2) return null

    const firstPrice = simulationData[0].price
    const lastPrice = simulationData[simulationData.length - 1].price
    const percentChange = ((lastPrice - firstPrice) / firstPrice) * 100

    if (percentChange > 0) return <ArrowUpRight className="h-4 w-4 text-green-500" />
    if (percentChange < 0) return <ArrowDownRight className="h-4 w-4 text-red-500" />
    return null
  }

  const getPerformanceText = () => {
    if (!simulationData || simulationData.length < 2) return "No data"

    const firstPrice = simulationData[0].price
    const lastPrice = simulationData[simulationData.length - 1].price
    const percentChange = ((lastPrice - firstPrice) / firstPrice) * 100

    return `${percentChange >= 0 ? "+" : ""}${percentChange.toFixed(2)}%`
  }

  const handleCompareWithOtherTokens = () => {
    router.push("/token-pitching")
  }

  // Update the return section to use vertical cards and animated styles
  return (
    <div className="flex flex-col space-y-4 p-6 bg-background/30 rounded-lg border border-green-500/20 shadow-sm w-full relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleBackground color="#10b981" count={60} glowIntensity={0.3} />
      </div>

      <div className="flex justify-between items-center relative z-10">
        <h2 className="text-lg font-medium text-white">Token Simulator</h2>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-white/50">Reputation:</span>
          <motion.span
            className="text-xs font-medium text-green-500 animate-count"
            key={reputation}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {reputation}
          </motion.span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-background/50 border border-green-500/20 w-full">
          <TabsTrigger
            value="ethereum"
            className="flex-1 data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500"
          >
            Ethereum
          </TabsTrigger>
          <TabsTrigger
            value="solana"
            className="flex-1 data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500"
          >
            Solana
          </TabsTrigger>
          <TabsTrigger
            value="bsc"
            className="flex-1 data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500"
          >
            BSC
          </TabsTrigger>
          <TabsTrigger
            value="polygon"
            className="flex-1 data-[state=active]:bg-green-500/20 data-[state=active]:text-green-500"
          >
            Polygon
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ethereum" className="mt-4 space-y-4">
          <TokenInputForm tokenData={tokenData} handleInputChange={handleInputChange} chain={ChainType.ETHEREUM} />
        </TabsContent>

        <TabsContent value="solana" className="mt-4 space-y-4">
          <TokenInputForm tokenData={tokenData} handleInputChange={handleInputChange} chain={ChainType.SOLANA} />
        </TabsContent>

        <TabsContent value="bsc" className="mt-4 space-y-4">
          <TokenInputForm tokenData={tokenData} handleInputChange={handleInputChange} chain={ChainType.BSC} />
        </TabsContent>

        <TabsContent value="polygon" className="mt-4 space-y-4">
          <TokenInputForm tokenData={tokenData} handleInputChange={handleInputChange} chain={ChainType.POLYGON} />
        </TabsContent>
      </Tabs>

      <Button
        onClick={runSimulation}
        className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border border-green-500/30 relative z-10"
        disabled={isSimulating || !connected}
      >
        {isSimulating ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Simulating...
          </>
        ) : (
          <>
            <Zap className="h-4 w-4 mr-2" />
            Run Simulation
          </>
        )}
      </Button>

      {simulationData.length > 0 && (
        <div className="space-y-4 relative z-10">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium text-white">90-Day Simulation Results</h3>
              <div className="flex items-center space-x-1 mt-1">
                <span className={`text-xs font-medium ${getPerformanceColor()}`}>{getPerformanceText()}</span>
                {getPerformanceIcon()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-white/50">Final Price</div>
              <div className="text-sm font-medium text-green-500">
                {formatCurrency(simulationData[simulationData.length - 1].price)}
              </div>
            </div>
          </div>

          <div ref={chartRef} className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={simulationData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
                <XAxis dataKey="day" stroke="#10b981" opacity={0.5} tickFormatter={(value) => `D${value}`} />
                <YAxis
                  stroke="#10b981"
                  opacity={0.5}
                  tickFormatter={(value) => `$${value.toFixed(value < 0.01 ? 4 : 2)}`}
                />
                <Tooltip
                  formatter={(value: number) => [`$${value.toFixed(value < 0.01 ? 4 : 2)}`, "Price"]}
                  labelFormatter={(label) => `Day ${label}`}
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    borderColor: "#10b981",
                    opacity: 0.9,
                    color: "#ffffff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {aiFeedback && (
            <div className="p-4 border border-green-500/20 rounded-md bg-background/40 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-white">AI Feedback</h3>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-white/50">Score:</span>
                  <motion.span
                    className="text-xs font-medium text-green-500 animate-count"
                    key={aiFeedback.score}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {aiFeedback.score}/100
                  </motion.span>
                </div>
              </div>

              <div className="space-y-2">
                <div>
                  <h4 className="text-xs font-medium text-green-500">Strengths:</h4>
                  <ul className="text-xs text-white/70 list-disc list-inside">
                    {aiFeedback.strengths.map((strength, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {strength}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-red-500">Weaknesses:</h4>
                  <ul className="text-xs text-white/70 list-disc list-inside">
                    {aiFeedback.weaknesses.map((weakness, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.3 }}
                      >
                        {weakness}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-white">Suggestions:</h4>
                  <ul className="text-xs text-white/70 list-disc list-inside">
                    {aiFeedback.suggestions.map((suggestion, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.6 }}
                      >
                        {suggestion}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-xs text-white/50 flex items-center justify-between pt-2 border-t border-green-500/10">
                <span>Reputation change: </span>
                <span className={aiFeedback.reputationChange >= 0 ? "text-green-500" : "text-red-500"}>
                  {aiFeedback.reputationChange >= 0 ? "+" : ""}
                  {aiFeedback.reputationChange}
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border border-green-500/30"
              onClick={handleCompareWithOtherTokens}
            >
              <Share2 className="h-4 w-4 mr-1" />
              Compare with Other Tokens
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

interface TokenInputFormProps {
  tokenData: TokenData
  handleInputChange: (field: string, value: any) => void
  chain: ChainType
}

function TokenInputForm({ tokenData, handleInputChange, chain }: TokenInputFormProps) {
  // Fix: Use a ref to track if this is the first render
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Only update chain if it's not the first render
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    handleInputChange("chain", chain)
  }, [chain, handleInputChange])

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-primary/70">Token Name</label>
          <Input
            value={tokenData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="e.g., Peculia Token"
            className="border-primary/20 bg-background/50 text-primary placeholder:text-primary/30 h-9"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-primary/70">Token Symbol</label>
          <Input
            value={tokenData.symbol}
            onChange={(e) => handleInputChange("symbol", e.target.value.toUpperCase())}
            placeholder="e.g., PPT"
            className="border-primary/20 bg-background/50 text-primary placeholder:text-primary/30 h-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs text-primary/70">Initial Price (USD)</label>
          <Input
            type="number"
            value={tokenData.initialPrice}
            onChange={(e) => handleInputChange("initialPrice", Number.parseFloat(e.target.value))}
            min="0.000001"
            step="0.000001"
            className="border-primary/20 bg-background/50 text-primary placeholder:text-primary/30 h-9"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs text-primary/70">Total Supply</label>
          <Input
            type="number"
            value={tokenData.tokenomics.totalSupply}
            onChange={(e) => handleInputChange("tokenomics.totalSupply", Number.parseInt(e.target.value))}
            min="1000"
            className="border-primary/20 bg-background/50 text-primary placeholder:text-primary/30 h-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-primary/70">Token Description</label>
        <Textarea
          value={tokenData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Describe your token's purpose and vision..."
          className="border-primary/20 bg-background/50 text-primary placeholder:text-primary/30 min-h-[80px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-primary/70">Use Case</label>
        <Textarea
          value={tokenData.useCase}
          onChange={(e) => handleInputChange("useCase", e.target.value)}
          placeholder="Explain the primary use case for your token..."
          className="border-primary/20 bg-background/50 text-primary placeholder:text-primary/30 min-h-[60px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-primary/70">Initial Token Distribution (%)</label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs text-primary/50">Team</label>
            <Input
              type="number"
              value={tokenData.tokenomics.initialDistribution.team}
              onChange={(e) =>
                handleInputChange("tokenomics.initialDistribution.team", Number.parseInt(e.target.value))
              }
              min="0"
              max="100"
              className="border-primary/20 bg-background/50 text-primary h-8"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-primary/50">Investors</label>
            <Input
              type="number"
              value={tokenData.tokenomics.initialDistribution.investors}
              onChange={(e) =>
                handleInputChange("tokenomics.initialDistribution.investors", Number.parseInt(e.target.value))
              }
              min="0"
              max="100"
              className="border-primary/20 bg-background/50 text-primary h-8"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-primary/50">Community</label>
            <Input
              type="number"
              value={tokenData.tokenomics.initialDistribution.community}
              onChange={(e) =>
                handleInputChange("tokenomics.initialDistribution.community", Number.parseInt(e.target.value))
              }
              min="0"
              max="100"
              className="border-primary/20 bg-background/50 text-primary h-8"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-primary/50">Liquidity</label>
            <Input
              type="number"
              value={tokenData.tokenomics.initialDistribution.liquidity}
              onChange={(e) =>
                handleInputChange("tokenomics.initialDistribution.liquidity", Number.parseInt(e.target.value))
              }
              min="0"
              max="100"
              className="border-primary/20 bg-background/50 text-primary h-8"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
