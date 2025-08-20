"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Trophy, Star, Calendar, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWeb3 } from "@/components/providers/web3-provider"

interface CreateQuestModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateQuestModal({ isOpen, onClose }: CreateQuestModalProps) {
  const { connected, pptBalance } = useWeb3()
  const [step, setStep] = useState(1)
  const [questTitle, setQuestTitle] = useState("")
  const [questDescription, setQuestDescription] = useState("")
  const [questCategory, setQuestCategory] = useState("")
  const [questObjective, setQuestObjective] = useState("")
  const [questTotal, setQuestTotal] = useState(1)
  const [questRewardPPT, setQuestRewardPPT] = useState(100)
  const [questRewardXP, setQuestRewardXP] = useState(50)
  const [questDuration, setQuestDuration] = useState(7)

  const handleSubmit = () => {
    // In a real app, this would submit the quest to the backend
    console.log({
      title: questTitle,
      description: questDescription,
      category: questCategory,
      objective: questObjective,
      total: questTotal,
      reward: {
        ppt: questRewardPPT,
        xp: questRewardXP,
      },
      duration: questDuration,
    })

    // Reset form and close modal
    setStep(1)
    setQuestTitle("")
    setQuestDescription("")
    setQuestCategory("")
    setQuestObjective("")
    setQuestTotal(1)
    setQuestRewardPPT(100)
    setQuestRewardXP(50)
    setQuestDuration(7)
    onClose()
  }

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
  }

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
              <h2 className="text-xl font-bold text-primary">Create Quest</h2>
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
                    <Label className="text-primary/80">Quest Title</Label>
                    <Input
                      placeholder="e.g., Predict Wizkid's Next Album"
                      value={questTitle}
                      onChange={(e) => setQuestTitle(e.target.value)}
                      className="border-primary/20 bg-background/50 text-primary placeholder:text-primary/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-primary/80">Quest Description</Label>
                    <Textarea
                      placeholder="Describe what this quest is about..."
                      value={questDescription}
                      onChange={(e) => setQuestDescription(e.target.value)}
                      className="border-primary/20 bg-background/50 text-primary placeholder:text-primary/30 min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-primary/80">Category</Label>
                    <Select value={questCategory} onValueChange={setQuestCategory}>
                      <SelectTrigger className="border-primary/20 bg-background/50 text-primary">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-primary/20">
                        <SelectItem value="onboarding">Onboarding</SelectItem>
                        <SelectItem value="prediction">Prediction Markets</SelectItem>
                        <SelectItem value="token">Token Pitching</SelectItem>
                        <SelectItem value="governance">Governance</SelectItem>
                        <SelectItem value="community">Community</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Label className="text-primary/80">Quest Objective</Label>
                    <Textarea
                      placeholder="What do users need to do to complete this quest?"
                      value={questObjective}
                      onChange={(e) => setQuestObjective(e.target.value)}
                      className="border-primary/20 bg-background/50 text-primary placeholder:text-primary/30 min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-primary/80">Completion Goal</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={questTotal}
                        onChange={(e) => setQuestTotal(Number(e.target.value))}
                        min="1"
                        className="border-primary/20 bg-background/50 text-primary w-20"
                      />
                      <span className="text-primary/70">times</span>
                    </div>
                    <p className="text-xs text-primary/50">How many times the objective needs to be completed</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-primary/80">Quest Duration (days)</Label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary/50" />
                      <Input
                        type="number"
                        value={questDuration}
                        onChange={(e) => setQuestDuration(Number(e.target.value))}
                        min="1"
                        max="90"
                        className="border-primary/20 bg-background/50 text-primary"
                      />
                    </div>
                    <p className="text-xs text-primary/50">How long users have to complete this quest</p>
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
                    <div className="flex justify-between">
                      <Label className="text-primary/80">PPT Reward: {questRewardPPT} PPT</Label>
                      <span className="text-xs text-primary/50">Your Balance: {pptBalance} PPT</span>
                    </div>
                    <Slider
                      value={[questRewardPPT]}
                      min={10}
                      max={Math.min(2000, pptBalance)}
                      step={10}
                      onValueChange={(value) => setQuestRewardPPT(value[0])}
                      className="text-primary"
                    />
                    <p className="text-xs text-primary/50 flex items-center">
                      <Trophy className="h-3 w-3 mr-1" />
                      PPT tokens awarded to users who complete this quest
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-primary/80">XP Reward: {questRewardXP} XP</Label>
                    <Slider
                      value={[questRewardXP]}
                      min={10}
                      max={1000}
                      step={10}
                      onValueChange={(value) => setQuestRewardXP(value[0])}
                      className="text-primary"
                    />
                    <p className="text-xs text-primary/50 flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      Experience points awarded to users who complete this quest
                    </p>
                  </div>

                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 space-y-3">
                    <h3 className="text-primary/90 font-medium">Quest Summary</h3>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-primary/60">Title:</div>
                      <div className="text-primary/90">{questTitle}</div>

                      <div className="text-primary/60">Category:</div>
                      <div className="text-primary/90 capitalize">{questCategory}</div>

                      <div className="text-primary/60">Objective:</div>
                      <div className="text-primary/90">{questObjective || questDescription}</div>

                      <div className="text-primary/60">Goal:</div>
                      <div className="text-primary/90">{questTotal} times</div>

                      <div className="text-primary/60">Duration:</div>
                      <div className="text-primary/90">{questDuration} days</div>

                      <div className="text-primary/60">Rewards:</div>
                      <div className="text-primary/90">
                        {questRewardPPT} PPT, {questRewardXP} XP
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-primary/5 border border-primary/10 rounded-lg">
                    <Info className="h-5 w-5 text-primary/70 mr-3 flex-shrink-0" />
                    <p className="text-sm text-primary/70">
                      By creating this quest, {questRewardPPT} PPT will be reserved from your balance as rewards.
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
                  disabled={step === 1 && (!questTitle || !questCategory)}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={questRewardPPT > pptBalance}
                >
                  Create Quest
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
