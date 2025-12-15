"use client"

import { useState } from "react"
import { toPersianNum } from "@/lib/persian-utils"
import type {
  AgentInstance,
  MemoryBlock,
  WorkingMemory,
  ArchivalResult,
  AgentPrompt,
  SystemSettings,
} from "@/types/agent"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Eye,
  Edit3,
  X,
  Check,
  Undo,
  Plus,
  Brain,
  Clock,
  Archive,
  Settings,
  Pause,
  Square,
  Sliders,
  FileText,
  AlertTriangle,
  Loader2,
  ChevronDown,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface InspectorPanelProps {
  activeAgent: AgentInstance | null
  agents: AgentInstance[]
  memoryBlocks: MemoryBlock[]
  workingMemory: WorkingMemory[]
  archivalResults: ArchivalResult[]
  agentPrompts: AgentPrompt[]
  settings: SystemSettings
  onEditMemoryBlock: (blockId: string, content: Record<string, string | string[]>) => void
  onApproveMemoryEdit: (blockId: string) => void
  onRejectMemoryEdit: (blockId: string) => void
  onExcludeWorkingMemory: (id: string) => void
  onAddArchivalToContext: (id: string) => void
  onUpdatePrompt: (prompt: AgentPrompt) => void
  onUpdateSettings: (settings: SystemSettings) => void
  searchingArchival: boolean
  archivalQuery: string
}

