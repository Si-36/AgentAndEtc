"use client"

import { useState, useRef, type KeyboardEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Paperclip, Lightbulb, Settings, Send, StopCircle, Play, Pause, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toPersianNumber } from "@/lib/persian-utils"

interface ChatInputProps {
  onSend: (message: string) => void
  isProcessing: boolean
  onPause?: () => void
  onResume?: () => void
  onCancel?: () => void
  isPaused?: boolean
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
  marketing: [
    "بهترین استراتژی بازاریابی دیجیتال چیست؟",
    "چگونه برند را تقویت کنیم؟",
    "کدام کانال‌های بازاریابی مؤثرترند؟",
  ],
}

export function ChatInput({ onSend, isProcessing, onPause, onResume, onCancel, isPaused }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [showExamples, setShowExamples] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showVoice, setShowVoice] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const charCount = message.length
  const tokenEstimate = Math.ceil(charCount / 4)

  const handleSend = () => {
    if (message.trim() && !isProcessing) {
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
      <div className="sticky bottom-0 bg-background border-t p-4">
        {/* Processing Controls */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex items-center justify-center gap-2 mb-3"
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 bg-transparent"
                onClick={isPaused ? onResume : onPause}
              >
                {isPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
                {isPaused ? "ادامه" : "توقف موقت"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-destructive bg-transparent"
                onClick={onCancel}
              >
                <StopCircle className="h-3.5 w-3.5" />
                لغو
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 bg-transparent"
                onClick={() => setShowSettings(true)}
              >
                <Settings className="h-3.5 w-3.5" />
                تنظیمات لحظه‌ای
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                <Plus className="h-3.5 w-3.5" />
                افزودن اطلاعات
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="سؤال استراتژیک خود را بپرسید... (مثلاً: آیا باید شعبه جدید در دبی باز کنیم؟)"
            className="min-h-[80px] max-h-[160px] resize-none pe-24 pb-10 text-sm"
            disabled={isProcessing}
          />

          {/* Character/Token Counter */}
          <div className="absolute bottom-2 start-3 text-xs text-muted-foreground">
            {toPersianNumber(charCount)} کاراکتر (تقریباً {toPersianNumber(tokenEstimate)} توکن)
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-2 end-2 flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowVoice(true)}
              disabled={isProcessing}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={isProcessing}>
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowExamples(true)}
              disabled={isProcessing}
            >
              <Lightbulb className="h-4 w-4" />
            </Button>
            <Button size="icon" className="h-8 w-8" onClick={handleSend} disabled={!message.trim() || isProcessing}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Keyboard Hint */}
        <div className="flex justify-center mt-2">
          <p className="text-[10px] text-muted-foreground">Enter ارسال • Shift+Enter خط جدید</p>
        </div>
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
              <TabsTrigger value="marketing" className="flex-1 text-xs">
                بازاریابی
              </TabsTrigger>
            </TabsList>
            {Object.entries(exampleQuestions).map(([category, questions]) => (
              <TabsContent key={category} value={category} className="space-y-2 mt-4">
                {questions.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => selectExample(question)}
                    className="w-full p-3 text-start text-sm rounded-lg border hover:bg-accent transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Voice Input Modal */}
      <Dialog open={showVoice} onOpenChange={setShowVoice}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">ضبط صدا</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-8">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center transition-all",
                isRecording
                  ? "bg-error/10 text-error animate-pulse-glow"
                  : "bg-primary/10 text-primary hover:bg-primary/20",
              )}
            >
              <Mic className="h-10 w-10" />
            </button>
            <p className="mt-4 text-sm text-muted-foreground">
              {isRecording ? "در حال ضبط..." : "برای شروع کلیک کنید"}
            </p>
            {isRecording && (
              <div className="mt-4 w-full max-w-[200px] h-8 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary/50 animate-shimmer" />
              </div>
            )}
          </div>
          <div className="flex justify-center gap-2">
            {isRecording && (
              <>
                <Button variant="outline" onClick={() => setIsRecording(false)}>
                  <StopCircle className="h-4 w-4 me-2" />
                  توقف
                </Button>
                <Button>تأیید و ارسال</Button>
              </>
            )}
            <Button variant="ghost" onClick={() => setShowVoice(false)}>
              لغو
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Live Settings Modal */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>تنظیمات لحظه‌ای</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm">خلاقیت</label>
                <Badge variant="outline">{toPersianNumber(5)}</Badge>
              </div>
              <Slider defaultValue={[5]} max={10} min={1} step={1} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm">جزئیات</label>
                <Badge variant="outline">{toPersianNumber(7)}</Badge>
              </div>
              <Slider defaultValue={[7]} max={10} min={1} step={1} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm">سرعت</label>
                <Badge variant="outline">متوسط</Badge>
              </div>
              <Slider defaultValue={[5]} max={10} min={1} step={1} />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>سریع</span>
                <span>عمیق</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">تغییرات روی نماینده بعدی اعمال می‌شود</p>
        </DialogContent>
      </Dialog>
    </>
  )
}
