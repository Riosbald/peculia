"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  User,
  Settings,
  LogOut,
  Twitter,
  Github,
  Linkedin,
  Globe,
  TrendingUp,
  Award,
  Clock,
  Zap,
  Target,
  BarChart2,
  PieChart,
  Activity,
  Bell,
  Wallet,
  Trophy,
  Users,
  Edit,
  ChevronDown,
  Filter,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for charts
const balanceHistory = [
  { month: "Jan", balance: 3200 },
  { month: "Feb", balance: 3800 },
  { month: "Mar", balance: 4100 },
  { month: "Apr", balance: 3900 },
  { month: "May", balance: 4300 },
  { month: "Jun", balance: 4800 },
  { month: "Jul", balance: 5245 },
]

const weeklyPerformance = [
  { day: "Mon", predictions: 3, winRate: 67 },
  { day: "Tue", predictions: 5, winRate: 80 },
  { day: "Wed", predictions: 2, winRate: 50 },
  { day: "Thu", predictions: 7, winRate: 71 },
  { day: "Fri", predictions: 4, winRate: 75 },
  { day: "Sat", predictions: 6, winRate: 83 },
  { day: "Sun", predictions: 3, winRate: 67 },
]

const assetAllocation = [
  { name: "Predictions", value: 2500 },
  { name: "Staking", value: 1500 },
  { name: "Rewards", value: 1000 },
  { name: "Airdrops", value: 245 },
]

const COLORS = ["#10B981", "#3B82F6", "#8B5CF6", "#EC4899"]

const predictionStats = [
  { category: "Sports", predictions: 12, winRate: 75 },
  { category: "Politics", predictions: 8, winRate: 62 },
  { category: "Entertainment", predictions: 15, winRate: 80 },
  { category: "Technology", predictions: 10, winRate: 60 },
  { category: "Finance", predictions: 5, winRate: 40 },
]

const achievements = [
  {
    title: "Early Adopter",
    description: "Joined Peculia in the first month of launch",
    icon: <Zap className="h-5 w-5 text-yellow-400" />,
    date: "Jul 2023",
    points: 100,
  },
  {
    title: "Prediction Pro",
    description: "Won 10 consecutive predictions",
    icon: <Target className="h-5 w-5 text-green-400" />,
    date: "Sep 2023",
    points: 250,
  },
  {
    title: "Community Leader",
    description: "Created a prediction market with 100+ participants",
    icon: <Users className="h-5 w-5 text-blue-400" />,
    date: "Oct 2023",
    points: 300,
  },
  {
    title: "Token Visionary",
    description: "Pitched a token that received highest community rating",
    icon: <TrendingUp className="h-5 w-5 text-purple-400" />,
    date: "Nov 2023",
    points: 400,
  },
  {
    title: "Quest Master",
    description: "Completed all available quests in a month",
    icon: <Award className="h-5 w-5 text-pink-400" />,
    date: "Dec 2023",
    points: 500,
  },
]

const recentActivity = [
  {
    action: "Created prediction",
    description: "Will Bitcoin reach $100k by end of 2023?",
    timestamp: "2 hours ago",
    amount: "+50 PPT",
    positive: true,
  },
  {
    action: "Won prediction",
    description: "Will Ethereum merge happen in September?",
    timestamp: "1 day ago",
    amount: "+245 PPT",
    positive: true,
  },
  {
    action: "Staked tokens",
    description: "Locked 1000 PPT for 3 months",
    timestamp: "3 days ago",
    amount: "-1000 PPT",
    positive: false,
  },
  {
    action: "Completed quest",
    description: "Create 5 predictions in a week",
    timestamp: "5 days ago",
    amount: "+100 PPT",
    positive: true,
  },
  {
    action: "Lost prediction",
    description: "Will Tesla stock reach $300 by Q3?",
    timestamp: "1 week ago",
    amount: "-50 PPT",
    positive: false,
  },
]

