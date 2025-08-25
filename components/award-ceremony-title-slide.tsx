"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface AwardCeremonyTitleSlideProps {
  title: string
  subtitle: string
  isActive?: boolean
}

export function AwardCeremonyTitleSlide({ title, subtitle, isActive = true }: AwardCeremonyTitleSlideProps) {
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
          alt="Award Ceremony background"
          fill
          className="object-cover brightness-110 contrast-105 saturate-110"
          priority
        />
      </div>

      {/* 動態漸層遮罩 - 彩虹主題涵蓋所有獎項色彩 */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.25) 0%, transparent 45%),
            radial-gradient(circle at 80% 20%, rgba(192, 192, 192, 0.25) 0%, transparent 45%),
            radial-gradient(circle at 30% 80%, rgba(205, 127, 50, 0.25) 0%, transparent 45%),
            radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.25) 0%, transparent 45%),
            radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.25) 0%, transparent 45%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)
          `,
          animationDelay: "0.5s",
        }}
      />

      {/* 高級浮動粒子系統 - 彩虹色系 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
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
              className={`w-3 h-3 rounded-full shadow-lg animate-sparkle ${
                i % 5 === 0
                  ? "bg-gradient-to-r from-yellow-300 via-orange-400 to-amber-500"
                  : i % 5 === 1
                    ? "bg-gradient-to-r from-gray-300 via-blue-300 to-slate-400"
                    : i % 5 === 2
                      ? "bg-gradient-to-r from-orange-300 via-amber-400 to-orange-500"
                      : i % 5 === 3
                        ? "bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600"
                        : "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600"
              }`}
              style={{ animationDelay: `${Math.random() * 2}s` }}
            />
          </div>
        ))}
      </div>

      {/* 頒獎典禮標識 */}
      <div className="absolute top-12 left-12 z-20 animate-slide-right" style={{ animationDelay: "0.8s" }}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl blur-xl opacity-60" />
          <div className="relative px-8 py-4 rounded-2xl bg-white/15 backdrop-blur-md border border-purple-200/30 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-bounce" style={{ animationDelay: "1s" }}>
                🏆
              </span>
              <p
                className="text-xl font-bold tracking-wider text-white drop-shadow-lg"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
              >
                頒獎典禮 Award Ceremony
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
          <div className="text-5xl animate-bounce" style={{ animationDelay: "1.8s" }}>
            🌟
          </div>
        </div>
      </div>

      {/* 主要內容區域 */}
      {showContent && (
        <div className="relative z-10 text-center px-6 w-[90%] max-w-[1400px] mx-auto animate-slide-up">
          <div className="relative animate-scale-in" style={{ animationDelay: "0.8s" }}>
            {/* 背景光暈效果 - 彩虹光暈 */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 via-red-400/20 via-orange-400/20 via-yellow-400/20 via-green-400/20 via-blue-400/20 to-indigo-400/20 rounded-3xl blur-3xl scale-110" />

            {/* 主卡片 */}
            <div className="relative bg-white/25 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-purple-200/30 overflow-hidden">
              {/* 裝飾性幾何元素 - 彩虹頂部條 */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 via-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 to-indigo-500" />

              {/* 動態裝飾圓圈 */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full opacity-30 animate-spin-slow" />
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-br from-blue-500 via-green-500 to-purple-500 rounded-full opacity-30 animate-spin-reverse" />

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
                  {title}
                </h1>

                {/* 英文副標題 */}
                <h2
                  className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-semibold tracking-wide mb-12 animate-slide-up"
                  style={{ 
                    animationDelay: "1.4s",
                    textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.1)"
                  }}
                >
                  {subtitle}
                </h2>

                {/* 描述文字 */}
                <p
                  className="text-xl md:text-2xl lg:text-3xl text-white font-medium animate-slide-up"
                  style={{ 
                    animationDelay: "1.6s",
                    textShadow: "2px 2px 6px rgba(0,0,0,0.7), 0 0 15px rgba(255,255,255,0.1)"
                  }}
                >
                  表彰卓越，共創榮耀 / Honoring Excellence, Creating Glory Together
                </p>
              </div>

              {/* 裝飾線條 - 彩虹線條 */}
              <div className="relative mb-8 animate-slide-up" style={{ animationDelay: "1.8s" }}>
                <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 via-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 to-indigo-500 mx-auto animate-expand" />
                <div className="absolute top-0 left-1/2 w-20 h-1 bg-gradient-to-r from-white via-purple-300 to-white opacity-60 blur-sm animate-shimmer" />
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}