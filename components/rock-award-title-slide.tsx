"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface RockAwardTitleSlideProps {
  isActive?: boolean
}

export function RockAwardTitleSlide({ isActive = true }: RockAwardTitleSlideProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowContent(true), 300)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 動態背景 */}
      <div className="absolute inset-0 animate-scale-in">
        <Image
          src="/images/award-background.jpg"
          alt="Rock Award background"
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
            radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)
          `,
          animationDelay: "0.5s",
        }}
      />

      {/* 高級浮動粒子系統 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
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
              className={`w-3 h-3 rounded-full shadow-lg animate-sparkle bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600`}
              style={{ animationDelay: `${Math.random() * 2}s` }}
            />
          </div>
        ))}
      </div>

      {/* 磐石標識 */}
      <div className="absolute top-12 left-12 z-20 animate-slide-right" style={{ animationDelay: "0.8s" }}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 rounded-2xl blur-xl opacity-60" />
          <div className="relative px-8 py-4 rounded-2xl bg-white/15 backdrop-blur-md border border-blue-200/30 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-bounce" style={{ animationDelay: "1s" }}>
                💎
              </span>
              <p
                className="text-xl font-bold tracking-wider text-white drop-shadow-lg"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
              >
                磐石精神 Rock Foundation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 右上角裝飾 */}
      <div className="absolute top-16 right-16 z-20 animate-slide-left" style={{ animationDelay: "1.2s" }}>
        <div className="flex items-center gap-4">
          <div className="text-6xl animate-bounce" style={{ animationDelay: "1.4s" }}>
            🏔️
          </div>
          <div className="text-4xl animate-pulse" style={{ animationDelay: "1.6s" }}>
            ⚡
          </div>
        </div>
      </div>

      {/* 主要內容區域 */}
      {showContent && (
        <div className="relative z-10 text-center px-6 w-[85%] max-w-[4800px] mx-auto animate-slide-up">
          <div className="relative animate-scale-in" style={{ animationDelay: "0.8s" }}>
            {/* 背景光暈效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-indigo-600/20 rounded-3xl blur-3xl scale-110" />

            {/* 主卡片 */}
            <div className="relative bg-white/25 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-blue-200/30 overflow-hidden">
              {/* 裝飾性幾何元素 */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700" />

              {/* 動態裝飾圓圈 */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-full opacity-30 animate-spin-slow" />
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-br from-indigo-500 via-blue-600 to-purple-700 rounded-full opacity-30 animate-spin-reverse" />

              {/* 標題區域 */}
              <div className="mb-10 animate-slide-up" style={{ animationDelay: "1.2s" }}>
                {/* 中文主標題 */}
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-tight"
                  style={{
                    color: "white",
                    textShadow: "4px 4px 12px rgba(0,0,0,0.6), 0 0 40px rgba(255,255,255,0.3)",
                    filter: "drop-shadow(4px 4px 8px rgba(0,0,0,0.4))",
                  }}
                >
                  磐石獎
                </h1>

                {/* 英文副標題 */}
                <h2
                  className="text-xl md:text-2xl lg:text-3xl text-white font-semibold tracking-wide mb-6 animate-slide-up"
                  style={{ 
                    animationDelay: "1.4s",
                    textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.1)"
                  }}
                >
                  Rock Foundation Award
                </h2>

                {/* 描述文字 */}
                <p
                  className="text-lg md:text-xl text-white font-medium animate-slide-up"
                  style={{ 
                    animationDelay: "1.6s",
                    textShadow: "2px 2px 6px rgba(0,0,0,0.7), 0 0 15px rgba(255,255,255,0.1)"
                  }}
                >
                  堅如磐石，專業典範 / Solid as a Rock, Professional Excellence
                </p>
              </div>

              {/* 裝飾線條 */}
              <div className="relative mb-10 animate-slide-up" style={{ animationDelay: "1.8s" }}>
                <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 mx-auto animate-expand" />
                <div className="absolute top-0 left-1/2 w-20 h-1 bg-gradient-to-r from-white via-blue-300 to-white opacity-60 blur-sm animate-shimmer" />
              </div>

              {/* 特色描述 */}
              <div className="space-y-6 animate-slide-up" style={{ animationDelay: "2s" }}>
                <div className="flex flex-wrap justify-center items-center gap-6 text-lg md:text-xl">
                  <div
                    className="px-8 py-4 bg-gradient-to-r from-blue-50 to-purple-100 rounded-full border border-blue-200 shadow-lg animate-slide-right hover:scale-105 transition-transform"
                    style={{ animationDelay: "2.2s" }}
                  >
                    <p className="font-semibold text-gray-700 whitespace-nowrap">
                      💎 磐石精神 Rock Spirit
                    </p>
                  </div>

                  <div
                    className="w-4 h-4 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 rounded-full animate-pulse"
                    style={{ animationDelay: "2.4s" }}
                  />

                  <div
                    className="px-8 py-4 bg-gradient-to-r from-purple-50 to-indigo-100 rounded-full border border-purple-200 shadow-lg animate-slide-left hover:scale-105 transition-transform"
                    style={{ animationDelay: "2.6s" }}
                  >
                    <p className="font-semibold text-gray-700 whitespace-nowrap">
                      🏔️ 穩固基石 Solid Foundation
                    </p>
                  </div>
                </div>

                {/* 榮譽說明 */}
                <div
                  className="mt-10 p-8 bg-gradient-to-r from-white/80 to-blue-50/80 rounded-2xl border border-blue-200 shadow-inner animate-slide-up"
                  style={{ animationDelay: "2.8s" }}
                >
                  <p className="text-xl font-medium text-gray-800 mb-3" style={{textShadow: "1px 1px 2px rgba(255,255,255,0.8)"}}>
                    💎 表彰專業典範與磐石精神 / Honoring Professional Excellence & Rock Foundation Spirit
                  </p>
                  <p className="text-lg text-gray-700" style={{textShadow: "1px 1px 2px rgba(255,255,255,0.8)"}}>
                    感謝您如磐石般堅實的專業貢獻 / Thank you for your rock-solid professional contributions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}