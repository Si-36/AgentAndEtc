"use client"

import { useState } from "react"
import { toPersianNum } from "@/lib/persian-utils"
import type { Chat } from "@/types/agent"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { MessageSquare, Plus, Brain, BarChart3, Settings, Search, ChevronLeft, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"

interface LeftPanelProps {
  chats: Chat[]
  activeChat: string
  onChatSelect: (id: string) => void
  onNewChat: () => void
  isCollapsed: boolean
  onToggle: () => void
}

export function LeftPanel({ chats, activeChat, onChatSelect, onNewChat, isCollapsed, onToggle }: LeftPanelProps) {
  const [searchQuery, setSearchQuery] = useState("")

  if (isCollapsed) {
    return (
      <div className="w-14 h-full border-l border-border/50 bg-card/50 flex flex-col items-center py-4 gap-4">
        <Button variant="ghost" size="icon" onClick={onToggle} className="text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-5 h-5 rotate-180" />
        </Button>
        <Separator className="w-8" />
        <Button variant="ghost" size="icon" onClick={onNewChat} className="text-emerald-400">
          <Plus className="w-5 h-5" />
        </Button>
        {chats.slice(0, 5).map((chat) => (
          <Button
            key={chat.id}
            variant="ghost"
            size="icon"
            onClick={() => onChatSelect(chat.id)}
            className={chat.isActive ? "bg-emerald-500/20 text-emerald-400" : "text-muted-foreground"}
          >
            <MessageSquare className="w-5 h-5" />
          </Button>
        ))}
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Brain className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <BarChart3 className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    )
  }

  return (
    <div className="w-60 h-full border-l border-border/50 bg-card/50 flex flex-col">
      {/* Header */}
      <div className="p-3 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">گفتگوها</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={onNewChat} className="h-8 w-8 text-emerald-400">
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8 text-muted-foreground">
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 pb-3">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="جستجو..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-9 h-9 bg-muted/50 border-0"
          />
        </div>
      </div>

      <Separator />

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              className={`w-full p-3 rounded-lg text-right transition-all ${
                chat.isActive
                  ? "bg-gradient-to-l from-emerald-500/20 to-transparent border border-emerald-500/30"
                  : "hover:bg-muted/50"
              }`}
            >
              <div className="flex items-start gap-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    chat.isActive ? "bg-emerald-500/20" : "bg-muted"
                  }`}
                >
                  {chat.isActive ? (
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-medium truncate ${chat.isActive ? "text-emerald-400" : "text-foreground"}`}
                    >
                      {chat.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{chat.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{chat.preview}</p>
                  <span className="text-[10px] text-muted-foreground mt-1 inline-block">
                    {toPersianNum(chat.messageCount)} پیام
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      <Separator />

      {/* Bottom Actions */}
      <div className="p-2 space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-2 h-10 text-muted-foreground hover:text-foreground">
          <Brain className="w-4 h-4" />
          مدیریت حافظه
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 h-10 text-muted-foreground hover:text-foreground">
          <BarChart3 className="w-4 h-4" />
          آمار و تحلیل
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-2 h-10 text-muted-foreground hover:text-foreground">
          <Settings className="w-4 h-4" />
          تنظیمات
        </Button>
      </div>
    </div>
  )
}
