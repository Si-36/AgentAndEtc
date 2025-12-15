"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  MessageSquare,
  Gavel,
  ChevronRight,
  ChevronLeft,
  Settings,
  Moon,
  Sun,
  MoreHorizontal,
  Trash2,
  Edit2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toPersian, formatRelative } from "@/lib/persian"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Conversation, User } from "@/types"

interface SidebarProps {
  user: User
  conversations: Conversation[]
  activeId: string | null
  onSelect: (id: string) => void
  onNewChat: () => void
  isCollapsed: boolean
  onToggle: () => void
  isDark: boolean
  onToggleDark: () => void
}

export function Sidebar({
  user,
  conversations,
  activeId,
  onSelect,
  onNewChat,
  isCollapsed,
  onToggle,
  isDark,
  onToggleDark,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = conversations.filter(
    (c) => searchQuery === "" || c.title.includes(searchQuery) || c.lastMessage.includes(searchQuery),
  )

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 64 : 280 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="h-full flex flex-col border-e border-border bg-sidebar relative"
    >
      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -end-3 top-6 z-10 h-6 w-6 rounded-full bg-background border shadow-sm hover:bg-accent"
      >
        {isCollapsed ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
      </Button>

      <AnimatePresence>
        {!isCollapsed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full"
          >
            {/* Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-foreground">ح</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="font-bold text-sm truncate gradient-text">حافظه کسب‌وکار</h1>
                  <p className="text-[10px] text-muted-foreground truncate">{user.company.name}</p>
                </div>
              </div>

              <Button onClick={onNewChat} className="w-full gap-2 rounded-xl h-10">
                <Plus className="h-4 w-4" />
                گفتگوی جدید
              </Button>
            </div>

            {/* Search */}
            <div className="p-3">
              <div className="relative">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="جستجو..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-9 h-9 text-xs bg-input/50 rounded-xl"
                />
              </div>
            </div>

            {/* Conversations */}
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {filtered.map((conversation) => (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={conversation.id === activeId}
                    onClick={() => onSelect(conversation.id)}
                  />
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-3 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                    <span className="text-xs font-medium">{user.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{user.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onToggleDark}>
                    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center py-4 gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-2">
              <span className="text-lg font-bold text-primary-foreground">ح</span>
            </div>
            <Button size="icon" onClick={onNewChat} className="rounded-xl">
              <Plus className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  )
}

function ConversationItem({
  conversation,
  isActive,
  onClick,
}: {
  conversation: Conversation
  isActive: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      layout
      className={cn(
        "group flex items-start gap-2 p-2.5 rounded-xl cursor-pointer transition-all",
        isActive ? "bg-accent" : "hover:bg-accent/50",
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
          conversation.hasDebate ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground",
        )}
      >
        {conversation.hasDebate ? <Gavel className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium truncate">{conversation.title}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit2 className="h-3.5 w-3.5 me-2" />
                تغییر نام
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-3.5 w-3.5 me-2" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-[10px] text-muted-foreground truncate mt-0.5">{conversation.lastMessage}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[9px] text-muted-foreground">{formatRelative(conversation.date)}</span>
          <span className="text-[9px] text-muted-foreground">{toPersian(conversation.messageCount)} پیام</span>
          {conversation.isActive && (
            <span className="flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
