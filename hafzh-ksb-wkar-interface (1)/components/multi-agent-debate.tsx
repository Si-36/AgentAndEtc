"use client"
import { toPersianNum } from "@/lib/persian-utils"
import type { AgentInstance } from "@/types/agent"
import { AgentThoughtStream } from "./agent-thought-stream"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Target, Users, Pause, Play, X, Plus, Lightbulb, AlertTriangle } from "lucide-react"

interface MultiAgentDebateProps {
  question: string
  agents: AgentInstance[]
  onPauseAgent: (agentId: string) => void
  onResumeAgent: (agentId: string) => void
  onCancelAgent: (agentId: string) => void
  onPauseAll: () => void
  onResumeAll: () => void
  onCancelAll: () => void
  onApproveMemoryEdit: (agentId: string, stepId: string, approved: boolean) => void
  onEditMemory: (agentId: string, stepId: string) => void
  onInjectContext: () => void
  pausedAgents: Set<string>
  allPaused: boolean
}

export function MultiAgentDebate({
  question,
  agents,
  onPauseAgent,
  onResumeAgent,
  onCancelAgent,
  onPauseAll,
  onResumeAll,
  onCancelAll,
  onApproveMemoryEdit,
  onEditMemory,
  onInjectContext,
  pausedAgents,
  allPaused,
}: MultiAgentDebateProps) {
  // Calculate overall progress
  const totalConfidence = agents.reduce((sum, a) => sum + a.confidence, 0) / agents.length
  const activeAgents = agents.filter((a) => a.status !== "complete" && a.status !== "error").length

  return (
    <div className="space-y-4">
      {/* Debate Header */}
      <Card className="border-emerald-500/30 bg-emerald-500/5">
        <CardHeader className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <Target className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-400">تحلیل استراتژیک چند-عاملی</h3>
                <p className="text-sm text-foreground mt-1">{question}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-400">
                    <AlertTriangle className="w-3 h-3 ml-1" />
                    پیچیدگی: بالا
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    تأثیر: {">"} $۵۰K
                  </Badge>
                  <Badge variant="outline" className="text-xs border-blue-500/50 text-blue-400">
                    <Users className="w-3 h-3 ml-1" />
                    {toPersianNum(agents.length)} عامل
                  </Badge>
                </div>
              </div>
            </div>

            {/* Global Controls */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-purple-400" onClick={onInjectContext}>
                <Plus className="w-4 h-4" />
                افزودن زمینه
              </Button>
              {allPaused ? (
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-emerald-400" onClick={onResumeAll}>
                  <Play className="w-4 h-4" />
                  ادامه همه
                </Button>
              ) : (
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-amber-400" onClick={onPauseAll}>
                  <Pause className="w-4 h-4" />
                  توقف همه
                </Button>
              )}
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-red-400" onClick={onCancelAll}>
                <X className="w-4 h-4" />
                لغو
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <AgentThoughtStream
            key={agent.id}
            agent={agent}
            isPaused={pausedAgents.has(agent.id)}
            onPause={() => onPauseAgent(agent.id)}
            onResume={() => onResumeAgent(agent.id)}
            onCancel={() => onCancelAgent(agent.id)}
            onApproveMemoryEdit={(stepId, approved) => onApproveMemoryEdit(agent.id, stepId, approved)}
            onEditMemory={(stepId) => onEditMemory(agent.id, stepId)}
          />
        ))}
      </div>

      {/* Consensus Analysis */}
      <Card className="border-border/50">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h4 className="font-medium">تحلیل اجماع</h4>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-3 gap-4">
            {agents.map((agent) => (
              <div key={agent.id} className="text-center">
                <div className={`text-2xl font-bold ${agent.color}`}>{toPersianNum(agent.confidence)}%</div>
                <div className="text-xs text-muted-foreground">{agent.name}</div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">میانگین اطمینان:</span>
            <div className="flex items-center gap-2">
              <Progress value={totalConfidence} className="w-32 h-2" />
              <span className="font-bold text-emerald-400">{toPersianNum(Math.round(totalConfidence))}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-muted-foreground">عوامل فعال:</span>
            <span className="font-medium">
              {toPersianNum(activeAgents)} از {toPersianNum(agents.length)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
