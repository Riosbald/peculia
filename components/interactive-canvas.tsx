"use client"

import { useRef, useEffect, useState } from "react"
import { useSpring, animated } from "react-spring"
import { useWeb3 } from "@/components/providers/web3-provider"

interface Bird {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
}

interface Path {
  id: number
  points: { x: number; y: number }[]
  color: string
  width: number
  opacity: number
}

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { pptBalance, connected } = useWeb3()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Use refs to store birds and paths to avoid re-renders
  const birdsRef = useRef<Bird[]>([])
  const pathsRef = useRef<Path[]>([])

  // For UI display only - updated less frequently
  const [birdCount, setBirdCount] = useState(0)
  const [pathCount, setPathCount] = useState(0)

  // Animation properties
  const props = useSpring({
    opacity: connected ? 1 : 0.7,
    scale: connected ? 1 : 0.95,
    config: { tension: 120, friction: 14 },
  })

  // Initialize canvas and birds
  useEffect(() => {
    if (!canvasRef.current) return

    const updateDimensions = () => {
      if (!canvasRef.current) return
      const canvas = canvasRef.current
      const container = canvas.parentElement
      if (!container) return

      const { width, height } = container.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
      setDimensions({ width, height })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  // Initialize birds when dimensions are set
  useEffect(() => {
    if (dimensions.width === 0) return

    // Initialize birds
    const initialBirds = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: 3 + Math.random() * 3,
      color: getComputedStyle(document.documentElement).getPropertyValue("--primary").trim(),
    }))

    birdsRef.current = initialBirds
    setBirdCount(initialBirds.length)
  }, [dimensions])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let frameCount = 0

    // Animation loop
    const animate = () => {
      frameCount++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw paths
      pathsRef.current.forEach((path) => {
        if (path.points.length < 2) return

        ctx.beginPath()
        ctx.moveTo(path.points[0].x, path.points[0].y)

        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y)
        }

        ctx.strokeStyle = path.color
        ctx.globalAlpha = path.opacity
        ctx.lineWidth = path.width
        ctx.stroke()
        ctx.globalAlpha = 1
      })

      // Update and draw birds
      const birds = birdsRef.current
      const updatedBirds = birds.map((bird) => {
        // Apply flocking behavior
        let avgVx = 0
        let avgVy = 0
        let count = 0

        birds.forEach((otherBird) => {
          if (bird.id === otherBird.id) return

          const dx = otherBird.x - bird.x
          const dy = otherBird.y - bird.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 50) {
            avgVx += otherBird.vx
            avgVy += otherBird.vy
            count++
          }
        })

        let newVx = bird.vx
        let newVy = bird.vy

        if (count > 0) {
          avgVx /= count
          avgVy /= count

          newVx = bird.vx * 0.9 + avgVx * 0.1
          newVy = bird.vy * 0.9 + avgVy * 0.1
        }

        // Add some randomness
        newVx += (Math.random() - 0.5) * 0.2
        newVy += (Math.random() - 0.5) * 0.2

        // Normalize velocity
        const speed = Math.sqrt(newVx * newVx + newVy * newVy)
        if (speed > 2) {
          newVx = (newVx / speed) * 2
          newVy = (newVy / speed) * 2
        }

        // Update position
        let newX = bird.x + newVx
        let newY = bird.y + newVy

        // Bounce off edges
        if (newX < 0 || newX > canvas.width) {
          newVx *= -1
          newX = bird.x
        }

        if (newY < 0 || newY > canvas.height) {
          newVy *= -1
          newY = bird.y
        }

        // Draw bird
        ctx.beginPath()
        ctx.arc(bird.x, bird.y, bird.size, 0, Math.PI * 2)
        ctx.fillStyle = bird.color
        ctx.fill()

        // Draw direction line
        ctx.beginPath()
        ctx.moveTo(bird.x, bird.y)
        ctx.lineTo(bird.x + newVx * 5, bird.y + newVy * 5)
        ctx.strokeStyle = bird.color
        ctx.globalAlpha = 0.5
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.globalAlpha = 1

        return {
          ...bird,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
        }
      })

      birdsRef.current = updatedBirds

      // Update paths
      const paths = pathsRef.current
      const updatedPaths = paths
        .map((path) => {
          // Fade out paths over time
          return {
            ...path,
            opacity: path.opacity * 0.99,
          }
        })
        .filter((path) => path.opacity > 0.01)

      // Occasionally create new paths between birds
      if (Math.random() < 0.01 && birds.length >= 2) {
        const bird1 = birds[Math.floor(Math.random() * birds.length)]
        const bird2 = birds[Math.floor(Math.random() * birds.length)]

        if (bird1.id !== bird2.id) {
          updatedPaths.push({
            id: Date.now(),
            points: [
              { x: bird1.x, y: bird1.y },
              { x: bird2.x, y: bird2.y },
            ],
            color: bird1.color,
            width: 1,
            opacity: 0.3,
          })
        }
      }

      pathsRef.current = updatedPaths

      // Update UI counts only every 30 frames to avoid excessive re-renders
      if (frameCount % 30 === 0) {
        setBirdCount(birdsRef.current.length)
        setPathCount(pathsRef.current.length)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [dimensions])

  // Update bird count based on PPT balance
  useEffect(() => {
    if (dimensions.width === 0) return

    const targetBirdCount = Math.max(5, Math.min(30, Math.floor(pptBalance / 50)))
    const currentBirds = birdsRef.current

    if (currentBirds.length < targetBirdCount) {
      // Add birds
      const newBirds = [...currentBirds]

      for (let i = currentBirds.length; i < targetBirdCount; i++) {
        newBirds.push({
          id: Date.now() + i,
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: 3 + Math.random() * 3,
          color: getComputedStyle(document.documentElement).getPropertyValue("--primary").trim(),
        })
      }

      birdsRef.current = newBirds
      setBirdCount(newBirds.length)
    } else if (currentBirds.length > targetBirdCount) {
      // Remove birds
      birdsRef.current = currentBirds.slice(0, targetBirdCount)
      setBirdCount(targetBirdCount)
    }
  }, [pptBalance, dimensions])

  return (
    <animated.div
      style={{
        opacity: props.opacity,
        transform: props.scale.to((s) => `scale(${s})`),
      }}
      className="w-full h-[300px] relative overflow-hidden rounded-lg border border-primary/20"
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      <div className="absolute bottom-2 right-2 text-xs text-primary/40">
        {birdCount} users active • {pathCount} connections
      </div>
    </animated.div>
  )
}
