import { useEffect } from 'react'
import { useState } from 'react'
import { formatDisplayDate, today, formatTime } from '../utils/date'
import { useTaskStore } from '../store/taskStore'
import { getTasks } from '../services/api'
import { CATEGORY_LABELS, CATEGORY_ORDER } from '../utils/constants'
import TaskEditModal from '../components/TaskEditModal'
import SubTaskEditModal from '../components/SubTaskEditModal'
import type { Task, SubTask } from '../types'

export default function HomePage() {
  const { tasks, setTasks, selectedDate, setSelectedTaskId } = useTaskStore()
  const displayDate = selectedDate || today()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubTaskModalOpen, setIsSubTaskModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('homework')
  const [selectedParentTaskId, setSelectedParentTaskId] = useState<string>('')

  useEffect(() => {
    // 优先使用本地存储的数据，只有在没有本地数据时才从API获取
    if (tasks.length === 0) {
      getTasks(displayDate)
        .then((res) => setTasks((res.data?.tasks as Task[]) ?? []))
        .catch(() => setTasks([]))
    }
  }, [displayDate, setTasks, tasks.length])

  const tasksByCategory = CATEGORY_ORDER.map((cat) => ({
    key: cat,
    label: CATEGORY_LABELS[cat]?.title ?? cat,
    tasks: tasks.filter((t) => t.category === cat),
  }))

  return (
    <div className="flex flex-col h-full">
      <header className="shrink-0 flex items-center justify-between px-5 py-3 border-b border-border-light bg-task-default shadow-soft">
        <h1 className="text-desc font-bold text-text-primary tracking-tight">Today's Tasks</h1>
        <span className="text-desc font-body text-text-secondary">{formatDisplayDate(displayDate)}</span>
      </header>

      <div className="flex-1 p-5 space-y-6 overflow-auto">
        {tasksByCategory.map(({ key, label, tasks: catTasks }) => (
          <section
            key={key}
            className="bg-gray-100 rounded-2xl p-4 border border-border-light shadow-soft"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{CATEGORY_LABELS[key]?.icon}</span>
                <h2 className="text-desc font-body text-text-primary">{label}</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(key)
                  setIsModalOpen(true)
                }}
                className="text-[12px] font-body text-text-secondary bg-task-default/80 px-3 py-1 rounded-full border border-border-light hover:bg-task-default transition-colors"
              >
                +
              </button>
            </div>
            {catTasks.length === 0 ? (
              <p className="text-body font-body text-text-secondary pl-2">暂无</p>
            ) : (
              <ul className="space-y-2">
                {catTasks.sort((a, b) => {
                  const timeA = a.due_date ? new Date(a.due_date).getTime() : 0
                  const timeB = b.due_date ? new Date(b.due_date).getTime() : 0
                  return timeA - timeB
                }).map((t) => {
                  const isDone = t.status === "completed"
                  return (
                    <li
                      key={t.id}
                      className={`rounded-full overflow-hidden border border-border-light shadow-soft transition-shadow hover:shadow-pressed ${isDone ? "bg-task-done" : "bg-task-default"}`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedTaskId(t.id)}
                        className="w-full text-left px-4 py-3 flex items-center gap-3"
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            const updatedTasks = tasks.map(task => 
                              task.id === t.id 
                                ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
                                : task
                            )
                            setTasks(updatedTasks)
                          }}
                          className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${isDone ? "border-green-500 bg-green-500 text-white" : "border-border-light bg-white hover:ring-2 hover:ring-cyan-200"}`}
                        >
                          {isDone && (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <span className={`text-body font-body text-text-primary flex-1 ${isDone ? "line-through text-text-secondary" : ""}`}>
                          {t.title}
                          {t.due_date && (
                            <span className="ml-2 text-xs text-text-secondary">
                              {formatTime(t.due_date)}
                            </span>
                          )}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedParentTaskId(t.id)
                            setIsSubTaskModalOpen(true)
                          }}
                          className="shrink-0 w-5 h-5 rounded-full border border-border-light bg-white text-text-secondary hover:bg-task-default transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            const updatedTasks = tasks.filter(task => task.id !== t.id)
                            setTasks(updatedTasks)
                          }}
                          className="shrink-0 w-5 h-5 rounded-full border border-border-light bg-white text-text-secondary hover:bg-red-50 hover:text-red-500 transition-colors flex items-center justify-center"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </button>
                      {t.subtasks && t.subtasks.length > 0 && (
                        <ul className="px-4 pb-3 pl-12 space-y-1 border-t border-border-light/60">
                          {t.subtasks.sort((a, b) => {
                            const timeA = a.due_date ? new Date(a.due_date).getTime() : 0
                            const timeB = b.due_date ? new Date(b.due_date).getTime() : 0
                            return timeA - timeB
                          }).map((s) => {
                            const isSubTaskDone = s.status === "completed"
                            return (
                              <li key={s.id} className="text-body font-body text-text-secondary flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    const updatedTasks = tasks.map(task => 
                                      task.id === t.id 
                                        ? { 
                                            ...task, 
                                            subtasks: task.subtasks?.map(subtask => 
                                              subtask.id === s.id 
                                                ? { ...subtask, status: subtask.status === 'completed' ? 'pending' : 'completed' }
                                                : subtask
                                            ) ?? []
                                          }
                                        : task
                                    )
                                    setTasks(updatedTasks)
                                  }}
                                  className={`shrink-0 w-4 h-4 rounded-full border flex items-center justify-center ${isSubTaskDone ? "border-green-500 bg-green-500 text-white" : "border-border-light bg-white hover:ring-2 hover:ring-cyan-200"}`}
                                >
                                  {isSubTaskDone && (
                                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </button>
                                <span className={`flex-1 ${isSubTaskDone ? "line-through text-text-secondary/60" : ""}`}>
                                  {s.title}
                                  {s.due_date && (
                                    <span className="ml-2 text-xs text-text-secondary/60">
                                      {formatTime(s.due_date)}
                                    </span>
                                  )}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    const updatedTasks = tasks.map(task => 
                                      task.id === t.id 
                                        ? { 
                                            ...task, 
                                            subtasks: task.subtasks?.filter(subtask => subtask.id !== s.id) ?? []
                                          }
                                        : task
                                    )
                                    setTasks(updatedTasks)
                                  }}
                                  className="shrink-0 w-4 h-4 rounded-full border border-border-light bg-white text-text-secondary hover:bg-red-50 hover:text-red-500 transition-colors flex items-center justify-center"
                                >
                                  <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        ))}
      </div>
      
      <TaskEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={(taskData) => {
          console.log('添加任务:', taskData)
          // 这里将调用API添加任务
          const newTask: Task = {
            id: Date.now().toString(),
            title: taskData.title,
            category: taskData.category,
            due_date: taskData.due_date || displayDate,
            status: 'pending',
            user_id: '1',
            created_at: new Date().toISOString(),
            subtasks: []
          }
          setTasks([...tasks, newTask])
        }}
        initialCategory={selectedCategory as any}
      />
      
      <SubTaskEditModal
        isOpen={isSubTaskModalOpen}
        onClose={() => setIsSubTaskModalOpen(false)}
        onConfirm={(taskData) => {
          console.log('添加子任务:', taskData, '父任务ID:', selectedParentTaskId)
          // 这里将调用API添加子任务
          const newSubTask: SubTask = {
            id: Date.now().toString(),
            title: taskData.title,
            status: 'pending',
            task_id: selectedParentTaskId
          }
          
          const updatedTasks = tasks.map(task => 
            task.id === selectedParentTaskId 
              ? { 
                  ...task, 
                  subtasks: [...(task.subtasks || []), newSubTask] 
                }
              : task
          )
          setTasks(updatedTasks)
        }}
        parentTaskId={selectedParentTaskId}
        initialCategory={selectedCategory as any}
      />
    </div>
  )
}
