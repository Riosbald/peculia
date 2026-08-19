"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Github, Mail, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function AuthClientPage() {
  const [activeTab, setActiveTab] = useState("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  // Background dots are seeded once after mount — randomness during render
  // would crash SSR (window is undefined) and break hydration.
  const [particles, setParticles] = useState<
    { id: number; x0: number; y0: number; x1: number; y1: number; duration: number }[]
  >([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x0: Math.random() * window.innerWidth,
        y0: Math.random() * window.innerHeight,
        x1: Math.random() * window.innerWidth,
        y1: Math.random() * window.innerHeight,
        duration: Math.random() * 20 + 10,
      })),
    )
  }, [])

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    username: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    console.log("Login data:", loginData)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep === 1) {
      setCurrentStep(2)
    } else {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsLoading(false)
      console.log("Signup data:", signupData)
    }
  }

  const handleSocialAuth = (provider: string) => {
    console.log(`Authenticating with ${provider}`)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/5 via-transparent to-purple-500/5" />
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{ x: particle.x0, y: particle.y0 }}
            animate={{ x: particle.x1, y: particle.y1 }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-black/50 backdrop-blur-md border-[#1e1e1e]">
          <CardHeader className="text-center">
            <motion.div
              className="w-16 h-16 rounded-lg bg-white flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-black font-bold text-2xl">P</span>
            </motion.div>
            <CardTitle className="text-2xl font-bold text-white">
              {activeTab === "signin" ? "Welcome back" : "Create your account"}
            </CardTitle>
            <CardDescription className="text-[#a0a0a0]">
              {activeTab === "signin"
                ? "Sign in to your Peculia account to continue"
                : "Join Peculia and start exploring prediction markets"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#1a1a1a] border border-[#2a2a2a]">
                <TabsTrigger
                  value="signin"
                  className="data-[state=active]:bg-[#10b981] data-[state=active]:text-black text-white/80"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-[#10b981] data-[state=active]:text-black text-white/80"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#666] focus:border-[#10b981]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-white">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#666] focus:border-[#10b981] pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#10b981] text-black hover:bg-[#0d9668]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <Separator className="bg-[#2a2a2a]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-black px-2 text-[#666] text-sm">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialAuth("google")}
                    className="bg-transparent border-[#2a2a2a] text-white hover:bg-[#1a1a1a]"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSocialAuth("github")}
                    className="bg-transparent border-[#2a2a2a] text-white hover:bg-[#1a1a1a]"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <AnimatePresence mode="wait">
                  {currentStep === 1 ? (
                    <motion.form
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleSignup}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-white">
                          Email
                        </Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                          className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#666] focus:border-[#10b981]"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-white">
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={signupData.password}
                            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                            className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#666] focus:border-[#10b981] pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-white">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={signupData.confirmPassword}
                            onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                            className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#666] focus:border-[#10b981] pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666] hover:text-white"
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      <Button type="submit" className="w-full bg-[#10b981] text-black hover:bg-[#0d9668]">
                        Continue
                      </Button>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      onSubmit={handleSignup}
                      className="space-y-4"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="first-name" className="text-white">
                            First Name
                          </Label>
                          <Input
                            id="first-name"
                            type="text"
                            placeholder="First name"
                            value={signupData.firstName}
                            onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                            className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#666] focus:border-[#10b981]"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name" className="text-white">
                            Last Name
                          </Label>
                          <Input
                            id="last-name"
                            type="text"
                            placeholder="Last name"
                            value={signupData.lastName}
                            onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                            className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#666] focus:border-[#10b981]"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-white">
                          Username
                        </Label>
                        <Input
                          id="username"
                          type="text"
                          placeholder="Choose a username"
                          value={signupData.username}
                          onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                          className="bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-[#666] focus:border-[#10b981]"
                          required
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(1)}
                          className="flex-1 bg-transparent border-[#2a2a2a] text-white hover:bg-[#1a1a1a]"
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-[#10b981] text-black hover:bg-[#0d9668]"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            "Create Account"
                          )}
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {currentStep === 1 && (
                  <>
                    <div className="relative">
                      <Separator className="bg-[#2a2a2a]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-black px-2 text-[#666] text-sm">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        onClick={() => handleSocialAuth("google")}
                        className="bg-transparent border-[#2a2a2a] text-white hover:bg-[#1a1a1a]"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Google
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleSocialAuth("github")}
                        className="bg-transparent border-[#2a2a2a] text-white hover:bg-[#1a1a1a]"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
