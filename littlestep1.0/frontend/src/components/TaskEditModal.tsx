import { useState } from 'react'
import { TaskCategory } from '../types'
import { CATEGORY_LABELS } from '../utils/constants'

interface TaskEditModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (taskData: { title: string; category: TaskCategory; due_date?: string }) => void
  initialCategory?: TaskCategory
  initialDate?: string
}

export default function TaskEditModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  initialCategory = 'homework',
  initialDate
}: TaskEditModalProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<TaskCategory>(initialCategory)
  const [dueDate, setDueDate] = useState(initialDate || '')

  const handleConfirm = () => {
    if (title.trim()) {
      onConfirm({ title: title.trim(), category, due_date: dueDate })
      setTitle('')
      setCategory(initialCategory)
      setDueDate(initialDate || '')
      onClose()
    }
  }

  const handleClose = () => {
    setTitle('')
    setCategory(initialCategory)
    setDueDate(initialDate || '')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
        <h3 className="text-lg font-bold text-text-primary mb-4">添加新任务</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              任务标题
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="请输入任务标题"
              className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              任务类别
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200"
            >
              {Object.entries(CATEGORY_LABELS).map(([key, value]) => (
                <option key={key} value={key}>
                  {value.icon} {value.title}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              任务时间
            </label>
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200"
            />
          </div>
        </div>
        
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2 text-text-secondary border border-border-light rounded-lg hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!title.trim()}
            className="flex-1 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            确认添加
          </button>
        </div>
      </div>
    </div>
  )
}