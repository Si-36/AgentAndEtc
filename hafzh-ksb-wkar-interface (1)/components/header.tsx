"use client"

import { toPersianNum, formatPersianCurrency } from "@/lib/persian-utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Brain, Gem, User, Settings, LogOut, ChevronDown } from "lucide-react"

interface HeaderProps {
  totalTokens: number
  totalCost: number
  isConnected: boolean
}

export function Header({ totalTokens, totalCost, isConnected }: HeaderProps) {
  return (
    <header className="h-14 border-b border-border/50 bg-card/80 backdrop-blur-xl flex items-center justify-between px-4 sticky top-0 z-50">
      {/* Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-base font-bold text-foreground">حافظه کسب‌وکار</h1>
          <span className="text-[10px] text-muted-foreground -mt-0.5">سیستم عامل عوامل هوشمند</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4">
        {/* Tokens */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
          <Gem className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium">{toPersianNum(totalTokens.toLocaleString())}</span>
          <span className="text-xs text-muted-foreground">توکن</span>
        </div>

        {/* Cost */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
          <span className="text-sm font-medium text-emerald-400">{formatPersianCurrency(totalCost)}</span>
        </div>

        {/* Connection Status */}
        <Badge
          variant="outline"
          className={`gap-1.5 ${isConnected ? "border-emerald-500/50 text-emerald-400" : "border-red-500/50 text-red-400"}`}
        >
          <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
          {isConnected ? "آنلاین" : "آفلاین"}
        </Badge>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="gap-2">
              <User className="w-4 h-4" />
              پروفایل
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Settings className="w-4 h-4" />
              تنظیمات
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-red-400">
              <LogOut className="w-4 h-4" />
              خروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
