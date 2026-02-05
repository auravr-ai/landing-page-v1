import { Code } from "lucide-react"
import { cn } from "@/lib/utils"

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="bg-orange-500 rounded-lg p-2">
        <Code className="h-6 w-6 text-white" />
      </div>
      <span className="text-xl font-bold">AURA</span>
    </div>
  )
}
