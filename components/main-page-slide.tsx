"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface MainPageSlideProps {
  variant: 'thanksgiving' | 'toast' | 'dining' | 'social'
  isActive?: boolean
}

interface VariantContent {
  chineseTitle: string
  englishSubtitle: string
  coreTheme: string
  englishTheme: string
  leftSlogan: string
  rightSlogan: string
}

const variantContentMap: Record<MainPageSlideProps['variant'], VariantContent> = {
  thanksgiving: {
    chineseTitle: "2025 林口康橋感恩迎新餐會",
    englishSubtitle: "2025 KCISLK Appreciation & Welcome Banquet",
    coreTheme: "感恩與團結",
    englishTheme: "Gratitude & Unity",
    leftSlogan: "心懷感恩 凝聚力量",
    rightSlogan: "Grateful hearts bring us together as one"
  },
  toast: {
    chineseTitle: "全體敬酒",
    englishSubtitle: "Group Toast Ceremony",
    coreTheme: "慶祝與祝福",
    englishTheme: "Celebration & Blessings",
    leftSlogan: "共同舉杯 祝福滿懷",
    rightSlogan: "Raising our glasses together with heartfelt wishes"
  },
  dining: {
    chineseTitle: "用餐時間",
    englishSubtitle: "Dining Time",
    coreTheme: "享用美食與交流",
    englishTheme: "Culinary Delights & Connection",
    leftSlogan: "美食相伴 溫暖時光",
    rightSlogan: "Savoring delicious moments together"
  },
  social: {
    chineseTitle: "歡敬時間",
    englishSubtitle: "Social Hour",
    coreTheme: "社交與聯誼",
    englishTheme: "Fellowship & Networking",
    leftSlogan: "歡聚一堂 情誼深厚",
    rightSlogan: "Building bonds through joyful gatherings"
  }
}

