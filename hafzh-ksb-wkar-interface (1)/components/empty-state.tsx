"use client"

import { Brain, Eye, Edit3, Sliders, GitBranch } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onStartChat: () => void
}

export function EmptyState({ onStartChat }: EmptyStateProps) {
  const features = [
    { icon: Eye, label: "تفکر عوامل را ببینید" },
    { icon: Edit3, label: "حافظه را ویرایش کنید" },
    { icon: Sliders, label: "پرامپت‌ها را تغییر دهید" },
    { icon: GitBranch, label: "جریان کار را کنترل کنید" },
  ]

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
          <Brain className="w-10 h-10 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">حافظه کسب‌وکار</h1>
        <p className="text-muted-foreground mb-8">سیستم مشاوره هوشمند با شفافیت کامل</p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {features.map((feature, i) => (
            <div key={i} className="p-3 rounded-xl bg-muted/30 border border-border/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <feature.icon className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-sm">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Button
          onClick={onStartChat}
          size="lg"
          className="bg-gradient-to-br from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/20"
        >
          شروع گفتگو
        </Button>
      </div>
    </div>
  )
}
