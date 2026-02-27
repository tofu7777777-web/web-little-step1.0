import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getMonthCalendar, formatMonthYear, today } from '../utils/date'
import { useTaskStore } from '../store/taskStore'
import TaskEditModal from '../components/TaskEditModal'
import type { Task } from '../types'

const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日']

export default function LeftSidebar() {
  const { selectedDate, setSelectedDate, tasks, setTasks } = useTaskStore()
  const current = selectedDate || today()
  const [viewYear, setViewYear] = useState(() => dayjs().year())
  const [viewMonth, setViewMonth] = useState(() => dayjs().month() + 1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('homework')

  useEffect(() => {
    if (!selectedDate) setSelectedDate(today())
  }, [selectedDate, setSelectedDate])

  useEffect(() => {
    if (selectedDate) {
      const d = dayjs(selectedDate)
      setViewYear(d.year())
      setViewMonth(d.month() + 1)
    }
  }, [selectedDate])

  const goPrev = () => {
    if (viewMonth === 1) {
      setViewMonth(12)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const goNext = () => {
    if (viewMonth === 12) {
      setViewMonth(1)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const cells = getMonthCalendar(viewYear, viewMonth)

  return (
    <aside className="w-64 shrink-0 flex flex-col border-r border-border-light bg-white overflow-hidden">
      <div className="p-3 flex flex-col flex-1 min-h-0">
        <div className="flex items-center justify-between gap-2 mb-3">
          <button
            type="button"
            onClick={goPrev}
            className="p-1.5 rounded-full border border-border-light bg-white text-text-secondary hover:ring-2 hover:ring-cyan-200 transition-all shadow-soft"
            aria-label="上一月"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-body font-title text-text-primary truncate">
            {formatMonthYear(viewYear, viewMonth)}
          </span>
          <button
            type="button"
            onClick={goNext}
            className="p-1.5 rounded-full border border-border-light bg-white text-text-secondary hover:ring-2 hover:ring-cyan-200 transition-all shadow-soft"
            aria-label="下一月"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-0.5 mb-1">
          {WEEKDAYS.map((w) => (
            <div key={w} className="text-center text-body text-text-secondary py-1">
              {w}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-0.5 flex-1 auto-rows-fr">
          {cells.map((cell) => {
            const isSelected = cell.dateStr === current
            return (
              <button
                key={cell.dateStr}
                type="button"
                onClick={() => setSelectedDate(cell.dateStr)}
                className={`min-h-[32px] rounded-lg border border-border-light text-body font-body flex items-center justify-center transition-all shadow-soft
                  ${!cell.isCurrentMonth ? 'text-gray-300 bg-white' : ''}
                  ${isSelected ? 'bg-task-done text-text-primary border-task-done ring-2 ring-cyan-200' : cell.isCurrentMonth ? 'text-text-primary bg-white hover:ring-2 hover:ring-cyan-200' : 'bg-white hover:bg-gray-50'}`}
                title={cell.dateStr}
              >
                {cell.dayNum}
              </button>
            )
          })}
        </div>
      </div>

      <div className="p-3 border-t border-border-light">
        <button
          type="button"
          onClick={() => {
            setSelectedCategory('homework')
            setIsModalOpen(true)
          }}
          className="w-full rounded-full bg-btn-pink text-text-primary py-3 text-body font-body shadow-soft hover:shadow-pressed transition-shadow border border-border-light"
        >
          添加任务到此清单
        </button>
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
            due_date: current,
            status: 'pending',
            user_id: '1',
            created_at: new Date().toISOString(),
            subtasks: []
          }
          setTasks([...tasks, newTask])
        }}
        initialCategory={selectedCategory as any}
      />
    </aside>
  )
}