export function InspectorPanel({
  activeAgent,
  agents,
  memoryBlocks,
  workingMemory,
  archivalResults,
  agentPrompts,
  settings,
  onEditMemoryBlock,
  onApproveMemoryEdit,
  onRejectMemoryEdit,
  onExcludeWorkingMemory,
  onAddArchivalToContext,
  onUpdatePrompt,
  onUpdateSettings,
  searchingArchival,
  archivalQuery,
}: InspectorPanelProps) {
  const [activeTab, setActiveTab] = useState("current")
  const [editingBlock, setEditingBlock] = useState<string | null>(null)
  const [selectedAgentPrompt, setSelectedAgentPrompt] = useState(agentPrompts[0]?.agentId || "")

  const currentPrompt = agentPrompts.find((p) => p.agentId === selectedAgentPrompt)

  // Calculate total core memory size
  const totalMemorySize = memoryBlocks.filter((b) => b.type !== "archival").reduce((sum, b) => sum + b.size, 0)
  const maxMemorySize = 2 // KB

  return (
    <div className="h-full flex flex-col border-r border-border/50 bg-card/30">
      {/* Header */}
      <div className="p-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-emerald-400" />
          <h2 className="font-bold">بازرس زنده عامل</h2>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-4 mx-3 mt-2">
          <TabsTrigger value="current" className="text-xs">
            فعلی
          </TabsTrigger>
          <TabsTrigger value="memory" className="text-xs">
            حافظه
          </TabsTrigger>
          <TabsTrigger value="prompts" className="text-xs">
            پرامپت‌ها
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs">
            تنظیمات
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          {/* CURRENT TAB */}
          <TabsContent value="current" className="p-3 m-0 space-y-4">
            {/* Active Agent Status */}
            {activeAgent && (
              <Card className={`${activeAgent.bgColor} ${activeAgent.borderColor} border`}>
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{activeAgent.icon}</span>
                    <span className={`font-bold ${activeAgent.color}`}>{activeAgent.name}</span>
                    <Badge variant="outline" className="text-[10px]">
                      فعال
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">مرحله:</span>
                      <span>
                        جستجوی حافظه ({toPersianNum(3)}/{toPersianNum(12)})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">پیشرفت:</span>
                      <Progress value={25} className="flex-1 h-1.5" />
                      <span>{toPersianNum(25)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">زمان:</span>
                      <span>
                        {activeAgent.elapsed} / ~{toPersianNum(12)}s
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Agents Status */}
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                وضعیت عوامل
              </h4>
              <div className="space-y-2">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`p-2 rounded-lg border ${agent.borderColor} ${agent.bgColor} flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{agent.icon}</span>
                      <span className={`text-sm font-medium ${agent.color}`}>{agent.name}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${
                        agent.status === "thinking" || agent.status === "tool_calling"
                          ? "border-emerald-500/50 text-emerald-400"
                          : agent.status === "paused"
                            ? "border-amber-500/50 text-amber-400"
                            : "border-muted-foreground"
                      }`}
                    >
                      {agent.status === "thinking" && <Loader2 className="w-3 h-3 ml-1 animate-spin" />}
                      {agent.status === "thinking"
                        ? "تفکر"
                        : agent.status === "tool_calling"
                          ? "ابزار"
                          : agent.status === "paused"
                            ? "متوقف"
                            : "آماده"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Context */}
            <div>
              <h4 className="text-sm font-medium mb-2">
                زمینه فعلی ({toPersianNum(2.1)}KB / {toPersianNum(2)}KB):
              </h4>
              {memoryBlocks
                .filter((b) => b.type === "human" || b.type === "company")
                .slice(0, 2)
                .map((block) => (
                  <Card key={block.id} className="mb-2">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span>{block.icon}</span>
                          <span className="text-sm font-medium">{block.title}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          <Edit3 className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-0.5">
                        {Object.entries(block.content)
                          .slice(0, 3)
                          .map(([key, value]) => (
                            <div key={key}>
                              {key}: {Array.isArray(value) ? value[0] : value}
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Recent Memories Being Used */}
            <div>
              <h4 className="text-sm font-medium mb-2">خاطرات اخیر (در حال استفاده):</h4>
              {workingMemory
                .filter((m) => m.isActive)
                .map((memory) => (
                  <Card key={memory.id} className="mb-2 border-emerald-500/30 bg-emerald-500/5">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="outline" className="text-[10px] border-emerald-500/50 text-emerald-400">
                          فعال - در حال بازیابی
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">{memory.relativeTime}</span>
                      </div>
                      <div className="font-medium text-sm">{memory.title}</div>
                      <div className="text-xs text-muted-foreground">{memory.summary}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="ghost" size="sm" className="h-6 text-xs gap-1">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs gap-1 text-red-400"
                          onClick={() => onExcludeWorkingMemory(memory.id)}
                        >
                          <X className="w-3 h-3" />
                          حذف
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 text-xs gap-1">
                          <Edit3 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Global Controls */}
            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-1 text-amber-400 border-amber-500/30 bg-transparent"
              >
                <Pause className="w-4 h-4" />
                توقف همه
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-1 text-red-400 border-red-500/30 bg-transparent"
              >
                <Square className="w-4 h-4" />
                لغو
              </Button>
              <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent">
                <Sliders className="w-4 h-4" />
                تنظیم
              </Button>
            </div>
          </TabsContent>

          {/* MEMORY TAB */}
          <TabsContent value="memory" className="p-3 m-0 space-y-4">
            {/* Core Memory */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-400" />
                  حافظه اصلی (قابل ویرایش)
                </h4>
                <span className="text-xs text-muted-foreground">
                  {toPersianNum(totalMemorySize.toFixed(1))}KB / {toPersianNum(maxMemorySize)}KB
                </span>
              </div>

              {memoryBlocks
                .filter((b) => b.type !== "archival")
                .map((block) => (
                  <Collapsible key={block.id}>
                    <Card className={`mb-2 ${block.pendingEdit ? "border-purple-500/50 bg-purple-500/5" : ""}`}>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="p-3 cursor-pointer hover:bg-muted/20 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span>{block.icon}</span>
                              <span className="text-sm font-medium">{block.title}</span>
                              {block.pendingEdit && (
                                <Badge variant="outline" className="text-[10px] border-purple-500/50 text-purple-400">
                                  در انتظار تأیید
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setEditingBlock(editingBlock === block.id ? null : block.id)
                                }}
                              >
                                <Edit3 className="w-3 h-3" />
                              </Button>
                              <ChevronDown className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="p-3 pt-0 border-t border-border/50">
                          <div className="space-y-2 text-sm">
                            {Object.entries(block.content).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-muted-foreground">{key}:</span>
                                <span className="text-left flex-1 mr-2">
                                  {Array.isArray(value) ? value.join("، ") : value}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Pending Edit */}
                          {block.pendingEdit && (
                            <div className="mt-3 p-2 rounded bg-purple-500/10 border border-purple-500/30">
                              <div className="text-xs text-purple-400 mb-2">
                                ویرایش پیشنهادی توسط {block.pendingEdit.byAgent}:
                              </div>
                              <div className="text-xs mb-2">
                                <span className="text-muted-foreground">{block.pendingEdit.field}:</span>
                                <div className="line-through text-red-400/70">{block.pendingEdit.oldValue}</div>
                                <div className="text-emerald-400">{block.pendingEdit.newValue}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  className="h-6 text-xs gap-1 bg-emerald-500/20 text-emerald-400"
                                  onClick={() => onApproveMemoryEdit(block.id)}
                                >
                                  <Check className="w-3 h-3" />
                                  تأیید
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 text-xs gap-1 text-red-400"
                                  onClick={() => onRejectMemoryEdit(block.id)}
                                >
                                  <X className="w-3 h-3" />
                                  رد
                                </Button>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50 text-[10px] text-muted-foreground">
                            <span>آخرین بروزرسانی: {block.lastUpdated}</span>
                            <span>توسط: {block.updatedBy}</span>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}

              {/* Memory Usage Warning */}
              {totalMemorySize / maxMemorySize > 0.8 && (
                <div className="flex items-center gap-2 p-2 rounded bg-amber-500/10 border border-amber-500/30 text-xs text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                  حافظه تقریباً پر است - خلاصه‌سازی خودکار فعال می‌شود
                </div>
              )}
            </div>

            <Separator />

            {/* Working Memory Timeline */}
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                حافظه کاری (خط زمانی)
              </h4>

              <div className="space-y-2">
                {workingMemory.map((memory) => (
                  <div
                    key={memory.id}
                    className={`p-2 rounded-lg border transition-all ${
                      memory.isActive
                        ? "border-emerald-500/50 bg-emerald-500/5"
                        : memory.isExcluded
                          ? "border-red-500/30 bg-red-500/5 opacity-50"
                          : "border-border/50 hover:border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        {memory.isActive && (
                          <Badge variant="outline" className="text-[10px] border-emerald-500/50 text-emerald-400">
                            در حال استفاده
                          </Badge>
                        )}
                        <span className="text-[10px] text-muted-foreground">{memory.relativeTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-5 w-5">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 text-red-400"
                          onClick={() => onExcludeWorkingMemory(memory.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-5 w-5">
                          <Edit3 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{memory.title}</div>
                    <div className="text-xs text-muted-foreground">{memory.summary}</div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Archival Search */}
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Archive className="w-4 h-4 text-amber-400" />
                جستجوی آرشیو (معنایی)
              </h4>

              {searchingArchival && (
                <div className="flex items-center gap-2 p-2 rounded bg-muted/50 mb-2">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                  <span className="text-xs">در حال جستجو: "{archivalQuery}"</span>
                </div>
              )}

              <div className="space-y-2">
                {archivalResults.map((result) => (
                  <div
                    key={result.id}
                    className="p-2 rounded-lg border border-border/50 hover:border-amber-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{result.title}</span>
                      <Badge variant="outline" className="text-[10px]">
                        {toPersianNum((result.score * 100).toFixed(0))}%
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">{result.date}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2">{result.preview}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="h-6 text-xs gap-1">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs gap-1 text-emerald-400"
                        onClick={() => onAddArchivalToContext(result.id)}
                      >
                        <Plus className="w-3 h-3" />
                        افزودن به زمینه
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* PROMPTS TAB */}
          <TabsContent value="prompts" className="p-3 m-0 space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                پرامپت‌های عامل (قابل ویرایش)
              </h4>

              <Select value={selectedAgentPrompt} onValueChange={setSelectedAgentPrompt}>
                <SelectTrigger className="mb-3">
                  <SelectValue placeholder="انتخاب عامل" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.icon} {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {currentPrompt && (
                <div className="space-y-4">
                  {/* System Prompt */}
                  <div>
                    <Label className="text-xs text-muted-foreground mb-2 block">پرامپت سیستم (در حال استفاده):</Label>
                    <Textarea
                      value={currentPrompt.systemPrompt}
                      onChange={(e) => onUpdatePrompt({ ...currentPrompt, systemPrompt: e.target.value })}
                      className="min-h-[200px] text-sm font-mono"
                    />
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>تعداد کاراکتر: {toPersianNum(currentPrompt.systemPrompt.length)} / ۲۰۰۰</span>
                      <span>توکن (تخمینی): ~{toPersianNum(Math.ceil(currentPrompt.systemPrompt.length / 4))}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                      <Undo className="w-3 h-3" />
                      بازنشانی
                    </Button>
                    <Button size="sm" className="gap-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">
                      <Check className="w-3 h-3" />
                      ذخیره و اعمال
                    </Button>
                  </div>

                  <div className="text-xs text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    تغییرات روی پیام بعدی اعمال می‌شود
                  </div>

                  <Separator />

                  {/* Model Parameters */}
                  <div className="space-y-4">
                    <h5 className="text-sm font-medium">تنظیمات مدل:</h5>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-xs">Temperature (خلاقیت):</Label>
                        <span className="text-xs font-mono">{currentPrompt.temperature}</span>
                      </div>
                      <Slider
                        value={[currentPrompt.temperature]}
                        onValueChange={([v]) => onUpdatePrompt({ ...currentPrompt, temperature: v })}
                        max={2}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                        <span>دقیق</span>
                        <span>خلاق</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-xs">Top-P (تمرکز):</Label>
                        <span className="text-xs font-mono">{currentPrompt.topP}</span>
                      </div>
                      <Slider
                        value={[currentPrompt.topP]}
                        onValueChange={([v]) => onUpdatePrompt({ ...currentPrompt, topP: v })}
                        max={1}
                        step={0.05}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label className="text-xs mb-2 block">حداکثر توکن:</Label>
                      <Select
                        value={String(currentPrompt.maxTokens)}
                        onValueChange={(v) => onUpdatePrompt({ ...currentPrompt, maxTokens: Number(v) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="500">{toPersianNum(500)}</SelectItem>
                          <SelectItem value="1000">{toPersianNum(1000)}</SelectItem>
                          <SelectItem value="1500">{toPersianNum(1500)}</SelectItem>
                          <SelectItem value="2000">{toPersianNum(2000)}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  {/* Tools */}
                  <div>
                    <h5 className="text-sm font-medium mb-2">ابزارهای فعال:</h5>
                    <div className="space-y-2">
                      {currentPrompt.tools.map((tool) => (
                        <div key={tool.id} className="flex items-center justify-between">
                          <Label className="text-sm">{tool.name}</Label>
                          <Switch
                            checked={tool.enabled}
                            onCheckedChange={(checked) => {
                              const newTools = currentPrompt.tools.map((t) =>
                                t.id === tool.id ? { ...t, enabled: checked } : t,
                              )
                              onUpdatePrompt({ ...currentPrompt, tools: newTools })
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Memory Edit Mode */}
                  <div>
                    <h5 className="text-sm font-medium mb-2">حالت ویرایش حافظه:</h5>
                    <Select
                      value={currentPrompt.memoryEditMode}
                      onValueChange={(v: AgentPrompt["memoryEditMode"]) =>
                        onUpdatePrompt({ ...currentPrompt, memoryEditMode: v })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="require_approval">نیاز به تأیید (توصیه شده)</SelectItem>
                        <SelectItem value="auto_approve">تأیید خودکار</SelectItem>
                        <SelectItem value="disabled">غیرفعال</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* SETTINGS TAB */}
          <TabsContent value="settings" className="p-3 m-0 space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                تنظیمات سیستم
              </h4>

              {/* Transparency Level */}
              <div className="mb-4">
                <Label className="text-xs text-muted-foreground mb-2 block">سطح شفافیت:</Label>
                <Select
                  value={settings.transparencyLevel}
                  onValueChange={(v: SystemSettings["transparencyLevel"]) =>
                    onUpdateSettings({ ...settings, transparencyLevel: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maximum">حداکثر (نمایش همه چیز)</SelectItem>
                    <SelectItem value="high">بالا (مخفی کردن جزئیات سطح پایین)</SelectItem>
                    <SelectItem value="medium">متوسط (فقط تصمیمات)</SelectItem>
                    <SelectItem value="minimal">حداقل (فقط نتایج)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-4" />

              {/* Auto Save */}
              <div className="space-y-3">
                <h5 className="text-xs font-medium text-muted-foreground">ذخیره خودکار حافظه:</h5>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">ذخیره خودکار گفتگوها</Label>
                  <Switch
                    checked={settings.autoSave}
                    onCheckedChange={(v) => onUpdateSettings({ ...settings, autoSave: v })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">ایجاد خاطره از تصمیمات</Label>
                  <Switch
                    checked={settings.createMemoriesFromDecisions}
                    onCheckedChange={(v) => onUpdateSettings({ ...settings, createMemoriesFromDecisions: v })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">بروزرسانی حافظه اصلی</Label>
                  <Switch
                    checked={settings.updateCoreMemory}
                    onCheckedChange={(v) => onUpdateSettings({ ...settings, updateCoreMemory: v })}
                  />
                </div>
              </div>

              <Separator className="my-4" />

              {/* User Control */}
              <div className="space-y-3">
                <h5 className="text-xs font-medium text-muted-foreground">کنترل کاربر:</h5>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">نیاز به تأیید برای ویرایش حافظه</Label>
                  <Switch
                    checked={settings.requireMemoryApproval}
                    onCheckedChange={(v) => onUpdateSettings({ ...settings, requireMemoryApproval: v })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">نمایش مونولوگ درونی</Label>
                  <Switch
                    checked={settings.showInnerMonologue}
                    onCheckedChange={(v) => onUpdateSettings({ ...settings, showInnerMonologue: v })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">نمایش جزئیات فراخوانی ابزار</Label>
                  <Switch
                    checked={settings.showToolDetails}
                    onCheckedChange={(v) => onUpdateSettings({ ...settings, showToolDetails: v })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">نمایش مصرف توکن</Label>
                  <Switch
                    checked={settings.showTokenUsage}
                    onCheckedChange={(v) => onUpdateSettings({ ...settings, showTokenUsage: v })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">اجازه مداخله حین پردازش</Label>
                  <Switch
                    checked={settings.allowMidProcessIntervention}
                    onCheckedChange={(v) => onUpdateSettings({ ...settings, allowMidProcessIntervention: v })}
                  />
                </div>
              </div>

              <Separator className="my-4" />

              {/* Cost Limit */}
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">محدودیت هزینه هر پیام:</Label>
                <Select
                  value={String(settings.costLimitPerMessage)}
                  onValueChange={(v) => onUpdateSettings({ ...settings, costLimitPerMessage: Number(v) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.1">${toPersianNum(0.1)}</SelectItem>
                    <SelectItem value="0.25">${toPersianNum(0.25)}</SelectItem>
                    <SelectItem value="0.5">${toPersianNum(0.5)}</SelectItem>
                    <SelectItem value="1">${toPersianNum(1)}</SelectItem>
                    <SelectItem value="5">${toPersianNum(5)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  )
}
