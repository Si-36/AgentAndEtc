// Persian number conversion utilities
const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]

export function toPersianNumber(num: number | string): string {
  return String(num).replace(/\d/g, (d) => persianDigits[Number.parseInt(d)])
}

export function formatPersianNumber(num: number): string {
  return toPersianNumber(num.toLocaleString("fa-IR"))
}

export function formatPersianDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    calendar: "persian",
    numberingSystem: "arabext",
  }
  return new Intl.DateTimeFormat("fa-IR", options).format(date)
}

export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)

  if (diffMins < 1) return "همین الان"
  if (diffMins < 60) return `${toPersianNumber(diffMins)} دقیقه پیش`
  if (diffHours < 24) return `${toPersianNumber(diffHours)} ساعت پیش`
  if (diffDays < 7) return `${toPersianNumber(diffDays)} روز پیش`
  if (diffWeeks < 4) return `${toPersianNumber(diffWeeks)} هفته پیش`
  return `${toPersianNumber(diffMonths)} ماه پیش`
}

export function formatTokenCount(tokens: number, max: number): string {
  return `${toPersianNumber(tokens.toLocaleString())} / ${toPersianNumber(max.toLocaleString())}`
}

export function formatCurrency(amount: number, currency: "USD" | "IRR" = "USD"): string {
  if (currency === "USD") {
    return `$${toPersianNumber(amount.toFixed(2))}`
  }
  return `${toPersianNumber(amount.toLocaleString())} تومان`
}

export function formatDuration(seconds: number): string {
  if (seconds < 1) return `${toPersianNumber((seconds * 1000).toFixed(0))}ms`
  return `${toPersianNumber(seconds.toFixed(1))}s`
}

export function formatPercentage(value: number): string {
  return `${toPersianNumber(Math.round(value))}٪`
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${toPersianNumber(bytes)} بایت`
  if (bytes < 1024 * 1024) return `${toPersianNumber((bytes / 1024).toFixed(1))} کیلوبایت`
  if (bytes < 1024 * 1024 * 1024) return `${toPersianNumber((bytes / (1024 * 1024)).toFixed(1))} مگابایت`
  return `${toPersianNumber((bytes / (1024 * 1024 * 1024)).toFixed(2))} گیگابایت`
}
