export interface Prediction {
  id: string
  title: string
  description: string
  category: string
  endDate: string
  totalStaked: number
  participants: number
  odds: {
    yes: number
    no: number
  }
  creator: {
    name: string
    avatar?: string
  }
  status: "active" | "resolved" | "upcoming"
  outcome?: "yes" | "no"
  volume: number
  liquidity: number
}

export const mockPredictions: Prediction[] = [
  {
    id: "1",
    title: "Bitcoin will reach $100,000 by end of 2024",
    description: "Will Bitcoin (BTC) reach or exceed $100,000 USD by December 31, 2024?",
    category: "Cryptocurrency",
    endDate: "2024-12-31",
    totalStaked: 15420,
    participants: 234,
    odds: { yes: 65, no: 35 },
    creator: {
      name: "CryptoAnalyst",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "active",
    volume: 45600,
    liquidity: 12300,
  },
  {
    id: "2",
    title: "Ethereum 2.0 will launch successfully in Q2 2024",
    description: "Will Ethereum 2.0 complete its transition without major issues in Q2 2024?",
    category: "Technology",
    endDate: "2024-06-30",
    totalStaked: 8900,
    participants: 156,
    odds: { yes: 78, no: 22 },
    creator: {
      name: "EthDeveloper",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "active",
    volume: 23400,
    liquidity: 8900,
  },
  {
    id: "3",
    title: "Tesla will announce a new Gigafactory in 2024",
    description: "Will Tesla officially announce the construction of a new Gigafactory in 2024?",
    category: "Business",
    endDate: "2024-12-31",
    totalStaked: 12100,
    participants: 189,
    odds: { yes: 42, no: 58 },
    creator: {
      name: "TechInvestor",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "active",
    volume: 34500,
    liquidity: 11200,
  },
  {
    id: "4",
    title: "AI will pass the Turing Test in 2024",
    description: "Will an AI system convincingly pass the Turing Test as verified by independent experts?",
    category: "Technology",
    endDate: "2024-12-31",
    totalStaked: 18700,
    participants: 298,
    odds: { yes: 33, no: 67 },
    creator: {
      name: "AIResearcher",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "active",
    volume: 56700,
    liquidity: 18700,
  },
  {
    id: "5",
    title: "SpaceX will successfully land on Mars",
    description: "Will SpaceX achieve a successful Mars landing mission by end of 2025?",
    category: "Space",
    endDate: "2025-12-31",
    totalStaked: 25600,
    participants: 412,
    odds: { yes: 28, no: 72 },
    creator: {
      name: "SpaceExplorer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    status: "active",
    volume: 78900,
    liquidity: 25600,
  },
]
