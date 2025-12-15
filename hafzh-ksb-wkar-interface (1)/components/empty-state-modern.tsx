"use client"

import { motion } from "framer-motion"
import { Brain, Sparkles, TrendingUp, Shield, ArrowLeft } from "lucide-react"
import { toPersian } from "@/lib/persian"

interface EmptyStateModernProps {
  onSelectQuestion: (question: string) => void
  stats: {
    decisions: number
    accuracy: number
  }
}

const features = [
  {
    icon: Brain,
    title: "حافظه هوشمند",
    description: "یادگیری از تصمیمات قبلی شما",
  },
  {
    icon: TrendingUp,
    title: "تحلیل چندبعدی",
    description: "بررسی از زوایای مختلف توسط ۳ نماینده",
  },
  {
    icon: Shield,
    title: "ارزیابی ریسک",
    description: "شناسایی خطرات و فرصت‌ها",
  },
]

const exampleQuestions = [
  "آیا باید شعبه جدید در دبی باز کنیم؟",
  "بهترین استراتژی برای جذب سرمایه چیست؟",
  "چگونه هزینه‌ها را بهینه کنیم؟",
]

export function EmptyStateModern({ onSelectQuestion, stats }: EmptyStateModernProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Logo Animation */}
        <motion.div
          className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative"
          animate={{
            boxShadow: [
              "0 0 0 0 oklch(0.7 0.18 200 / 0)",
              "0 0 0 20px oklch(0.7 0.18 200 / 0.1)",
              "0 0 0 0 oklch(0.7 0.18 200 / 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <Brain className="w-12 h-12 text-primary" />
          <motion.div
            className="absolute -top-1 -end-1"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <Sparkles className="w-6 h-6 text-warning" />
          </motion.div>
        </motion.div>

        <h1 className="text-2xl font-bold mb-2">
          <span className="gradient-text">حافظه کسب‌وکار</span> آماده کمک به شماست
        </h1>
        <p className="text-muted-foreground mb-8">سؤالات استراتژیک خود را بپرسید و تصمیمات هوشمندانه بگیرید</p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mb-8">
          <div>
            <p className="text-3xl font-bold gradient-text">{toPersian(stats.decisions)}</p>
            <p className="text-xs text-muted-foreground">تصمیم تحلیل شده</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <p className="text-3xl font-bold text-success">{toPersian(stats.accuracy)}٪</p>
            <p className="text-xs text-muted-foreground">دقت سیستم</p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-2xl glass"
            >
              <feature.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">{feature.title}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Example Questions */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground mb-3">شروع کنید با:</p>
          {exampleQuestions.map((question, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              onClick={() => onSelectQuestion(question)}
              className="w-full p-3 text-start text-sm rounded-xl border border-border/50 hover:bg-accent/50 hover:border-primary/30 transition-all flex items-center justify-between group"
            >
              <span>{question}</span>
              <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
