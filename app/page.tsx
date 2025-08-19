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
import { Settings } from "lucide-react"
import type { AwardData, Winner } from "../types/award"

// 投影片類型定義
type SlideType = 
  | 'main'
  | 'violin-performance' 
  | 'chairman-address'
  | 'toast-main'
  | 'first-half-title'
  | 'first-half-award'
  | 'choir-performance'
  | 'dining-main'
  | 'second-half-title'
  | 'second-half-award'
  | 'dance-performance'
  | 'celebration-main'

// 投影片配置介面
interface SlideConfig {
  type: SlideType
  winnerIndex?: number // 獎項投影片的得獎者索引
  mainTitle?: string   // 主頁變體的標題
}

export default function AwardPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [awardData, setAwardData] = useState<AwardData | null>(null)
  const [showPhotoPanel, setShowPhotoPanel] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // 獎項智能分組
  const getAwardGroups = () => {
    if (!awardData) return { firstHalf: [], secondHalf: [] }
    
    // 上半場：年資獎 + 磐石獎 (ID 1-13)
    const firstHalf = awardData.winners.slice(0, 13)
    // 下半場：優質獎 (ID 14-50)
    const secondHalf = awardData.winners.slice(13)
    
    return { firstHalf, secondHalf }
  }
  
  const { firstHalf, secondHalf } = getAwardGroups()
  
  // 建立完整的投影片配置陣列
  const buildSlideConfigs = (): SlideConfig[] => {
    const configs: SlideConfig[] = [
      // 1. 主頁 (感恩餐會)
      { type: 'main' },
      // 2. 開場表演 (小提琴)
      { type: 'violin-performance' },
      // 3. 董事長致詞
      { type: 'chairman-address' },
      // 4. 全體敬酒 (主頁變體)
      { type: 'toast-main', mainTitle: '全體敬酒' },
      // 5. 上半場頒獎首頁
      { type: 'first-half-title' },
    ]
    
    // 6-18. 上半場獎項 (年資獎 + 磐石獎)
    firstHalf.forEach((_, index) => {
      configs.push({ type: 'first-half-award', winnerIndex: index })
    })
    
    configs.push(
      // 19. 串場表演 (合唱)
      { type: 'choir-performance' },
      // 20. 用餐 (主頁變體)
      { type: 'dining-main', mainTitle: '用餐時間' },
      // 21. 下半場頒獎首頁
      { type: 'second-half-title' },
    )
    
    // 22-58. 下半場獎項 (優質獎)
    secondHalf.forEach((_, index) => {
      configs.push({ type: 'second-half-award', winnerIndex: index })
    })
    
    configs.push(
      // 59. 串場表演 (舞蹈)
      { type: 'dance-performance' },
      // 60. 歡敬時間 (主頁變體)
      { type: 'celebration-main', mainTitle: '歡敬時間' }
    )
    
    return configs
  }
  
  const slideConfigs = buildSlideConfigs()
  const totalSlides = slideConfigs.length

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

  // 鍵盤導航系統
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 基本導航
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
        // ESC 鍵離開全螢幕
        if (document.fullscreenElement) {
          document.exitFullscreen()
        }
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault()
        // F 鍵切換全螢幕
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen()
        } else {
          document.exitFullscreen()
        }
      } else if (e.key === "p" || e.key === "P") {
        e.preventDefault()
        // P 鍵開啟照片管理（僅在獎項投影片時有效）
        const currentConfig = slideConfigs[currentSlide]
        if (currentConfig && (currentConfig.type === 'first-half-award' || currentConfig.type === 'second-half-award')) {
          setShowPhotoPanel(true)
        }
      } else if (e.key >= "1" && e.key <= "9") {
        e.preventDefault()
        // 數字鍵快速跳轉到特定段落
        const num = parseInt(e.key)
        let targetSlide = 0
        switch (num) {
          case 1: targetSlide = 0; break  // 主頁
          case 2: targetSlide = 1; break  // 小提琴表演
          case 3: targetSlide = 2; break  // 董事長致詞
          case 4: targetSlide = 4; break  // 上半場頒獎
          case 5: targetSlide = slideConfigs.findIndex(c => c.type === 'choir-performance'); break // 合唱
          case 6: targetSlide = slideConfigs.findIndex(c => c.type === 'second-half-title'); break // 下半場頒獎
          case 7: targetSlide = slideConfigs.findIndex(c => c.type === 'dance-performance'); break // 舞蹈
        }
        if (targetSlide >= 0 && targetSlide < totalSlides) {
          setCurrentSlide(targetSlide)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, previousSlide, goToStart, currentSlide, slideConfigs, totalSlides])

  // 智能投影片渲染器
  const renderSlideByConfig = (config: SlideConfig) => {
    if (isLoading) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white text-2xl">載入簡報資料中...</div>
        </div>
      )
    }

    if (!awardData) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white text-2xl">無法載入簡報資料</div>
        </div>
      )
    }

    switch (config.type) {
      case 'main':
        return (
          <ThanksgivingMainSlide
            title="2025感恩迎新餐會"
            subtitle="2025 Appreciation & Welcome Banquet"
            eventDate="2024年12月"
          />
        )

      case 'toast-main':
      case 'celebration-main':
        return (
          <ThanksgivingMainSlide
            title={config.mainTitle || "2025感恩迎新餐會"}
            subtitle={config.type === 'toast-main' ? "Celebration Toast" : "Celebration Time"}
            eventDate="2024年12月"
          />
        )

      case 'dining-main':
        return (
          <ThanksgivingMainSlide
            title="2025感恩迎新餐會"
            subtitle="2025 Appreciation & Welcome Banquet"
            eventDate="2024年12月"
          />
        )

      case 'violin-performance':
        return (
          <PerformanceSlide
            performanceType="violin"
            isActive={true}
            performers={['小提琴表演者']}
          />
        )

      case 'choir-performance':
        return (
          <PerformanceSlide
            performanceType="choir"
            isActive={true}
            performers={['小學國際處中外師']}
          />
        )

      case 'dance-performance':
        return (
          <PerformanceSlide
            performanceType="dance"
            isActive={true}
            performers={['幼兒園中外師團隊']}
          />
        )

      case 'chairman-address':
        return (
          <ChairmanAddressSlide
            isActive={true}
            welcomeMessage={{
              chinese: "歡迎各位同仁參加2025感恩迎新餐會，感謝大家一年來的辛勤付出與卓越表現。",
              english: "Welcome to the 2025 Appreciation & Welcome Banquet. Thank you for your dedication and outstanding performance this year."
            }}
            chairmanName="康橋董事長"
            chairmanTitle={{
              chinese: "董事長",
              english: "Chairman of the Board"
            }}
          />
        )

      case 'first-half-title':
        return (
          <PremiumTitleSlide 
            title="優秀同仁頒獎表揚" 
            subtitle="Excellence Awards & Staff Recognition" 
          />
        )

      case 'second-half-title':
        return (
          <PremiumTitleSlide 
            title="優秀同仁頒獎表揚" 
            subtitle="Excellence Awards & Staff Recognition" 
          />
        )

      case 'first-half-award':
        if (config.winnerIndex !== undefined) {
          const winner = firstHalf[config.winnerIndex]
          if (winner) {
            return renderAwardSlide(winner)
          }
        }
        break

      case 'second-half-award':
        if (config.winnerIndex !== undefined) {
          const winner = secondHalf[config.winnerIndex]
          if (winner) {
            return renderAwardSlide(winner)
          }
        }
        break
    }

    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-2xl">投影片配置錯誤</div>
      </div>
    )
  }

  // 獎項投影片渲染器
  const renderAwardSlide = (winner: Winner) => {
    const awardType = getAwardType(winner.awardType)

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

  // 主渲染函數
  const renderSlide = () => {
    const currentConfig = slideConfigs[currentSlide]
    if (!currentConfig) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white text-2xl">投影片不存在</div>
        </div>
      )
    }

    return renderSlideByConfig(currentConfig)
  }

  return (
    <>
      {/* 照片管理按鈕 - 僅在獎項投影片時顯示 */}
      {awardData && (
        <div className="fixed bottom-4 right-4 z-50">
          <EnhancedPhotoManagement
            winners={awardData.winners}
            onPhotoUpdate={handlePhotoUpdate}
            triggerButton={
              <button className="w-8 h-8 bg-gray-800/20 hover:bg-gray-700/60 text-gray-500 hover:text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-10 hover:opacity-100 hover:w-10 hover:h-10 backdrop-blur-sm">
                <Settings className="w-5 h-5" />
              </button>
            }
          />
        </div>
      )}

      <PresentationContainer>
        <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div key={currentSlide} className="w-full h-full transition-all duration-500 ease-in-out">
            {renderSlide()}
          </div>

          {/* 導航組件 */}
          {totalSlides > 1 && (
            <FullscreenNavigation
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              winners={awardData?.winners || []}
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
