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
  ChevronDown,
  ChevronUp,
  Eye,
  X,
  BarChart3,
  Lightbulb,
  AlertTriangle,
  Shield,
  Rocket,
  Star,
  Clock,
  DollarSign,
  ThumbsUp,
  ThumbsDown,
  Save,
  Download,
  RefreshCw,
  MessageCircle,
  Check,
  Frown,
  Meh,
  Smile,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { toPersianNumber, formatDuration, formatPercentage, formatCurrency } from "@/lib/persian-utils"
import type { DebateStage, ActionPlan, Memory, Agent } from "@/types/business-memory"

interface DebateCardProps {
  question: string
  stages: DebateStage[]
  plans: ActionPlan[]
  totalTime: number
  totalCost: number
}

const stageIcons: Record<string, React.ElementType> = {
  search: Search,
  brain: Brain,
  bot: Bot,
  scale: Scale,
  gavel: Gavel,
}

const agentIcons: Record<string, React.ElementType> = {
  "bar-chart": BarChart3,
  lightbulb: Lightbulb,
  "alert-triangle": AlertTriangle,
}

const planIcons: Record<string, React.ElementType> = {
  shield: Shield,
  scale: Scale,
  rocket: Rocket,
}

const scenarioIcons: Record<string, React.ElementType> = {
  pessimistic: Frown,
  realistic: Meh,
  optimistic: Smile,
}

