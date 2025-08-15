"use client"
import type { ReactNode } from "react"

interface PresentationContainerProps {
  children: ReactNode
}

export function PresentationContainer({ children }: PresentationContainerProps) {
  return (
    <div className="w-full h-screen overflow-hidden bg-black relative">
      {/* 16:9 比例容器 */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full h-full max-w-none aspect-video bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
