"use client"

import { useState, useEffect } from "react"
import { Dices, TrendingUp, Music, Vote, Lock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWeb3 } from "@/components/providers/web3-provider"

type PredictionCategory = "sports" | "music" | "governance" | "crypto"

interface PredictionOdds {
  yes: number
  no: number
  confidence: number
}

export default function WagerCard() {
  const { connected, pptBalance } = useWeb3()
  const [category, setCategory] = useState<PredictionCategory>("crypto")
  const [question, setQuestion] = useState("")
  const [wagerAmount, setWagerAmount] = useState(50)
  const [isPrivate, setIsPrivate] = useState(false)
  const [odds, setOdds] = useState<PredictionOdds | null>(null)
  const [isGeneratingOdds, setIsGeneratingOdds] = useState(false)
  const [expiryDate, setExpiryDate] = useState<string>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  )

  // Generate AI odds when question changes
  useEffect(() => {
    if (!question || question.length < 10) {
      setOdds(null)
      return
    }

    const generateOdds = async () => {
      setIsGeneratingOdds(true)

      // Simulate AI odds generation
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate pseudo-random odds based on question content
      const seed = question.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      const random = (seed % 100) / 100

      let yesOdds: number

      // Bias odds based on category
      switch (category) {
        case "sports":
          yesOdds = 0.3 + random * 0.4
          break
        case "music":
          yesOdds = 0.4 + random * 0.3
          break
        case "governance":
          yesOdds = 0.2 + random * 0.6
          break
        case "crypto":
          yesOdds = 0.1 + random * 0.8
          break
        default:
          yesOdds = 0.5
      }

      setOdds({
        yes: Number.parseFloat(yesOdds.toFixed(2)),
        no: Number.parseFloat((1 - yesOdds).toFixed(2)),
        confidence: 0.7 + random * 0.3,
      })

      setIsGeneratingOdds(false)
    }

    // Debounce odds generation
    const timer = setTimeout(generateOdds, 800)

    return () => clearTimeout(timer)
  }, [question, category])

  const handleCreatePrediction = () => {
    if (!connected || !question || !odds) return

    // Simulate prediction creation
    alert(`Prediction created: "${question}" with ${wagerAmount} PPT wager`)

    // Reset form
    setQuestion("")
    setWagerAmount(50)
    setOdds(null)
  }

  const getCategoryIcon = (cat: PredictionCategory) => {
    switch (cat) {
      case "sports":
        return <Dices className="h-4 w-4" />
      case "music":
        return <Music className="h-4 w-4" />
      case "governance":
        return <Vote className="h-4 w-4" />
      case "crypto":
        return <TrendingUp className="h-4 w-4" />
    }
  }

  return (
    <div className="flex flex-col space-y-4 p-6 bg-background/30 rounded-lg border border-primary/20 shadow-sm w-full">
      <h2 className="text-lg font-medium text-primary/80">(prediction market)</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-primary/70">Category</Label>
          <Select value={category} onValueChange={(value) => setCategory(value as PredictionCategory)}>
            <SelectTrigger className="border-primary/20 bg-background/50 text-primary">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-background border-primary/30">
              <SelectItem value="sports" className="flex items-center">
                <Dices className="h-4 w-4 mr-2" />
                Sports
              </SelectItem>
              <SelectItem value="music">
                <Music className="h-4 w-4 mr-2" />
                Music
              </SelectItem>
              <SelectItem value="governance">
                <Vote className="h-4 w-4 mr-2" />
                Governance
              </SelectItem>
              <SelectItem value="crypto">
                <TrendingUp className="h-4 w-4 mr-2" />
                Crypto
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-primary/70">Prediction Question</Label>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., Will ETH reach $5000 by end of month?"
            className="border-primary/20 bg-background/50 text-primary placeholder:text-primary/30"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-primary/70">Wager Amount: {wagerAmount} PPT</Label>
            <span className="text-xs text-primary/50">Balance: {pptBalance} PPT</span>
          </div>
          <Slider
            value={[wagerAmount]}
            min={10}
            max={Math.min(500, pptBalance)}
            step={10}
            onValueChange={(value) => setWagerAmount(value[0])}
            className="text-primary"
            disabled={!connected}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-primary/70">Expiry Date</Label>
          <Input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="border-primary/20 bg-background/50 text-primary"
          />
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="private-prediction" className="text-primary/70 flex items-center">
            {isPrivate ? <Lock className="h-3 w-3 mr-1" /> : <Globe className="h-3 w-3 mr-1" />}
            {isPrivate ? "Private Prediction" : "Public Prediction"}
          </Label>
          <Switch
            id="private-prediction"
            checked={isPrivate}
            onCheckedChange={setIsPrivate}
            className="data-[state=checked]:bg-primary/70"
          />
        </div>

        {odds && (
          <div className="p-3 border border-primary/20 rounded-md bg-background/40">
            <h3 className="text-sm font-medium text-primary/80 mb-2">AI-Generated Odds</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{(odds.yes * 100).toFixed(0)}%</div>
                <div className="text-xs text-primary/50">Yes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{(odds.no * 100).toFixed(0)}%</div>
                <div className="text-xs text-primary/50">No</div>
              </div>
            </div>
            <div className="mt-2 text-xs text-primary/50 text-center">
              AI Confidence: {(odds.confidence * 100).toFixed(0)}%
            </div>
          </div>
        )}

        {isGeneratingOdds && (
          <div className="text-center text-primary/50 text-sm animate-pulse">Generating AI odds...</div>
        )}

        <Button
          onClick={handleCreatePrediction}
          className="w-full bg-primary/10 text-primary/80 hover:bg-primary/20 border border-primary/30"
          disabled={!connected || !question || question.length < 10 || isGeneratingOdds}
        >
          Create Prediction
        </Button>
      </div>
    </div>
  )
}
