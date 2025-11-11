export interface Quest {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "special" | "achievement"
  category: "onboarding" | "prediction" | "token" | "governance" | "community"
  reward: {
    ppt: number
    xp: number
  }
  progress: number
  total: number
  timeLeft?: string
  completed: boolean
  locked: boolean
  participants: number
  difficulty: "easy" | "medium" | "hard"
  requirements?: string[]
}

export const mockQuests: Quest[] = [
  {
    id: "1",
    title: "Complete Your Profile",
    description: "Fill out all profile fields and set up your avatar to establish your identity.",
    type: "daily",
    category: "onboarding",
    reward: {
      ppt: 50,
      xp: 100,
    },
    progress: 3,
    total: 5,
    completed: false,
    locked: false,
    participants: 1245,
    difficulty: "easy",
    requirements: ["Upload avatar", "Set username", "Add bio", "Connect wallet", "Verify email"],
  },
  {
    id: "2",
    title: "Create Your First Prediction",
    description: "Create a prediction market with at least 100 PPT staked to learn the platform.",
    type: "daily",
    category: "prediction",
    reward: {
      ppt: 100,
      xp: 200,
    },
    progress: 0,
    total: 1,
    completed: false,
    locked: false,
    participants: 876,
    difficulty: "medium",
    requirements: ["Stake minimum 100 PPT", "Set end date", "Add description"],
  },
  {
    id: "3",
    title: "Participate in 5 Predictions",
    description: "Join and stake in at least 5 different prediction markets to earn rewards.",
    type: "weekly",
    category: "prediction",
    reward: {
      ppt: 250,
      xp: 500,
    },
    progress: 2,
    total: 5,
    timeLeft: "3 days",
    completed: false,
    locked: false,
    participants: 543,
    difficulty: "medium",
  },
  {
    id: "4",
    title: "Pitch a Token Idea",
    description: "Create a token simulation and receive at least 10 community ratings.",
    type: "special",
    category: "token",
    reward: {
      ppt: 300,
      xp: 750,
    },
    progress: 0,
    total: 1,
    completed: false,
    locked: false,
    participants: 321,
    difficulty: "hard",
    requirements: ["Create token pitch", "Get 10+ ratings", "Achieve 70+ AI score"],
  },
  {
    id: "5",
    title: "Vote on 3 Governance Proposals",
    description: "Participate in platform governance by voting on active proposals.",
    type: "weekly",
    category: "governance",
    reward: {
      ppt: 150,
      xp: 300,
    },
    progress: 1,
    total: 3,
    timeLeft: "5 days",
    completed: false,
    locked: false,
    participants: 987,
    difficulty: "easy",
  },
  {
    id: "6",
    title: "Invite 3 Friends",
    description: "Invite friends to join Peculia and earn rewards when they sign up.",
    type: "special",
    category: "community",
    reward: {
      ppt: 200,
      xp: 400,
    },
    progress: 1,
    total: 3,
    completed: false,
    locked: false,
    participants: 654,
    difficulty: "medium",
  },
  {
    id: "7",
    title: "Achieve 1000 XP",
    description: "Reach 1000 XP to unlock advanced platform features and higher rewards.",
    type: "achievement",
    category: "onboarding",
    reward: {
      ppt: 500,
      xp: 0,
    },
    progress: 450,
    total: 1000,
    completed: false,
    locked: false,
    participants: 432,
    difficulty: "hard",
  },
  {
    id: "8",
    title: "Stake 1000 PPT in Token Pitches",
    description: "Stake a total of 1000 PPT across different token pitches.",
    type: "achievement",
    category: "token",
    reward: {
      ppt: 200,
      xp: 500,
    },
    progress: 0,
    total: 1000,
    completed: false,
    locked: true,
    participants: 210,
    difficulty: "hard",
    requirements: ["Unlock by completing 'Pitch a Token Idea'"],
  },
]
