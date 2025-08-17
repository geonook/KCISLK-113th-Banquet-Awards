"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Home, Music, Heart, Award, Mic, Utensils, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { AwardWinner } from "@/types/award"

interface FullscreenNavigationProps {
  currentSlide: number
  totalSlides: number
  winners?: AwardWinner[]
  onPrevious: () => void
  onNext: () => void
  onGoToStart: () => void
  onGoToSlide?: (slideIndex: number) => void
}

// 線性簡報段落定義
interface PresentationSection {
  name: string
  slideIndex: number
  icon: any
  color: string
  shortcut: string
}

// 主要段落配置
const presentationSections: PresentationSection[] = [
  { name: "主頁", slideIndex: 0, icon: Home, color: "text-blue-300 hover:bg-blue-500/20", shortcut: "1" },
  { name: "小提琴", slideIndex: 1, icon: Music, color: "text-purple-300 hover:bg-purple-500/20", shortcut: "2" },
  { name: "董事長致詞", slideIndex: 2, icon: Mic, color: "text-green-300 hover:bg-green-500/20", shortcut: "3" },
  { name: "上半場頒獎", slideIndex: 4, icon: Award, color: "text-yellow-300 hover:bg-yellow-500/20", shortcut: "4" },
  { name: "用餐", slideIndex: 19, icon: Utensils, color: "text-orange-300 hover:bg-orange-500/20", shortcut: "6" },
  { name: "歡敬", slideIndex: 59, icon: PartyPopper, color: "text-pink-300 hover:bg-pink-500/20", shortcut: "7" }
]

export function FullscreenNavigation({
  currentSlide,
  totalSlides,
  winners = [],
  onPrevious,
  onNext,
  onGoToStart,
  onGoToSlide,
}: FullscreenNavigationProps) {
  const [isHovered, setIsHovered] = useState(false)

  // 段落跳轉處理
  const handleSectionJump = (slideIndex: number) => {
    if (onGoToSlide && slideIndex >= 0 && slideIndex < totalSlides) {
      onGoToSlide(slideIndex)
    }
  }

  // 計算合唱和舞蹈的實際位置（基於固定結構）
  const getPerformanceSlides = () => {
    // 合唱：投影片18（上半場頒獎首頁4 + 上半場13位獎項5-17 + 1 = 18）
    const choirSlide = 18
    // 舞蹈：投影片58（合唱18 + 用餐19 + 下半場首頁20 + 下半場37位獎項21-57 + 1 = 58）
    const danceSlide = 58
    return { choirSlide, danceSlide }
  }

  const { choirSlide, danceSlide } = getPerformanceSlides()
  
  // 完整段落配置（包含動態計算的位置）
  const allSections = [
    ...presentationSections.slice(0, 4), // 主頁到上半場頒獎
    { name: "合唱", slideIndex: choirSlide, icon: Heart, color: "text-cyan-300 hover:bg-cyan-500/20", shortcut: "5" },
    ...presentationSections.slice(4, 5), // 用餐
    { name: "舞蹈", slideIndex: danceSlide, icon: Music, color: "text-red-300 hover:bg-red-500/20", shortcut: "7" },
    ...presentationSections.slice(5) // 歡敬
  ]

  return (
    <div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-3 shadow-lg border border-white/20 transition-all duration-200 ${
          isHovered ? "scale-105 backdrop-blur-xl bg-white/15" : "scale-100"
        }`}
      >
        {/* 上一頁按鈕 */}
        <Button
          onClick={onPrevious}
          disabled={currentSlide === 0}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed p-2"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* 回到首頁按鈕 */}
        <Button
          onClick={onGoToStart}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 mx-2 p-2"
          title="回到首頁"
        >
          <Home className="w-4 h-4" />
        </Button>

        {/* 段落快速跳轉按鈕 - 只在 hover 時顯示 */}
        <div
          className={`flex items-center gap-1 mx-2 transition-all duration-300 ${
            isHovered ? "opacity-100 max-w-2xl" : "opacity-0 max-w-0 overflow-hidden"
          }`}
        >
          {allSections.map((section) => {
            const IconComponent = section.icon
            return (
              <Button
                key={section.shortcut}
                onClick={() => handleSectionJump(section.slideIndex)}
                variant="ghost"
                size="sm"
                className={`${section.color} p-1.5 text-xs transition-all duration-200`}
                title={`${section.shortcut}: ${section.name}`}
              >
                <IconComponent className="w-3.5 h-3.5" />
              </Button>
            )
          })}
        </div>

        {/* 進度指示器 */}
        <div className="flex items-center gap-1 mx-3">
          {Array.from({ length: Math.min(totalSlides, 12) }, (_, i) => {
            const slideIndex = Math.floor((i * totalSlides) / Math.min(totalSlides, 12))
            const isActive = Math.abs(slideIndex - currentSlide) <= totalSlides / 24
            const isSectionStart = allSections.some(section => 
              Math.abs(section.slideIndex - slideIndex) <= 2
            )

            return (
              <button
                key={i}
                onClick={() => onGoToSlide?.(slideIndex)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-white scale-125 shadow-lg"
                    : isSectionStart
                      ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 scale-110"
                      : "bg-white/40 hover:bg-white/60 hover:scale-105"
                }`}
                title={`跳轉到第 ${slideIndex + 1} 頁`}
              />
            )
          })}
        </div>

        {/* 頁面計數 */}
        <div className="text-white/80 text-sm font-medium mx-2 min-w-[3rem] text-center">
          {currentSlide + 1}/{totalSlides}
        </div>

        {/* 下一頁按鈕 */}
        <Button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed p-2"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* 鍵盤快捷鍵提示 - 只在 hover 時顯示 */}
      <div
        className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap transition-all duration-300 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
← → 翻頁 • 1-7 段落跳轉 • F 全螢幕 • P 照片管理
      </div>
    </div>
  )
}
