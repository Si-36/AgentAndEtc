"use client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User } from "lucide-react"

interface UserMessageBubbleProps {
  content: string
  timestamp: string
}

export function UserMessageBubble({ content, timestamp }: UserMessageBubbleProps) {
  return (
    <div className="flex gap-3 justify-end">
      <div className="max-w-[80%]">
        <div className="bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-2xl rounded-tl-sm p-4">
          <p className="text-sm leading-relaxed">{content}</p>
        </div>
        <div className="text-[10px] text-muted-foreground mt-1 text-left">{timestamp}</div>
      </div>
      <Avatar className="h-8 w-8 border border-emerald-500/30">
        <AvatarFallback className="bg-emerald-500/20">
          <User className="w-4 h-4 text-emerald-400" />
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
