"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  BarChart3,
  Zap,
  Settings,
  User,
  Building2,
  Target,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Star,
  Search,
  AlertTriangle,
  TrendingUp,
  Clock,
  Check,
  X,
  Moon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { toPersianNumber, formatPercentage, formatRelativeTime, formatFileSize } from "@/lib/persian-utils"
import type { Memory, Alert, User as UserType } from "@/types/business-memory"

interface RightPanelProps {
  user: UserType
  memories: Memory[]
  alerts: Alert[]
  stats: {
    totalConversations: number
    totalDebates: number
    decisionsTracked: number
    successRate: number
    rlImprovement: number
    averageResponseTime: number
    npsScore: number
    thumbsUpRatio: number
    memorySize: number
    lastBackup: Date
    systemAccuracy: number
    accuracyChange: number
  }
  isCollapsed: boolean
  onToggleCollapse: () => void
}

const priorities = [
  { id: "1", label: "افزایش فروش ۳۰٪", completed: false },
  { id: "2", label: "توسعه به دبی", completed: false },
  { id: "3", label: "کاهش هزینه‌ها", completed: true },
]

export function RightPanel({ user, memories, alerts, stats, isCollapsed, onToggleCollapse }: RightPanelProps) {
  const [activeTab, setActiveTab] = useState("memory")
  const [searchQuery, setSearchQuery] = useState("")
  const [darkMode, setDarkMode] = useState(false)

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 0 : 340 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={cn(
        "hidden lg:flex flex-col h-full bg-sidebar border-s border-sidebar-border relative overflow-hidden",
      )}
    >
      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleCollapse}
        className="absolute -start-3 top-6 z-10 h-6 w-6 rounded-full bg-background border shadow-sm hover:bg-accent"
      >
        {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </Button>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
              <TabsList className="w-full justify-start px-2 pt-2 rounded-none bg-transparent border-b">
                <TabsTrigger value="memory" className="gap-1.5 text-xs">
                  <Brain className="h-3.5 w-3.5" />
                  حافظه
                </TabsTrigger>
                <TabsTrigger value="stats" className="gap-1.5 text-xs">
                  <BarChart3 className="h-3.5 w-3.5" />
                  آمار
                </TabsTrigger>
                <TabsTrigger value="alerts" className="gap-1.5 text-xs relative">
                  <Zap className="h-3.5 w-3.5" />
                  هشدارها
                  {alerts.length > 0 && (
                    <span className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-error text-[10px] text-white flex items-center justify-center">
                      {toPersianNumber(alerts.length)}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-1.5 text-xs">
                  <Settings className="h-3.5 w-3.5" />
                  تنظیمات
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="flex-1">
                {/* Memory Tab */}
                <TabsContent value="memory" className="m-0 p-4 space-y-4">
                  {/* Core Memory */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase">حافظه هسته</h3>

                    {/* User Profile */}
                    <Card className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">پروفایل شما</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>نام: {user.name}</p>
                        <p>نقش: {user.role}</p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {user.preferences.map((pref, i) => (
                            <Badge key={i} variant="secondary" className="text-[10px]">
                              {pref}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>

                    {/* Company Profile */}
                    <Card className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">پروفایل شرکت</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>نام: {user.company.name}</p>
                        <p>صنعت: {user.company.industry}</p>
                        <p>اندازه: {toPersianNumber(user.company.size)} نفر</p>
                        <p>تأسیس: {toPersianNumber(user.company.founded)}</p>
                      </div>
                    </Card>

                    {/* Priorities */}
                    <Card className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">اولویت‌های فعلی</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {priorities.map((priority) => (
                          <div key={priority.id} className="flex items-center gap-2 text-xs">
                            <div
                              className={cn(
                                "w-4 h-4 rounded border flex items-center justify-center",
                                priority.completed
                                  ? "bg-success/10 border-success text-success"
                                  : "border-muted-foreground",
                              )}
                            >
                              {priority.completed && <Check className="h-3 w-3" />}
                            </div>
                            <span className={cn(priority.completed && "line-through text-muted-foreground")}>
                              {priority.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Working Memory */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase">حافظه کاری</h3>
                    {memories.map((memory) => (
                      <Card
                        key={memory.id}
                        className={cn("p-3", memory.isActive && "border-primary ring-2 ring-primary/20")}
                      >
                        {memory.isActive && (
                          <Badge className="mb-2 bg-success/10 text-success border-success/20 text-[10px] animate-pulse">
                            در حال استفاده
                          </Badge>
                        )}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{memory.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{formatRelativeTime(memory.date)}</p>
                            {memory.result && (
                              <Badge
                                variant="outline"
                                className={cn(
                                  "mt-1.5 text-[10px]",
                                  memory.result === "success"
                                    ? "border-success/50 text-success"
                                    : "border-error/50 text-error",
                                )}
                              >
                                {memory.result === "success" ? "موفق ✓" : "ناموفق ✗"}
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-0.5 flex-shrink-0">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Star className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Archival Memory Search */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase">آرشیو حافظه</h3>
                    <div className="relative">
                      <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="جستجو در ۱۲,۳۴۵ خاطره..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ps-9 h-9 text-sm"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>حافظه کل: {formatFileSize(stats.memorySize)}</p>
                      <p>آخرین پشتیبان: {formatRelativeTime(stats.lastBackup)}</p>
                    </div>
                  </div>
                </TabsContent>

                {/* Stats Tab */}
                <TabsContent value="stats" className="m-0 p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="p-3 text-center">
                      <p className="text-2xl font-bold text-primary">{toPersianNumber(stats.totalConversations)}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">کل گفتگوها</p>
                    </Card>
                    <Card className="p-3 text-center">
                      <p className="text-2xl font-bold text-primary">{toPersianNumber(stats.totalDebates)}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">تحلیل‌ها</p>
                    </Card>
                    <Card className="p-3 text-center">
                      <p className="text-2xl font-bold text-primary">{toPersianNumber(stats.decisionsTracked)}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">تصمیمات</p>
                    </Card>
                    <Card className="p-3 text-center">
                      <p className="text-2xl font-bold text-success">{formatPercentage(stats.successRate)}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">نرخ موفقیت</p>
                    </Card>
                  </div>

                  <Card className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">بهبود سیستم</span>
                      <Badge className="bg-success/10 text-success border-success/20">
                        +{formatPercentage(stats.rlImprovement)}
                      </Badge>
                    </div>
                    <Progress value={stats.rlImprovement} className="h-2 [&>div]:bg-success" />
                  </Card>

                  <Card className="p-3">
                    <p className="text-sm font-medium mb-3">شاخص‌های کلیدی</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">میانگین زمان پاسخ</span>
                        <span className="font-medium">{toPersianNumber(stats.averageResponseTime)} ثانیه</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">امتیاز NPS</span>
                        <span className="font-medium">{toPersianNumber(stats.npsScore)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">نرخ رضایت</span>
                        <span className="font-medium text-success">{formatPercentage(stats.thumbsUpRatio)}</span>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Alerts Tab */}
                <TabsContent value="alerts" className="m-0 p-4 space-y-4">
                  <h3 className="text-xs font-medium text-muted-foreground uppercase">هشدارهای پیش‌بین</h3>
                  {alerts.map((alert) => (
                    <Card key={alert.id} className="p-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                            alert.priority === "high"
                              ? "bg-error/10 text-error"
                              : alert.priority === "medium"
                                ? "bg-warning/10 text-warning"
                                : "bg-muted text-muted-foreground",
                          )}
                        >
                          {alert.priority === "high" ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : (
                            <TrendingUp className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              className={cn(
                                "text-[10px]",
                                alert.priority === "high"
                                  ? "bg-error/10 text-error border-error/20"
                                  : alert.priority === "medium"
                                    ? "bg-warning/10 text-warning border-warning/20"
                                    : "bg-muted text-muted-foreground",
                              )}
                            >
                              {alert.priority === "high" ? "فوری" : alert.priority === "medium" ? "متوسط" : "کم"}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground">{formatRelativeTime(alert.date)}</span>
                          </div>
                          <p className="text-sm font-medium">{alert.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{alert.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] text-muted-foreground">اطمینان:</span>
                            <Progress value={alert.confidence} className="h-1 flex-1" />
                            <span className="text-[10px] font-medium">{formatPercentage(alert.confidence)}</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                              بررسی
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs">
                              <Check className="h-3 w-3 me-1" />
                              انجام شد
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive">
                              <X className="h-3 w-3 me-1" />
                              رد
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {/* Sleep-time Compute */}
                  <Card className="p-3">
                    <div className="flex items-center gap-2 mb-3">
                      <Moon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">پردازش پس‌زمینه</span>
                    </div>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">خلاصه‌سازی گفتگوها</span>
                          <span>{formatPercentage(34)}</span>
                        </div>
                        <Progress value={34} className="h-1" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">بروزرسانی دانش</span>
                          <span>{formatPercentage(89)}</span>
                        </div>
                        <Progress value={89} className="h-1" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">بهینه‌سازی حافظه</span>
                          <span>{formatPercentage(12)}</span>
                        </div>
                        <Progress value={12} className="h-1" />
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2">
                      <Clock className="h-3 w-3 inline me-1" />
                      تخمین: {toPersianNumber(5)} دقیقه
                    </p>
                  </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="m-0 p-4 space-y-4">
                  <Card className="p-3 space-y-4">
                    <h4 className="text-sm font-medium">تنظیمات کاربر</h4>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="dark-mode" className="text-sm">
                        حالت تاریک
                      </Label>
                      <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications" className="text-sm">
                        اعلان‌ها
                      </Label>
                      <Switch id="notifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-save" className="text-sm">
                        ذخیره خودکار
                      </Label>
                      <Switch id="auto-save" defaultChecked />
                    </div>
                  </Card>

                  <Card className="p-3 space-y-4">
                    <h4 className="text-sm font-medium">تنظیمات نماینده‌ها</h4>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">سطح خلاقیت</Label>
                      <Slider defaultValue={[5]} max={10} min={1} step={1} />
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>محافظه‌کار</span>
                        <span>خلاق</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">سطح جزئیات</Label>
                      <Slider defaultValue={[7]} max={10} min={1} step={1} />
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>خلاصه</span>
                        <span>کامل</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">سرعت/عمق</Label>
                      <Slider defaultValue={[5]} max={10} min={1} step={1} />
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>سریع</span>
                        <span>عمیق</span>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  )
}
