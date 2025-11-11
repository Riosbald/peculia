import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#10b981] text-black hover:bg-[#0d9668]",
        secondary: "border-transparent bg-[#1a1a1a] text-white hover:bg-[#252525]",
        destructive: "border-transparent bg-[#ef4444] text-white hover:bg-[#dc2626]",
        outline: "text-white border-[#2e2e2e]",
        green: "border-transparent bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30",
        blue: "border-transparent bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/30",
        purple: "border-transparent bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/30",
        yellow: "border-transparent bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30",
        red: "border-transparent bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
