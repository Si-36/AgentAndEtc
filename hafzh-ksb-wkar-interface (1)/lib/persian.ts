const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]

export function toPersian(num: number | string): string {
  return String(num).replace(/\d/g, (d) => persianDigits[Number.parseInt(d)])
}

export function formatTime(seconds: number): string {
  if (seconds < 1) return `${toPersian((seconds * 1000).toFixed(0))}ms`
  if (seconds < 60) return `${toPersian(seconds.toFixed(1))}s`
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${toPersian(mins)}:${toPersian(secs.toFixed(0).padStart(2, "0"))}`
}

export function formatTokens(tokens: number): string {
  if (tokens < 1000) return toPersian(tokens)
  return `${toPersian((tokens / 1000).toFixed(1))}K`
}

export function formatCost(cost: number): string {
  return `$${toPersian(cost.toFixed(3))}`
}

export function formatPercent(value: number): string {
  return `${toPersian(Math.round(value))}٪`
}

export function formatRelative(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return "همین الان"
  if (minutes < 60) return `${toPersian(minutes)} دقیقه پیش`
  if (hours < 24) return `${toPersian(hours)} ساعت پیش`
  if (days < 7) return `${toPersian(days)} روز پیش`
  if (days < 30) return `${toPersian(Math.floor(days / 7))} هفته پیش`
  return `${toPersian(Math.floor(days / 30))} ماه پیش`
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${toPersian(bytes)} B`
  if (bytes < 1024 * 1024) return `${toPersian((bytes / 1024).toFixed(1))} KB`
  if (bytes < 1024 * 1024 * 1024) return `${toPersian((bytes / (1024 * 1024)).toFixed(1))} MB`
  return `${toPersian((bytes / (1024 * 1024 * 1024)).toFixed(2))} GB`
}
