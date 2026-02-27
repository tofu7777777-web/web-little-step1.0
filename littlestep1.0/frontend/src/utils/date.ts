import dayjs from 'dayjs'

export function formatDisplayDate(date: string): string {
  return dayjs(date).format('YYYY年M月D日')
}

export function formatTime(date: string): string {
  return dayjs(date).format('HH:mm')
}

export function getWeekDates(base?: string): string[] {
  const d = base ? dayjs(base) : dayjs()
  const start = d.startOf('week')
  return Array.from({ length: 7 }, (_, i) =>
    start.add(i, 'day').format('YYYY-MM-DD')
  )
}

export function today(): string {
  return dayjs().format('YYYY-MM-DD')
}

/** 从 YYYY-MM-DD 取日（小印章用） */
export function getDayNum(dateStr: string): number {
  return dayjs(dateStr).date()
}

/** 日历格：日期字符串、日数字、是否属于当前月份 */
export interface CalendarCell {
  dateStr: string
  dayNum: number
  isCurrentMonth: boolean
}

/** 获取某年某月的日历网格（周一到周日，约 6 行） */
export function getMonthCalendar(year: number, month: number): CalendarCell[] {
  const first = dayjs().year(year).month(month - 1).date(1)
  const start = first.subtract(first.day() === 0 ? 6 : first.day() - 1, 'day')
  const cells: CalendarCell[] = []
  for (let i = 0; i < 42; i++) {
    const d = start.add(i, 'day')
    const dateStr = d.format('YYYY-MM-DD')
    const isCurrentMonth = d.month() === month - 1
    cells.push({
      dateStr,
      dayNum: d.date(),
      isCurrentMonth,
    })
  }
  return cells
}

/** 月份+年份展示：December 2025 */
export function formatMonthYear(year: number, month: number): string {
  return dayjs().year(year).month(month - 1).format('MMMM YYYY')
}
