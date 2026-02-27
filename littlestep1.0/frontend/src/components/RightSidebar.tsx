import { useTaskStore } from '../store/taskStore'

export default function RightSidebar() {
  const { tasks, selectedTaskId, setSelectedTaskId } = useTaskStore()
  const task = selectedTaskId ? tasks.find((t) => t.id === selectedTaskId) : null

  return (
    <aside className="w-72 shrink-0 border-l border-border-light bg-white flex flex-col overflow-hidden">
      <div className="p-4 border-b border-border-light">
        <h2 className="text-desc font-title text-text-primary">任务详情</h2>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {!task ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-[14px] font-body text-text-secondary">点击中间任务查看详情</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-desc font-title text-text-primary">{task.title}</h3>
            <p className="text-body font-body text-text-secondary">类别：{task.category}</p>
            {task.subtasks && task.subtasks.length > 0 && (
              <ul className="space-y-1.5">
                <span className="text-body font-body text-text-secondary">子任务</span>
                {task.subtasks.map((s) => (
                  <li key={s.id} className="text-body font-body text-text-secondary pl-0">
                    {s.title}
                  </li>
                ))}
              </ul>
            )}
            <button
              type="button"
              onClick={() => setSelectedTaskId(null)}
              className="text-body font-body text-text-secondary hover:text-text-primary transition-colors rounded-full border border-border-light px-3 py-1.5 shadow-soft hover:shadow-pressed"
            >
              关闭
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
