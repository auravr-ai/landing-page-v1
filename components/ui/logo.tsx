import Image from "next/image"
import { cn } from "@/lib/utils"

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center space-x-1.5", className)}>
      <Image
        src="/logo.svg"
        alt="Aura logo"
        width={140}
        height={40}
        priority
        className="h-10 w-auto"
      />
      <span className="text-xl font-bold tracking-tight">AURA</span>
    </div>
  )
}
