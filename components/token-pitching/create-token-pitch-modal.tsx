"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, TrendingUp, Info, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWeb3 } from "@/components/providers/web3-provider"
import { ChainType } from "@/components/providers/web3-provider"

interface CreateTokenPitchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateTokenPitchModal({ isOpen, onClose }: CreateTokenPitchModalProps) {
  const { connected, chainType } = useWeb3()
  const [step, setStep] = useState(1)
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [tokenChain, setTokenChain] = useState(chainType || ChainType.ETHEREUM)
  const [tokenDescription, setTokenDescription] = useState("")
  const [tokenUseCase, setTokenUseCase] = useState("")
  const [initialSupply, setInitialSupply] = useState(100000000)
  const [initialPrice, setInitialPrice] = useState(0.01)

  // Token distribution
  const [teamAllocation, setTeamAllocation] = useState(20)
  const [investorsAllocation, setInvestorsAllocation] = useState(30)
  const [communityAllocation, setCommunityAllocation] = useState(40)
  const [liquidityAllocation, setLiquidityAllocation] = useState(10)

  const handleSubmit = () => {
    // In a real app, this would submit the token pitch to the backend
    console.log({
      tokenName,
      tokenSymbol,
      tokenChain,
      tokenDescription,
      tokenUseCase,
      initialSupply,
      initialPrice,
      distribution: {
        team: teamAllocation,
        investors: investorsAllocation,
        community: communityAllocation,
        liquidity: liquidityAllocation,
      },
    })

    // Reset form and close modal
    setStep(1)
    setTokenName("")
    setTokenSymbol("")
    setTokenDescription("")
    setTokenUseCase("")
    setInitialSupply(100000000)
    setInitialPrice(0.01)
    setTeamAllocation(20)
    setInvestorsAllocation(30)
    setCommunityAllocation(40)
    setLiquidityAllocation(10)
    onClose()
  }

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
  }

  const getTotalAllocation = () => {
    return teamAllocation + investorsAllocation + communityAllocation + liquidityAllocation
  }

  const isAllocationValid = getTotalAllocation() === 100

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-background border border-primary/20 rounded-lg shadow-lg w-full max-w-lg overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 border-b border-primary/10">
              <h2 className="text-xl font-bold text-primary">Create Token Pitch</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-primary/70 hover:text-primary">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label className="text-primary/80">Token Name</Label>
                    <Input
                      placeholder="e.g., Peculia Token"
                      value={tokenName}
                      onChange={(e) => setTokenName(e.target.value)}
                      className="border-primary/20 bg-background/50 text-primary placeholder:text-primary/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-primary/80">Token Symbol</Label>
                    <Input
                      placeholder="e.g., PPT"
                      value={tokenSymbol}
                      onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                      className="border-primary/20 bg-background/50 text-primary placeholder:text-primary/30"
                    />
                    <p className="text-xs text-primary/50">2-5 characters, uppercase letters only</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-primary/80">Blockchain</Label>
                    <Select value={tokenChain} onValueChange={(value) => setTokenChain(value as ChainType)}>
                      <SelectTrigger className="border-primary/20 bg-background/50 text-primary">
                        <SelectValue placeholder="Select blockchain" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-primary/20">
                        <SelectItem value={ChainType.ETHEREUM}>Ethereum</SelectItem>
                        <SelectItem value={ChainType.SOLANA}>Solana</SelectItem>
                        <SelectItem value={ChainType.BSC}>BSC</SelectItem>
                        <SelectItem value={ChainType.POLYGON}>Polygon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-primary/80">Token Description</Label>
                    <Textarea
                      placeholder="Describe your token's purpose and vision..."
                      value={tokenDescription}
                      onChange={(e) => setTokenDescription(e.target.value)}
                      className="border-primary/20 bg-background/50 text-primary placeholder:text-primary/30 min-h-[100px]"
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label className="text-primary/80">Use Case</Label>
                    <Textarea
                      placeholder="Explain the primary use case for your token..."
                      value={tokenUseCase}
                      onChange={(e) => setTokenUseCase(e.target.value)}
                      className="border-primary/20 bg-background/50 text-primary placeholder:text-primary/30 min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-primary/80">Initial Supply</Label>
                    <Input
                      type="number"
                      value={initialSupply}
                      onChange={(e) => setInitialSupply(Number(e.target.value))}
                      min="1000"
                      className="border-primary/20 bg-background/50 text-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-primary/80">Initial Price (USD)</Label>
                    <Input
                      type="number"
                      value={initialPrice}
                      onChange={(e) => setInitialPrice(Number(e.target.value))}
                      min="0.000001"
                      step="0.000001"
                      className="border-primary/20 bg-background/50 text-primary"
                    />
                  </div>

                  <div className="flex items-center p-3 bg-primary/5 border border-primary/10 rounded-lg">
                    <Brain className="h-5 w-5 text-primary/70 mr-3 flex-shrink-0" />
                    <p className="text-sm text-primary/70">
                      Our AI will analyze your token design and provide feedback on its potential performance.
                    </p>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label className="text-primary/80">Token Distribution</Label>
                      <span className={`text-xs ${isAllocationValid ? "text-green-500" : "text-red-500"}`}>
                        Total: {getTotalAllocation()}%
                      </span>
                    </div>

                    <div className="space-y-4 mt-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-primary/80">Team</span>
                          <span className="text-primary/90 font-medium">{teamAllocation}%</span>
                        </div>
                        <Slider
                          value={[teamAllocation]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => setTeamAllocation(value[0])}
                          className="text-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-primary/80">Investors</span>
                          <span className="text-primary/90 font-medium">{investorsAllocation}%</span>
                        </div>
                        <Slider
                          value={[investorsAllocation]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => setInvestorsAllocation(value[0])}
                          className="text-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-primary/80">Community</span>
                          <span className="text-primary/90 font-medium">{communityAllocation}%</span>
                        </div>
                        <Slider
                          value={[communityAllocation]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => setCommunityAllocation(value[0])}
                          className="text-primary"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-primary/80">Liquidity</span>
                          <span className="text-primary/90 font-medium">{liquidityAllocation}%</span>
                        </div>
                        <Slider
                          value={[liquidityAllocation]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={(value) => setLiquidityAllocation(value[0])}
                          className="text-primary"
                        />
                      </div>
                    </div>

                    {!isAllocationValid && (
                      <p className="text-xs text-red-500 flex items-center mt-2">
                        <Info className="h-3 w-3 mr-1" />
                        Total allocation must equal 100%
                      </p>
                    )}
                  </div>

                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 space-y-3">
                    <h3 className="text-primary/90 font-medium">Token Summary</h3>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-primary/60">Name:</div>
                      <div className="text-primary/90">{tokenName}</div>

                      <div className="text-primary/60">Symbol:</div>
                      <div className="text-primary/90">{tokenSymbol}</div>

                      <div className="text-primary/60">Blockchain:</div>
                      <div className="text-primary/90 capitalize">{tokenChain}</div>

                      <div className="text-primary/60">Initial Supply:</div>
                      <div className="text-primary/90">{initialSupply.toLocaleString()}</div>

                      <div className="text-primary/60">Initial Price:</div>
                      <div className="text-primary/90">${initialPrice}</div>

                      <div className="text-primary/60">Market Cap:</div>
                      <div className="text-primary/90">${(initialSupply * initialPrice).toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-primary/5 border border-primary/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-primary/70 mr-3 flex-shrink-0" />
                    <p className="text-sm text-primary/70">
                      By submitting your token pitch, you'll receive AI feedback and enable community "roasting" to
                      improve your design.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex justify-between p-4 border-t border-primary/10 bg-background/50">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  className="border-primary/20 text-primary hover:bg-primary/5"
                >
                  Back
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-primary/20 text-primary hover:bg-primary/5"
                >
                  Cancel
                </Button>
              )}

              {step < 3 ? (
                <Button
                  onClick={handleNextStep}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={step === 1 && (!tokenName || !tokenSymbol || !tokenDescription)}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={!isAllocationValid}
                >
                  Submit Token Pitch
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
