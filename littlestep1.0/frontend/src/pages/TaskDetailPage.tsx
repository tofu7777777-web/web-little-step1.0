import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTaskStore } from '../store/taskStore'
import { Task } from '../types'

export default function TaskDetailPage() {
  const { id } = useParams()
  const { tasks, setTasks } = useTaskStore()
  const [task, setTask] = useState<Task | null>(null)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [editedTitle, setEditedTitle] = useState('')
  const [editedContent, setEditedContent] = useState('')

  useEffect(() => {
    if (id && tasks.length > 0) {
      const foundTask = tasks.find(t => t.id === id)
      if (foundTask) {
        setTask(foundTask)
        setEditedTitle(foundTask.title)
        setEditedContent(foundTask.content || '')
      }
    }
  }, [id, tasks])

  const handleSaveTitle = () => {
    if (task && editedTitle.trim()) {
      const updatedTasks = tasks.map(t => 
        t.id === task.id 
          ? { ...t, title: editedTitle.trim() }
          : t
      )
      setTasks(updatedTasks)
      setIsEditingTitle(false)
    }
  }

  const handleSaveContent = () => {
    if (task) {
      const updatedTasks = tasks.map(t => 
        t.id === task.id 
          ? { ...t, content: editedContent }
          : t
      )
      setTasks(updatedTasks)
    }
  }

  if (!task) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        <h1 className="text-lg font-bold">任务详情</h1>
        <p className="text-gray-500 mt-2">任务不存在</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow max-w-4xl mx-auto">
      <div className="mb-6">
        {isEditingTitle ? (
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-2xl font-bold border-b-2 border-cyan-500 focus:outline-none flex-1"
              autoFocus
            />
            <button
              onClick={handleSaveTitle}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              保存
            </button>
            <button
              onClick={() => {
                setIsEditingTitle(false)
                setEditedTitle(task.title)
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{task.title}</h1>
            <button
              onClick={() => setIsEditingTitle(true)}
              className="text-gray-500 hover:text-cyan-500 transition-colors"
              title="编辑标题"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
        )}
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <span>任务 ID: {task.id}</span>
          <span>类别: {task.category}</span>
          <span>状态: {task.status}</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">任务详情</h2>
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          onBlur={handleSaveContent}
          placeholder="请输入任务详细描述..."
          className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200 resize-none"
        />
        <p className="text-sm text-gray-500 mt-1">内容会自动保存</p>
      </div>

      {task.subtasks && task.subtasks.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">子任务</h2>
          <ul className="space-y-2">
            {task.subtasks.map((subtask) => (
              <li key={subtask.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className={`flex-1 ${subtask.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
                  {subtask.title}
                </span>
                <span className="text-sm text-gray-500">
                  {subtask.status === 'completed' ? '已完成' : '待完成'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
