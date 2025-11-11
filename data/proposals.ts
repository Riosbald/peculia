export interface Proposal {
  id: string
  title: string
  description: string
  type: "active" | "completed" | "upcoming"
  category: "platform" | "treasury" | "grants" | "protocol" | "community"
  creator: {
    name: string
    avatar?: string
  }
  votingPower: {
    for: number
    against: number
  }
  participants: number
  timeLeft?: string
  status: "active" | "passed" | "rejected" | "upcoming"
  createdAt: string
  endDate: string
  quorum: number
  requiredMajority: number
}

export const mockProposals: Proposal[] = [
  {
    id: "1",
    title: "Increase Prediction Market Fee from 1% to 1.5%",
    description: "Proposal to increase the platform fee on prediction markets to fund more community initiatives.",
    type: "active",
    category: "platform",
    creator: {
      name: "GovernanceDAO",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    votingPower: {
      for: 12500,
      against: 8700,
    },
    participants: 156,
    timeLeft: "3 days",
    status: "active",
    createdAt: "2024-01-10",
    endDate: "2024-01-20",
    quorum: 10000,
    requiredMajority: 60,
  },
  {
    id: "2",
    title: "Fund Community Education Program with 50,000 PPT",
    description: "Allocate treasury funds to create educational content about prediction markets and tokenomics.",
    type: "active",
    category: "treasury",
    creator: {
      name: "EducationDAO",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    votingPower: {
      for: 18900,
      against: 3200,
    },
    participants: 203,
    timeLeft: "5 days",
    status: "active",
    createdAt: "2024-01-08",
    endDate: "2024-01-22",
    quorum: 15000,
    requiredMajority: 65,
  },
  {
    id: "3",
    title: "Add Multi-Chain Support for Polygon and Solana",
    description: "Expand platform capabilities to support prediction markets and token pitching on additional chains.",
    type: "active",
    category: "protocol",
    creator: {
      name: "TechCouncil",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    votingPower: {
      for: 22400,
      against: 5600,
    },
    participants: 245,
    timeLeft: "2 days",
    status: "active",
    createdAt: "2024-01-12",
    endDate: "2024-01-19",
    quorum: 20000,
    requiredMajority: 70,
  },
  {
    id: "4",
    title: "Implement Quadratic Voting for All Platform Decisions",
    description: "Extend quadratic voting beyond funding to all governance decisions to prevent whale dominance.",
    type: "completed",
    category: "protocol",
    creator: {
      name: "DemocracyDAO",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    votingPower: {
      for: 28700,
      against: 4300,
    },
    participants: 312,
    status: "passed",
    createdAt: "2023-12-15",
    endDate: "2023-12-25",
    quorum: 25000,
    requiredMajority: 75,
  },
  {
    id: "5",
    title: "Create Grants Program for AI Integration Projects",
    description: "Establish a 100,000 PPT grants program for developers building AI tools for the platform.",
    type: "completed",
    category: "grants",
    creator: {
      name: "AICouncil",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    votingPower: {
      for: 19500,
      against: 12800,
    },
    participants: 278,
    status: "passed",
    createdAt: "2023-12-10",
    endDate: "2023-12-20",
    quorum: 20000,
    requiredMajority: 60,
  },
]
