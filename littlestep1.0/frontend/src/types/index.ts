export type TaskStatus = 'pending' | 'in_progress' | 'completed'
export type TaskCategory = 'homework' | 'life' | 'habit'

export interface SubTask {
  id: string
  title: string
  status: TaskStatus
  task_id: string
}

export interface Task {
  id: string
  title: string
  category: TaskCategory
  due_date: string
  status: TaskStatus
  user_id: string
  created_at: string
  content?: string
  subtasks?: SubTask[]
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
}
