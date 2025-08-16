"use client"

import { useState, useEffect } from "react"
import { PremiumTitleSlide } from "../components/premium-title-slide"
import { ServiceAwardSlide } from "../components/service-award-slide"
import { RockAwardSlide } from "../components/rock-award-slide"
import { ExcellenceAwardSlide } from "../components/excellence-award-slide"
import { FullscreenNavigation } from "../components/fullscreen-navigation"
import { PresentationContainer } from "../components/presentation-container"
import { awardLoader } from "../lib/award-loader"
import { Settings } from "lucide-react"
import type { AwardData } from "../types/award"

export default function AwardPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [awardData, setAwardData] = useState<AwardData | null>(null)
  const [showPhotoPanel, setShowPhotoPanel] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const totalSlides = awardData ? awardData.winners.length + 1 : 1

  // 懶載入獎項資料
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await awardLoader.loadAwardData()
        setAwardData(data)
      } catch (error) {
        console.error('Failed to load award data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToStart = () => {
    setCurrentSlide(0)
  }

  const goToSlide = (slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      setCurrentSlide(slideIndex)
    }
  }

  // 判斷獎項類型
  const getAwardType = (awardType: string) => {
    if (
      awardType.includes("年資獎") ||
      awardType.includes("Years of Service") ||
      awardType.includes("Leadership Award")
    ) {
      return "service"
    } else if (awardType.includes("磐石獎")) {
      return "rock"
    } else if (awardType.includes("優質獎") || awardType.includes("Outstanding Performance")) {
      return "excellence"
    }
    return "excellence" // 預設為優質獎樣式
  }

  // 添加照片更新函數
  const handlePhotoUpdate = (winnerId: number, photoUrl: string) => {
    setAwardData((prev) => ({
      ...prev,
      winners: prev.winners.map((winner) => (winner.id === winnerId ? { ...winner, photoUrl } : winner)),
    }))
  }

  // 檢測全螢幕狀態
  useEffect(() => {
    const handleFullscreenChange = () => {
      setShowPhotoPanel(!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // 鍵盤導航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        previousSlide()
      } else if (e.key === "Home") {
        e.preventDefault()
        goToStart()
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault()
        // F 鍵快速進入全螢幕
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen()
        }
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault()
        // P 鍵開啟照片管理
        setShowPhotoPanel(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const renderSlide = () => {
    if (isLoading) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white text-2xl">載入中...</div>
        </div>
      )
    }

    if (!awardData) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white text-2xl">無法載入獎項資料</div>
        </div>
      )
    }

    if (currentSlide === 0) {
      return <PremiumTitleSlide title={awardData.title} subtitle={awardData.subtitle} />
    }

    const winner = awardData.winners[currentSlide - 1]
    if (!winner) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white text-2xl">獲獎者資料不存在</div>
        </div>
      )
    }

    const awardType = getAwardType(winner.awardType)

    // 根據獎項類型選擇適當的組件
    switch (awardType) {
      case "service":
        return <ServiceAwardSlide winner={winner} isActive={true} />
      case "rock":
        return <RockAwardSlide winner={winner} isActive={true} />
      case "excellence":
        return <ExcellenceAwardSlide winner={winner} isActive={true} />
      default:
        return <ExcellenceAwardSlide winner={winner} isActive={true} />
    }
  }

  return (
    <>
      {/* 隱藏的照片管理按鈕 - 右下角小圖標 */}
      {awardData && (
        <div className="fixed bottom-4 right-4 z-50">
          <button 
            className="w-8 h-8 bg-gray-800/30 hover:bg-gray-700/60 text-gray-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-20 hover:opacity-100 backdrop-blur-sm"
            onClick={() => console.log('Photo management coming soon')}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      )}

      <PresentationContainer>
        <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div key={currentSlide} className="w-full h-full transition-all duration-500 ease-in-out">
            {renderSlide()}
          </div>

          {awardData && (
            <FullscreenNavigation
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              winners={awardData.winners}
              onPrevious={previousSlide}
              onNext={nextSlide}
              onGoToStart={goToStart}
              onGoToSlide={goToSlide}
            />
          )}
        </div>
      </PresentationContainer>
    </>
  )
}
