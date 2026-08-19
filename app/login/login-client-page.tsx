"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

export default function LoginClientPage() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/portfolio")
    } catch (error) {
      console.error("Error logging in:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    try {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      router.push("/portfolio")
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error)
    } finally {
      setLoading(false)
    }
  }

  // Animated background elements — seeded after mount so SSR/hydration stay deterministic
  const [circles, setCircles] = useState<
    { id: number; x: number; y: number; size: number; duration: number }[]
  >([])

  useEffect(() => {
    setCircles(
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 300 + 100,
        duration: Math.random() * 20 + 10,
      })),
    )
  }, [])

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-12 sm:pb-16 flex items-center justify-center relative overflow-hidden">
      {/* Animated background circles */}
      {circles.map((circle) => (
        <motion.div
          key={circle.id}
          className="absolute rounded-full bg-gradient-to-r from-green-500/5 to-blue-500/5 blur-3xl"
          initial={{
            x: `${circle.x}%`,
            y: `${circle.y}%`,
            opacity: 0.1,
          }}
          animate={{
            x: [`${circle.x}%`, `${(circle.x + 5) % 100}%`],
            y: [`${circle.y}%`, `${(circle.y + 5) % 100}%`],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: circle.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-background/50 backdrop-blur-lg border border-white/10 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white -ml-2 px-2 sm:px-3">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Back to Home</span>
                    <span className="sm:hidden">Back</span>
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white px-2 sm:px-3">
                    <span className="hidden sm:inline">Need an account?</span>
                    <span className="sm:hidden">Sign Up</span>
                  </Button>
                </Link>
              </div>

              <div className="text-center mb-6">
                <motion.div
                  className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.span
                    className="text-primary-foreground font-bold text-2xl"
                    initial={{ y: 0 }}
                    animate={{ y: [-2, 0, -2] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    P
                  </motion.span>
                </motion.div>
                <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                <p className="text-white/60 mt-1">Sign in to your Peculia account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-green-400 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/40 pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full mt-6" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-background px-2 text-white/60">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white/5 border-white/10 hover:bg-white/10 px-2 sm:px-3"
                    onClick={() => handleSocialLogin("google")}
                    disabled={loading}
                  >
                    <svg className="h-5 w-5 sm:mr-2" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="hidden sm:inline">Google</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white/5 border-white/10 hover:bg-white/10 px-2 sm:px-3"
                    onClick={() => handleSocialLogin("apple")}
                    disabled={loading}
                  >
                    <svg className="h-5 w-5 sm:mr-2" viewBox="0 0 24 24" fill="white">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
                    </svg>
                    <span className="hidden sm:inline">Apple</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-white/5 border-white/10 hover:bg-white/10 px-2 sm:px-3"
                    onClick={() => handleSocialLogin("discord")}
                    disabled={loading}
                  >
                    <svg className="h-5 w-5 sm:mr-2" viewBox="0 0 24 24" fill="#5865F2">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                    </svg>
                    <span className="hidden sm:inline">Discord</span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
