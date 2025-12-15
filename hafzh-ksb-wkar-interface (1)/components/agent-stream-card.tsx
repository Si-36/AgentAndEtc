"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import {
  BarChart3,
  Lightbulb,
  Shield,
  Gavel,
  Search,
  Calculator,
  FileText,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { formatTime, formatTokens, formatPercent } from "@/lib/persian"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { Agent, AgentStep } from "@/types"

const icons: Record<string, React.ElementType> = {
  BarChart3,
  Lightbulb,
  Shield,
  Gavel,
}

const toolIcons: Record<string, React.ElementType> = {
  web_search: Search,
  calculator: Calculator,
  file_read: FileText,
}

interface AgentStreamCardProps {
  agent: Agent
  isExpanded?: boolean
  onToggle?: () => void
}

export function AgentStreamCard({ agent, isExpanded = true, onToggle }: AgentStreamCardProps) {
  const Icon = icons[agent.icon] || BarChart3
  const isActive = agent.status === "thinking" || agent.status === "working"

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl overflow-hidden transition-all duration-300",
        `agent-${agent.color}`,
        isActive && "agent-glow",
      )}
      style={{
        background: "linear-gradient(135deg, oklch(0.14 0.02 260) 0%, oklch(0.1 0.015 260) 100%)",
        borderRight: `3px solid var(--${agent.color})`,
      }}
    >
      {/* Header */}
      <div className="p-3 flex items-center justify-between cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <div
            className={cn("w-10 h-10 rounded-lg flex items-center justify-center", isActive && "animate-pulse")}
            style={{
              background: `oklch(from var(--${agent.color}) l c h / 0.2)`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: `var(--${agent.color})` }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{agent.name}</span>
              {isActive && (
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: `var(--${agent.color})` }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: `var(--${agent.color})` }}
                  />
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant="outline" className="text-[10px] h-4 px-1.5 bg-transparent">
                {agent.model}
              </Badge>
              <span className="text-[10px] text-muted-foreground">{formatTokens(agent.tokens)} tokens</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          {agent.status === "complete" && (
            <Badge className="bg-success/20 text-success border-success/30 gap-1">
              <Check className="w-3 h-3" />
              تکمیل
            </Badge>
          )}
          {agent.status === "error" && (
            <Badge className="bg-error/20 text-error border-error/30 gap-1">
              <AlertCircle className="w-3 h-3" />
              خطا
            </Badge>
          )}
          {isActive && (
            <Badge
              className="gap-1 border"
              style={{
                background: `oklch(from var(--${agent.color}) l c h / 0.15)`,
                borderColor: `oklch(from var(--${agent.color}) l c h / 0.3)`,
                color: `var(--${agent.color})`,
              }}
            >
              <Loader2 className="w-3 h-3 animate-spin" />
              در حال کار
            </Badge>
          )}
        </div>
      </div>

      {/* Activity Stream */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-2">
              {/* Steps */}
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {agent.steps.map((step, idx) => (
                  <StepItem key={step.id} step={step} isLast={idx === agent.steps.length - 1} />
                ))}
                {agent.steps.length === 0 && isActive && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>آماده‌سازی...</span>
                  </div>
                )}
              </div>

              {/* Confidence Meter */}
              {agent.confidence > 0 && (
                <div className="pt-2 border-t border-border/50">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">اطمینان</span>
                    <span className="font-medium" style={{ color: `var(--${agent.color})` }}>
                      {formatPercent(agent.confidence)}
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `var(--${agent.color})` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${agent.confidence}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function StepItem({ step, isLast }: { step: AgentStep; isLast: boolean }) {
  const ToolIcon = step.toolName ? toolIcons[step.toolName] || Search : null

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-2 text-xs"
    >
      <span className="text-muted-foreground w-10 flex-shrink-0 font-mono text-[10px]">{formatTime(step.time)}</span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          {step.status === "running" && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
          {step.status === "complete" && <Check className="w-3 h-3 text-success" />}
          {step.status === "error" && <AlertCircle className="w-3 h-3 text-error" />}

          <span
            className={cn(
              step.status === "complete" && "text-muted-foreground",
              step.status === "running" && isLast && "stream-text",
            )}
          >
            {step.message}
          </span>
        </div>

        {/* Tool Call Details */}
        {step.type === "tool" && (
          <div className="mt-1 p-2 tool-call rounded-lg">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              {ToolIcon && <ToolIcon className="w-3 h-3" />}
              <span className="font-mono">{step.toolName}</span>
              {step.toolInput && (
                <>
                  <span>:</span>
                  <span className="text-foreground">{step.toolInput}</span>
                </>
              )}
            </div>
            {step.toolOutput && <div className="mt-1 text-[10px] text-success">→ {step.toolOutput}</div>}
          </div>
        )}

        {/* Progress Bar */}
        {step.progress !== undefined && step.status === "running" && (
          <div className="mt-1.5">
            <Progress value={step.progress} className="h-1" />
          </div>
        )}
      </div>
    </motion.div>
  )
}
