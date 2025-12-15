import type { User, Conversation, MemoryBlock, Alert } from "@/types"

export const mockUser: User = {
  id: "1",
  name: "سارا احمدی",
  role: "مدیرعامل",
  avatar: "/professional-woman-diverse.png",
  company: {
    name: "تجارت پردیس",
    industry: "تجارت الکترونیک",
    size: 15,
    founded: 1398,
  },
}

export const mockConversations: Conversation[] = [
  {
    id: "1",
    title: "توسعه به دبی",
    lastMessage: "تحلیل بازار دبی تکمیل شد",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    messageCount: 12,
    isActive: true,
    hasDebate: true,
  },
  {
    id: "2",
    title: "استخدام مدیر فروش",
    lastMessage: "سه کاندیدای نهایی معرفی شدند",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    messageCount: 8,
    isActive: false,
    hasDebate: false,
  },
  {
    id: "3",
    title: "کاهش هزینه‌ها",
    lastMessage: "برنامه صرفه‌جویی تصویب شد",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    messageCount: 15,
    isActive: false,
    hasDebate: true,
  },
]

export const mockMemories: MemoryBlock[] = [
  {
    id: "1",
    type: "working",
    category: "decision",
    title: "تصمیم: توسعه به دبی",
    content: "تصمیم گرفته شد که شعبه دبی با بودجه ۵۰۰ هزار دلار راه‌اندازی شود. نتیجه: ۲ مشتری بزرگ جذب شد.",
    date: new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000),
    tokens: 250,
    result: "success",
    isActive: true,
  },
  {
    id: "2",
    type: "working",
    category: "meeting",
    title: "جلسه با سرمایه‌گذار",
    content: "جلسه با صندوق سرمایه‌گذاری الف. پیشنهاد ۲ میلیون دلار با ۱۵٪ سهام.",
    date: new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000),
    tokens: 180,
  },
  {
    id: "3",
    type: "working",
    category: "insight",
    title: "تحلیل رقبا",
    content: "رقیب اصلی قیمت‌ها را ۱۰٪ افزایش داد. فرصت برای جذب مشتری.",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    tokens: 120,
  },
]

export const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "deadline",
    priority: "high",
    title: "مهلت تمدید قرارداد",
    description: "قرارداد با شرکت تأمین‌کننده اصلی تا ۵ روز دیگر منقضی می‌شود.",
    confidence: 100,
    date: new Date(),
    actionable: true,
  },
  {
    id: "2",
    type: "opportunity",
    priority: "medium",
    title: "فرصت: رقیب قیمت را افزایش داد",
    description: "شرکت رقیب قیمت‌ها را ۱۰٪ افزایش داده. فرصت مناسب برای جذب مشتری.",
    confidence: 85,
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    actionable: true,
  },
  {
    id: "3",
    type: "insight",
    priority: "low",
    title: "روند بازار",
    description: "تقاضا برای محصولات دیجیتال در منطقه خلیج فارس ۲۵٪ افزایش یافته.",
    confidence: 78,
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    actionable: false,
  },
]

export const mockStats = {
  decisions: 234,
  accuracy: 87,
}
