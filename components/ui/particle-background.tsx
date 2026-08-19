"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParticleBackgroundProps {
  color?: string
  count?: number
  speed?: number
  density?: number
  glowIntensity?: number
  className?: string
  quantity?: number
  particleColor?: string
  minSize?: number
  maxSize?: number
}

export default function ParticleBackground({
  color = "#10b981",
  count = 80,
  speed = 1,
  density = 150,
  glowIntensity = 0.5,
  className,
  quantity,
  particleColor,
  minSize = 0.5,
  maxSize = 3,
}: ParticleBackgroundProps) {
  const resolvedColor = particleColor ?? color
  const resolvedCount = quantity ?? count
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateSize = () => {
      if (!canvas || !canvas.parentElement) return

      const { width, height } = canvas.parentElement.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
    }

    updateSize()
    window.addEventListener("resize", updateSize)

    // Prepare particles
    const particles: {
      x: number
      y: number
      radius: number
      speedX: number
      speedY: number
      opacity: number
      pulse: number
      pulseSpeed: number
      connectRadius: number
    }[] = []

    for (let i = 0; i < resolvedCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * 0.4 * speed,
        speedY: (Math.random() - 0.5) * 0.4 * speed,
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        connectRadius: density,
      })
    }

    // Animation function
    let animationFrameId: number
    const render = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections first (underneath particles)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < particles[i].connectRadius) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[j].y)
            ctx.lineTo(particles[j].x, particles[j].y)

            // Calculate opacity based on distance
            const opacity = (1 - distance / particles[i].connectRadius) * 0.2
            ctx.strokeStyle = `${resolvedColor}${Math.floor(opacity * 255)
              .toString(16)
              .padStart(2, "0")}`
            ctx.lineWidth = 0.8
            ctx.stroke()
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

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * pulseFactor, 0, Math.PI * 2)
        ctx.fillStyle = `${resolvedColor}${Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()

        // Add glow effect
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 2 * pulseFactor, 0, Math.PI * 2)
        ctx.fillStyle = `${resolvedColor}${Math.floor(particle.opacity * 70 * glowIntensity)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", updateSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [resolvedColor, resolvedCount, speed, density, glowIntensity, minSize, maxSize])

  return (
    <motion.canvas
      ref={canvasRef}
      className={cn("absolute inset-0 z-0", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}
