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

// 獎項類型跳轉定義
interface AwardSection {
  name: string
  awardType: string
  icon: any
  color: string
}

// 獎項分類按鈕配置
const awardSections: AwardSection[] = [
  { name: "年資獎", awardType: "service", icon: Award, color: "text-blue-300 hover:bg-blue-500/20" },
  { name: "磐石獎", awardType: "rock", icon: Heart, color: "text-green-300 hover:bg-green-500/20" },
  { name: "優質獎", awardType: "excellence", icon: Award, color: "text-yellow-300 hover:bg-yellow-500/20" }
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

  // 獎項跳轉處理
  const handleAwardJump = (awardType: string) => {
    if (!onGoToSlide || !winners.length) return
    
    // 找到第一個符合獎項類型的得獎者在線性流程中的位置
    const getAwardTypeSlideIndex = (type: string) => {
      if (type === "service") {
        // 年資獎在上半場獎項中，從第5個投影片開始（索引4）
        return 5 // 第一個年資獎位置
      } else if (type === "rock") {
        // 磐石獎也在上半場，需要找到第一個磐石獎位置
        const firstRockIndex = winners.findIndex(w => w.awardType.includes("磐石獎"))
        if (firstRockIndex >= 0 && firstRockIndex < 13) {
          return 5 + firstRockIndex // 上半場基礎位置 + 獎項索引
        }
      } else if (type === "excellence") {
        // 優質獎在下半場，從第21個投影片開始
        return 21 // 下半場頒獎首頁後的第一個優質獎
      }
      return 0
    }
    
    const slideIndex = getAwardTypeSlideIndex(awardType)
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      onGoToSlide(slideIndex)
    }
  }

  return (
    <div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex items-center bg-white/5 backdrop-blur-sm rounded-full transition-all duration-300 ${
          isHovered ? "scale-105 backdrop-blur-xl bg-white/15 px-4 py-3 shadow-lg border border-white/20" : "scale-90 px-3 py-2 shadow-sm border border-white/10"
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

        {/* 獎項快速跳轉按鈕 - 只在 hover 時顯示 */}
        <div
          className={`flex items-center gap-1 mx-2 transition-all duration-300 ${
            isHovered ? "opacity-100 max-w-lg" : "opacity-0 max-w-0 overflow-hidden"
          }`}
        >
          {awardSections.map((section) => {
            const IconComponent = section.icon
            return (
              <Button
                key={section.awardType}
                onClick={() => handleAwardJump(section.awardType)}
                variant="ghost"
                size="sm"
                className={`${section.color} p-1.5 text-xs transition-all duration-200`}
                title={`跳轉到${section.name}`}
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
            const isSectionStart = slideIndex % 10 === 0 || slideIndex === 4 || slideIndex === 21

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
← → 翻頁 • 獎項跳轉 • F 全螢幕 • P 照片管理
      </div>
    </div>
  )
}
