"use client"

import { motion } from "framer-motion"
import { AlertTriangle, TrendingUp, Calendar, Lightbulb, Check, X, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatRelative, formatPercent } from "@/lib/persian"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Alert } from "@/types"

interface AlertsPanelProps {
  alerts: Alert[]
  onDismiss: (id: string) => void
  onAction: (id: string) => void
}

const typeIcons = {
  warning: AlertTriangle,
  opportunity: TrendingUp,
  deadline: Calendar,
  insight: Lightbulb,
}

const typeColors = {
  warning: "error",
  opportunity: "success",
  deadline: "warning",
  insight: "primary",
}

export function AlertsPanel({ alerts, onDismiss, onAction }: AlertsPanelProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-warning" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">هشدارهای پیش‌بین</h2>
            <p className="text-[10px] text-muted-foreground">{alerts.length} هشدار فعال</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {alerts.map((alert, i) => {
            const Icon = typeIcons[alert.type]
            const color = typeColors[alert.type]

            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, oklch(0.14 0.02 260) 0%, oklch(0.1 0.015 260) 100%)",
                  border: "1px solid oklch(0.22 0.02 260)",
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                      `bg-${color}/20 text-${color}`,
                    )}
                    style={{
                      background: `oklch(from var(--${color}) l c h / 0.2)`,
                      color: `var(--${color})`,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        className="text-[9px] h-4"
                        style={{
                          background: `oklch(from var(--${color}) l c h / 0.15)`,
                          borderColor: `oklch(from var(--${color}) l c h / 0.3)`,
                          color: `var(--${color})`,
                        }}
                      >
                        {alert.priority === "high" ? "فوری" : alert.priority === "medium" ? "متوسط" : "کم"}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">{formatRelative(alert.date)}</span>
                    </div>
                    <p className="text-xs font-medium">{alert.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{alert.description}</p>

                    {/* Confidence */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-muted-foreground">اطمینان:</span>
                      <Progress value={alert.confidence} className="h-1 flex-1" />
                      <span className="text-[10px] font-medium">{formatPercent(alert.confidence)}</span>
                    </div>

                    {/* Actions */}
                    {alert.actionable && (
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-[10px] bg-transparent"
                          onClick={() => onAction(alert.id)}
                        >
                          <Eye className="w-3 h-3 me-1" />
                          بررسی
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-[10px]"
                          onClick={() => onDismiss(alert.id)}
                        >
                          <Check className="w-3 h-3 me-1" />
                          انجام شد
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-[10px] text-destructive"
                          onClick={() => onDismiss(alert.id)}
                        >
                          <X className="w-3 h-3 me-1" />
                          رد
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
