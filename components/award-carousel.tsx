"use client"

import { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { RockAwardSlide } from "./rock-award-slide"
import { ExcellenceAwardSlide } from "./excellence-award-slide"
import type { AwardWinner } from "../types/award"

interface AwardCarouselProps {
  winners: AwardWinner[]
  awardType: "rock" | "excellence"
  autoplayDelay?: number
}

export function AwardCarousel({ winners, awardType, autoplayDelay = 5000 }: AwardCarouselProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // 設定 Embla Carousel with smooth animations
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    duration: 30, // 流暢的轉場速度 (30ms)
    dragFree: false,
    containScroll: "trimSnaps",
  })

  // 監聽當前投影片索引
  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    onSelect()

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  // 自動播放功能
  useEffect(() => {
    if (!emblaApi || isPaused) return

    const autoplay = setInterval(() => {
      emblaApi.scrollNext()
    }, autoplayDelay)

    return () => clearInterval(autoplay)
  }, [emblaApi, isPaused, autoplayDelay])

  // 控制播放/暫停
  const toggleAutoplay = useCallback(() => {
    setIsPaused(!isPaused)
  }, [isPaused])

  // 上一張
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  // 下一張
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  // 鍵盤控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        scrollPrev()
      } else if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        scrollNext()
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault()
        toggleAutoplay()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [scrollPrev, scrollNext, toggleAutoplay])

  // 渲染對應的獎項投影片
  const renderAwardSlide = (winner: AwardWinner) => {
    if (awardType === "rock") {
      return <RockAwardSlide winner={winner} isActive={true} />
    } else {
      return <ExcellenceAwardSlide winner={winner} isActive={true} />
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Embla Carousel Container with smooth transitions */}
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full flex transition-transform duration-700 ease-out">
          {winners.map((winner, index) => (
            <div
              key={winner.id}
              className="embla__slide flex-[0_0_100%] min-w-0 relative"
              style={{
                opacity: index === currentIndex ? 1 : 0.3,
                transition: 'opacity 0.7s ease-in-out',
              }}
            >
              <div className="w-full h-full transform transition-all duration-700 ease-out">
                {renderAwardSlide(winner)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 控制面板 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-4 rounded-full border border-white/20 shadow-2xl">
        {/* 上一張按鈕 */}
        <button
          onClick={scrollPrev}
          className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* 播放/暫停按鈕 */}
        <button
          onClick={toggleAutoplay}
          className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
        </button>

        {/* 下一張按鈕 */}
        <button
          onClick={scrollNext}
          className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* 頁碼指示器 */}
        <div className="ml-4 px-4 py-2 bg-white/10 rounded-full">
          <span className="text-white font-bold text-sm">
            {currentIndex + 1} / {winners.length}
          </span>
        </div>
      </div>

      {/* 進度指示器 */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {winners.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* 鍵盤提示 */}
      <div className="absolute top-8 right-8 z-40 bg-black/40 backdrop-blur-md px-4 py-3 rounded-lg border border-white/20 text-white text-sm opacity-60 hover:opacity-100 transition-opacity duration-300">
        <div className="space-y-1">
          <div><kbd className="px-2 py-1 bg-white/20 rounded">←</kbd> <kbd className="px-2 py-1 bg-white/20 rounded">→</kbd> 切換</div>
          <div><kbd className="px-2 py-1 bg-white/20 rounded">P</kbd> 暫停/播放</div>
          <div><kbd className="px-2 py-1 bg-white/20 rounded">ESC</kbd> 返回</div>
        </div>
      </div>

      {/* 獎項類型標籤 */}
      <div className="absolute top-8 left-8 z-40 px-6 py-3 rounded-full font-bold text-white shadow-xl border-2 border-white/30 text-xl bg-gradient-to-r from-purple-500/80 to-blue-500/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{awardType === "rock" ? "💎" : "🌟"}</span>
          <span>{awardType === "rock" ? "磐石獎輪播" : "優質獎輪播"}</span>
          <span className="text-sm opacity-80">({winners.length}位)</span>
        </div>
      </div>
    </div>
  )
}