"use client"

import { useState, useRef, type KeyboardEvent } from "react"
import { motion } from "framer-motion"
import { Mic, Paperclip, Sparkles, Send, Command } from "lucide-react"
import { cn } from "@/lib/utils"
import { toPersian } from "@/lib/persian"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ChatInputModernProps {
  onSend: (message: string) => void
  disabled?: boolean
}

const exampleQuestions = {
  strategy: [
    "آیا باید شعبه جدید در دبی باز کنیم؟",
    "بهترین استراتژی برای ورود به بازار جدید چیست؟",
    "چگونه می‌توانیم سهم بازار را افزایش دهیم؟",
  ],
  financial: [
    "چطور می‌توانیم هزینه‌ها را ۲۰٪ کاهش دهیم؟",
    "آیا این سرمایه‌گذاری ارزشش را دارد؟",
    "بهترین روش تأمین مالی برای توسعه چیست؟",
  ],
  hr: [
    "چگونه می‌توانیم استعدادهای برتر جذب کنیم؟",
    "آیا باید تیم را بازسازی کنیم؟",
    "بهترین ساختار سازمانی برای رشد چیست؟",
  ],
}

export function ChatInputModern({ onSend, disabled }: ChatInputModernProps) {
  const [message, setMessage] = useState("")
  const [showExamples, setShowExamples] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim())
      setMessage("")
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const selectExample = (question: string) => {
    setMessage(question)
    setShowExamples(false)
    textareaRef.current?.focus()
  }

  return (
    <>
      <div className="p-4">
        <motion.div
          className={cn("relative rounded-2xl transition-all duration-300", isFocused ? "ring-2 ring-primary/50" : "")}
          style={{
            background: "linear-gradient(135deg, oklch(0.14 0.02 260) 0%, oklch(0.1 0.015 260) 100%)",
            border: "1px solid oklch(0.25 0.02 260)",
          }}
        >
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="سؤال استراتژیک خود را بپرسید..."
            className="min-h-[100px] max-h-[200px] resize-none border-0 bg-transparent focus-visible:ring-0 text-sm pe-4 pb-14"
            disabled={disabled}
          />

          {/* Bottom Bar */}
          <div className="absolute bottom-0 inset-x-0 p-3 flex items-center justify-between border-t border-border/30">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-accent/50" disabled={disabled}>
                <Mic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-accent/50" disabled={disabled}>
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-lg hover:bg-accent/50"
                onClick={() => setShowExamples(true)}
                disabled={disabled}
              >
                <Sparkles className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground hidden sm:inline-flex items-center gap-1">
                <Command className="h-3 w-3" />
                Enter ارسال
              </span>
              <Button
                size="sm"
                className="h-8 px-4 rounded-lg gap-1.5"
                onClick={handleSend}
                disabled={!message.trim() || disabled}
              >
                <Send className="h-3.5 w-3.5" />
                ارسال
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Token estimate */}
        <p className="text-center text-[10px] text-muted-foreground mt-2">
          {toPersian(message.length)} کاراکتر • تقریباً {toPersian(Math.ceil(message.length / 4))} توکن
        </p>
      </div>

      {/* Examples Modal */}
      <Dialog open={showExamples} onOpenChange={setShowExamples}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>نمونه سؤالات</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="strategy">
            <TabsList className="w-full">
              <TabsTrigger value="strategy" className="flex-1 text-xs">
                استراتژی
              </TabsTrigger>
              <TabsTrigger value="financial" className="flex-1 text-xs">
                مالی
              </TabsTrigger>
              <TabsTrigger value="hr" className="flex-1 text-xs">
                منابع انسانی
              </TabsTrigger>
            </TabsList>
            {Object.entries(exampleQuestions).map(([category, questions]) => (
              <TabsContent key={category} value={category} className="space-y-2 mt-4">
                {questions.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => selectExample(question)}
                    className="w-full p-3 text-start text-sm rounded-xl border border-border/50 hover:bg-accent/50 hover:border-primary/30 transition-all"
                  >
                    {question}
                  </button>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
