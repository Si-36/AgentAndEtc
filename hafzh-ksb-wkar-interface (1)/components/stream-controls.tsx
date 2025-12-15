"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Pause, Play, Square, Plus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatTime, formatTokens, formatCost } from "@/lib/persian"
import type { StreamState } from "@/types"

interface StreamControlsProps {
  state: StreamState
  onPause: () => void
  onResume: () => void
  onCancel: () => void
  onAddContext: () => void
}

export function StreamControls({ state, onPause, onResume, onCancel, onAddContext }: StreamControlsProps) {
  if (!state.isStreaming) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="glass rounded-2xl p-3 flex items-center gap-3 shadow-2xl">
          {/* Time & Tokens */}
          <div className="flex items-center gap-3 px-3 border-e border-border/50">
            <div className="text-center">
              <p className="text-lg font-bold font-mono gradient-text">{formatTime(state.elapsedTime)}</p>
              <p className="text-[10px] text-muted-foreground">زمان</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold font-mono">{formatTokens(state.totalTokens)}</p>
              <p className="text-[10px] text-muted-foreground">توکن</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold font-mono text-warning">{formatCost(state.totalCost)}</p>
              <p className="text-[10px] text-muted-foreground">هزینه</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {state.isPaused ? (
              <Button size="icon" className="h-10 w-10 rounded-xl bg-success hover:bg-success/90" onClick={onResume}>
                <Play className="h-5 w-5" />
              </Button>
            ) : (
              <Button size="icon" variant="secondary" className="h-10 w-10 rounded-xl" onClick={onPause}>
                <Pause className="h-5 w-5" />
              </Button>
            )}

            <Button size="icon" variant="destructive" className="h-10 w-10 rounded-xl" onClick={onCancel}>
              <Square className="h-5 w-5" />
            </Button>

            <div className="w-px h-8 bg-border/50" />

            <Button
              size="icon"
              variant="outline"
              className="h-10 w-10 rounded-xl bg-transparent"
              onClick={onAddContext}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          {/* Current Stage Indicator */}
          <div className="px-3 border-s border-border/50">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-xs font-medium">
                {state.stages.find((s) => s.status === "running")?.name || "در انتظار..."}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
