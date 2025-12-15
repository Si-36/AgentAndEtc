"use client"

import { useState } from "react"
import {
  MoreVertical,
  Download,
  Trash2,
  Share2,
  Settings,
  Wifi,
  WifiOff,
  HelpCircle,
  Edit2,
  Check,
  X,
  Gem,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toPersianNumber, formatCurrency } from "@/lib/persian-utils"

interface ChatHeaderProps {
  title: string
  onTitleChange: (title: string) => void
  tokenCount: number
  maxTokens: number
  cost: number
  isOnline: boolean
  onMenuClick?: () => void
}

const shortcuts = [
  { key: "Ctrl+N", label: "گفتگوی جدید" },
  { key: "Ctrl+K", label: "جستجو" },
  { key: "Ctrl+D", label: "حالت تاریک" },
  { key: "↑/↓", label: "پیمایش تاریخچه" },
  { key: "Esc", label: "بستن پنجره‌ها" },
  { key: "Ctrl+/", label: "راهنمای میانبرها" },
  { key: "Enter", label: "ارسال پیام" },
  { key: "Shift+Enter", label: "خط جدید" },
]

export function ChatHeader({
  title,
  onTitleChange,
  tokenCount,
  maxTokens,
  cost,
  isOnline,
  onMenuClick,
}: ChatHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const [showShortcuts, setShowShortcuts] = useState(false)

  const tokenPercentage = (tokenCount / maxTokens) * 100
  const tokenColor = tokenPercentage > 80 ? "text-error" : tokenPercentage > 60 ? "text-warning" : "text-success"

  const handleSaveTitle = () => {
    onTitleChange(editedTitle)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedTitle(title)
    setIsEditing(false)
  }

  return (
    <>
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>

          {/* Editable Title */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="h-8 text-base font-semibold"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveTitle()
                    if (e.key === "Escape") handleCancelEdit()
                  }}
                />
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleSaveTitle}>
                  <Check className="h-4 w-4 text-success" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCancelEdit}>
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 group text-start">
                <h1 className="text-lg font-semibold truncate">{title}</h1>
                <Edit2 className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            )}
          </div>

          {/* Token Counter */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
              <Gem className={cn("h-4 w-4", tokenColor)} />
              <span className={cn("text-sm font-medium", tokenColor)}>
                {toPersianNumber(tokenCount.toLocaleString())} / {toPersianNumber(maxTokens.toLocaleString())}
              </span>
              <span className="text-xs text-muted-foreground">توکن</span>
            </div>

            <div className="text-sm text-muted-foreground">
              هزینه: <span className="font-medium text-foreground">{formatCurrency(cost)}</span>
            </div>
          </div>

          {/* Connection Status */}
          <Badge
            variant="outline"
            className={cn(
              "gap-1.5 hidden sm:flex",
              isOnline ? "border-success/50 text-success" : "border-error/50 text-error",
            )}
          >
            {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {isOnline ? "آنلاین" : "آفلاین"}
          </Badge>

          {/* Shortcuts Help */}
          <Button variant="ghost" size="icon" onClick={() => setShowShortcuts(true)}>
            <HelpCircle className="h-4 w-4" />
          </Button>

          {/* Options Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Download className="h-4 w-4 me-2" />
                صادرکردن
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 me-2" />
                اشتراک‌گذاری
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="h-4 w-4 me-2" />
                تنظیمات
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 me-2" />
                پاک کردن
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Shortcuts Dialog */}
      <Dialog open={showShortcuts} onOpenChange={setShowShortcuts}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">میانبرهای صفحه‌کلید</DialogTitle>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            {shortcuts.map((shortcut) => (
              <div key={shortcut.key} className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50">
                <span className="text-sm">{shortcut.label}</span>
                <kbd className="px-2 py-1 rounded bg-background border text-xs font-mono">{shortcut.key}</kbd>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
