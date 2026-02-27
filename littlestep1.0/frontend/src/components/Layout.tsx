import { ReactNode } from 'react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffe8f2] via-[#fdf7ff] to-[#e9f3ff] flex items-center justify-center px-4 py-6">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-pressed border border-[#f4f0ea] overflow-hidden">
        <header className="shrink-0 bg-gradient-to-r from-[#ffb7d5] to-[#ff9fd0] px-6 py-4 text-center relative overflow-hidden">
          <span className="pointer-events-none absolute -top-10 -left-10 h-28 w-28 rounded-full bg-white/20 blur-md" />
          <span className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-white/15 blur-lg" />
          <h1 className="text-title font-bold text-white drop-shadow-sm flex items-center justify-center gap-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Little Step
          </h1>
          <p className="text-desc font-body text-white/95 mt-1 drop-shadow-sm">贝贝的虚拟成长伙伴</p>
        </header>
        <div className="flex min-h-[520px]">
          <LeftSidebar />
          <main className="flex-1 min-w-0 flex flex-col overflow-auto">
            {children}
          </main>
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}
