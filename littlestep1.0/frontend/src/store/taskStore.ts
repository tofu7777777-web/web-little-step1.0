import { create } from 'zustand'
import type { Task } from '../types'

interface TaskState {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  selectedDate: string
  setSelectedDate: (date: string) => void
  selectedTaskId: string | null
  setSelectedTaskId: (id: string | null) => void
}

// 从本地存储加载任务数据
const loadTasksFromStorage = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem('task-manager-tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
  } catch (error) {
    console.error('加载任务数据失败:', error)
    return []
  }
}

// 保存任务数据到本地存储
const saveTasksToStorage = (tasks: Task[]) => {
  try {
    localStorage.setItem('task-manager-tasks', JSON.stringify(tasks))
  } catch (error) {
    console.error('保存任务数据失败:', error)
  }
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: loadTasksFromStorage(),
  setTasks: (tasks) => {
    saveTasksToStorage(tasks)
    set({ tasks })
  },
  selectedDate: '',
  setSelectedDate: (date) => set({ selectedDate: date }),
  selectedTaskId: null,
  setSelectedTaskId: (id) => set({ selectedTaskId: id }),
}))
