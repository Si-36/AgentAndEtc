"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Mic, Paperclip, Lightbulb, Send, Slash, Sparkles, Calculator, Search, FileText, Brain } from "lucide-react"

interface ChatInputAreaProps {
  onSend: (message: string) => void
  isProcessing: boolean
  onVoiceInput: () => void
  onAttach: () => void
  onSuggestions: () => void
}

const slashCommands = [
  { id: "analyze", label: "/تحلیل", description: "تحلیل عمیق یک موضوع", icon: Search },
  { id: "calculate", label: "/محاسبه", description: "محاسبات مالی", icon: Calculator },
  { id: "summarize", label: "/خلاصه", description: "خلاصه‌سازی اطلاعات", icon: FileText },
  { id: "strategy", label: "/استراتژی", description: "برنامه‌ریزی استراتژیک", icon: Sparkles },
  { id: "memory", label: "/حافظه", description: "جستجو در حافظه", icon: Brain },
]

export function ChatInputArea({ onSend, isProcessing, onVoiceInput, onAttach, onSuggestions }: ChatInputAreaProps) {
  const [message, setMessage] = useState("")
  const [showCommands, setShowCommands] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [message])

  // Detect slash commands
  useEffect(() => {
    setShowCommands(message.startsWith("/"))
  }, [message])

  const handleSend = () => {
    if (message.trim() && !isProcessing) {
      onSend(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const insertCommand = (command: string) => {
    setMessage(command + " ")
    setShowCommands(false)
    textareaRef.current?.focus()
  }

  return (
    <div className="p-4 border-t border-border/50 bg-card/50 backdrop-blur-xl">
      {/* Slash Commands Dropdown */}
      {showCommands && (
        <div className="mb-2 p-2 rounded-lg bg-muted/50 border border-border/50">
          <div className="text-xs text-muted-foreground mb-2">دستورات سریع:</div>
          <div className="space-y-1">
            {slashCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => insertCommand(cmd.label)}
                className="w-full p-2 rounded-lg hover:bg-muted/50 flex items-center gap-3 text-right transition-colors"
              >
                <cmd.icon className="w-4 h-4 text-emerald-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{cmd.label}</div>
                  <div className="text-xs text-muted-foreground">{cmd.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-2">
        {/* Left Actions */}
        <div className="flex items-center gap-1 pb-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={onVoiceInput}
          >
            <Mic className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={onAttach}
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={onSuggestions}
          >
            <Lightbulb className="w-5 h-5" />
          </Button>
        </div>

        {/* Textarea */}
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="پیام خود را بنویسید... (از / برای دستورات استفاده کنید)"
            className="min-h-[48px] max-h-[200px] resize-none pr-4 pl-12 py-3 bg-muted/30 border-border/50 focus:border-emerald-500/50"
            disabled={isProcessing}
          />

          {/* Slash hint */}
          <button
            onClick={() => setMessage("/")}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded hover:bg-muted/50 text-muted-foreground"
          >
            <Slash className="w-4 h-4" />
          </button>
        </div>

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!message.trim() || isProcessing}
          className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/20"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-muted-foreground">
        <span>Enter = ارسال</span>
        <span>Shift+Enter = خط جدید</span>
        <span>/ = دستورات</span>
        <span>Ctrl+P = توقف</span>
      </div>
    </div>
  )
}
