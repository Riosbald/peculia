"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Brain, Calendar, Check, HelpCircle, Dices, Vote, ListChecks, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreatePredictionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreatePredictionModal({ isOpen, onClose }: CreatePredictionModalProps) {
  const [step, setStep] = useState(0)
  const [predictionType, setPredictionType] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [endDate, setEndDate] = useState("")
  const [amount, setAmount] = useState(100)
  const [isPrivate, setIsPrivate] = useState(false)

  const handleSubmit = () => {
    // In a real app, this would submit the prediction to the backend
    console.log({
      type: predictionType,
      title,
      description,
      category,
      endDate,
      amount,
      isPrivate,
    })

    // Reset form and close modal
    setStep(0)
    setPredictionType(null)
    setTitle("")
    setDescription("")
    setCategory("")
    setEndDate("")
    setAmount(100)
    setIsPrivate(false)
    onClose()
  }

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePreviousStep = () => {
    if (step === 0) {
      setPredictionType(null)
    } else {
      setStep(step - 1)
    }
  }

  const predictionTypes = [
    {
      id: "ai-assisted",
      title: "AI-assisted creation",
      description: "Get high-quality questions with clear resolution criteria",
      icon: <Brain className="h-6 w-6" />,
      color: "bg-purple-500/20 text-purple-500 border-purple-500/30",
    },
    {
      id: "yes-no",
      title: "Yes/No",
      description: 'Binary prediction like "Will NASA confirm aliens before 2025?"',
      icon: <Check className="h-6 w-6" />,
      color: "bg-green-500/20 text-green-500 border-green-500/30",
    },
    {
      id: "multiple-choice",
      title: "Multiple Choice",
      description: "A question where only one option can be selected",
      icon: <Vote className="h-6 w-6" />,
      color: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    },
    {
      id: "set",
      title: "Set",
      description: "A question with multiple selectable options",
      icon: <ListChecks className="h-6 w-6" />,
      color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
    },
    {
      id: "numeric",
      title: "Numeric",
      description: "For numerical predictions",
      icon: <Hash className="h-6 w-6" />,
      color: "bg-red-500/20 text-red-500 border-red-500/30",
    },
    {
      id: "date",
      title: "Date",
      description: "For predicting when something will happen",
      icon: <Calendar className="h-6 w-6" />,
      color: "bg-pink-500/20 text-pink-500 border-pink-500/30",
    },
    {
      id: "poll",
      title: "Poll",
      description: "For opinion-based questions",
      icon: <Dices className="h-6 w-6" />,
      color: "bg-indigo-500/20 text-indigo-500 border-indigo-500/30",
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="modal-content w-full max-w-2xl max-h-[90vh] overflow-auto"
          >
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Create Prediction</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white/70 hover:text-white">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-6">
              {predictionType === null ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-medium text-white mb-2">Choose prediction type</h3>
                    <p className="text-white/60 text-sm">Select the format that best fits your prediction</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {predictionTypes.map((type) => (
                      <motion.div
                        key={type.id}
                        className={`p-4 border rounded-lg cursor-pointer ${type.color}`}
                        whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2)" }}
                        whileTap={{ y: 0 }}
                        onClick={() => {
                          setPredictionType(type.id)
                          setStep(1)
                        }}
                      >
                        <div className="flex items-start">
                          <div className="mr-3 p-2 rounded-md bg-white/10">{type.icon}</div>
                          <div>
                            <h4 className="font-medium text-white">{type.title}</h4>
                            <p className="text-xs text-white/70 mt-1">{type.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <>
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label className="text-white/80">Prediction Title</Label>
                        <Input
                          placeholder="e.g., Will Wizkid release a new album in 2023?"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="border-white/20 bg-background/50 text-white placeholder:text-white/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white/80">Description (Optional)</Label>
                        <Textarea
                          placeholder="Add more details about your prediction..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="border-white/20 bg-background/50 text-white placeholder:text-white/30 min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white/80">Category</Label>
                        <Select value={category} onValueChange={setCategory}>
                          <SelectTrigger className="border-white/20 bg-background/50 text-white">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-white/20">
                            <SelectItem value="music">Music</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="politics">Politics</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="entertainment">Entertainment</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="crypto">Cryptocurrency</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
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
                        <Label className="text-white/80">End Date</Label>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-white/50" />
                          <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border-white/20 bg-background/50 text-white"
                          />
                        </div>
                        <p className="text-xs text-white/50">When will this prediction be resolved?</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="text-white/80">Stake Amount: {amount} PPT</Label>
                        </div>
                        <Slider
                          value={[amount]}
                          min={10}
                          max={1000}
                          step={10}
                          onValueChange={(value) => setAmount(value[0])}
                          className="text-green-500"
                        />
                        <p className="text-xs text-white/50 flex items-center">
                          <HelpCircle className="h-3 w-3 mr-1" />
                          Amount of PPT tokens to stake on this prediction
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-white/80">Private Prediction</Label>
                          <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
                        </div>
                        <p className="text-xs text-white/50">
                          Private predictions are only visible to people you invite
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
                      <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
                        <h3 className="text-white/90 font-medium">Prediction Summary</h3>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="text-white/60">Type:</div>
                          <div className="text-white/90 capitalize">{predictionType?.replace("-", " ")}</div>

                          <div className="text-white/60">Title:</div>
                          <div className="text-white/90">{title}</div>

                          <div className="text-white/60">Category:</div>
                          <div className="text-white/90 capitalize">{category}</div>

                          <div className="text-white/60">End Date:</div>
                          <div className="text-white/90">{endDate}</div>

                          <div className="text-white/60">Stake Amount:</div>
                          <div className="text-white/90">{amount} PPT</div>

                          <div className="text-white/60">Visibility:</div>
                          <div className="text-white/90">{isPrivate ? "Private" : "Public"}</div>
                        </div>
                      </div>

                      <div className="flex items-center p-3 bg-white/5 border border-white/10 rounded-lg">
                        <Brain className="h-5 w-5 text-white/70 mr-3 flex-shrink-0" />
                        <p className="text-sm text-white/70">
                          Our AI will analyze your prediction and provide fair odds based on real-time data.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>

            <div className="flex justify-between p-4 border-t border-white/10 bg-background/50">
              {predictionType !== null && (
                <Button
                  variant="outline"
                  onClick={handlePreviousStep}
                  className="border-white/20 text-white hover:bg-white/5"
                >
                  Back
                </Button>
              )}

              {predictionType === null ? (
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-white/20 text-white hover:bg-white/5 ml-auto"
                >
                  Cancel
                </Button>
              ) : step < 3 ? (
                <Button
                  onClick={handleNextStep}
                  className="bg-green-500 text-white hover:bg-green-600"
                  disabled={step === 1 && (!title || !category)}
                >
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-500 text-white hover:bg-green-600">
                  Create Prediction
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
