export type CategoryType =
  | "Cryptocurrency"
  | "Technology"
  | "Business"
  | "Space"
  | "Environmental"
  | "Education"
  | "Supply Chain"
  | "Healthcare"
  | "Art"
  | "onboarding"
  | "prediction"
  | "token"
  | "governance"
  | "community"
  | "platform"
  | "treasury"
  | "grants"
  | "protocol"

export type StatusType = "active" | "resolved" | "upcoming" | "passed" | "rejected" | "completed" | "locked"

export interface ColorClasses {
  bg: string
  border: string
  text: string
  hover: string
  glow: string
}

export const getCategoryColor = (category: CategoryType): ColorClasses => {
  const colorMap: Record<string, ColorClasses> = {
    // Prediction categories
    Cryptocurrency: {
      bg: "bg-orange-500/20",
      border: "border-orange-500/20",
      text: "text-orange-500",
      hover: "hover:bg-orange-500/30",
      glow: "shadow-orange-500/20",
    },
    Technology: {
      bg: "bg-blue-500/20",
      border: "border-blue-500/20",
      text: "text-blue-500",
      hover: "hover:bg-blue-500/30",
      glow: "shadow-blue-500/20",
    },
    Business: {
      bg: "bg-green-500/20",
      border: "border-green-500/20",
      text: "text-green-500",
      hover: "hover:bg-green-500/30",
      glow: "shadow-green-500/20",
    },
    Space: {
      bg: "bg-purple-500/20",
      border: "border-purple-500/20",
      text: "text-purple-500",
      hover: "hover:bg-purple-500/30",
      glow: "shadow-purple-500/20",
    },

    // Token pitch categories
    Environmental: {
      bg: "bg-emerald-500/20",
      border: "border-emerald-500/20",
      text: "text-emerald-500",
      hover: "hover:bg-emerald-500/30",
      glow: "shadow-emerald-500/20",
    },
    Education: {
      bg: "bg-indigo-500/20",
      border: "border-indigo-500/20",
      text: "text-indigo-500",
      hover: "hover:bg-indigo-500/30",
      glow: "shadow-indigo-500/20",
    },
    "Supply Chain": {
      bg: "bg-teal-500/20",
      border: "border-teal-500/20",
      text: "text-teal-500",
      hover: "hover:bg-teal-500/30",
      glow: "shadow-teal-500/20",
    },
    Healthcare: {
      bg: "bg-pink-500/20",
      border: "border-pink-500/20",
      text: "text-pink-500",
      hover: "hover:bg-pink-500/30",
      glow: "shadow-pink-500/20",
    },
    Art: {
      bg: "bg-violet-500/20",
      border: "border-violet-500/20",
      text: "text-violet-500",
      hover: "hover:bg-violet-500/30",
      glow: "shadow-violet-500/20",
    },

    // Quest categories
    onboarding: {
      bg: "bg-blue-500/20",
      border: "border-blue-500/20",
      text: "text-blue-500",
      hover: "hover:bg-blue-500/30",
      glow: "shadow-blue-500/20",
    },
    prediction: {
      bg: "bg-purple-500/20",
      border: "border-purple-500/20",
      text: "text-purple-500",
      hover: "hover:bg-purple-500/30",
      glow: "shadow-purple-500/20",
    },
    token: {
      bg: "bg-green-500/20",
      border: "border-green-500/20",
      text: "text-green-500",
      hover: "hover:bg-green-500/30",
      glow: "shadow-green-500/20",
    },
    governance: {
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/20",
      text: "text-yellow-500",
      hover: "hover:bg-yellow-500/30",
      glow: "shadow-yellow-500/20",
    },
    community: {
      bg: "bg-pink-500/20",
      border: "border-pink-500/20",
      text: "text-pink-500",
      hover: "hover:bg-pink-500/30",
      glow: "shadow-pink-500/20",
    },

    // Governance categories
    platform: {
      bg: "bg-blue-500/20",
      border: "border-blue-500/20",
      text: "text-blue-500",
      hover: "hover:bg-blue-500/30",
      glow: "shadow-blue-500/20",
    },
    treasury: {
      bg: "bg-green-500/20",
      border: "border-green-500/20",
      text: "text-green-500",
      hover: "hover:bg-green-500/30",
      glow: "shadow-green-500/20",
    },
    grants: {
      bg: "bg-purple-500/20",
      border: "border-purple-500/20",
      text: "text-purple-500",
      hover: "hover:bg-purple-500/30",
      glow: "shadow-purple-500/20",
    },
    protocol: {
      bg: "bg-pink-500/20",
      border: "border-pink-500/20",
      text: "text-pink-500",
      hover: "hover:bg-pink-500/30",
      glow: "shadow-pink-500/20",
    },
  }

  return colorMap[category] || colorMap["Technology"]
}

export const getStatusColor = (status: StatusType): ColorClasses => {
  const statusMap: Record<StatusType, ColorClasses> = {
    active: {
      bg: "bg-blue-500/20",
      border: "border-blue-500/20",
      text: "text-blue-500",
      hover: "hover:bg-blue-500/30",
      glow: "shadow-blue-500/20",
    },
    resolved: {
      bg: "bg-green-500/20",
      border: "border-green-500/20",
      text: "text-green-500",
      hover: "hover:bg-green-500/30",
      glow: "shadow-green-500/20",
    },
    upcoming: {
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/20",
      text: "text-yellow-500",
      hover: "hover:bg-yellow-500/30",
      glow: "shadow-yellow-500/20",
    },
    passed: {
      bg: "bg-green-500/20",
      border: "border-green-500/20",
      text: "text-green-500",
      hover: "hover:bg-green-500/30",
      glow: "shadow-green-500/20",
    },
    rejected: {
      bg: "bg-red-500/20",
      border: "border-red-500/20",
      text: "text-red-500",
      hover: "hover:bg-red-500/30",
      glow: "shadow-red-500/20",
    },
    completed: {
      bg: "bg-green-500/20",
      border: "border-green-500/20",
      text: "text-green-500",
      hover: "hover:bg-green-500/30",
      glow: "shadow-green-500/20",
    },
    locked: {
      bg: "bg-gray-500/20",
      border: "border-gray-500/20",
      text: "text-gray-400",
      hover: "hover:bg-gray-500/30",
      glow: "shadow-gray-500/20",
    },
  }

  return statusMap[status]
}
