"use client"

import { motion } from "framer-motion"
import { Brain, Sparkles, MessageCircle, BarChart3, Target, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toPersianNumber } from "@/lib/persian-utils"

interface EmptyStateProps {
  onSelectQuestion: (question: string) => void
  totalDecisions: number
}

const quickQuestions = [
  "آیا باید شعبه جدید در دبی باز کنیم؟",
  "چطور می‌توانیم هزینه‌ها را کاهش دهیم؟",
  "بهترین استراتژی برای جذب مشتری چیست؟",
  "آیا این سرمایه‌گذاری منطقی است؟",
]

export function EmptyState({ onSelectQuestion, totalDecisions }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg text-center">
        {/* Icon Animation */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mx-auto mb-6"
        >
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Brain className="w-12 h-12 text-primary" />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -top-2 -end-2"
          >
            <Sparkles className="w-6 h-6 text-warning" />
          </motion.div>
        </motion.div>

        {/* Title & Description */}
        <h1 className="text-2xl font-bold mb-2">حافظه کسب‌وکار آماده کمک به شماست</h1>
        <p className="text-muted-foreground mb-6">
          سؤالات استراتژیک خود را بپرسید و از تحلیل هوشمند چندنمایندگی بهره‌مند شوید
        </p>

        {/* Quick Stats */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Badge variant="outline" className="gap-1.5 py-1.5 px-3">
            <BarChart3 className="h-3.5 w-3.5" />
            {toPersianNumber(totalDecisions)} تصمیم تحلیل شده
          </Badge>
          <Badge variant="outline" className="gap-1.5 py-1.5 px-3">
            <Target className="h-3.5 w-3.5" />
            ۸۵٪ نرخ موفقیت
          </Badge>
        </div>

        {/* Example Questions */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            <Lightbulb className="h-4 w-4" />
            چند پیشنهاد برای شروع:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickQuestions.map((question, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onSelectQuestion(question)}
                className="px-4 py-2 rounded-full border bg-card hover:bg-accent text-sm transition-colors"
              >
                {question}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8">
          <Button size="lg" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            شروع گفتگو
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
