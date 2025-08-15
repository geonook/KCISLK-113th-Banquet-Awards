"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Home, Trophy, Diamond, Star } from "lucide-react"
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

  // 找到各獎項類型的第一個位置
  const getAwardTypeFirstSlide = (awardType: string) => {
    const index = winners.findIndex((winner) => {
      if (awardType === "service") {
        return winner.awardType.includes("年資獎") || winner.awardType.includes("Years of Service")
      } else if (awardType === "rock") {
        return winner.awardType.includes("磐石獎")
      } else if (awardType === "excellence") {
        return winner.awardType.includes("優質獎") || winner.awardType.includes("Outstanding Performance")
      }
      return false
    })
    return index >= 0 ? index + 1 : -1 // +1 因為第0頁是標題頁
  }

  const serviceFirstSlide = getAwardTypeFirstSlide("service")
  const rockFirstSlide = getAwardTypeFirstSlide("rock")
  const excellenceFirstSlide = getAwardTypeFirstSlide("excellence")

  const handleAwardJump = (awardType: string) => {
    const slideIndex = getAwardTypeFirstSlide(awardType)
    if (slideIndex >= 0 && onGoToSlide) {
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

        {/* 獎項快速跳轉按鈕 - 只在 hover 時顯示 */}
        <div
          className={`flex items-center gap-1 mx-2 transition-all duration-300 ${
            isHovered ? "opacity-100 max-w-xs" : "opacity-0 max-w-0 overflow-hidden"
          }`}
        >
          {serviceFirstSlide >= 0 && (
            <Button
              onClick={() => handleAwardJump("service")}
              variant="ghost"
              size="sm"
              className="text-yellow-300 hover:bg-yellow-500/20 p-2 text-xs"
              title="跳轉到年資獎"
            >
              <Trophy className="w-4 h-4" />
            </Button>
          )}
          {rockFirstSlide >= 0 && (
            <Button
              onClick={() => handleAwardJump("rock")}
              variant="ghost"
              size="sm"
              className="text-blue-300 hover:bg-blue-500/20 p-2 text-xs"
              title="跳轉到磐石獎"
            >
              <Diamond className="w-4 h-4" />
            </Button>
          )}
          {excellenceFirstSlide >= 0 && (
            <Button
              onClick={() => handleAwardJump("excellence")}
              variant="ghost"
              size="sm"
              className="text-purple-300 hover:bg-purple-500/20 p-2 text-xs"
              title="跳轉到優質獎"
            >
              <Star className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* 進度指示器 */}
        <div className="flex items-center gap-1 mx-3">
          {Array.from({ length: Math.min(totalSlides, 10) }, (_, i) => {
            const slideIndex = Math.floor((i * totalSlides) / Math.min(totalSlides, 10))
            const isActive = Math.abs(slideIndex - currentSlide) <= totalSlides / 20
            const isAwardStart =
              slideIndex === serviceFirstSlide || slideIndex === rockFirstSlide || slideIndex === excellenceFirstSlide

            return (
              <button
                key={i}
                onClick={() => onGoToSlide?.(slideIndex)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-white scale-125"
                    : isAwardStart
                      ? "bg-gradient-to-r from-yellow-400 to-purple-400 scale-110"
                      : "bg-white/40 hover:bg-white/60"
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
        ← → 翻頁 • Home 首頁 • F 全螢幕 • P 照片管理
      </div>
    </div>
  )
}
