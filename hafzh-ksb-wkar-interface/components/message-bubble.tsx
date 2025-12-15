"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ThumbsUp, ThumbsDown, Copy, RefreshCw, Edit2, Trash2, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatPersianDate } from "@/lib/persian-utils"
import type { Message } from "@/types/business-memory"

interface MessageBubbleProps {
  message: Message
  userAvatar?: string
  userName?: string
}

export function MessageBubble({ message, userAvatar, userName }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null)

  const isUser = message.type === "user"

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-3 group", isUser ? "flex-row-reverse" : "flex-row")}
    >
      {/* Avatar */}
      <Avatar className={cn("h-8 w-8 mt-1", isUser ? "ring-2 ring-primary/20" : "ring-2 ring-muted")}>
        {isUser ? (
          <>
            <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">{userName?.charAt(0) || "ش"}</AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src="/ai-robot-assistant.jpg" alt="AI" />
            <AvatarFallback className="bg-muted text-muted-foreground text-xs">AI</AvatarFallback>
          </>
        )}
      </Avatar>

      {/* Message Content */}
      <div className={cn("flex flex-col max-w-[80%]", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 shadow-sm",
            isUser ? "bg-primary text-primary-foreground rounded-se-sm" : "bg-card border rounded-ss-sm",
          )}
        >
          {message.isStreaming ? (
            <span className="inline-flex items-center">
              {message.content}
              <span className="w-2 h-4 bg-current ms-0.5 animate-typing" />
            </span>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {/* Timestamp & Actions */}
        <div className={cn("flex items-center gap-2 mt-1.5 px-1", isUser ? "flex-row-reverse" : "flex-row")}>
          <span className="text-[10px] text-muted-foreground">{formatPersianDate(message.timestamp)}</span>

          {/* User message actions */}
          {isUser && (
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Edit2 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}

          {/* AI message actions */}
          {!isUser && !message.isStreaming && (
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-6 w-6", feedback === "up" && "text-success")}
                onClick={() => setFeedback("up")}
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-6 w-6", feedback === "down" && "text-error")}
                onClick={() => setFeedback("down")}
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopy}>
                {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
