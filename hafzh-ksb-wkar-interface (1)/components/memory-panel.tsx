"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  User,
  Building2,
  Target,
  Lightbulb,
  Calendar,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Clock,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toPersian, formatRelative, formatTokens } from "@/lib/persian"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { MemoryBlock, User as UserType } from "@/types"

interface MemoryPanelProps {
  user: UserType
  memories: MemoryBlock[]
  onEditMemory: (id: string, content: string) => void
  onDeleteMemory: (id: string) => void
  onToggleActive: (id: string) => void
  onAddMemory: (memory: Partial<MemoryBlock>) => void
}

const categoryIcons: Record<string, React.ElementType> = {
  user: User,
  company: Building2,
  decision: Target,
  insight: Lightbulb,
  meeting: Calendar,
}

export function MemoryPanel({
  user,
  memories,
  onEditMemory,
  onDeleteMemory,
  onToggleActive,
  onAddMemory,
}: MemoryPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["core", "working"]))
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(section)) next.delete(section)
      else next.add(section)
      return next
    })
  }

  const startEdit = (memory: MemoryBlock) => {
    setEditingId(memory.id)
    setEditContent(memory.content)
  }

  const saveEdit = () => {
    if (editingId) {
      onEditMemory(editingId, editContent)
      setEditingId(null)
      setEditContent("")
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditContent("")
  }

  const coreMemories = memories.filter((m) => m.type === "core")
  const workingMemories = memories.filter((m) => m.type === "working")
  const archivalMemories = memories.filter((m) => m.type === "archival")

  const filteredArchival = archivalMemories.filter(
    (m) => searchQuery === "" || m.title.includes(searchQuery) || m.content.includes(searchQuery),
  )

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Brain className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">حافظه</h2>
            <p className="text-[10px] text-muted-foreground">
              {formatTokens(memories.reduce((acc, m) => acc + m.tokens, 0))} توکن
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Core Memory */}
          <Collapsible open={expandedSections.has("core")} onOpenChange={() => toggleSection("core")}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-warning" />
                  <span className="text-xs font-medium">حافظه هسته</span>
                  <Badge variant="secondary" className="text-[10px] h-4">
                    {toPersian(coreMemories.length)}
                  </Badge>
                </div>
                {expandedSections.has("core") ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-2 space-y-2">
                {/* User Profile */}
                <MemoryBlockCard
                  memory={{
                    id: "user-profile",
                    type: "core",
                    category: "user",
                    title: "پروفایل کاربر",
                    content: `${user.name} - ${user.role}`,
                    date: new Date(),
                    tokens: 150,
                  }}
                  onEdit={startEdit}
                  isEditing={editingId === "user-profile"}
                  editContent={editContent}
                  onEditChange={setEditContent}
                  onSave={saveEdit}
                  onCancel={cancelEdit}
                />

                {/* Company Profile */}
                <MemoryBlockCard
                  memory={{
                    id: "company-profile",
                    type: "core",
                    category: "company",
                    title: "پروفایل شرکت",
                    content: `${user.company.name} - ${user.company.industry} - ${toPersian(user.company.size)} نفر`,
                    date: new Date(),
                    tokens: 200,
                  }}
                  onEdit={startEdit}
                  isEditing={editingId === "company-profile"}
                  editContent={editContent}
                  onEditChange={setEditContent}
                  onSave={saveEdit}
                  onCancel={cancelEdit}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Working Memory */}
          <Collapsible open={expandedSections.has("working")} onOpenChange={() => toggleSection("working")}>
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium">حافظه کاری</span>
                  <Badge variant="secondary" className="text-[10px] h-4">
                    {toPersian(workingMemories.length)}
                  </Badge>
                </div>
                {expandedSections.has("working") ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-2 space-y-2">
                <AnimatePresence>
                  {workingMemories.map((memory) => (
                    <MemoryBlockCard
                      key={memory.id}
                      memory={memory}
                      onEdit={startEdit}
                      onDelete={() => onDeleteMemory(memory.id)}
                      onToggleActive={() => onToggleActive(memory.id)}
                      isEditing={editingId === memory.id}
                      editContent={editContent}
                      onEditChange={setEditContent}
                      onSave={saveEdit}
                      onCancel={cancelEdit}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Archival Memory */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-medium">آرشیو حافظه</span>
            </div>
            <div className="relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={`جستجو در ${toPersian(archivalMemories.length)} خاطره...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ps-9 h-9 text-xs bg-input/50"
              />
            </div>

            {searchQuery && (
              <div className="space-y-2 mt-2">
                {filteredArchival.map((memory) => (
                  <MemoryBlockCard
                    key={memory.id}
                    memory={memory}
                    compact
                    onEdit={startEdit}
                    onDelete={() => onDeleteMemory(memory.id)}
                    isEditing={editingId === memory.id}
                    editContent={editContent}
                    onEditChange={setEditContent}
                    onSave={saveEdit}
                    onCancel={cancelEdit}
                  />
                ))}
                {filteredArchival.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-4">نتیجه‌ای یافت نشد</p>
                )}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Add Memory Button */}
      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          className="w-full gap-2 bg-transparent"
          onClick={() => onAddMemory({ type: "working", category: "insight" })}
        >
          <Plus className="w-4 h-4" />
          افزودن خاطره
        </Button>
      </div>
    </div>
  )
}

interface MemoryBlockCardProps {
  memory: MemoryBlock
  compact?: boolean
  onEdit: (memory: MemoryBlock) => void
  onDelete?: () => void
  onToggleActive?: () => void
  isEditing: boolean
  editContent: string
  onEditChange: (content: string) => void
  onSave: () => void
  onCancel: () => void
}

function MemoryBlockCard({
  memory,
  compact,
  onEdit,
  onDelete,
  onToggleActive,
  isEditing,
  editContent,
  onEditChange,
  onSave,
  onCancel,
}: MemoryBlockCardProps) {
  const Icon = categoryIcons[memory.category] || Lightbulb

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn("memory-block rounded-lg p-3", memory.isActive && "active")}
    >
      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            value={editContent}
            onChange={(e) => onEditChange(e.target.value)}
            className="min-h-[80px] text-xs bg-input/50"
            autoFocus
          />
          <div className="flex items-center justify-end gap-2">
            <Button size="sm" variant="ghost" onClick={onCancel} className="h-7 text-xs">
              <X className="w-3 h-3 me-1" />
              لغو
            </Button>
            <Button size="sm" onClick={onSave} className="h-7 text-xs">
              <Check className="w-3 h-3 me-1" />
              ذخیره
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2 flex-1 min-w-0">
              <div className="w-6 h-6 rounded bg-accent/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{memory.title}</p>
                <p
                  className={cn("text-[11px] text-muted-foreground mt-0.5", compact ? "line-clamp-1" : "line-clamp-2")}
                >
                  {memory.content}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] text-muted-foreground">{formatRelative(memory.date)}</span>
                  <span className="text-[10px] text-muted-foreground">{formatTokens(memory.tokens)} توکن</span>
                  {memory.result && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[9px] h-4",
                        memory.result === "success" && "border-success/50 text-success",
                        memory.result === "failure" && "border-error/50 text-error",
                      )}
                    >
                      {memory.result === "success" ? "موفق" : memory.result === "failure" ? "ناموفق" : "در انتظار"}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {onToggleActive && (
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onToggleActive}>
                  {memory.isActive ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                </Button>
              )}
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onEdit(memory)}>
                <Edit2 className="w-3 h-3" />
              </Button>
              {onDelete && (
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={onDelete}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Active Indicator */}
          {memory.isActive && (
            <div className="mt-2 pt-2 border-t border-primary/20">
              <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">
                <span className="relative flex h-1.5 w-1.5 me-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                </span>
                در حال استفاده
              </Badge>
            </div>
          )}
        </>
      )}
    </motion.div>
  )
}
