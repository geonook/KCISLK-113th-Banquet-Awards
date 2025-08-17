"use client"

import { useState } from "react"
import { MainPageSlide } from "../../components/main-page-slide"
import { Button } from "@/components/ui/button"

const variants = [
  { key: 'thanksgiving', name: '感恩餐會' },
  { key: 'toast', name: '全體敬酒' },
  { key: 'dining', name: '用餐時間' },
  { key: 'social', name: '歡敬時間' }
] as const

export default function TestMainSlides() {
  const [currentVariant, setCurrentVariant] = useState<typeof variants[number]['key']>('thanksgiving')

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 控制面板 */}
      <div className="fixed top-4 left-4 z-50 flex gap-2 bg-black/80 backdrop-blur-md rounded-lg p-2">
        {variants.map((variant) => (
          <Button
            key={variant.key}
            onClick={() => setCurrentVariant(variant.key)}
            variant={currentVariant === variant.key ? "default" : "outline"}
            size="sm"
            className="text-white"
          >
            {variant.name}
          </Button>
        ))}
      </div>

      {/* 組件測試區域 */}
      <MainPageSlide variant={currentVariant} isActive={true} />
    </div>
  )
}