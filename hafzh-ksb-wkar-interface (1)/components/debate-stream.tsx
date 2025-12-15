"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Brain,
  Bot,
  Scale,
  Gavel,
  Check,
  Loader2,
  ChevronDown,
  ChevronUp,
  Eye,
  X,
  Shield,
  Rocket,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toPersian, formatTime, formatPercent, formatTokens } from "@/lib/persian"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { AgentStreamCard } from "@/components/agent-stream-card"
import type { StreamState, MemoryBlock } from "@/types"

interface DebateStreamProps {
  question: string
  state: StreamState
  memories?: MemoryBlock[]
  onExcludeMemory?: (id: string) => void
}

const stageIcons: Record<string, React.ElementType> = {
  "query-analysis": Search,
  "memory-search": Brain,
  "agent-activation": Bot,
  calibration: Scale,
  synthesis: Gavel,
}

export function DebateStream({ question, state, memories = [], onExcludeMemory }: DebateStreamProps) {
  const [expandedStages, setExpandedStages] = useState<Set<string>>(new Set(["agent-activation", "synthesis"]))

  const toggleStage = (stageId: string) => {
    setExpandedStages((prev) => {
      const next = new Set(prev)
      if (next.has(stageId)) next.delete(stageId)
      else next.add(stageId)
      return next
    })
  }

  const currentRound = state.rounds[state.rounds.length - 1]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, oklch(0.12 0.02 260) 0%, oklch(0.08 0.015 260) 100%)",
          border: "1px solid oklch(0.22 0.02 260)",
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center justify-between mb-3">
            <Badge className="gap-1.5 bg-primary/20 text-primary border-primary/30">
              <Gavel className="h-3.5 w-3.5" />
              تحلیل استراتژیک
            </Badge>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                {formatTime(state.elapsedTime)}
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                {formatTokens(state.totalTokens)}
              </Badge>
            </div>
          </div>
          <p className="font-medium">{question}</p>
          {state.isStreaming && (
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
              <Loader2 className="h-3 w-3 animate-spin" />
              سیستم چند‌نمایندگی در حال تحلیل...
            </p>
          )}
        </div>

        {/* Stages */}
        <div className="divide-y divide-border/30">
          {state.stages.map((stage) => {
            const Icon = stageIcons[stage.id] || Search
            const isExpanded = expandedStages.has(stage.id)
            const isRunning = stage.status === "running"
            const isComplete = stage.status === "complete"

            return (
              <Collapsible key={stage.id} open={isExpanded} onOpenChange={() => toggleStage(stage.id)}>
                <CollapsibleTrigger className="w-full">
                  <div className={cn("flex items-center justify-between p-4 transition-colors", "hover:bg-accent/30")}>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          isComplete && "bg-success/20 text-success",
                          isRunning && "bg-primary/20 text-primary animate-pulse",
                          stage.status === "pending" && "bg-muted text-muted-foreground",
                        )}
                      >
                        {isRunning ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : isComplete ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </div>
                      <div className="text-start">
                        <p className="font-medium text-sm">{stage.name}</p>
                        {stage.endTime && (
                          <p className="text-xs text-muted-foreground">
                            {formatTime(stage.endTime - (stage.startTime || 0))}
                          </p>
                        )}
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-4 pb-4">
                    {/* Agent Activation Stage */}
                    {stage.id === "agent-activation" && currentRound && (
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                        {currentRound.agents.map((agent) => (
                          <AgentStreamCard key={agent.id} agent={agent} />
                        ))}
                      </div>
                    )}

                    {/* Memory Search Stage */}
                    {stage.id === "memory-search" && memories.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs text-success mb-2">{toPersian(memories.length)} خاطره مرتبط یافت شد</p>
                        {memories.slice(0, 3).map((memory) => (
                          <div
                            key={memory.id}
                            className={cn("p-3 rounded-lg memory-block", memory.isActive && "active")}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium">{memory.title}</p>
                                <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                                  {memory.content}
                                </p>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-destructive"
                                  onClick={() => onExcludeMemory?.(memory.id)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Calibration Stage */}
                    {stage.id === "calibration" && currentRound && (
                      <div className="space-y-4">
                        {/* Consensus Gauge */}
                        <div className="flex items-center gap-4">
                          <div className="relative w-20 h-20">
                            <svg className="w-full h-full -rotate-90">
                              <circle
                                cx="40"
                                cy="40"
                                r="35"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="6"
                                className="text-muted"
                              />
                              <circle
                                cx="40"
                                cy="40"
                                r="35"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="6"
                                strokeDasharray={`${currentRound.consensus * 2.2} 220`}
                                className={cn(currentRound.consensus >= 75 ? "text-success" : "text-warning")}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-lg font-bold">{formatPercent(currentRound.consensus)}</span>
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">میزان توافق</p>
                            <p className="text-sm text-muted-foreground">
                              {currentRound.consensus >= 75
                                ? "توافق بالا → انتقال به ترکیب نهایی"
                                : "توافق متوسط → دور دوم فعال می‌شود"}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Synthesis Stage */}
                    {stage.id === "synthesis" && isComplete && (
                      <div className="space-y-4">
                        {/* Summary */}
                        <div className="p-4 rounded-xl bg-accent/30 border border-accent">
                          <p className="text-sm font-medium mb-2">خلاصه اجرایی</p>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            با توجه به تحلیل‌های سه‌گانه، توسعه به دبی در سال ۱۴۰۴ توصیه می‌شود. بهترین استراتژی، شروع با
                            دفتر نمایندگی کوچک و توسعه تدریجی است.
                          </p>
                        </div>

                        {/* Action Plans */}
                        <Tabs defaultValue="conservative" className="w-full">
                          <TabsList className="w-full justify-start">
                            <TabsTrigger value="conservative" className="gap-1.5">
                              <Shield className="h-3.5 w-3.5" />
                              محافظه‌کارانه
                            </TabsTrigger>
                            <TabsTrigger value="balanced" className="gap-1.5">
                              <Scale className="h-3.5 w-3.5" />
                              متعادل
                            </TabsTrigger>
                            <TabsTrigger value="aggressive" className="gap-1.5">
                              <Rocket className="h-3.5 w-3.5" />
                              تهاجمی
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="conservative" className="mt-4">
                            <ActionPlanContent
                              success={90}
                              timeline="۳ ماه"
                              budget="۵۰ میلیون تومان"
                              risk="کم"
                              recommended
                            />
                          </TabsContent>
                          <TabsContent value="balanced" className="mt-4">
                            <ActionPlanContent success={70} timeline="۶ ماه" budget="۱۵۰ میلیون تومان" risk="متوسط" />
                          </TabsContent>
                          <TabsContent value="aggressive" className="mt-4">
                            <ActionPlanContent success={50} timeline="۱۲ ماه" budget="۵۰۰ میلیون تومان" risk="بالا" />
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

function ActionPlanContent({
  success,
  timeline,
  budget,
  risk,
  recommended,
}: {
  success: number
  timeline: string
  budget: string
  risk: string
  recommended?: boolean
}) {
  return (
    <div className="space-y-4">
      {recommended && <Badge className="bg-success/20 text-success border-success/30">پیشنهاد شده</Badge>}

      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 rounded-lg bg-accent/30">
          <p className="text-xs text-muted-foreground mb-1">احتمال موفقیت</p>
          <p
            className={cn(
              "text-xl font-bold",
              success >= 80 && "text-success",
              success >= 60 && success < 80 && "text-warning",
              success < 60 && "text-error",
            )}
          >
            {formatPercent(success)}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-accent/30">
          <p className="text-xs text-muted-foreground mb-1">زمان‌بندی</p>
          <p className="text-xl font-bold">{timeline}</p>
        </div>
        <div className="p-3 rounded-lg bg-accent/30">
          <p className="text-xs text-muted-foreground mb-1">بودجه</p>
          <p className="text-xl font-bold">{budget}</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium mb-2">مراحل اجرایی</p>
        <ol className="space-y-1.5 text-sm text-muted-foreground list-decimal list-inside">
          <li>تحقیق بازار محلی</li>
          <li>استخدام مشاور بومی</li>
          <li>راه‌اندازی دفتر نمایندگی</li>
          <li>جذب مشتریان آزمایشی</li>
          <li>ارزیابی و توسعه</li>
        </ol>
      </div>
    </div>
  )
}
