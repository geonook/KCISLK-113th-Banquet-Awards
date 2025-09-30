"use client"

import { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { RockAwardSlide } from "./rock-award-slide"
import { ExcellenceAwardSlide } from "./excellence-award-slide"
import { RockAwardTitleSlide } from "./rock-award-title-slide"
import { ExcellenceAwardTitleSlide } from "./excellence-award-title-slide"
import type { AwardWinner } from "../types/award"

interface UnifiedAwardCarouselProps {
  rockWinners: AwardWinner[]
  excellenceWinners: AwardWinner[]
  autoplayDelay?: number
}

type CarouselItem =
  | { type: 'rock-title' }
  | { type: 'rock-winner', winner: AwardWinner }
  | { type: 'excellence-title' }
  | { type: 'excellence-winner', winner: AwardWinner }

export function UnifiedAwardCarousel({
  rockWinners,
  excellenceWinners,
  autoplayDelay = 5000
}: UnifiedAwardCarouselProps) {
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // 建立完整的輪播項目陣列
  const carouselItems: CarouselItem[] = [
    { type: 'rock-title' },
    ...rockWinners.map(w => ({ type: 'rock-winner' as const, winner: w })),
    { type: 'excellence-title' },
    ...excellenceWinners.map(w => ({ type: 'excellence-winner' as const, winner: w }))
  ]

  const totalItems = carouselItems.length

  // 設定 Embla Carousel with instant switching for smooth CSS animations
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    duration: 0, // 瞬間切換，完全由 CSS 動畫控制
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

  // 自動播放功能（標題頁停留 6 秒，得獎者停留設定時間）
  useEffect(() => {
    if (!emblaApi || isPaused) return

    const currentItem = carouselItems[currentIndex]
    const delay = (currentItem.type === 'rock-title' || currentItem.type === 'excellence-title')
      ? 6000 // 標題頁停留 6 秒
      : autoplayDelay // 得獎者停留設定時間

    const autoplay = setTimeout(() => {
      emblaApi.scrollNext()
    }, delay)

    return () => clearTimeout(autoplay)
  }, [emblaApi, isPaused, currentIndex, autoplayDelay, carouselItems])

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

  // 檢測全螢幕狀態
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

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
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault()
        // F 鍵切換全螢幕
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen()
        } else {
          document.exitFullscreen()
        }
      } else if (e.key === "Escape") {
        // ESC 鍵離開全螢幕（由瀏覽器自動處理，但可添加額外邏輯）
        if (document.fullscreenElement) {
          e.preventDefault()
          document.exitFullscreen()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [scrollPrev, scrollNext, toggleAutoplay])

  // 渲染對應的投影片
  const renderSlide = (item: CarouselItem) => {
    switch (item.type) {
      case 'rock-title':
        return <RockAwardTitleSlide isActive={true} />
      case 'rock-winner':
        return <RockAwardSlide winner={item.winner} isActive={true} />
      case 'excellence-title':
        return <ExcellenceAwardTitleSlide isActive={true} />
      case 'excellence-winner':
        return <ExcellenceAwardSlide winner={item.winner} isActive={true} />
    }
  }

  // 取得當前區塊資訊
  const getCurrentSection = () => {
    const item = carouselItems[currentIndex]
    if (item.type === 'rock-title' || item.type === 'rock-winner') {
      return { icon: '💎', name: '磐石獎', color: 'from-purple-500/80 to-blue-500/80' }
    } else {
      return { icon: '🌟', name: '優質獎', color: 'from-orange-500/80 to-red-500/80' }
    }
  }

  const currentSection = getCurrentSection()

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Embla Carousel Container with dramatic 3D transitions */}
      <div className="embla h-full" ref={emblaRef} style={{ perspective: '1500px' }}>
        <div className="embla__container h-full flex">
          {carouselItems.map((item, index) => {
            const isActive = index === currentIndex

            return (
              <div
                key={index}
                className="embla__slide flex-[0_0_100%] min-w-0 relative"
                style={{
                  animation: isActive
                    ? 'carousel-dramatic-smooth-enter 1.2s ease-out forwards'
                    : 'carousel-dramatic-smooth-exit 1.2s ease-out forwards',
                  opacity: isActive ? 1 : 0,
                  willChange: 'transform, opacity',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    transform: 'translate3d(0, 0, 0)', // GPU 加速 hack
                    contain: 'layout style paint', // 限制瀏覽器重繪範圍
                  }}
                >
                  {renderSlide(item)}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 控制面板 - 全螢幕時縮小且透明化 */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center rounded-full transition-all duration-300 ${
        isFullscreen
          ? 'gap-2 px-3 py-2 scale-75 opacity-30 hover:opacity-90 bg-black/20 backdrop-blur-sm border border-white/10 shadow-lg'
          : 'gap-4 px-6 py-4 bg-black/60 backdrop-blur-md border border-white/20 shadow-2xl'
      }`}>
        {/* 上一張按鈕 */}
        <button
          onClick={scrollPrev}
          className={`rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isFullscreen ? 'w-8 h-8' : 'w-12 h-12'
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft className={isFullscreen ? 'w-4 h-4' : 'w-6 h-6'} />
        </button>

        {/* 播放/暫停按鈕 */}
        <button
          onClick={toggleAutoplay}
          className={`rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isFullscreen ? 'w-8 h-8' : 'w-12 h-12'
          }`}
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? <Play className={isFullscreen ? 'w-4 h-4' : 'w-6 h-6'} /> : <Pause className={isFullscreen ? 'w-4 h-4' : 'w-6 h-6'} />}
        </button>

        {/* 下一張按鈕 */}
        <button
          onClick={scrollNext}
          className={`rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isFullscreen ? 'w-8 h-8' : 'w-12 h-12'
          }`}
          aria-label="Next slide"
        >
          <ChevronRight className={isFullscreen ? 'w-4 h-4' : 'w-6 h-6'} />
        </button>

        {/* 頁碼指示器 */}
        <div className={`bg-white/10 rounded-full ${isFullscreen ? 'ml-2 px-2 py-1' : 'ml-4 px-4 py-2'}`}>
          <span className={`text-white font-bold ${isFullscreen ? 'text-xs' : 'text-sm'}`}>
            {currentIndex + 1} / {totalItems}
          </span>
        </div>
      </div>

      {/* 進度指示器 - 限制顯示數量避免過多，全螢幕時透明化 */}
      <div className={`absolute bottom-24 left-1/2 -translate-x-1/2 z-40 flex gap-2 max-w-[80%] overflow-x-auto scrollbar-hide transition-opacity duration-300 ${
        isFullscreen ? 'opacity-20 hover:opacity-60' : 'opacity-100'
      }`}>
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 flex-shrink-0 ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* 鍵盤提示 - 全螢幕時隱藏 */}
      {!isFullscreen && (
        <div className="absolute top-8 right-8 z-40 bg-black/40 backdrop-blur-md px-4 py-3 rounded-lg border border-white/20 text-white text-sm opacity-60 hover:opacity-100 transition-opacity duration-300">
          <div className="space-y-1">
            <div><kbd className="px-2 py-1 bg-white/20 rounded">←</kbd> <kbd className="px-2 py-1 bg-white/20 rounded">→</kbd> 切換</div>
            <div><kbd className="px-2 py-1 bg-white/20 rounded">P</kbd> 暫停/播放</div>
            <div><kbd className="px-2 py-1 bg-white/20 rounded">F</kbd> 全螢幕</div>
          </div>
        </div>
      )}

      {/* 獎項類型標籤 - 動態顯示當前區塊，全螢幕時隱藏 */}
      {!isFullscreen && (
        <div className={`absolute top-8 left-8 z-40 px-6 py-3 rounded-full font-bold text-white shadow-xl border-2 border-white/30 text-xl bg-gradient-to-r ${currentSection.color} backdrop-blur-md transition-all duration-500`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentSection.icon}</span>
            <span>{currentSection.name}輪播</span>
            <span className="text-sm opacity-80">
              ({currentIndex + 1}/{totalItems})
            </span>
          </div>
        </div>
      )}
    </div>
  )
}