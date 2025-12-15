"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LeftSidebar } from "@/components/left-sidebar"
import type { Conversation, User } from "@/types/business-memory"

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  user: User
  conversations: Conversation[]
  activeConversationId: string | null
  onSelectConversation: (id: string) => void
  onNewChat: () => void
}

export function MobileDrawer({
  isOpen,
  onClose,
  user,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
}: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 end-0 z-50 w-[280px] bg-sidebar shadow-xl md:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-semibold">منو</span>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="h-[calc(100%-65px)]">
              <LeftSidebar
                user={user}
                conversations={conversations}
                activeConversationId={activeConversationId}
                onSelectConversation={(id) => {
                  onSelectConversation(id)
                  onClose()
                }}
                onNewChat={() => {
                  onNewChat()
                  onClose()
                }}
                isCollapsed={false}
                onToggleCollapse={() => {}}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
