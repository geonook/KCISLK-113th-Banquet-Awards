"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { AwardWinner } from "../types/award"

interface ExcellenceAwardSlideProps {
  winner: AwardWinner
  isActive: boolean
}

export function ExcellenceAwardSlide({ winner, isActive }: ExcellenceAwardSlideProps) {
  const [showContent, setShowContent] = useState(false)
  
  // 智能字體大小系統 - 根據姓名長度自動調整
  const getNameFontSize = (name: string): string => {
    const length = name.length
    if (length <= 6) return "text-8xl md:text-9xl"      // 短名字(中文)：最大字體
    if (length <= 12) return "text-7xl md:text-8xl"     // 中等名字：大字體  
    if (length <= 18) return "text-6xl md:text-7xl"     // 較長名字：中字體
    return "text-5xl md:text-6xl"                       // 超長名字：基礎大字體
  }
  
  // 處理極長姓名的換行顯示
  const formatLongName = (name: string): string => {
    if (name.length <= 18) return name
    
    // 英文姓名：按空格分割，兩行顯示
    if (/^[A-Za-z\s]+$/.test(name)) {
      const words = name.split(' ')
      if (words.length >= 3) {
        return `${words[0]} ${words[1]}\n${words.slice(2).join(' ')}`
      }
    }
    
    return name
  }
  
  // 智能行高調整
  const getNameLineHeight = (name: string): string => {
    return name.length > 15 ? "leading-tight" : "leading-tight"
  }

  useEffect(() => {
    if (isActive) {
      setShowContent(false)
      const timer = setTimeout(() => setShowContent(true), 200)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 優質獎專用背景效果 */}
      <div className="absolute inset-0 animate-scale-in">
        <Image
          src="/images/award-background.jpg"
          alt="Award ceremony background"
          fill
          className="object-cover brightness-115 contrast-110 saturate-120"
        />
      </div>

      {/* 優質獎專用漸層遮罩 - 橙紅色主題 */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(251, 146, 60, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(239, 68, 68, 0.25) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)
          `,
        }}
      />

      {/* 優質獎專用浮動裝飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 6 + 8}s`,
            }}
          >
            <div className="text-2xl text-orange-300/40">
              {i % 4 === 0 ? "🏆" : i % 4 === 1 ? "🌟" : i % 4 === 2 ? "🎖️" : "✨"}
            </div>
          </div>
        ))}
      </div>

      {showContent && (
        <div className="relative z-10 w-full max-w-7xl px-4 mx-auto animate-slide-up">
          <div className="relative animate-scale-in" style={{ animationDelay: "0.1s" }}>
            {/* 背景光暈 - 橙紅色主題 */}
            <div className="absolute inset-0 rounded-3xl blur-3xl scale-105 bg-gradient-to-r from-orange-400/20 via-red-400/20 to-pink-400/20" />

            {/* 主卡片 - 增加padding 25% */}
            <div className="relative bg-white/25 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden p-10">
              {/* 頂部裝飾條 - 橙紅色漸層 */}
              <div
                className="absolute top-0 left-0 h-3 w-full animate-expand bg-gradient-to-r from-orange-400 via-red-500 via-pink-500 to-orange-400"
                style={{ animationDelay: "0.2s" }}
              />

              {/* 優質獎章 - 特殊設計 */}
              <div className="absolute -top-8 -right-8 z-10 animate-bounce-in" style={{ animationDelay: "0.3s" }}>
                <div className="relative">
                  {/* 多層光暈效果 */}
                  <div className="absolute inset-0 rounded-full blur-xl animate-pulse bg-gradient-to-br from-orange-400 to-red-500" />
                  <div className="absolute -inset-2 rounded-full blur-lg animate-spin-slow bg-gradient-to-r from-orange-300 to-pink-400 opacity-60" />

                  {/* 獎章主體 */}
                  <div className="relative w-32 h-32 rounded-full flex flex-col items-center justify-center text-white font-black shadow-2xl border-4 border-white bg-gradient-to-br from-orange-400 via-red-500 to-pink-500">
                    <div className="text-3xl mb-1">🌟</div>
                    <div className="text-lg leading-tight text-center">
                      <div className="text-xl font-black">優質</div>
                      <div className="text-sm">獎</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 優質獎佈局 - 增加間距25% */}
              <div className="grid md:grid-cols-5 gap-10 items-center">
                {/* 照片區域 - 更大 */}
                <div
                  className="md:col-span-2 flex justify-center animate-slide-right"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="relative group">
                    {/* 優質獎專用光環 - 橙紅色 */}
                    <div className="absolute -inset-6 rounded-full opacity-40 animate-spin-slow bg-gradient-to-r from-orange-400 via-red-500 to-pink-400" />
                    <div className="absolute -inset-4 rounded-full opacity-30 animate-spin-reverse bg-gradient-to-r from-red-300 via-orange-300 to-pink-300" />

                    {/* 照片框架 - 更大尺寸 +25% */}
                    <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl relative z-10 border-6 border-orange-300 group-hover:scale-105 transition-transform duration-300">
                      {winner.photoUrl ? (
                        <Image
                          src={winner.photoUrl || "/placeholder.svg"}
                          alt={`${winner.recipientName} photo`}
                          width={320}
                          height={320}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 group-hover:scale-105 transition-transform duration-300 animate-fade-in"
                          style={{ animationDelay: "0.6s" }}
                        >
                          <div className="w-24 h-24 mb-3 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-200 to-red-300 text-orange-700">
                            <span className="text-5xl">📷</span>
                          </div>
                          <p className="text-base font-bold text-gray-700 text-center px-4 leading-tight">
                            {winner.recipientName}
                            <br />
                            <span className="text-sm text-gray-500">得獎者照片</span>
                          </p>
                          <div className="mt-3 flex items-center text-sm text-gray-500 bg-white/50 px-4 py-2 rounded-full hover:scale-105 transition-transform duration-200">
                            <span className="text-lg mr-2">📤</span>
                            <span>點擊上傳</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 優質獎專用裝飾 */}
                    <div className="absolute -top-3 -left-3 text-orange-400 text-2xl drop-shadow-lg animate-spin-slow">
                      🌟
                    </div>
                    <div
                      className="absolute -bottom-3 -right-3 text-red-400 text-xl drop-shadow-lg animate-spin-reverse"
                      style={{ animationDelay: "1s" }}
                    >
                      🏆
                    </div>
                  </div>
                </div>

                {/* 優質獎資訊 - 佔更多空間 */}
                <div className="md:col-span-3 text-center md:text-left space-y-6">
                  {/* 部門標籤 */}
                  <div
                    className="flex justify-center md:justify-start animate-slide-left"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <div
                      className="inline-flex items-center px-10 py-5 rounded-full font-bold text-white shadow-xl border-2 border-white/20 text-2xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
                      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                    >
                      <div className="mr-5 animate-spin-slow text-3xl">🏢</div>
                      {winner.department}
                    </div>
                  </div>

                  {/* 優質獎類型 - 更大字體+25%+立體效果 */}
                  <h2
                    className="text-7xl md:text-8xl font-black mb-4 animate-slide-left text-orange-400"
                    style={{
                      textShadow: "3px 3px 6px rgba(0,0,0,0.5), 0 0 20px rgba(249, 115, 22, 0.3)",
                      animationDelay: "0.6s",
                    }}
                  >
                    {winner.awardType}
                  </h2>

                  {/* 得獎者姓名 - 智能字體大小+白色立體效果 */}
                  <h3
                    className={`${getNameFontSize(winner.recipientName)} font-black text-white ${getNameLineHeight(winner.recipientName)} animate-slide-left`}
                    style={{
                      textShadow: "4px 4px 8px rgba(0,0,0,0.6), 0 0 30px rgba(255,255,255,0.2)",
                      animationDelay: "0.7s",
                      whiteSpace: "pre-line", // 支持\n換行
                    }}
                  >
                    {formatLongName(winner.recipientName)}
                  </h3>
                </div>
              </div>

              {/* 具體事蹟區域 */}
              <div className="mt-8 animate-slide-up" style={{ animationDelay: "0.8s" }}>
                <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 bg-white/40 rounded-2xl p-10 border-l-6 border-orange-500 shadow-inner relative overflow-hidden">
                  {/* 背景裝飾 */}
                  <div className="absolute top-0 right-0 text-6xl opacity-10 text-orange-300">🌟</div>

                  {/* 標題 - 增大25% */}
                  <h4
                    className="text-3xl font-black text-gray-800 mb-6 text-center flex items-center justify-center gap-4 animate-fade-in"
                    style={{ animationDelay: "0.9s" }}
                  >
                    <span className="animate-bounce">🏆</span>
                    具體事蹟
                    <span className="animate-bounce" style={{ animationDelay: "0.5s" }}>
                      🏆
                    </span>
                  </h4>

                  {/* 具體事蹟內容 - 增強可讀性 */}
                  <div
                    className="text-gray-800 leading-relaxed whitespace-pre-line relative z-10 text-xl animate-fade-in"
                    style={{ 
                      animationDelay: "1s",
                      textShadow: "1px 1px 3px rgba(255,255,255,0.8)"
                    }}
                  >
                    {winner.achievements}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
