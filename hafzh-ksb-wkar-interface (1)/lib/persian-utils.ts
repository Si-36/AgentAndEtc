// Persian utility functions
export function toPersianNum(num: number | string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"]
  return String(num).replace(/[0-9]/g, (d) => persianDigits[Number.parseInt(d)])
}

export function formatPersianDate(date: Date = new Date()): string {
  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ]
  // Simplified Jalali conversion
  const jy = date.getFullYear() - 621
  const jm = date.getMonth()
  const jd = date.getDate()
  return `${toPersianNum(jd)} ${persianMonths[jm]} ${toPersianNum(jy)}`
}

export function formatPersianTime(date: Date = new Date()): string {
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const seconds = date.getSeconds().toString().padStart(2, "0")
  return `${toPersianNum(hours)}:${toPersianNum(minutes)}:${toPersianNum(seconds)}`
}

export function formatPersianDateTime(date: Date = new Date()): string {
  return `${formatPersianDate(date)} - ${formatPersianTime(date)}`
}

export function formatPersianCurrency(amount: number): string {
  return `$${toPersianNum(amount.toFixed(3))}`
}

export function formatPersianTokens(tokens: number): string {
  if (tokens >= 1000) {
    return `${toPersianNum((tokens / 1000).toFixed(1))}K`
  }
  return toPersianNum(tokens)
}

export function formatElapsed(ms: number): string {
  const seconds = (ms / 1000).toFixed(1)
  return `${toPersianNum(seconds)}s`
}

export function getRelativeTime(timestamp: string): string {
  const times: Record<string, string> = {
    now: "الان",
    "2h": "۲ ساعت پیش",
    yesterday: "دیروز",
    "3d": "۳ روز پیش",
    "1w": "۱ هفته پیش",
    "2w": "۲ هفته پیش",
    "1m": "۱ ماه پیش",
    "6m": "۶ ماه پیش",
  }
  return times[timestamp] || timestamp
}
