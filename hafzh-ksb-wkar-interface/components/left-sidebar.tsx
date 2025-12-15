"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquarePlus,
  History,
  Brain,
  Settings,
  HelpCircle,
  Wrench,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Check,
  Edit2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toPersianNumber, formatRelativeTime } from "@/lib/persian-utils"
import type { Conversation, User } from "@/types/business-memory"

interface LeftSidebarProps {
  user: User
  conversations: Conversation[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onNewChat: () => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

const navItems = [
  { id: "new", label: "گفتگوی جدید", icon: MessageSquarePlus, action: "new" },
  { id: "history", label: "تاریخچه", icon: History },
  { id: "memory", label: "حافظه من", icon: Brain },
  { id: "settings", label: "تنظیمات", icon: Settings },
  { id: "help", label: "راهنما", icon: HelpCircle },
  { id: "advanced", label: "حالت پیشرفته", icon: Wrench, advanced: true },
]

export function LeftSidebar({
  user,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  isCollapsed,
  onToggleCollapse,
}: LeftSidebarProps) {
  const [activeNav, setActiveNav] = useState("history")

  return (
    <TooltipProvider delayDuration={300}>
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 64 : 260 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "hidden md:flex flex-col h-full bg-sidebar border-e border-sidebar-border relative",
          "transition-all duration-200",
        )}
      >
        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="absolute -end-3 top-6 z-10 h-6 w-6 rounded-full bg-background border shadow-sm hover:bg-accent"
        >
          {isCollapsed ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        </Button>

        {/* Logo & Brand */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-bold text-sidebar-foreground whitespace-nowrap overflow-hidden"
                >
                  حافظه کسب‌وکار
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* User Profile */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 border-b border-sidebar-border overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-sidebar-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.company.name}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = item.id === activeNav

            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 h-10",
                      isCollapsed && "justify-center px-2",
                      item.advanced && "text-muted-foreground",
                    )}
                    onClick={() => {
                      if (item.action === "new") {
                        onNewChat()
                      } else {
                        setActiveNav(item.id)
                      }
                    }}
                  >
                    <Icon className={cn("h-4 w-4 flex-shrink-0", isActive && "text-primary")} />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="whitespace-nowrap overflow-hidden"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="left" sideOffset={10}>
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            )
          })}
        </nav>

        {/* Recent Chats */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 overflow-hidden flex flex-col"
            >
              <div className="px-4 py-2">
                <p className="text-xs font-medium text-muted-foreground">گفتگوهای اخیر</p>
              </div>
              <ScrollArea className="flex-1 px-2">
                <div className="space-y-1 pb-4">
                  {conversations.map((conv) => (
                    <Tooltip key={conv.id}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => onSelectConversation(conv.id)}
                          className={cn(
                            "w-full p-2.5 rounded-lg text-start transition-colors group",
                            "hover:bg-sidebar-accent",
                            conv.id === activeConversationId && "bg-primary/10",
                          )}
                        >
                          <div className="flex items-start gap-2.5">
                            <div
                              className={cn(
                                "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
                                conv.type === "debate"
                                  ? "bg-primary/10 text-primary"
                                  : "bg-muted text-muted-foreground",
                              )}
                            >
                              <MessageCircle className="h-3.5 w-3.5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium truncate">{conv.title}</span>
                                {conv.completed && <Check className="h-3 w-3 text-success flex-shrink-0" />}
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">{formatRelativeTime(conv.date)}</p>
                            </div>
                            <Badge variant="secondary" className="text-[10px] h-5 px-1.5">
                              {toPersianNumber(conv.messageCount)}
                            </Badge>
                          </div>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-[200px]">
                        <p className="font-medium">{conv.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{conv.lastMessage}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </TooltipProvider>
  )
}
