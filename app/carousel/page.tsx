"use client"

import { useState, useEffect } from "react"
import { UnifiedAwardCarousel } from "../../components/unified-award-carousel"
import { awardLoader } from "../../lib/award-loader"
import type { AwardData } from "../../types/award"

export default function CarouselPage() {
  const [awardData, setAwardData] = useState<AwardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 載入獎項資料
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

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="text-white text-2xl">載入輪播資料中...</div>
      </div>
    )
  }

  if (!awardData) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="text-white text-2xl">無法載入輪播資料</div>
      </div>
    )
  }

  // 過濾磐石獎 (ID 8-13) 和優質獎 (ID 14-50) 得獎者
  const rockWinners = awardData.winners.filter(w => w.id >= 8 && w.id <= 13)
  const excellenceWinners = awardData.winners.filter(w => w.id >= 14 && w.id <= 50)

  return (
    <UnifiedAwardCarousel
      rockWinners={rockWinners}
      excellenceWinners={excellenceWinners}
      autoplayDelay={10000}
    />
  )
}