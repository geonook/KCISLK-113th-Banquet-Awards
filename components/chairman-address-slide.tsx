"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ChairmanAddressSlideProps {
  isActive?: boolean
}

export function ChairmanAddressSlide({ 
  isActive = true
}: ChairmanAddressSlideProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowContent(true), 500)
      return () => clearTimeout(timer)
    } else {
      setShowContent(false)
    }
  }, [isActive])

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 多層背景效果 */}
      <div className="absolute inset-0 animate-scale-in">
        <Image
          src="/images/award-background.jpg"
          alt="Chairman address background"
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
七年同心 點石成金
            </p>
          </div>
        </div>
      </div>


      {/* 主要內容區域 */}
      {showContent && (
        <div className="relative z-10 text-center px-6 w-[90%] max-w-[1400px] mx-auto animate-slide-up">
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
              <div className="mb-16 animate-slide-up flex flex-col justify-center min-h-[400px]" style={{ animationDelay: "1s" }}>
                {/* 主標題 */}
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-none"
                  style={{
                    color: "white",
                    textShadow: "4px 4px 12px rgba(0,0,0,0.6), 0 0 40px rgba(255,255,255,0.3)",
                    filter: "drop-shadow(4px 4px 8px rgba(0,0,0,0.4))",
                  }}
                >
                  董事長致詞
                </h1>

                <p
                  className="text-2xl md:text-3xl lg:text-4xl text-gray-700 font-semibold tracking-wide animate-slide-up"
                  style={{ animationDelay: "1.2s" }}
                >
                  Chairman's Address
                </p>
              </div>

              {/* 裝飾線條 */}
              <div className="relative mb-20 animate-slide-up" style={{ animationDelay: "1.4s" }}>
                <div className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto animate-expand" />
                <div className="absolute top-0 left-1/2 w-20 h-1 bg-gradient-to-r from-white via-yellow-300 to-white opacity-60 blur-sm animate-shimmer" />
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}