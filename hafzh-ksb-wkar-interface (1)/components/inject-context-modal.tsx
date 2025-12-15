"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Lightbulb } from "lucide-react"

interface InjectContextModalProps {
  open: boolean
  onClose: () => void
  onInject: (context: string) => void
}

export function InjectContextModal({ open, onClose, onInject }: InjectContextModalProps) {
  const [context, setContext] = useState("")

  const handleInject = () => {
    if (context.trim()) {
      onInject(context)
      setContext("")
      onClose()
    }
  }

  const examples = [
    "بودجه ما محدود به ۳۰ هزار دلار است",
    "رقیب اصلی ما قیمت را کاهش داده",
    "تیم فروش ۵ نفر افزایش یافته",
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-purple-400" />
            افزودن زمینه جدید
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">
              اطلاعات جدید را وارد کنید. عامل بلافاصله این اطلاعات را دریافت و استدلال خود را تنظیم می‌کند.
            </Label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="مثال: بودجه ما محدود به ۳۰ هزار دلار است..."
              className="min-h-[100px]"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Lightbulb className="w-3 h-3" />
              مثال‌ها:
            </div>
            <div className="flex flex-wrap gap-2">
              {examples.map((example, i) => (
                <button
                  key={i}
                  onClick={() => setContext(example)}
                  className="text-xs px-2 py-1 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            انصراف
          </Button>
          <Button
            onClick={handleInject}
            disabled={!context.trim()}
            className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
          >
            <Plus className="w-4 h-4 ml-2" />
            افزودن و ادامه
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
