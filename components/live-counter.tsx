"use client"

import { useState, useEffect } from "react"
import { useSpring, animated } from "react-spring"
import { AlertTriangle } from "lucide-react"
import { useWeb3 } from "@/components/providers/web3-provider"

export default function LiveCounter() {
  const { pptBalance, connected } = useWeb3()
  const [initialPPT] = useState(1000)
  const [timeLeft, setTimeLeft] = useState("00:00:00")
  const [showWarning, setShowWarning] = useState(false)

  // Animated counter
  const animatedProps = useSpring({
    value: pptBalance,
    from: { value: initialPPT },
    config: { tension: 120, friction: 14 },
  })

  // Update countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)

      const diff = midnight.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

      setTimeLeft(formattedTime)
      setShowWarning(hours < 1)
    }

    // Run once immediately
    updateTimer()

    // Then set up interval
    const interval = setInterval(updateTimer, 1000)

    // Clean up interval on component unmount
    return () => clearInterval(interval)
  }, [])

  // Calculate percentage remaining
  const percentRemaining = (pptBalance / initialPPT) * 100

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col space-y-2 p-4 bg-background/30 rounded-lg border border-primary/20 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-primary/80">(peculia points)</h2>
          {showWarning && (
            <div className="flex items-center text-amber-500 text-xs animate-pulse">
              <AlertTriangle className="h-3 w-3 mr-1" />
              <span>Unclaimed PPT redistributes in {timeLeft}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline">
            <animated.span className="text-4xl font-bold text-primary">
              {animatedProps.value.to((val) => Math.floor(val))}
            </animated.span>
            <span className="text-sm text-primary/50 ml-2">/ {initialPPT} PPT</span>
          </div>
          <div className="text-xs text-primary/50">{timeLeft} remaining</div>
        </div>

        <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary/60 transition-all duration-1000 ease-out"
            style={{ width: `${percentRemaining}%` }}
          />
        </div>

        <div className="text-xs text-primary/50 text-center">
          Your {pptBalance} PPT ≈ {Math.floor(pptBalance / 150)} days of coding classes
        </div>
      </div>
    </div>
  )
}
