export interface User {
  id: string
  name: string
  role: string
  avatar: string
  company: {
    name: string
    industry: string
    size: number
    founded: number
  }
}

export interface MemoryBlock {
  id: string
  type: "core" | "working" | "archival"
  category: "user" | "company" | "decision" | "insight" | "meeting"
  title: string
  content: string
  date: Date
  tokens: number
  isActive?: boolean
  isEditing?: boolean
  relevance?: number
  result?: "success" | "failure" | "pending"
}

export interface AgentStep {
  id: string
  time: number
  type: "thinking" | "tool" | "output" | "error"
  message: string
  detail?: string
  progress?: number
  status: "pending" | "running" | "complete" | "error"
  toolName?: string
  toolInput?: string
  toolOutput?: string
}

export interface Agent {
  id: string
  name: string
  nameEn: string
  model: string
  icon: string
  color: "analyst" | "strategist" | "critic" | "arbiter"
  status: "idle" | "thinking" | "working" | "complete" | "error"
  confidence: number
  steps: AgentStep[]
  output?: string
  tokens: number
}

export interface DebateRound {
  id: string
  number: number
  agents: Agent[]
  consensus: number
  complete: boolean
}

export interface ProcessingStage {
  id: string
  name: string
  nameEn: string
  status: "pending" | "running" | "complete"
  startTime?: number
  endTime?: number
  data?: any
}

export interface StreamState {
  isStreaming: boolean
  isPaused: boolean
  currentStage: string
  stages: ProcessingStage[]
  rounds: DebateRound[]
  totalTokens: number
  totalCost: number
  elapsedTime: number
}

export interface Message {
  id: string
  type: "user" | "assistant" | "debate"
  content: string
  timestamp: Date
  streamState?: StreamState
}

export interface Conversation {
  id: string
  title: string
  lastMessage: string
  date: Date
  messageCount: number
  isActive: boolean
  hasDebate: boolean
}

export interface Alert {
  id: string
  type: "opportunity" | "warning" | "deadline" | "insight"
  priority: "high" | "medium" | "low"
  title: string
  description: string
  confidence: number
  date: Date
  actionable: boolean
}