export function MainPageSlide({ variant, isActive = true }: MainPageSlideProps) {
  const [showContent, setShowContent] = useState(false)
  const content = variantContentMap[variant]

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 多層背景效果 */}
      <div className="absolute inset-0 animate-scale-in">
        <Image
          src="/images/award-background.jpg"
          alt="Award ceremony background"
          fill
          className="object-cover brightness-110 contrast-105 saturate-110"
          priority
        />
      </div>

      {/* 動態漸層遮罩 */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(255, 215, 0, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(255, 140, 0, 0.15) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)
          `,
          animationDelay: "0.5s",
        }}
      />

      {/* 高級浮動粒子系統 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 8 + 12}s`,
            }}
          >
            <div
              className={`w-3 h-3 rounded-full shadow-lg ${
                i % 4 === 0
                  ? "bg-gradient-to-r from-yellow-300 to-orange-400"
                  : i % 4 === 1
                    ? "bg-gradient-to-r from-blue-300 to-purple-400"
                    : i % 4 === 2
                      ? "bg-gradient-to-r from-pink-300 to-red-400"
                      : "bg-gradient-to-r from-green-300 to-teal-400"
              }`}
            />
          </div>
        ))}
      </div>

      {/* 精緻標語設計 - 左上角 */}
      <div className="absolute top-12 left-12 z-20 animate-slide-right" style={{ animationDelay: "0.8s" }}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-2xl blur-xl" />
          <div className="relative px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
            <p
              className="text-xl font-bold tracking-wider text-white drop-shadow-lg"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
            >
              {content.leftSlogan}
            </p>
          </div>
        </div>
      </div>

      {/* 精緻標語設計 - 右下角 */}
      <div className="absolute bottom-36 right-12 z-20 animate-slide-left" style={{ animationDelay: "1s" }}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-xl" />
          <div className="relative px-10 py-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
            <p
              className="text-lg font-bold italic text-white drop-shadow-lg tracking-wide"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
            >
              {content.rightSlogan}
            </p>
          </div>
        </div>
      </div>

      {/* 主要內容區域 */}
      {showContent && (
        <div className="relative z-10 text-center px-6 w-full max-w-6xl mx-auto animate-slide-up">
          <div className="relative animate-scale-in" style={{ animationDelay: "0.8s" }}>
            {/* 背景光暈效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 rounded-3xl blur-3xl scale-110" />

            {/* 主卡片 */}
            <div className="relative bg-white/25 backdrop-blur-xl rounded-3xl p-14 shadow-2xl border border-white/30 overflow-hidden">
              {/* 裝飾性幾何元素 */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-500 via-red-500 to-purple-500" />

              {/* 動態裝飾圓圈 */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-spin-slow" />
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 animate-spin-reverse" />

              {/* 標題區域 */}
              <div className="mb-10 animate-slide-up" style={{ animationDelay: "1s" }}>
                {/* 中文主標題 */}
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-none"
                  style={{
                    background:
                      "linear-gradient(135deg, #f59e0b 0%, #ea580c 25%, #dc2626 50%, #7c3aed 75%, #2563eb 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
                  }}
                >
                  {content.chineseTitle}
                </h1>

                {/* 英文副標題 */}
                <p
                  className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-semibold tracking-wide animate-slide-up"
                  style={{ animationDelay: "1.2s" }}
                >
                  {content.englishSubtitle}
                </p>
              </div>

              {/* 裝飾線條 */}
              <div className="relative mb-10 animate-slide-up" style={{ animationDelay: "1.4s" }}>
                <div className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto animate-expand" />
                <div className="absolute top-0 left-1/2 w-20 h-1 bg-gradient-to-r from-white via-yellow-300 to-white opacity-60 blur-sm animate-shimmer" />
              </div>

              {/* 核心理念區域 */}
              <div className="space-y-8 animate-slide-up" style={{ animationDelay: "1.6s" }}>
                <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform duration-200">
                  {content.coreTheme}
                </p>

                <div className="flex flex-wrap justify-center items-center gap-4 text-lg md:text-xl">
                  <div
                    className="px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200 shadow-md animate-slide-right"
                    style={{ animationDelay: "1.8s" }}
                  >
                    <p className="font-semibold text-gray-700 whitespace-nowrap">
                      {content.englishTheme}
                    </p>
                  </div>

                  <div
                    className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"
                    style={{ animationDelay: "2s" }}
                  />

                  <div
                    className="px-6 py-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-full border border-orange-200 shadow-md animate-slide-left"
                    style={{ animationDelay: "2.2s" }}
                  >
                    <p className="font-semibold text-gray-700 whitespace-nowrap">
                      Kang Chiao brings me the world
                    </p>
                  </div>
                </div>

                {/* 額外的變體特定內容 */}
                <div className="mt-8 space-y-4 animate-slide-up" style={{ animationDelay: "2.4s" }}>
                  {variant === 'thanksgiving' && (
                    <div className="flex flex-wrap justify-center items-center gap-3 text-base md:text-lg">
                      <div className="px-5 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-200 shadow-sm">
                        <p className="font-medium text-gray-600">感恩師長 Grateful to Teachers</p>
                      </div>
                      <div className="px-5 py-2 bg-gradient-to-r from-green-50 to-teal-50 rounded-full border border-green-200 shadow-sm">
                        <p className="font-medium text-gray-600">珍惜友誼 Cherish Friendship</p>
                      </div>
                    </div>
                  )}

                  {variant === 'toast' && (
                    <div className="flex flex-wrap justify-center items-center gap-3 text-base md:text-lg">
                      <div className="px-5 py-2 bg-gradient-to-r from-rose-50 to-pink-50 rounded-full border border-rose-200 shadow-sm">
                        <p className="font-medium text-gray-600">共同祝福 Shared Blessings</p>
                      </div>
                      <div className="px-5 py-2 bg-gradient-to-r from-violet-50 to-purple-50 rounded-full border border-violet-200 shadow-sm">
                        <p className="font-medium text-gray-600">美好未來 Bright Future</p>
                      </div>
                    </div>
                  )}

                  {variant === 'dining' && (
                    <div className="flex flex-wrap justify-center items-center gap-3 text-base md:text-lg">
                      <div className="px-5 py-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full border border-emerald-200 shadow-sm">
                        <p className="font-medium text-gray-600">美味佳餚 Delicious Cuisine</p>
                      </div>
                      <div className="px-5 py-2 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full border border-cyan-200 shadow-sm">
                        <p className="font-medium text-gray-600">歡樂交流 Joyful Exchange</p>
                      </div>
                    </div>
                  )}

                  {variant === 'social' && (
                    <div className="flex flex-wrap justify-center items-center gap-3 text-base md:text-lg">
                      <div className="px-5 py-2 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-full border border-indigo-200 shadow-sm">
                        <p className="font-medium text-gray-600">深度交流 Deep Connection</p>
                      </div>
                      <div className="px-5 py-2 bg-gradient-to-r from-fuchsia-50 to-pink-50 rounded-full border border-fuchsia-200 shadow-sm">
                        <p className="font-medium text-gray-600">建立友誼 Building Friendships</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}