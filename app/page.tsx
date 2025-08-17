"use client"

import { useState, useEffect, useCallback } from "react"
import { PremiumTitleSlide } from "../components/premium-title-slide"
import { ServiceAwardSlide } from "../components/service-award-slide"
import { RockAwardSlide } from "../components/rock-award-slide"
import { ExcellenceAwardSlide } from "../components/excellence-award-slide"
import { ThanksgivingMainSlide } from "../components/thanksgiving-main-slide"
import { PerformanceSlide } from "../components/performance-slide"
import { ChairmanAddressSlide } from "../components/chairman-address-slide"
import { FullscreenNavigation } from "../components/fullscreen-navigation"
import { PresentationContainer } from "../components/presentation-container"
import { awardLoader } from "../lib/award-loader"
import { EnhancedPhotoManagement } from "../components/enhanced-photo-management"
import { Settings, Award, Heart, Music, Mic } from "lucide-react"
import type { AwardData } from "../types/award"

// 簡報模式類型定義
type PresentationMode = 'award' | 'thanksgiving' | 'performance' | 'chairman'

// 簡報模式配置
const presentationModes = {
  award: {
    title: '年度優秀員工頒獎典禮',
    subtitle: 'Excellence in Education Awards',
    icon: Award,
    description: '優秀員工表彰大會',
    color: 'from-blue-500 to-purple-600'
  },
  thanksgiving: {
    title: '113學年度感恩餐會',
    subtitle: '113th Academic Year Thanksgiving Banquet',
    icon: Heart,
    description: '感恩同行，共創未來',
    color: 'from-orange-500 to-red-600'
  },
  performance: {
    title: '串場表演時間',
    subtitle: 'Intermission Performance',
    icon: Music,
    description: '精彩表演，文化交融',
    color: 'from-purple-500 to-pink-600'
  },
  chairman: {
    title: '董事長致詞',
    subtitle: 'Chairman Address',
    icon: Mic,
    description: '領導致詞，展望未來',
    color: 'from-green-500 to-teal-600'
  }
}

