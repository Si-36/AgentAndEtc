// AG-UI Event Types for Letta-style Agent Interface
export type AgentStatus =
  | "idle"
  | "thinking"
  | "searching"
  | "tool_calling"
  | "writing"
  | "waiting_approval"
  | "paused"
  | "error"
  | "complete"

export interface ThoughtStep {
  id: string
  timestamp: number
  elapsed: string
  type:
    | "received"
    | "memory_load"
    | "memory_search"
    | "thinking"
    | "tool_call"
    | "tool_result"
    | "memory_edit"
    | "drafting"
    | "complete"
  icon: string
  content: string
  details?: string[]
  expandable?: boolean
  expanded?: boolean
  // For tool calls
  toolName?: string
  toolQuery?: string
  toolStatus?: "pending" | "executing" | "success" | "error"
  toolResult?: string
  toolCost?: number
  // For memory edits
  memoryBlock?: string
  memoryAction?: "insert" | "update" | "delete"
  memoryContent?: string
  requiresApproval?: boolean
  approved?: boolean | null
}

export interface AgentInstance {
  id: string
  name: string
  nameEn: string
  model: string
  icon: string
  color: string
  bgColor: string
  borderColor: string
  status: AgentStatus
  startTime?: number
  elapsed?: string
  thoughts: ThoughtStep[]
  confidence: number
  response?: string
  tokenUsage: {
    input: number
    output: number
    limit: number
  }
  cost: number
}

export interface MemoryBlock {
  id: string
  type: "human" | "persona" | "company" | "working" | "archival"
  title: string
  icon: string
  content: Record<string, string | string[]>
  lastUpdated: string
  updatedBy: string
  size: number
  maxSize: number
  editable: boolean
  pendingEdit?: {
    field: string
    oldValue: string
    newValue: string
    byAgent: string
  }
}

export interface WorkingMemory {
  id: string
  timestamp: string
  relativeTime: string
  type: "decision" | "email" | "meeting" | "research" | "chat"
  title: string
  summary: string
  relevance: number
  isActive: boolean
  isExcluded: boolean
}

export interface ArchivalResult {
  id: string
  title: string
  date: string
  score: number
  preview: string
  type: string
}

export interface Chat {
  id: string
  title: string
  preview: string
  date: string
  messageCount: number
  isActive: boolean
}

export interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: string
  agentId?: string
  isStreaming?: boolean
}

export interface AgentPrompt {
  id: string
  agentId: string
  systemPrompt: string
  temperature: number
  topP: number
  maxTokens: number
  tools: {
    id: string
    name: string
    enabled: boolean
  }[]
  memoryEditMode: "require_approval" | "auto_approve" | "disabled"
}

export interface SystemSettings {
  transparencyLevel: "maximum" | "high" | "medium" | "minimal"
  autoSave: boolean
  createMemoriesFromDecisions: boolean
  updateCoreMemory: boolean
  saveInterval: number
  requireMemoryApproval: boolean
  showInnerMonologue: boolean
  showToolDetails: boolean
  showTokenUsage: boolean
  allowMidProcessIntervention: boolean
  costLimitPerMessage: number
}