export function DebateCard({ question, stages, plans, totalTime, totalCost }: DebateCardProps) {
  const [expandedStages, setExpandedStages] = useState<Set<string>>(new Set(["synthesis"]))

  const toggleStage = (stageId: string) => {
    setExpandedStages((prev) => {
      const next = new Set(prev)
      if (next.has(stageId)) {
        next.delete(stageId)
      } else {
        next.add(stageId)
      }
      return next
    })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <Card className="border-2 shadow-lg overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-gradient-to-l from-primary/5 to-transparent pb-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Badge className="bg-primary/10 text-primary border-primary/20 gap-1.5 px-3 py-1">
                <Gavel className="h-3.5 w-3.5" />
                تحلیل استراتژیک
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                {formatDuration(totalTime)}
              </Badge>
            </div>
            <p className="text-base font-medium">{question}</p>
            <p className="text-sm text-muted-foreground">سیستم چندنمایندگی در حال مشاوره...</p>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Stages */}
          <div className="divide-y">
            {stages.map((stage) => (
              <StageSection
                key={stage.id}
                stage={stage}
                isExpanded={expandedStages.has(stage.id)}
                onToggle={() => toggleStage(stage.id)}
                plans={stage.id === "synthesis" ? plans : undefined}
              />
            ))}
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-muted/30 border-t">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  کل زمان: {formatDuration(totalTime)}
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4" />
                  هزینه: {formatCurrency(totalCost)}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                  <ThumbsUp className="h-3.5 w-3.5" />
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                  <ThumbsDown className="h-3.5 w-3.5" />
                </Button>
                <Separator orientation="vertical" className="h-6" />
                <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                  <Save className="h-3.5 w-3.5" />
                  ذخیره
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                  <Download className="h-3.5 w-3.5" />
                  صادرکردن
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                  <RefreshCw className="h-3.5 w-3.5" />
                  تحلیل مجدد
                </Button>
                <Button size="sm" className="gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5" />
                  سؤال پیگیری
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface StageSectionProps {
  stage: DebateStage
  isExpanded: boolean
  onToggle: () => void
  plans?: ActionPlan[]
}

function StageSection({ stage, isExpanded, onToggle, plans }: StageSectionProps) {
  const Icon = stageIcons[stage.icon] || Search

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                stage.status === "complete"
                  ? "bg-success/10 text-success"
                  : stage.status === "active"
                    ? "bg-primary/10 text-primary animate-pulse-glow"
                    : "bg-muted text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
            </div>
            <div className="text-start">
              <p className="font-medium text-sm">{stage.title}</p>
              {stage.time && <p className="text-xs text-muted-foreground">{formatDuration(stage.time)}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {stage.status === "complete" && <Check className="h-4 w-4 text-success" />}
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="px-4 pb-4">
          {/* Query Analysis Stage */}
          {stage.id === "query-analysis" && stage.items && (
            <div className="space-y-2 ps-11">
              {stage.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn("flex items-center gap-2 text-sm", item.isRoute && "text-primary font-medium")}
                >
                  {item.done ? (
                    <Check className="h-4 w-4 text-success" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-muted-foreground animate-pulse" />
                  )}
                  <span>{item.isRoute ? `← ${item.label}` : item.label}</span>
                </motion.div>
              ))}
            </div>
          )}

          {/* Memory Retrieval Stage */}
          {stage.id === "memory-retrieval" && stage.memories && (
            <div className="space-y-3 ps-11">
              <p className="text-sm text-success">{stage.searchStatus}</p>
              <div className="space-y-2">
                {stage.memories.map((memory) => (
                  <MemoryCard key={memory.id} memory={memory} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                {toPersianNumber(stage.memories.length)} خاطره بارگذاری شد ({toPersianNumber(stage.tokenCount || 0)}{" "}
                توکن)
              </p>
            </div>
          )}

          {/* Agent Activation Stage */}
          {stage.id === "agent-activation" && stage.agents && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ps-11">
              {stage.agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          )}

          {/* Confidence Calibration Stage */}
          {stage.id === "confidence-calibration" && (
            <div className="space-y-4 ps-11">
              {/* Matrix */}
              {stage.matrix && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="p-2"></th>
                        <th className="p-2 text-center">تحلیلگر</th>
                        <th className="p-2 text-center">استراتژیست</th>
                        <th className="p-2 text-center">منتقد</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["تحلیلگر", "استراتژیست", "منتقد"].map((name, i) => (
                        <tr key={name}>
                          <td className="p-2 font-medium">{name}</td>
                          {stage.matrix![i].map((value, j) => (
                            <td key={j} className="p-2">
                              <div
                                className={cn(
                                  "w-full h-8 rounded flex items-center justify-center text-xs font-medium",
                                  value >= 80
                                    ? "bg-success/20 text-success"
                                    : value >= 60
                                      ? "bg-warning/20 text-warning"
                                      : "bg-error/20 text-error",
                                )}
                              >
                                {formatPercentage(value)}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

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
                      strokeDasharray={`${(stage.consensus || 0) * 2.2} 220`}
                      className={cn((stage.consensus || 0) >= 75 ? "text-success" : "text-warning")}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold">{formatPercentage(stage.consensus || 0)}</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium">میزان توافق</p>
                  <p className="text-sm text-muted-foreground">
                    {stage.needsSecondRound ? "توافق متوسط → دور دوم فعال می‌شود" : "توافق بالا → انتقال به تصمیم نهایی"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Synthesis Stage */}
          {stage.id === "synthesis" && (
            <div className="space-y-4 ps-11">
              {/* Synthesis Logs */}
              {stage.synthesisLogs && (
                <div className="space-y-1.5">
                  {stage.synthesisLogs.map((log, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground w-12">{formatDuration(log.time)}</span>
                      <span className={cn(i === stage.synthesisLogs!.length - 1 && "text-success")}>
                        {i === stage.synthesisLogs!.length - 1 ? "✓" : "→"} {log.message}
                      </span>
                      {log.progress && (
                        <div className="flex-1 max-w-[150px]">
                          <Progress value={log.progress} className="h-1.5" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Summary */}
              {stage.summary && (
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <p className="text-sm font-medium mb-2">خلاصه اجرایی</p>
                  <p className="text-sm leading-relaxed">{stage.summary}</p>
                </div>
              )}

              {/* Action Plans */}
              {plans && plans.length > 0 && (
                <div className="space-y-3">
                  <p className="font-medium">طرح‌های عملیاتی</p>
                  <Tabs defaultValue={plans[0].id} className="w-full">
                    <TabsList className="w-full justify-start overflow-x-auto">
                      {plans.map((plan) => {
                        const PlanIcon = planIcons[plan.icon] || Shield
                        return (
                          <TabsTrigger key={plan.id} value={plan.id} className="gap-1.5">
                            <PlanIcon className="h-3.5 w-3.5" />
                            {plan.title}
                            {plan.recommended && <Star className="h-3 w-3 text-warning" />}
                          </TabsTrigger>
                        )
                      })}
                    </TabsList>
                    {plans.map((plan) => (
                      <TabsContent key={plan.id} value={plan.id}>
                        <PlanContent plan={plan} />
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              )}

              {/* Meta Confidence */}
              {stage.metaConfidence && (
                <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{formatPercentage(stage.metaConfidence)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">اطمینان سیستم به این مشاوره</p>
                    <Progress value={stage.metaConfidence} className="h-2 mt-1 w-48" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function MemoryCard({ memory }: { memory: Memory }) {
  return (
    <div
      className={cn(
        "p-3 rounded-lg border bg-card text-sm",
        memory.isActive && "border-primary ring-2 ring-primary/20 animate-pulse-glow",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {memory.isActive && (
            <Badge className="mb-1.5 bg-success/10 text-success border-success/20 text-[10px]">در حال استفاده</Badge>
          )}
          <p className="font-medium truncate">{memory.title}</p>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{memory.content}</p>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Eye className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function AgentCard({ agent }: { agent: Agent }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = agentIcons[agent.icon] || BarChart3

  return (
    <Card className={cn("agent-" + agent.color, "overflow-hidden")}>
      <CardHeader className="p-3 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                `bg-${agent.color}/10 text-${agent.color}`,
              )}
              style={{
                backgroundColor: `var(--${agent.color})`,
                opacity: 0.15,
                color: `var(--${agent.color})`,
              }}
            >
              <Icon className="h-4 w-4" style={{ color: `var(--${agent.color})` }} />
            </div>
            <div>
              <p className="font-medium text-sm">{agent.name}</p>
              <Badge variant="outline" className="text-[10px] h-4 px-1">
                {agent.model}
              </Badge>
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-[10px]",
              agent.status === "complete" ? "border-success/50 text-success" : "border-primary/50 text-primary",
            )}
          >
            {agent.status === "complete" ? "تکمیل" : "در حال کار..."}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-3 pt-0 space-y-3">
        {/* Activity Log */}
        <div className="space-y-1 text-xs max-h-32 overflow-y-auto">
          {agent.logs.map((log, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-muted-foreground w-10 flex-shrink-0">{formatDuration(log.time)}</span>
              <span className={cn(log.status === "complete" && i === agent.logs.length - 1 && "text-success")}>
                {log.status === "complete" && i === agent.logs.length - 1 ? "✓" : "→"} {log.message}
              </span>
            </div>
          ))}
        </div>

        {/* Scenarios */}
        {agent.scenarios && (
          <div className="flex gap-2">
            {agent.scenarios.map((scenario) => {
              const ScenarioIcon = scenarioIcons[scenario.type]
              return (
                <Badge key={scenario.type} variant="outline" className="gap-1 text-[10px]">
                  <ScenarioIcon className="h-3 w-3" />
                  {scenario.label}
                </Badge>
              )
            })}
          </div>
        )}

        {/* Confidence Meter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">اطمینان</span>
            <span
              className={cn(
                "font-medium",
                agent.confidence >= 80 ? "text-success" : agent.confidence >= 60 ? "text-warning" : "text-error",
              )}
            >
              {formatPercentage(agent.confidence)}
            </span>
          </div>
          <Progress
            value={agent.confidence}
            className={cn(
              "h-1.5",
              agent.confidence >= 80
                ? "[&>div]:bg-success"
                : agent.confidence >= 60
                  ? "[&>div]:bg-warning"
                  : "[&>div]:bg-error",
            )}
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs bg-transparent"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Eye className="h-3 w-3 me-1" />
          مشاهده تحلیل کامل
        </Button>
      </CardContent>
    </Card>
  )
}

function PlanContent({ plan }: { plan: ActionPlan }) {
  const [showAssumptions, setShowAssumptions] = useState(false)

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      {/* Header Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <div
            className={cn(
              "text-2xl font-bold",
              plan.successRate >= 80 ? "text-success" : plan.successRate >= 60 ? "text-warning" : "text-error",
            )}
          >
            {formatPercentage(plan.successRate)}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">احتمال موفقیت</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <div className="text-2xl font-bold">{plan.timeline}</div>
          <p className="text-xs text-muted-foreground mt-0.5">زمان‌بندی</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <div className="text-2xl font-bold text-sm leading-8">{plan.budget}</div>
          <p className="text-xs text-muted-foreground mt-0.5">بودجه</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <Badge
            className={cn(
              "text-sm",
              plan.riskLevel === "low"
                ? "bg-success/10 text-success border-success/20"
                : plan.riskLevel === "medium"
                  ? "bg-warning/10 text-warning border-warning/20"
                  : "bg-error/10 text-error border-error/20",
            )}
          >
            {plan.riskLevel === "low" ? "ریسک کم" : plan.riskLevel === "medium" ? "ریسک متوسط" : "ریسک بالا"}
          </Badge>
          <p className="text-xs text-muted-foreground mt-1.5">سطح ریسک</p>
        </div>
      </div>

      {/* Recommended Badge */}
      {plan.recommended && (
        <Badge className="bg-warning/10 text-warning border-warning/20 gap-1">
          <Star className="h-3 w-3" />
          پیشنهاد شده
        </Badge>
      )}

      {/* Steps */}
      <div>
        <p className="font-medium text-sm mb-2">مراحل اجرا</p>
        <ol className="space-y-2">
          {plan.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                {toPersianNumber(i + 1)}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Resources */}
      <div>
        <p className="font-medium text-sm mb-2">منابع مورد نیاز</p>
        <ul className="space-y-1">
          {plan.resources.map((resource, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
              {resource}
            </li>
          ))}
        </ul>
      </div>

      {/* Assumptions */}
      <Collapsible open={showAssumptions} onOpenChange={setShowAssumptions}>
        <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
          {showAssumptions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          پیش‌فرض‌های کلیدی
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="space-y-1 mt-2 ps-6">
            {plan.assumptions.map((assumption, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                {assumption}
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
