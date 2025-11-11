"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Copy, Maximize2, Terminal, Dices, TrendingUp, Trophy, Vote, Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

// Enhanced particle animation for background
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Enhanced particle properties
    const particleCount = 80
    const particles: {
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
      opacity: number
      pulse: number
      pulseSpeed: number
      connectRadius: number
    }[] = []

    // Create particles with enhanced properties
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.5 + 0.5,
        color: "#ffffff",
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        connectRadius: 150,
      })
    }

    // Enhanced animation loop with pulsing effect and connections
    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections between particles
      ctx.strokeStyle = "#ffffff20"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < particles[i].connectRadius) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.globalAlpha = (1 - distance / particles[i].connectRadius) * 0.2
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Pulse effect
        particle.pulse += particle.pulseSpeed
        const pulseFactor = Math.sin(particle.pulse) * 0.2 + 0.8

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle with pulsing effect
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * pulseFactor, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()

        // Add glow effect
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 2 * pulseFactor, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}10`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

export default function HeroSection() {
  const [text, setText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [commandEntered, setCommandEntered] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showFeatures, setShowFeatures] = useState(false)
  const controls = useAnimation()

  // Typing animation
  useEffect(() => {
    const welcomeText = 'Welcome to Peculia CLI v1.2.0\nType "help" to see available commands\n$ '
    let index = 0

    if (!commandEntered) {
      const typingInterval = setInterval(() => {
        setText(welcomeText.substring(0, index))
        index++

        if (index > welcomeText.length) {
          clearInterval(typingInterval)
          setTimeout(() => {
            setCommandEntered(true)
          }, 1000)
        }
      }, 50)

      return () => clearInterval(typingInterval)
    }
  }, [commandEntered])

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  // Animate features after CLI animation
  useEffect(() => {
    if (commandEntered) {
      setTimeout(() => {
        setShowFeatures(true)
        controls.start("visible")
      }, 1500)
    }
  }, [commandEntered, controls])

  const handleCopy = () => {
    navigator.clipboard.writeText("peculia onboard")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const features = [
    {
      icon: <Dices className="h-5 w-5" />,
      title: "Prediction Markets",
      description: "Create and participate in AI-verified predictions",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Token Pitching",
      description: "Simulate and evaluate token ideas",
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      title: "Quest System",
      description: "Complete missions for rewards",
    },
    {
      icon: <Vote className="h-5 w-5" />,
      title: "Quadratic Governance",
      description: "Fair voting with √(PPT) power",
    },
  ]

  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden relative">
      <ParticleBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-xl"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 font-mono leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              Curiosity Fuels the Future
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              Join the community-driven platform where AI, blockchain, and gamification converge.
            </motion.p>

            <motion.div
              className="flex justify-start mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link href="/portfolio">
                <Button className="bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/30 px-8 py-6 h-auto text-xl font-medium rounded-xl">
                  <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Zap className="h-6 w-6 mr-2" />
                    Claim 1,000 PPT
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                      className="ml-2"
                    >
                      <ArrowRight className="h-6 w-6" />
                    </motion.div>
                  </motion.div>
                </Button>
              </Link>
            </motion.div>

            <AnimatePresence>
              {showFeatures && (
                <motion.div
                  className="mt-12 grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className="flex items-start p-4 rounded-lg bg-background/30 border border-white/10 hover:border-green-500/30 transition-all duration-300 card-hover group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    >
                      <div className="mr-3 mt-1 p-2 rounded-md bg-white/10 text-white group-hover:bg-green-500/20 transition-all duration-300">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-white text-lg">{feature.title}</h3>
                        <p className="text-sm text-white/70 mt-1">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="bg-background/30 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden shadow-xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center justify-between px-4 py-2 bg-background/50 border-b border-white/20 relative z-10">
                <div className="flex items-center">
                  <motion.div
                    className="w-3 h-3 rounded-full bg-red-500 opacity-50 mr-2"
                    whileHover={{ opacity: 1 }}
                  ></motion.div>
                  <motion.div
                    className="w-3 h-3 rounded-full bg-yellow-500 opacity-50 mr-2"
                    whileHover={{ opacity: 1 }}
                  ></motion.div>
                  <motion.div
                    className="w-3 h-3 rounded-full bg-green-500 opacity-50"
                    whileHover={{ opacity: 1 }}
                  ></motion.div>
                </div>
                <div className="flex items-center">
                  <Terminal className="h-3 w-3 text-white/60 mr-1.5" />
                  <span className="text-xs text-white/60 font-mono">Peculia CLI</span>
                </div>
                <div className="flex items-center">
                  <motion.button
                    className="text-white/60 hover:text-white mr-2"
                    onClick={handleCopy}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Copy size={14} />
                  </motion.button>
                  <motion.button
                    className="text-white/60 hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Maximize2 size={14} />
                  </motion.button>
                </div>
              </div>
              <div className="bg-[#0D1117] p-4 font-mono text-sm text-white/90 h-64 overflow-hidden relative z-10">
                <div className="whitespace-pre-wrap">
                  {text}
                  {commandEntered && "peculia onboard"}
                  {cursorVisible && <span className="inline-block w-2 h-4 bg-white/80 ml-1"></span>}
                </div>
                {commandEntered && (
                  <motion.div
                    className="mt-4 text-white/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <p>✅ Wallet: solana:community</p>
                    <p className="mt-2">"Your 5h/month = 5,000 PPT yearly. Run `peculia accept` to lock rewards."</p>
                  </motion.div>
                )}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-white/50">
                  <span>v1.2.0</span>
                  <div className="flex items-center">
                    <motion.span
                      className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    ></motion.span>
                    <span>Connected | Type 'help' for commands</span>
                  </div>
                </div>
              </div>
            </div>

            {copied && (
              <motion.div
                className="absolute top-12 right-4 bg-background/90 border border-white/20 rounded px-3 py-1 text-xs text-white/80"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Copied to clipboard!
              </motion.div>
            )}

            <motion.div
              className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-green-500/10 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />

            <motion.div
              className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-blue-500/10 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
