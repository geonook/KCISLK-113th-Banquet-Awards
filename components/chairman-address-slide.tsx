"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ChairmanAddressSlideProps {
  isActive?: boolean
  welcomeMessage?: {
    chinese: string
    english: string
  }
  chairmanName?: string
  chairmanTitle?: {
    chinese: string
    english: string
  }
}

export function ChairmanAddressSlide({ 
  isActive = true,
  welcomeMessage = {
    chinese: "歡迎各位同仁參加113學年度感恩餐會，感謝大家一年來的辛勤付出與卓越表現。",
    english: "Welcome to the 113th Academic Year Thanksgiving Banquet. Thank you for your dedication and outstanding performance this year."
  },
  chairmanName = "康橋董事長",
  chairmanTitle = {
    chinese: "董事長",
    english: "Chairman of the Board"
  }
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
      {/* 背景圖片 */}
      <div className="absolute inset-0 animate-scale-in">
        <Image
          src="/images/award-background.jpg"
          alt="Chairman address background"
          fill
          className="object-cover brightness-90 contrast-110 saturate-95"
          priority
        />
      </div>

      {/* 莊重的深色漸層遮罩 */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(29, 78, 216, 0.25) 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(67, 56, 202, 0.25) 0%, transparent 60%),
            linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.4) 30%, rgba(51, 65, 85, 0.5) 70%, rgba(15, 23, 42, 0.7) 100%)
          `,
          animationDelay: "0.3s",
        }}
      />

      {/* 正式場合的優雅粒子系統 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 12 + 20}s`,
            }}
          >
            <div
              className={`w-2 h-2 rounded-full shadow-lg opacity-60 ${
                i % 3 === 0
                  ? "bg-gradient-to-r from-blue-300 to-indigo-400"
                  : i % 3 === 1
                    ? "bg-gradient-to-r from-indigo-300 to-purple-400"
                    : "bg-gradient-to-r from-slate-300 to-blue-400"
              }`}
            />
          </div>
        ))}
      </div>

      {/* 企業標語 - 左上角 */}
      <div className="absolute top-8 left-8 z-20 animate-slide-right" style={{ animationDelay: "1s" }}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl blur-lg" />
          <div className="relative px-6 py-3 rounded-xl bg-slate-900/20 backdrop-blur-md border border-white/15 shadow-xl">
            <p
              className="text-lg font-bold tracking-wider text-white drop-shadow-lg"
              style={{ textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}
            >
              康橋國際學校
            </p>
          </div>
        </div>
      </div>

      {/* 企業理念 - 右下角 */}
      <div className="absolute bottom-24 right-8 z-20 animate-slide-left" style={{ animationDelay: "1.2s" }}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-xl blur-lg" />
          <div className="relative px-6 py-3 rounded-xl bg-slate-900/20 backdrop-blur-md border border-white/15 shadow-xl">
            <p
              className="text-base font-semibold italic text-white drop-shadow-lg tracking-wide"
              style={{ textShadow: "0 2px 6px rgba(0,0,0,0.7)" }}
            >
              Excellence in Education, Excellence in Life
            </p>
          </div>
        </div>
      </div>

      {/* 聚光燈效果 */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-white/10 via-white/5 to-transparent rounded-full blur-3xl animate-stage-light"
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      {/* 主要內容區域 */}
      {showContent && (
        <div className="relative z-10 text-center px-8 w-full max-w-5xl mx-auto animate-slide-up">
          <div className="relative animate-scale-in" style={{ animationDelay: "1s" }}>
            {/* 莊重的背景光暈 */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-purple-600/15 rounded-3xl blur-3xl scale-110" />

            {/* 主卡片 */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 overflow-hidden">
              {/* 正式的裝飾頂條 */}
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-700 via-indigo-700 via-purple-700 to-slate-700" />

              {/* 莊重的裝飾元素 */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full opacity-15 animate-spin-slow" />
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full opacity-15 animate-spin-reverse" />

              {/* 標題區域 */}
              <div className="mb-8 animate-slide-up" style={{ animationDelay: "1.2s" }}>
                {/* 中文主標題 */}
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, #1e40af 0%, #3730a3 25%, #6d28d9 50%, #7c2d12 75%, #374151 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.15))",
                  }}
                >
                  董事長致詞
                </h1>

                {/* 英文副標題 */}
                <p
                  className="text-2xl md:text-3xl lg:text-4xl text-slate-600 font-semibold tracking-wide animate-slide-up"
                  style={{ animationDelay: "1.4s" }}
                >
                  Chairman's Address
                </p>
              </div>

              {/* 正式的裝飾線條 */}
              <div className="relative mb-8 animate-slide-up" style={{ animationDelay: "1.6s" }}>
                <div className="h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto animate-expand" />
                <div className="absolute top-0 left-1/2 w-16 h-0.5 bg-gradient-to-r from-white via-slate-300 to-white opacity-60 blur-sm animate-shimmer" />
              </div>

              {/* 董事長信息區域 */}
              <div className="mb-10 animate-slide-up" style={{ animationDelay: "1.8s" }}>
                <div className="relative">
                  {/* 預留董事長照片位置 */}
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full shadow-lg border-4 border-white flex items-center justify-center">
                    <div className="text-slate-500 font-semibold text-sm text-center">
                      董事長<br/>照片
                    </div>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-700 mb-2">{chairmanName}</h2>
                  <div className="flex justify-center items-center gap-3 text-lg">
                    <span className="text-slate-600 font-medium">{chairmanTitle.chinese}</span>
                    <div className="w-2 h-2 bg-slate-400 rounded-full" />
                    <span className="text-slate-600 font-medium italic">{chairmanTitle.english}</span>
                  </div>
                </div>
              </div>

              {/* 致詞內容區域 */}
              <div className="space-y-8 animate-slide-up" style={{ animationDelay: "2s" }}>
                {/* 中文致詞 */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 shadow-sm">
                  <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium tracking-wide">
                    {welcomeMessage.chinese}
                  </p>
                </div>

                {/* 裝飾分隔符 */}
                <div className="flex justify-center items-center gap-3">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-slate-300" />
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse" />
                  <div className="w-8 h-0.5 bg-gradient-to-r from-slate-300 to-transparent" />
                </div>

                {/* 英文致詞 */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100 shadow-sm">
                  <p className="text-lg md:text-xl text-slate-700 leading-relaxed italic font-medium tracking-wide">
                    {welcomeMessage.english}
                  </p>
                </div>
              </div>

              {/* 簽名區域 */}
              <div className="mt-12 text-right animate-slide-up" style={{ animationDelay: "2.2s" }}>
                <div className="inline-block px-8 py-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-lg font-semibold text-slate-600 mb-1">感謝您的聆聽</p>
                  <p className="text-base italic text-slate-500">Thank you for your attention</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}