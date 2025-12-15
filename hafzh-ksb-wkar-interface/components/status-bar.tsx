"use client"

import { Wifi, WifiOff, Brain, HardDrive, Clock, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { toPersianNumber, formatFileSize, formatRelativeTime, formatPercentage } from "@/lib/persian-utils"

interface StatusBarProps {
  isOnline: boolean
  agentsReady: number
  memorySize: number
  lastBackup: Date
  systemAccuracy: number
  accuracyChange: number
}

export function StatusBar({
  isOnline,
  agentsReady,
  memorySize,
  lastBackup,
  systemAccuracy,
  accuracyChange,
}: StatusBarProps) {
  return (
    <footer className="border-t bg-muted/30 px-4 py-2">
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <span className="flex items-center gap-1.5">
            {isOnline ? <Wifi className="h-3 w-3 text-success" /> : <WifiOff className="h-3 w-3 text-error" />}
            {isOnline ? "آنلاین" : "آفلاین"}
          </span>

          {/* Agents */}
          <span className="flex items-center gap-1.5">
            <Brain className="h-3 w-3" />
            {toPersianNumber(agentsReady)} نماینده آماده
          </span>

          {/* Memory */}
          <span className="hidden sm:flex items-center gap-1.5">
            <HardDrive className="h-3 w-3" />
            حافظه: {formatFileSize(memorySize)}
          </span>

          {/* Backup */}
          <span className="hidden md:flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            پشتیبان: {formatRelativeTime(lastBackup)}
          </span>
        </div>

        {/* System Accuracy */}
        <span className="flex items-center gap-1.5">
          دقت سیستم: {formatPercentage(systemAccuracy)}
          <span className={cn("flex items-center", accuracyChange >= 0 ? "text-success" : "text-error")}>
            <TrendingUp className={cn("h-3 w-3", accuracyChange < 0 && "rotate-180")} />+
            {formatPercentage(accuracyChange)} این هفته
          </span>
        </span>
      </div>
    </footer>
  )
}
