export interface TokenPitch {
  id: string
  name: string
  symbol: string
  chain: string
  description: string
  aiScore: number
  communityScore: number
  simulation: string
  creator: {
    name: string
    avatar?: string
    reputation: number
  }
  comments: number
  likes: number
  dislikes: number
  staked: number
  category: string
  createdAt: string
  tags: string[]
}

export const mockTokenPitches: TokenPitch[] = [
  {
    id: "1",
    name: "ClimateDAO Token",
    symbol: "CDT",
    chain: "Ethereum",
    description:
      "A governance token for funding climate change initiatives with carbon offset mechanisms and quadratic voting.",
    aiScore: 92,
    communityScore: 78,
    simulation: "+45%",
    creator: {
      name: "TokenDesigner",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 87,
    },
    comments: 24,
    likes: 156,
    dislikes: 12,
    staked: 5600,
    category: "Environmental",
    createdAt: "2024-01-15",
    tags: ["Climate", "DAO", "Governance"],
  },
  {
    id: "2",
    name: "DecentraLearn",
    symbol: "DLEARN",
    chain: "Solana",
    description:
      "A decentralized education platform token that rewards learners and educators through proof-of-knowledge mechanisms.",
    aiScore: 89,
    communityScore: 82,
    simulation: "+38%",
    creator: {
      name: "EduBlockchain",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 75,
    },
    comments: 31,
    likes: 142,
    dislikes: 8,
    staked: 4200,
    category: "Education",
    createdAt: "2024-01-12",
    tags: ["Education", "Learning", "Rewards"],
  },
  {
    id: "3",
    name: "SupplyChainX",
    symbol: "SCX",
    chain: "Polygon",
    description:
      "Tokenizing supply chain verification with IoT integration for transparent product tracking and authenticity.",
    aiScore: 87,
    communityScore: 75,
    simulation: "+29%",
    creator: {
      name: "LogisticsGuru",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 68,
    },
    comments: 19,
    likes: 98,
    dislikes: 15,
    staked: 3100,
    category: "Supply Chain",
    createdAt: "2024-01-10",
    tags: ["Supply Chain", "IoT", "Verification"],
  },
  {
    id: "4",
    name: "HealthDAO",
    symbol: "HDAO",
    chain: "BSC",
    description: "Decentralized healthcare data management with privacy-preserving features and patient incentives.",
    aiScore: 85,
    communityScore: 79,
    simulation: "+32%",
    creator: {
      name: "MedTech",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 72,
    },
    comments: 27,
    likes: 115,
    dislikes: 9,
    staked: 3800,
    category: "Healthcare",
    createdAt: "2024-01-08",
    tags: ["Healthcare", "Privacy", "Data"],
  },
  {
    id: "5",
    name: "ArtistCollective",
    symbol: "ARTC",
    chain: "Ethereum",
    description: "Supporting digital artists through fractional ownership and royalty distribution on secondary sales.",
    aiScore: 83,
    communityScore: 88,
    simulation: "+41%",
    creator: {
      name: "CreativeDAO",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 81,
    },
    comments: 35,
    likes: 178,
    dislikes: 7,
    staked: 4900,
    category: "Art",
    createdAt: "2024-01-05",
    tags: ["Art", "NFT", "Royalties"],
  },
]
