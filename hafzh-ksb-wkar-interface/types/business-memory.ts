export interface User {
  id: string
  name: string
  role: string
  avatar: string
  company: Company
  preferences: string[]
}

export interface Company {
  name: string
  industry: string
  size: number
  founded: number
}

export interface Conversation {
  id: string
  title: string
  lastMessage: string
  date: Date
  messageCount: number
  isActive: boolean
  type: "simple" | "debate"
  completed?: boolean
}

export interface Memory {
  id: string
  type: "decision" | "meeting" | "insight" | "email"
  title: string
  content: string
  date: Date
  result?: "success" | "failure"
  relevanceScore: number
  isActive: boolean
}

export interface Alert {
  id: string
  priority: "high" | "medium" | "low"
  title: string
  description: string
  confidence: number
  date: Date
  icon: string
}

export interface AgentLog {
  time: number
  message: string
  status: "pending" | "active" | "complete" | "error"
  detail?: string
  progress?: number
}

export interface Agent {
  id: string
  name: string
  model: string
  icon: string
  color: string
  status: "idle" | "active" | "complete" | "error"
  confidence: number
  logs: AgentLog[]
  scenarios?: Scenario[]
}

export interface Scenario {
  type: "pessimistic" | "realistic" | "optimistic"
  label: string
}

export interface DebateStage {
  id: string
  title: string
  icon: string
  status: "pending" | "active" | "complete"
  time?: number
  items?: StageItem[]
  searchStatus?: string
  memories?: Memory[]
  tokenCount?: number
  agents?: Agent[]
  consensus?: number
  needsSecondRound?: boolean
  matrix?: number[][]
  synthesisLogs?: { time: number; message: string; progress?: number }[]
  summary?: string
  metaConfidence?: number
}

export interface StageItem {
  label: string
  done: boolean
  isRoute?: boolean
}

export interface ActionPlan {
  id: string
  title: string
  icon: string
  successRate: number
  timeline: string
  budget: string
  riskLevel: "low" | "medium" | "high"
  recommended?: boolean
  steps: string[]
  resources: string[]
  assumptions: string[]
}

export interface Message {
  id: string
  type: "user" | "assistant" | "debate"
  content: string
  timestamp: Date
  isStreaming?: boolean
  debate?: DebateStage[]
  plans?: ActionPlan[]
}
