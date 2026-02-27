import type { ApiResponse } from '../types'

const BASE = '/api'

export async function getTasks(date?: string): Promise<ApiResponse<{ tasks: unknown[] }>> {
  const path = date ? '/tasks/date/' + date : '/tasks'
  const res = await fetch(BASE + path)
  return res.json()
}
