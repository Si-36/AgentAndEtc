"use client"

import { motion } from "framer-motion"
import { formatRelative } from "@/lib/persian"
import type { Message } from "@/types"

interface UserMessageProps {
  message: Message
  userName: string
}

export function UserMessage({ message, userName }: UserMessageProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
      <div className="max-w-[80%]">
        <div
          className="p-4 rounded-2xl rounded-tl-md"
          style={{
            background: "linear-gradient(135deg, var(--primary) 0%, oklch(0.6 0.2 200) 100%)",
          }}
        >
          <p className="text-sm text-primary-foreground leading-relaxed">{message.content}</p>
        </div>
        <div className="flex items-center justify-end gap-2 mt-1.5 px-1">
          <span className="text-[10px] text-muted-foreground">{formatRelative(message.timestamp)}</span>
          <span className="text-[10px] text-muted-foreground">{userName}</span>
        </div>
      </div>
    </motion.div>
  )
}
