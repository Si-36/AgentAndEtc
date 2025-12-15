"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Header } from "@/components/header"
import { LeftPanel } from "@/components/left-panel"
import { InspectorPanel } from "@/components/inspector-panel"
import { MultiAgentDebate } from "@/components/multi-agent-debate"
import { ChatInputArea } from "@/components/chat-input-area"
import { UserMessageBubble } from "@/components/user-message-bubble"
import { EmptyState } from "@/components/empty-state"
import { InjectContextModal } from "@/components/inject-context-modal"
import {
  mockAgents,
  mockMemoryBlocks,
  mockWorkingMemory,
  mockArchivalResults,
  mockChats,
  mockAgentPrompts,
  mockSettings,
} from "@/lib/mock-agent-data"
import type { AgentInstance, MemoryBlock, WorkingMemory, AgentPrompt, SystemSettings } from "@/types/agent"
import { formatPersianTime } from "@/lib/persian-utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export default function BusinessMemoryPage() {
  // Panel state
  const [leftCollapsed, setLeftCollapsed] = useState(false)
  const [activeChat, setActiveChat] = useState("1")

  // Messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "user",
      content: "آیا باید شعبه دبی باز کنیم؟",
      timestamp: formatPersianTime(new Date()),
    },
  ])

  // Agent state - Clone mock data so we can modify it
  const [agents, setAgents] = useState<AgentInstance[]>(mockAgents)
  const [pausedAgents, setPausedAgents] = useState<Set<string>>(new Set())
  const [allPaused, setAllPaused] = useState(false)
  const [isProcessing, setIsProcessing] = useState(true)

  // Memory state
  const [memoryBlocks, setMemoryBlocks] = useState<MemoryBlock[]>(mockMemoryBlocks)
  const [workingMemory, setWorkingMemory] = useState<WorkingMemory[]>(mockWorkingMemory)
  const [archivalResults] = useState(mockArchivalResults)
  const [searchingArchival] = useState(true)
  const [archivalQuery] = useState("Dubai + expansion + budget + market")

  // Prompt & Settings state
  const [agentPrompts, setAgentPrompts] = useState<AgentPrompt[]>(mockAgentPrompts)
  const [settings, setSettings] = useState<SystemSettings>(mockSettings)

  // UI state
  const [showInjectModal, setShowInjectModal] = useState(false)
  const [hasStarted, setHasStarted] = useState(true)

  // Stats
  const [totalTokens, setTotalTokens] = useState(5650)
  const [totalCost, setTotalCost] = useState(0.056)

  const scrollRef = useRef<HTMLDivElement>(null)

  // Simulate live streaming updates
  useEffect(() => {
    if (!isProcessing || allPaused) return

    const interval = setInterval(() => {
      // Update token count
      setTotalTokens((prev) => prev + Math.floor(Math.random() * 50))
      setTotalCost((prev) => prev + Math.random() * 0.002)

      // Update agent elapsed times
      setAgents((prevAgents) =>
        prevAgents.map((agent) => {
          if (pausedAgents.has(agent.id) || agent.status === "complete") return agent

          const elapsed = agent.startTime ? Date.now() - agent.startTime : 0
          const seconds = (elapsed / 1000).toFixed(1)

          return {
            ...agent,
            elapsed: `${seconds}s`,
            tokenUsage: {
              ...agent.tokenUsage,
              output: Math.min(agent.tokenUsage.output + Math.floor(Math.random() * 20), agent.tokenUsage.limit),
            },
          }
        }),
      )
    }, 500)

    return () => clearInterval(interval)
  }, [isProcessing, allPaused, pausedAgents])

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, agents])

  // Handlers
  const handleSendMessage = useCallback((content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: formatPersianTime(new Date()),
    }
    setMessages((prev) => [...prev, newMessage])
    setIsProcessing(true)
    setHasStarted(true)

    // Reset agents for new processing
    setAgents(mockAgents.map((a) => ({ ...a, startTime: Date.now(), thoughts: a.thoughts.slice(0, 2) })))
    setPausedAgents(new Set())
    setAllPaused(false)
  }, [])

  const handleNewChat = useCallback(() => {
    setMessages([])
    setHasStarted(false)
    setIsProcessing(false)
    setAgents(mockAgents.map((a) => ({ ...a, status: "idle", thoughts: [] })))
  }, [])

  const handlePauseAgent = useCallback((agentId: string) => {
    setPausedAgents((prev) => new Set([...prev, agentId]))
    setAgents((prev) => prev.map((a) => (a.id === agentId ? { ...a, status: "paused" } : a)))
  }, [])

  const handleResumeAgent = useCallback((agentId: string) => {
    setPausedAgents((prev) => {
      const next = new Set(prev)
      next.delete(agentId)
      return next
    })
    setAgents((prev) => prev.map((a) => (a.id === agentId ? { ...a, status: "thinking" } : a)))
  }, [])

  const handleCancelAgent = useCallback((agentId: string) => {
    setAgents((prev) => prev.map((a) => (a.id === agentId ? { ...a, status: "error" } : a)))
  }, [])

  const handlePauseAll = useCallback(() => {
    setAllPaused(true)
    setPausedAgents(new Set(agents.map((a) => a.id)))
    setAgents((prev) => prev.map((a) => ({ ...a, status: "paused" })))
  }, [agents])

  const handleResumeAll = useCallback(() => {
    setAllPaused(false)
    setPausedAgents(new Set())
    setAgents((prev) => prev.map((a) => ({ ...a, status: "thinking" })))
  }, [])

  const handleCancelAll = useCallback(() => {
    setIsProcessing(false)
    setAgents((prev) => prev.map((a) => ({ ...a, status: "error" })))
  }, [])

  const handleApproveMemoryEdit = useCallback((agentId: string, stepId: string, approved: boolean) => {
    setAgents((prev) =>
      prev.map((agent) => {
        if (agent.id !== agentId) return agent
        return {
          ...agent,
          thoughts: agent.thoughts.map((t) => (t.id === stepId ? { ...t, approved, requiresApproval: false } : t)),
        }
      }),
    )

    // If approved, update the memory block
    if (approved) {
      setMemoryBlocks((prev) =>
        prev.map((block) => {
          if (block.pendingEdit) {
            const newContent = { ...block.content }
            newContent[block.pendingEdit.field] = block.pendingEdit.newValue
            return { ...block, content: newContent, pendingEdit: undefined, lastUpdated: "الان" }
          }
          return block
        }),
      )
    } else {
      // Clear pending edit
      setMemoryBlocks((prev) => prev.map((block) => ({ ...block, pendingEdit: undefined })))
    }
  }, [])

  const handleEditMemory = useCallback((agentId: string, stepId: string) => {
    // Open memory edit modal or inline edit
    console.log("Edit memory", agentId, stepId)
  }, [])

  const handleEditMemoryBlock = useCallback((blockId: string, content: Record<string, string | string[]>) => {
    setMemoryBlocks((prev) => prev.map((b) => (b.id === blockId ? { ...b, content, lastUpdated: "الان" } : b)))
  }, [])

  const handleApproveBlockEdit = useCallback((blockId: string) => {
    setMemoryBlocks((prev) =>
      prev.map((block) => {
        if (block.id !== blockId || !block.pendingEdit) return block
        const newContent = { ...block.content }
        newContent[block.pendingEdit.field] = block.pendingEdit.newValue
        return { ...block, content: newContent, pendingEdit: undefined, lastUpdated: "الان" }
      }),
    )
  }, [])

  const handleRejectBlockEdit = useCallback((blockId: string) => {
    setMemoryBlocks((prev) => prev.map((b) => (b.id === blockId ? { ...b, pendingEdit: undefined } : b)))
  }, [])

  const handleExcludeWorkingMemory = useCallback((id: string) => {
    setWorkingMemory((prev) => prev.map((m) => (m.id === id ? { ...m, isExcluded: true, isActive: false } : m)))
  }, [])

  const handleAddArchivalToContext = useCallback(
    (id: string) => {
      // Add archival result to working memory
      const result = archivalResults.find((r) => r.id === id)
      if (result) {
        const newMemory: WorkingMemory = {
          id: `archival-${id}`,
          timestamp: "now",
          relativeTime: "الان",
          type: "research",
          title: result.title,
          summary: result.preview,
          relevance: Math.round(result.score * 100),
          isActive: true,
          isExcluded: false,
        }
        setWorkingMemory((prev) => [newMemory, ...prev])
      }
    },
    [archivalResults],
  )

  const handleUpdatePrompt = useCallback((prompt: AgentPrompt) => {
    setAgentPrompts((prev) => prev.map((p) => (p.id === prompt.id ? prompt : p)))
  }, [])

  const handleUpdateSettings = useCallback((newSettings: SystemSettings) => {
    setSettings(newSettings)
  }, [])

  const handleInjectContext = useCallback((context: string) => {
    // Add injected context to working memory
    const newMemory: WorkingMemory = {
      id: `injected-${Date.now()}`,
      timestamp: "now",
      relativeTime: "الان",
      type: "chat",
      title: "زمینه تزریق شده",
      summary: context,
      relevance: 100,
      isActive: true,
      isExcluded: false,
    }
    setWorkingMemory((prev) => [newMemory, ...prev])
  }, [])

  const handleStartChat = useCallback(() => {
    setHasStarted(true)
  }, [])

  const activeAgent = agents.find((a) => a.status === "thinking" || a.status === "tool_calling") || agents[0]

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <Header totalTokens={totalTokens} totalCost={totalCost} isConnected={true} />

      {/* Main Content with Resizable Panels */}
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Panel - Chat List */}
        <ResizablePanel
          defaultSize={leftCollapsed ? 4 : 15}
          minSize={4}
          maxSize={20}
          collapsible
          onCollapse={() => setLeftCollapsed(true)}
          onExpand={() => setLeftCollapsed(false)}
        >
          <LeftPanel
            chats={mockChats}
            activeChat={activeChat}
            onChatSelect={setActiveChat}
            onNewChat={handleNewChat}
            isCollapsed={leftCollapsed}
            onToggle={() => setLeftCollapsed(!leftCollapsed)}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Center Panel - Main Chat/Debate */}
        <ResizablePanel defaultSize={55} minSize={40}>
          <div className="flex flex-col h-full">
            {!hasStarted || messages.length === 0 ? (
              <EmptyState onStartChat={handleStartChat} />
            ) : (
              <>
                {/* Messages & Debate Area */}
                <ScrollArea className="flex-1">
                  <div ref={scrollRef} className="p-4 md:p-6 space-y-6 pb-32">
                    {/* User Messages */}
                    {messages.map((message) => (
                      <div key={message.id}>
                        {message.role === "user" && (
                          <UserMessageBubble content={message.content} timestamp={message.timestamp} />
                        )}
                      </div>
                    ))}

                    {/* Multi-Agent Debate */}
                    {isProcessing && (
                      <MultiAgentDebate
                        question={messages[messages.length - 1]?.content || ""}
                        agents={agents}
                        onPauseAgent={handlePauseAgent}
                        onResumeAgent={handleResumeAgent}
                        onCancelAgent={handleCancelAgent}
                        onPauseAll={handlePauseAll}
                        onResumeAll={handleResumeAll}
                        onCancelAll={handleCancelAll}
                        onApproveMemoryEdit={handleApproveMemoryEdit}
                        onEditMemory={handleEditMemory}
                        onInjectContext={() => setShowInjectModal(true)}
                        pausedAgents={pausedAgents}
                        allPaused={allPaused}
                      />
                    )}
                  </div>
                </ScrollArea>

                {/* Chat Input */}
                <ChatInputArea
                  onSend={handleSendMessage}
                  isProcessing={isProcessing}
                  onVoiceInput={() => {}}
                  onAttach={() => {}}
                  onSuggestions={() => {}}
                />
              </>
            )}
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel - Inspector */}
        <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
          <InspectorPanel
            activeAgent={activeAgent}
            agents={agents}
            memoryBlocks={memoryBlocks}
            workingMemory={workingMemory}
            archivalResults={archivalResults}
            agentPrompts={agentPrompts}
            settings={settings}
            onEditMemoryBlock={handleEditMemoryBlock}
            onApproveMemoryEdit={handleApproveBlockEdit}
            onRejectMemoryEdit={handleRejectBlockEdit}
            onExcludeWorkingMemory={handleExcludeWorkingMemory}
            onAddArchivalToContext={handleAddArchivalToContext}
            onUpdatePrompt={handleUpdatePrompt}
            onUpdateSettings={handleUpdateSettings}
            searchingArchival={searchingArchival}
            archivalQuery={archivalQuery}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Inject Context Modal */}
      <InjectContextModal
        open={showInjectModal}
        onClose={() => setShowInjectModal(false)}
        onInject={handleInjectContext}
      />
    </div>
  )
}
