"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Service15YearTitleSlideProps {
  isActive?: boolean
}

export function Service15YearTitleSlide({ isActive = true }: Service15YearTitleSlideProps) {
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
          alt="15 Year Service Award background"
          fill
          className="object-cover brightness-110 contrast-105 saturate-110"
          priority
        />
      </div>

      {/* 動態漸層遮罩 - 金色主題 */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, rgba(251, 191, 36, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, rgba(245, 158, 11, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)
          `,
          animationDelay: "0.5s",
        }}
      />

      {/* 高級浮動粒子系統 - 金色系 */}
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
              className={`w-3 h-3 rounded-full shadow-lg animate-sparkle bg-gradient-to-r from-yellow-300 via-orange-400 to-amber-500`}
              style={{ animationDelay: `${Math.random() * 2}s` }}
            />
          </div>
        ))}
      </div>

      {/* 15年標識 */}
      <div className="absolute top-12 left-12 z-20 animate-slide-right" style={{ animationDelay: "0.8s" }}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-600 rounded-2xl blur-xl opacity-60" />
          <div className="relative px-8 py-4 rounded-2xl bg-white/15 backdrop-blur-md border border-yellow-200/30 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-bounce" style={{ animationDelay: "1s" }}>
                🏅
              </span>
              <p
                className="text-xl font-bold tracking-wider text-white drop-shadow-lg"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
              >
                15年資深獎項 15-Year Award
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 右上角裝飾 */}
      <div className="absolute top-16 right-16 z-20 animate-slide-left" style={{ animationDelay: "1.2s" }}>
        <div className="flex items-center gap-4">
          <div className="text-6xl animate-bounce" style={{ animationDelay: "1.4s" }}>
            🎖️
          </div>
          <div className="text-4xl animate-pulse" style={{ animationDelay: "1.6s" }}>
            ✨
          </div>
        </div>
      </div>

      {/* 主要內容區域 */}
      {showContent && (
        <div className="relative z-10 text-center px-6 w-[90%] max-w-[1400px] mx-auto animate-slide-up">
          <div className="relative animate-scale-in" style={{ animationDelay: "0.8s" }}>
            {/* 背景光暈效果 */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 via-orange-400/20 to-amber-500/20 rounded-3xl blur-3xl scale-110" />

            {/* 主卡片 */}
            <div className="relative bg-white/25 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-yellow-200/30 overflow-hidden">
              {/* 裝飾性幾何元素 */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-600" />

              {/* 動態裝飾圓圈 */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-amber-600 rounded-full opacity-30 animate-spin-slow" />
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 rounded-full opacity-30 animate-spin-reverse" />

              {/* 標題區域 */}
              <div className="mb-12 animate-slide-up flex flex-col justify-center min-h-[350px] py-8" style={{ animationDelay: "1.2s" }}>
                {/* 中文主標題 */}
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-tight"
                  style={{
                    color: "white",
                    textShadow: "4px 4px 12px rgba(0,0,0,0.6), 0 0 40px rgba(255,255,255,0.3)",
                    filter: "drop-shadow(4px 4px 8px rgba(0,0,0,0.4))",
                  }}
                >
                  15年 年資獎
                </h1>

                {/* 英文副標題 */}
                <h2
                  className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-semibold tracking-wide mb-12 animate-slide-up"
                  style={{ 
                    animationDelay: "1.4s",
                    textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.1)"
                  }}
                >
                  15 Years of Service Award
                </h2>

                {/* 描述文字 */}
                <p
                  className="text-lg md:text-xl text-white font-medium animate-slide-up"
                  style={{ 
                    animationDelay: "1.6s",
                    textShadow: "2px 2px 6px rgba(0,0,0,0.7), 0 0 15px rgba(255,255,255,0.1)"
                  }}
                >
                  資深貢獻，卓越典範 / Senior Contribution, Excellence Model
                </p>
              </div>

              {/* 裝飾線條 */}
              <div className="relative mb-8 animate-slide-up" style={{ animationDelay: "1.8s" }}>
                <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-600 mx-auto animate-expand" />
                <div className="absolute top-0 left-1/2 w-20 h-1 bg-gradient-to-r from-white via-yellow-300 to-white opacity-60 blur-sm animate-shimmer" />
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}