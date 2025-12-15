"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { LeftSidebar } from "@/components/left-sidebar"
import { ChatHeader } from "@/components/chat-header"
import { MessageBubble } from "@/components/message-bubble"
import { DebateCard } from "@/components/debate-card"
import { RightPanel } from "@/components/right-panel"
import { ChatInput } from "@/components/chat-input"
import { StatusBar } from "@/components/status-bar"
import { EmptyState } from "@/components/empty-state"
import { MobileDrawer } from "@/components/mobile-drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  mockUser,
  mockConversations,
  mockMemories,
  mockAlerts,
  mockDebateStages,
  mockActionPlans,
  mockStats,
} from "@/lib/mock-data"
import type { Message } from "@/types/business-memory"

export default function BusinessMemoryPage() {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [activeConversationId, setActiveConversationId] = useState<string | null>("1")
  const [chatTitle, setChatTitle] = useState("توسعه به دبی")
  const [tokenCount, setTokenCount] = useState(1234)
  const [cost, setCost] = useState(0.04)
  const [isOnline, setIsOnline] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "user",
      content: "آیا باید در سال ۱۴۰۴ شعبه دبی باز کنیم؟",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: "2",
      type: "debate",
      content: "",
      timestamp: new Date(Date.now() - 4 * 60 * 1000),
      debate: mockDebateStages,
      plans: mockActionPlans,
    },
  ])

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsProcessing(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content:
          "بر اساس تحلیل حافظه شرکت و اطلاعات فعلی بازار، پیشنهاد می‌کنم که یک بررسی عمیق‌تر در مورد این موضوع انجام دهیم. آیا می‌خواهید یک تحلیل استراتژیک کامل با مشارکت سه نماینده تخصصی انجام شود؟",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsProcessing(false)
      setTokenCount((prev) => prev + 150)
      setCost((prev) => prev + 0.01)
    }, 2000)
  }

  const handleNewChat = () => {
    setMessages([])
    setActiveConversationId(null)
    setChatTitle("گفتگوی جدید")
    setTokenCount(0)
    setCost(0)
  }

  const handleSelectQuestion = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left Sidebar */}
      <LeftSidebar
        user={mockUser}
        conversations={mockConversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewChat={handleNewChat}
        isCollapsed={leftSidebarCollapsed}
        onToggleCollapse={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <ChatHeader
          title={chatTitle}
          onTitleChange={setChatTitle}
          tokenCount={tokenCount}
          maxTokens={8000}
          cost={cost}
          isOnline={isOnline}
          onMenuClick={() => setMobileDrawerOpen(true)}
        />

        {/* Messages Area */}
        <ScrollArea ref={scrollRef} className="flex-1">
          {messages.length === 0 ? (
            <EmptyState onSelectQuestion={handleSelectQuestion} totalDecisions={mockStats.decisionsTracked} />
          ) : (
            <div className="p-4 space-y-6 pb-4">
              {messages.map((message) =>
                message.type === "debate" && message.debate ? (
                  <DebateCard
                    key={message.id}
                    question="آیا باید در سال ۱۴۰۴ شعبه دبی باز کنیم؟"
                    stages={message.debate}
                    plans={message.plans || []}
                    totalTime={8.3}
                    totalCost={0.04}
                  />
                ) : (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    userAvatar={mockUser.avatar}
                    userName={mockUser.name}
                  />
                ),
              )}

              {/* Streaming indicator */}
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                  <span>در حال پردازش...</span>
                </motion.div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <ChatInput
          onSend={handleSendMessage}
          isProcessing={isProcessing}
          isPaused={isPaused}
          onPause={() => setIsPaused(true)}
          onResume={() => setIsPaused(false)}
          onCancel={() => setIsProcessing(false)}
        />

        {/* Status Bar */}
        <StatusBar
          isOnline={isOnline}
          agentsReady={3}
          memorySize={mockStats.memorySize}
          lastBackup={mockStats.lastBackup}
          systemAccuracy={mockStats.systemAccuracy}
          accuracyChange={mockStats.accuracyChange}
        />
      </main>

      {/* Right Panel */}
      <RightPanel
        user={mockUser}
        memories={mockMemories}
        alerts={mockAlerts}
        stats={mockStats}
        isCollapsed={rightPanelCollapsed}
        onToggleCollapse={() => setRightPanelCollapsed(!rightPanelCollapsed)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        user={mockUser}
        conversations={mockConversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewChat={handleNewChat}
      />
    </div>
  )
}