export default function PortfolioClientPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [animateCharts, setAnimateCharts] = useState(false)
  const [showParticles, setShowParticles] = useState(false)

  // Trigger animations after component mounts
  useEffect(() => {
    const timer1 = setTimeout(() => setAnimateCharts(true), 500)
    const timer2 = setTimeout(() => setShowParticles(true), 1000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  // Particle animation for background
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
  }))

  return (
    <div className="min-h-screen pt-20 pb-16 bg-black relative overflow-hidden">
      {/* Animated background particles */}
      {showParticles &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-[#10b981]/10"
            initial={{
              x: `${particle.x}%`,
              y: `${particle.y}%`,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              x: [`${particle.x}%`, `${(particle.x + 10) % 100}%`],
              y: [`${particle.y}%`, `${(particle.y + 15) % 100}%`],
              opacity: [0.1, 0.3, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              width: `${particle.size}rem`,
              height: `${particle.size}rem`,
            }}
          />
        ))}

      {/* Glowing background effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#10b981]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] rounded-full bg-[#3b82f6]/5 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Horizontal Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-[#0a0a0a] border border-[#1e1e1e] overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Left Section - Profile Info */}
                <div className="lg:w-1/3 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#1e1e1e] relative">
                  <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-[#10b981]/20 to-[#3b82f6]/20"></div>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start mt-8">
                    <div className="relative">
                      <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-4 border-[#0a0a0a]">
                        <AvatarFallback className="bg-[#1a1a1a] text-white/70">
                          <User className="h-8 w-8 sm:h-10 sm:w-10" />
                        </AvatarFallback>
                      </Avatar>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute -bottom-1 -right-1 bg-[#10b981] rounded-full p-1 cursor-pointer"
                      >
                        <Edit className="h-3 w-3 text-black" />
                      </motion.div>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
                      <h2 className="text-xl font-bold text-white">Alex Johnson</h2>
                      <p className="text-[#a0a0a0] text-sm">@alexjohnson</p>
                      <div className="flex justify-center sm:justify-start mt-2">
                        <Badge variant="outline" className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30 mr-2">
                          Level 7
                        </Badge>
                        <Badge variant="outline" className="bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/30">
                          785 Rep
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-sm text-white/80">
                      <p>
                        Blockchain enthusiast and prediction market expert. I love making accurate predictions and
                        earning PPT tokens!
                      </p>
                    </div>

                    <div className="flex justify-center sm:justify-start space-x-3 mt-4">
                      <motion.a
                        href="#"
                        className="text-[#a0a0a0] hover:text-[#10b981]"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Twitter size={18} />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="text-[#a0a0a0] hover:text-[#10b981]"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={18} />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="text-[#a0a0a0] hover:text-[#10b981]"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin size={18} />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="text-[#a0a0a0] hover:text-[#10b981]"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Globe size={18} />
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Right Section - Stats & Actions */}
                <div className="lg:w-2/3 p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <motion.div
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.15)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="bg-[#0f0f0f] rounded-lg p-4 border border-[#1e1e1e]"
                    >
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-[#10b981]/10 mr-3">
                          <Wallet className="h-5 w-5 text-[#10b981]" />
                        </div>
                        <div>
                          <div className="text-sm text-[#a0a0a0]">Total Balance</div>
                          <div className="text-xl font-bold text-white">5,245 PPT</div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.15)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="bg-[#0f0f0f] rounded-lg p-4 border border-[#1e1e1e]"
                    >
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-[#3b82f6]/10 mr-3">
                          <Target className="h-5 w-5 text-[#3b82f6]" />
                        </div>
                        <div>
                          <div className="text-sm text-[#a0a0a0]">Win Rate</div>
                          <div className="text-xl font-bold text-white">68%</div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.15)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="bg-[#0f0f0f] rounded-lg p-4 border border-[#1e1e1e]"
                    >
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-[#8b5cf6]/10 mr-3">
                          <Trophy className="h-5 w-5 text-[#8b5cf6]" />
                        </div>
                        <div>
                          <div className="text-sm text-[#a0a0a0]">Achievements</div>
                          <div className="text-xl font-bold text-white">12</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#a0a0a0]">Reputation</span>
                        <span className="text-white font-medium">785</span>
                      </div>
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={animateCharts ? { width: "78.5%" } : { width: "0%" }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        className="h-2 bg-[#10b981] rounded-full"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#a0a0a0]">Level Progress</span>
                        <span className="text-white font-medium">65%</span>
                      </div>
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={animateCharts ? { width: "65%" } : { width: "0%" }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                        className="h-2 bg-[#3b82f6] rounded-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-6">
                    <Button variant="outline" size="sm" className="text-white/80 border-[#1e1e1e] hover:bg-[#1a1a1a]">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                    <Button variant="outline" size="sm" className="text-white/80 border-[#1e1e1e] hover:bg-[#1a1a1a]">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </Button>
                    <Button variant="outline" size="sm" className="text-white/80 border-[#1e1e1e] hover:bg-[#1a1a1a]">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Claim Rewards
                    </Button>
                    <Button variant="outline" size="sm" className="text-white/80 border-[#1e1e1e] hover:bg-[#1a1a1a]">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <div>
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-[#0a0a0a] border border-[#1e1e1e] mb-6 w-full overflow-x-auto flex-nowrap">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-[#10b981]/20 data-[state=active]:text-[#10b981]"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="predictions"
                className="data-[state=active]:bg-[#10b981]/20 data-[state=active]:text-[#10b981]"
              >
                Predictions
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-[#10b981]/20 data-[state=active]:text-[#10b981]"
              >
                Achievements
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-[#10b981]/20 data-[state=active]:text-[#10b981]"
              >
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="bg-[#0a0a0a] border border-[#1e1e1e] h-full">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2 text-[#10b981]" />
                        Balance History
                      </CardTitle>
                      <CardDescription>PPT balance over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          balance: {
                            label: "PPT Balance",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                        className="h-[250px] sm:h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={balanceHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="month" stroke="#606060" />
                            <YAxis stroke="#606060" />
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area
                              type="monotone"
                              dataKey="balance"
                              stroke="#10B981"
                              fillOpacity={1}
                              fill="url(#colorBalance)"
                              animationDuration={animateCharts ? 1500 : 0}
                              animationEasing="ease-out"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="bg-[#0a0a0a] border border-[#1e1e1e] h-full">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <PieChart className="h-5 w-5 mr-2 text-[#3b82f6]" />
                        Asset Allocation
                      </CardTitle>
                      <CardDescription>Distribution of your PPT tokens</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px] sm:h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={assetAllocation}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              animationDuration={animateCharts ? 1500 : 0}
                              animationEasing="ease-out"
                            >
                              {assetAllocation.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="bg-[#0a0a0a] border border-[#1e1e1e] mb-6">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-[#8b5cf6]" />
                        Weekly Performance
                      </CardTitle>
                      <Select defaultValue="thisWeek">
                        <SelectTrigger className="w-[180px] bg-[#0f0f0f] border-[#1e1e1e]">
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="thisWeek">This Week</SelectItem>
                          <SelectItem value="lastWeek">Last Week</SelectItem>
                          <SelectItem value="thisMonth">This Month</SelectItem>
                          <SelectItem value="lastMonth">Last Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <CardDescription>Your prediction performance this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        predictions: {
                          label: "Predictions",
                          color: "hsl(var(--chart-1))",
                        },
                        winRate: {
                          label: "Win Rate %",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-[250px] sm:h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weeklyPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
                          <XAxis dataKey="day" stroke="#606060" />
                          <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                          <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="predictions"
                            stroke="#3B82F6"
                            activeDot={{ r: 8 }}
                            animationDuration={animateCharts ? 1500 : 0}
                            animationEasing="ease-out"
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="winRate"
                            stroke="#10B981"
                            animationDuration={animateCharts ? 1500 : 0}
                            animationEasing="ease-out"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="bg-[#0a0a0a] border border-[#1e1e1e]">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-[#8b5cf6]" />
                        Recent Activity
                      </CardTitle>
                      <Button variant="outline" size="sm" className="text-white/70 border-[#1e1e1e]">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                    <CardDescription>Your latest actions on the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start justify-between p-4 rounded-lg bg-[#0f0f0f] border border-[#1e1e1e] hover:border-[#2e2e2e] transition-all duration-300"
                        >
                          <div className="flex items-start">
                            <div
                              className={`p-2 rounded-full ${item.positive ? "bg-[#10b981]/10" : "bg-[#ef4444]/10"} mr-3`}
                            >
                              {item.positive ? (
                                <ArrowUpRight className="h-4 w-4 text-[#10b981]" />
                              ) : (
                                <ArrowDownRight className="h-4 w-4 text-[#ef4444]" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-white">{item.action}</div>
                              <div className="text-sm text-[#a0a0a0]">{item.description}</div>
                              <div className="text-xs text-[#606060] mt-1 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {item.timestamp}
                              </div>
                            </div>
                          </div>
                          <div className={`text-sm font-medium ${item.positive ? "text-[#10b981]" : "text-[#ef4444]"}`}>
                            {item.amount}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline" className="text-white/70 border-[#1e1e1e]">
                        View All Activity
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="predictions">
              <Card className="bg-[#0a0a0a] border border-[#1e1e1e] mb-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2 text-[#3b82f6]" />
                    Prediction Performance
                  </CardTitle>
                  <CardDescription>Win rate by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      predictions: {
                        label: "Predictions",
                        color: "hsl(var(--chart-1))",
                      },
                      winRate: {
                        label: "Win Rate %",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[250px] sm:h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={predictionStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e1e1e" />
                        <XAxis dataKey="category" stroke="#606060" />
                        <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
                        <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar
                          yAxisId="left"
                          dataKey="predictions"
                          fill="#3B82F6"
                          radius={[4, 4, 0, 0]}
                          animationDuration={animateCharts ? 1500 : 0}
                          animationEasing="ease-out"
                        />
                        <Bar
                          yAxisId="right"
                          dataKey="winRate"
                          fill="#10B981"
                          radius={[4, 4, 0, 0]}
                          animationDuration={animateCharts ? 1500 : 0}
                          animationEasing="ease-out"
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[#0a0a0a] border border-[#1e1e1e]">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Target className="h-5 w-5 mr-2 text-[#10b981]" />
                      Active Predictions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <motion.div
                          key={item}
                          whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(16, 185, 129, 0.2)" }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className="p-4 rounded-lg bg-[#0f0f0f] border border-[#1e1e1e] hover:border-[#10b981]/30 transition-all duration-300"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-white">Will Bitcoin reach $100k by end of 2023?</h4>
                              <p className="text-sm text-[#a0a0a0] mt-1">Prediction Market • Crypto</p>
                            </div>
                            <div className="bg-[#10b981]/20 text-[#10b981] text-xs font-medium px-2 py-1 rounded">
                              YES (75%)
                            </div>
                          </div>
                          <div className="mt-3 flex justify-between text-sm">
                            <span className="text-[#a0a0a0]">Your stake: 100 PPT</span>
                            <span className="text-[#a0a0a0]">Ends in 45 days</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#0a0a0a] border border-[#1e1e1e]">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-[#f59e0b]" />
                      Past Predictions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((item) => (
                        <motion.div
                          key={item}
                          whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(16, 185, 129, 0.2)" }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className="p-4 rounded-lg bg-[#0f0f0f] border border-[#1e1e1e] hover:border-[#10b981]/30 transition-all duration-300"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-white">Will Ethereum merge happen in September?</h4>
                              <p className="text-sm text-[#a0a0a0] mt-1">Prediction Market • Crypto</p>
                            </div>
                            <div className="bg-[#10b981]/20 text-[#10b981] text-xs font-medium px-2 py-1 rounded">
                              WON (+245 PPT)
                            </div>
                          </div>
                          <div className="mt-3 flex justify-between text-sm">
                            <span className="text-[#a0a0a0]">Your stake: 100 PPT</span>
                            <span className="text-[#a0a0a0]">Ended 30 days ago</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements">
              <Card className="bg-[#0a0a0a] border border-[#1e1e1e]">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-[#f59e0b]" />
                    Your Achievements
                  </CardTitle>
                  <CardDescription>Milestones you've reached on Peculia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 10px 30px -15px rgba(16, 185, 129, 0.2)",
                          borderColor: "rgba(255, 255, 255, 0.3)",
                        }}
                        className="flex items-start p-4 rounded-lg bg-[#0f0f0f] border border-[#1e1e1e] transition-all duration-300"
                      >
                        <div className="p-3 rounded-full bg-[#0f0f0f] mr-4">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-white">{achievement.title}</h3>
                            <span className="text-xs text-[#a0a0a0]">{achievement.date}</span>
                          </div>
                          <p className="text-sm text-[#a0a0a0] mt-1">{achievement.description}</p>
                          <div className="mt-2 text-xs font-medium text-[#f59e0b]">
                            +{achievement.points} Reputation Points
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card className="bg-[#0a0a0a] border border-[#1e1e1e]">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-[#8b5cf6]" />
                      Activity Feed
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[120px] bg-[#0f0f0f] border-[#1e1e1e]">
                          <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Activity</SelectItem>
                          <SelectItem value="predictions">Predictions</SelectItem>
                          <SelectItem value="rewards">Rewards</SelectItem>
                          <SelectItem value="quests">Quests</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" className="text-white/70 border-[#1e1e1e]">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                  <CardDescription>Your complete activity history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-6 border-l border-[#1e1e1e] space-y-6 py-2">
                    {recentActivity.concat(recentActivity).map((item, index) => (
                      <motion.div
                        key={index}
                        className="relative"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <motion.div
                          className="absolute -left-[25px] p-1 rounded-full bg-[#0a0a0a] border border-[#1e1e1e]"
                          whileHover={{
                            scale: 1.2,
                            backgroundColor: item.positive ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
                          }}
                        >
                          {item.positive ? (
                            <ArrowUpRight className="h-3 w-3 text-[#10b981]" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 text-[#ef4444]" />
                          )}
                        </motion.div>
                        <motion.div
                          className="p-4 rounded-lg bg-[#0f0f0f] border border-[#1e1e1e]"
                          whileHover={{
                            y: -5,
                            boxShadow: "0 10px 30px -15px rgba(16, 185, 129, 0.2)",
                            borderColor: item.positive ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)",
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-white">{item.action}</h4>
                              <p className="text-sm text-[#a0a0a0] mt-1">{item.description}</p>
                            </div>
                            <div
                              className={`text-sm font-medium ${item.positive ? "text-[#10b981]" : "text-[#ef4444]"}`}
                            >
                              {item.amount}
                            </div>
                          </div>
                          <div className="mt-3 text-xs text-[#606060] flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {item.timestamp}
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="text-white/70 border-[#1e1e1e]">
                      Load More
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