export default function AwardPresentation() {
  const [presentationMode, setPresentationMode] = useState<PresentationMode | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [awardData, setAwardData] = useState<AwardData | null>(null)
  const [showPhotoPanel, setShowPhotoPanel] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // 動態計算總頁數，根據簡報模式
  const getTotalSlides = () => {
    if (presentationMode === 'award') {
      return awardData ? awardData.winners.length + 1 : 1
    } else if (presentationMode === 'performance') {
      return 3 // violin, choir, dance
    } else {
      return 1 // thanksgiving, chairman 都是單頁
    }
  }
  
  const totalSlides = getTotalSlides()

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

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const previousSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const goToStart = useCallback(() => {
    setCurrentSlide(0)
  }, [])

  const goToSlide = useCallback((slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex < totalSlides) {
      setCurrentSlide(slideIndex)
    }
  }, [totalSlides])

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
    setAwardData((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        winners: prev.winners.map((winner) => (winner.id === winnerId ? { ...winner, photoUrl } : winner)),
      }
    })
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
      // 如果還沒選擇簡報模式，使用數字鍵快速選擇
      if (!presentationMode) {
        if (e.key === "1") {
          e.preventDefault()
          setPresentationMode('award')
        } else if (e.key === "2") {
          e.preventDefault()
          setPresentationMode('thanksgiving')
        } else if (e.key === "3") {
          e.preventDefault()
          setPresentationMode('performance')
        } else if (e.key === "4") {
          e.preventDefault()
          setPresentationMode('chairman')
        }
        return
      }

      // 在簡報模式中的導航
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        previousSlide()
      } else if (e.key === "Home") {
        e.preventDefault()
        goToStart()
      } else if (e.key === "Escape") {
        e.preventDefault()
        // ESC 鍵返回模式選擇
        setPresentationMode(null)
        setCurrentSlide(0)
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault()
        // F 鍵快速進入全螢幕
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen()
        }
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault()
        // P 鍵開啟照片管理（僅在獎項模式下有效）
        if (presentationMode === 'award') {
          setShowPhotoPanel(true)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, previousSlide, goToStart, setShowPhotoPanel, presentationMode])

  // 簡報模式選擇介面
  const renderModeSelector = () => (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            康橋簡報系統
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8">
            Kang Chiao Presentation System
          </p>
          <p className="text-lg text-white/60">
            請選擇簡報模式 / Please select presentation mode
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: "0.5s" }}>
          {Object.entries(presentationModes).map(([key, mode], index) => {
            const Icon = mode.icon
            return (
              <button
                key={key}
                onClick={() => setPresentationMode(key as PresentationMode)}
                className="group relative p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl hover:bg-white/15 hover:scale-105 transition-all duration-300 text-left animate-slide-up"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="mb-4">
                    <Icon className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {mode.title}
                  </h3>
                  
                  <p className="text-sm text-white/70 mb-4">
                    {mode.subtitle}
                  </p>
                  
                  <p className="text-xs text-white/50">
                    {mode.description}
                  </p>
                  
                  <div className="mt-4 text-xs text-white/40">
                    按 {index + 1} 或點擊選擇
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="text-center mt-8 text-white/50 text-sm animate-slide-up" style={{ animationDelay: "1.2s" }}>
          <p>快捷鍵：1-4 選擇模式 • F 全螢幕 • ESC 返回</p>
        </div>
      </div>
    </div>
  )

  const renderSlide = () => {
    // 如果還沒選擇簡報模式，顯示選擇介面
    if (!presentationMode) {
      return renderModeSelector()
    }

    if (isLoading && presentationMode === 'award') {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white text-2xl">載入獎項資料中...</div>
        </div>
      )
    }

    // 根據簡報模式渲染對應內容
    switch (presentationMode) {
      case 'thanksgiving':
        return (
          <ThanksgivingMainSlide
            title="113學年度感恩餐會"
            subtitle="113th Academic Year Thanksgiving Banquet"
            eventDate="2024年12月"
          />
        )

      case 'performance':
        const performanceTypes: ('violin' | 'choir' | 'dance')[] = ['violin', 'choir', 'dance']
        const performanceType = performanceTypes[currentSlide] || 'violin'
        return (
          <PerformanceSlide
            performanceType={performanceType}
            isActive={true}
            duration={5}
            performers={
              performanceType === 'violin' ? ['小提琴表演者'] :
              performanceType === 'choir' ? ['小學國際處中外師'] :
              ['幼兒園中外師團隊']
            }
          />
        )

      case 'chairman':
        return (
          <ChairmanAddressSlide
            isActive={true}
            welcomeMessage={{
              chinese: "歡迎各位同仁參加113學年度感恩餐會，感謝大家一年來的辛勤付出與卓越表現。",
              english: "Welcome to the 113th Academic Year Thanksgiving Banquet. Thank you for your dedication and outstanding performance this year."
            }}
            chairmanName="康橋董事長"
            chairmanTitle={{
              chinese: "董事長",
              english: "Chairman of the Board"
            }}
          />
        )

      case 'award':
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

      default:
        return renderModeSelector()
    }
  }

  return (
    <>
      {/* 隱藏的照片管理按鈕 - 僅在獎項模式下顯示 */}
      {awardData && presentationMode === 'award' && (
        <div className="fixed bottom-4 right-4 z-50">
          <EnhancedPhotoManagement
            winners={awardData.winners}
            onPhotoUpdate={handlePhotoUpdate}
            triggerButton={
              <button className="w-8 h-8 bg-gray-800/30 hover:bg-gray-700/60 text-gray-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-20 hover:opacity-100 backdrop-blur-sm">
                <Settings className="w-4 h-4" />
              </button>
            }
          />
        </div>
      )}

      {/* 返回模式選擇按鈕 - 在簡報模式中顯示 */}
      {presentationMode && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => {
              setPresentationMode(null)
              setCurrentSlide(0)
            }}
            className="w-10 h-10 bg-gray-800/50 hover:bg-gray-700/70 text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-30 hover:opacity-100 backdrop-blur-sm"
            title="返回模式選擇 (ESC)"
          >
            <span className="text-lg">‹</span>
          </button>
        </div>
      )}

      <PresentationContainer>
        <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div key={`${presentationMode}-${currentSlide}`} className="w-full h-full transition-all duration-500 ease-in-out">
            {renderSlide()}
          </div>

          {/* 導航組件 - 根據模式調整 */}
          {presentationMode && totalSlides > 1 && (
            <FullscreenNavigation
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              winners={presentationMode === 'award' ? awardData?.winners : []}
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
