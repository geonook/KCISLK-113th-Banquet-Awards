"use client"

import { ChevronLeft, ChevronRight, Home, Play, Pause } from "lucide-react"

interface PremiumNavigationProps {
  currentSlide: number
  totalSlides: number
  onPrevious: () => void
  onNext: () => void
  onGoToStart: () => void
  isAutoPlay?: boolean
  onToggleAutoPlay?: () => void
}

export function PremiumNavigation({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onGoToStart,
  isAutoPlay = false,
  onToggleAutoPlay,
}: PremiumNavigationProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* 移除投影模式標示 */}

      {/* 進度條 - 頂部 */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-black/20 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* 導航控制 - 底部 */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div className="flex items-center space-x-4 bg-black/40 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
          {/* 上一頁 */}
          <button
            onClick={onPrevious}
            disabled={currentSlide === 0}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* 自動播放切換 */}
          {onToggleAutoPlay && (
            <button
              onClick={onToggleAutoPlay}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200"
            >
              {isAutoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          )}

          {/* 進度指示器 */}
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(totalSlides, 10) }, (_, i) => {
                const slideIndex = totalSlides > 10 ? Math.floor((i * totalSlides) / 10) : i
                return (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      slideIndex === currentSlide ? "bg-white scale-125" : "bg-white/40"
                    }`}
                  />
                )
              })}
            </div>
            <span className="text-white/80 text-sm font-medium ml-2">
              {currentSlide + 1} / {totalSlides}
            </span>
          </div>

          {/* 下一頁 */}
          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* 回到開始 */}
          <button
            onClick={onGoToStart}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 側邊導航提示 - 左右兩側 */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-auto opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={onPrevious}
          disabled={currentSlide === 0}
          className="w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-auto opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className="w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}
