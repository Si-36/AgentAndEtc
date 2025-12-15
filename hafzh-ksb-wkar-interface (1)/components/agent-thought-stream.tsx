"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toPersianNum, formatPersianCurrency } from "@/lib/persian-utils"
import type { AgentInstance, ThoughtStep } from "@/types/agent"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChevronDown,
  ChevronUp,
  Pause,
  Play,
  X,
  Check,
  XCircle,
  Edit3,
  Copy,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Save,
  Loader2,
  Eye,
} from "lucide-react"

interface AgentThoughtStreamProps {
  agent: AgentInstance
  onPause: () => void
  onResume: () => void
  onCancel: () => void
  onApproveMemoryEdit: (stepId: string, approved: boolean) => void
  onEditMemory: (stepId: string) => void
  isPaused: boolean
}

function ThoughtStepItem({
  step,
  onApprove,
  onReject,
  onEdit,
}: {
  step: ThoughtStep
  onApprove?: () => void
  onReject?: () => void
  onEdit?: () => void
}) {
  const [expanded, setExpanded] = useState(step.expanded ?? false)

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative">
      {/* Timeline line */}
      <div className="absolute right-[11px] top-6 bottom-0 w-px bg-border/50" />

      <div className="flex gap-3">
        {/* Timeline dot */}
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs z-10 ${
            step.type === "tool_call" && step.toolStatus === "executing"
              ? "bg-amber-500/20 border-2 border-amber-500"
              : step.type === "memory_edit" && step.requiresApproval
                ? "bg-purple-500/20 border-2 border-purple-500"
                : "bg-muted border border-border"
          }`}
        >
          {step.icon}
        </div>

        {/* Content */}
        <div className="flex-1 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-muted-foreground font-mono">[{step.elapsed}]</span>
            <span className="text-sm text-foreground">{step.content}</span>
          </div>

          {/* Expandable details */}
          {step.details && step.expandable && (
            <Collapsible open={expanded} onOpenChange={setExpanded}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 px-2 gap-1 text-xs text-muted-foreground">
                  {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  {expanded ? "بستن" : "جزئیات"}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-2 p-3 rounded-lg bg-muted/30 border border-border/50 text-sm space-y-1">
                  {step.details.map((detail, i) => (
                    <div key={i} className="text-muted-foreground text-xs leading-relaxed">
                      {detail}
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Non-expandable details */}
          {step.details && !step.expandable && (
            <div className="mt-2 p-3 rounded-lg bg-muted/30 border border-border/50 text-sm space-y-1">
              {step.details.map((detail, i) => (
                <div key={i} className="text-muted-foreground text-xs leading-relaxed">
                  {detail}
                </div>
              ))}
            </div>
          )}

          {/* Tool call card */}
          {step.type === "tool_call" && (
            <div className="mt-2 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-amber-400">Tool: {step.toolName}</span>
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${
                      step.toolStatus === "executing"
                        ? "border-amber-500/50 text-amber-400"
                        : step.toolStatus === "success"
                          ? "border-emerald-500/50 text-emerald-400"
                          : "border-red-500/50 text-red-400"
                    }`}
                  >
                    {step.toolStatus === "executing" && <Loader2 className="w-3 h-3 ml-1 animate-spin" />}
                    {step.toolStatus === "executing"
                      ? "در حال اجرا..."
                      : step.toolStatus === "success"
                        ? "موفق"
                        : "خطا"}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1">
                  <Eye className="w-3 h-3" />
                  جزئیات کامل
                </Button>
              </div>
              <div className="text-xs text-muted-foreground font-mono bg-background/50 p-2 rounded">
                Query: "{step.toolQuery}"
              </div>
              {step.toolResult && <div className="mt-2 text-xs text-emerald-400">✅ {step.toolResult}</div>}
            </div>
          )}

          {/* Memory edit approval */}
          {step.type === "memory_edit" && step.requiresApproval && (
            <div className="mt-2 p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-purple-400">ویرایش حافظه: {step.memoryBlock}</span>
                <Badge variant="outline" className="text-[10px] border-purple-500/50 text-purple-400">
                  نیاز به تأیید
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground mb-3 p-2 rounded bg-background/50">
                <span className="text-purple-300">اضافه کردن:</span> "{step.memoryContent}"
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="h-7 px-3 text-xs gap-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                  onClick={onApprove}
                >
                  <Check className="w-3 h-3" />
                  تأیید
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-3 text-xs gap-1 text-red-400 hover:bg-red-500/10"
                  onClick={onReject}
                >
                  <XCircle className="w-3 h-3" />
                  رد
                </Button>
                <Button size="sm" variant="ghost" className="h-7 px-3 text-xs gap-1" onClick={onEdit}>
                  <Edit3 className="w-3 h-3" />
                  ویرایش
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function AgentThoughtStream({
  agent,
  onPause,
  onResume,
  onCancel,
  onApproveMemoryEdit,
  onEditMemory,
  isPaused,
}: AgentThoughtStreamProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const progressPercent = (agent.tokenUsage.output / agent.tokenUsage.limit) * 100

  const statusLabels: Record<string, string> = {
    idle: "آماده",
    thinking: "در حال تفکر...",
    searching: "در حال جستجو...",
    tool_calling: "فراخوانی ابزار...",
    writing: "در حال نوشتن...",
    waiting_approval: "منتظر تأیید",
    paused: "متوقف شده",
    error: "خطا",
    complete: "تکمیل شد",
  }

  return (
    <Card className={`border-2 ${agent.borderColor} ${agent.bgColor} overflow-hidden`}>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl ${agent.bgColor} border ${agent.borderColor} flex items-center justify-center text-lg`}
            >
              {agent.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-bold ${agent.color}`}>{agent.name}</span>
                <Badge variant="outline" className="text-[10px]">
                  {agent.model}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{statusLabels[agent.status]}</span>
                {agent.elapsed && <span>• {agent.elapsed}</span>}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            {isPaused ? (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-400" onClick={onResume}>
                <Play className="w-4 h-4" />
              </Button>
            ) : (
              <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-400" onClick={onPause}>
                <Pause className="w-4 h-4" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <CardContent className="p-4 pt-2">
              {/* Thought Process Label */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-muted-foreground">▼ فرآیند تفکر (زنده):</span>
                {agent.status !== "complete" && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-emerald-400">streaming</span>
                  </span>
                )}
              </div>

              {/* Thoughts Timeline */}
              <ScrollArea className="h-[280px] pr-2">
                <div className="space-y-0">
                  {agent.thoughts.map((step) => (
                    <ThoughtStepItem
                      key={step.id}
                      step={step}
                      onApprove={() => onApproveMemoryEdit(step.id, true)}
                      onReject={() => onApproveMemoryEdit(step.id, false)}
                      onEdit={() => onEditMemory(step.id)}
                    />
                  ))}
                </div>
              </ScrollArea>

              {/* Token Usage */}
              <div className="mt-4 pt-3 border-t border-border/50">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground">مصرف توکن:</span>
                  <span className="font-mono">
                    {toPersianNum(agent.tokenUsage.output)} / {toPersianNum(agent.tokenUsage.limit)}
                  </span>
                </div>
                <Progress value={progressPercent} className="h-1.5" />
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>هزینه: {formatPersianCurrency(agent.cost)}</span>
                  <span>ورودی: {toPersianNum(agent.tokenUsage.input)} توکن</span>
                </div>
              </div>

              {/* Confidence */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">اطمینان:</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${agent.color.replace("text-", "bg-")}`}
                    style={{ width: `${agent.confidence}%` }}
                  />
                </div>
                <span className="text-xs font-medium">{toPersianNum(agent.confidence)}%</span>
              </div>

              {/* Response (if complete) */}
              {agent.response && (
                <div className="mt-4 p-3 rounded-lg bg-background/50 border border-border/50">
                  <div className="text-xs font-medium text-muted-foreground mb-2">▼ پاسخ نهایی:</div>
                  <p className="text-sm leading-relaxed">{agent.response}</p>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                      <ThumbsDown className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                      <RefreshCw className="w-3 h-3" />
                      بازتولید
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                      <Save className="w-3 h-3" />
                      ذخیره در حافظه
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                      <Copy className="w-3 h-3" />
                      کپی
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
