"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { AwardWinner } from "../types/award"

interface RockAwardSlideProps {
  winner: AwardWinner
  isActive: boolean
}

export function RockAwardSlide({ winner, isActive }: RockAwardSlideProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (isActive) {
      setShowContent(false)
      const timer = setTimeout(() => setShowContent(true), 200)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 磐石獎專用背景效果 */}
      <div className="absolute inset-0 animate-scale-in">
        <Image
          src="/images/award-background.jpg"
          alt="Award ceremony background"
          fill
          className="object-cover brightness-115 contrast-110 saturate-120"
        />
      </div>

      {/* 磐石獎專用漸層遮罩 - 紫藍色主題 */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.25) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)
          `,
        }}
      />

      {/* 磐石獎專用浮動裝飾 */}
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
            <div className="text-2xl text-purple-300/40">
              {i % 4 === 0 ? "🏆" : i % 4 === 1 ? "💎" : i % 4 === 2 ? "🎖️" : "⭐"}
            </div>
          </div>
        ))}
      </div>

      {showContent && (
        <div className="relative z-10 w-full max-w-7xl px-4 mx-auto animate-slide-up">
          <div className="relative animate-scale-in" style={{ animationDelay: "0.1s" }}>
            {/* 背景光暈 - 紫藍色主題 */}
            <div className="absolute inset-0 rounded-3xl blur-3xl scale-105 bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-indigo-400/20" />

            {/* 主卡片 */}
            <div className="relative bg-white/25 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden p-8">
              {/* 頂部裝飾條 - 紫藍色漸層 */}
              <div
                className="absolute top-0 left-0 h-3 w-full animate-expand bg-gradient-to-r from-purple-500 via-blue-500 via-indigo-500 to-purple-500"
                style={{ animationDelay: "0.2s" }}
              />

              {/* 磐石獎章 - 特殊設計 */}
              <div className="absolute -top-8 -right-8 z-10 animate-bounce-in" style={{ animationDelay: "0.3s" }}>
                <div className="relative">
                  {/* 多層光暈效果 */}
                  <div className="absolute inset-0 rounded-full blur-xl animate-pulse bg-gradient-to-br from-purple-400 to-blue-500" />
                  <div className="absolute -inset-2 rounded-full blur-lg animate-spin-slow bg-gradient-to-r from-purple-300 to-indigo-400 opacity-60" />

                  {/* 獎章主體 */}
                  <div className="relative w-32 h-32 rounded-full flex flex-col items-center justify-center text-white font-black shadow-2xl border-4 border-white bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600">
                    <div className="text-3xl mb-1">💎</div>
                    <div className="text-lg leading-tight text-center">
                      <div className="text-xl font-black">磐石</div>
                      <div className="text-sm">獎</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 磐石獎佈局 */}
              <div className="grid md:grid-cols-5 gap-8 items-center">
                {/* 照片區域 - 更大 */}
                <div
                  className="md:col-span-2 flex justify-center animate-slide-right"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="relative group">
                    {/* 磐石獎專用光環 - 紫藍色 */}
                    <div className="absolute -inset-6 rounded-full opacity-40 animate-spin-slow bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-400" />
                    <div className="absolute -inset-4 rounded-full opacity-30 animate-spin-reverse bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300" />

                    {/* 照片框架 - 更大尺寸 */}
                    <div className="w-64 h-64 rounded-full overflow-hidden shadow-2xl relative z-10 border-6 border-purple-300 group-hover:scale-105 transition-transform duration-300">
                      {winner.photoUrl ? (
                        <Image
                          src={winner.photoUrl || "/placeholder.svg"}
                          alt={`${winner.recipientName} photo`}
                          width={256}
                          height={256}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 group-hover:scale-105 transition-transform duration-300 animate-fade-in"
                          style={{ animationDelay: "0.6s" }}
                        >
                          <div className="w-24 h-24 mb-3 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-blue-300 text-purple-700">
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

                    {/* 磐石獎專用裝飾 */}
                    <div className="absolute -top-3 -left-3 text-purple-400 text-2xl drop-shadow-lg animate-spin-slow">
                      💎
                    </div>
                    <div
                      className="absolute -bottom-3 -right-3 text-blue-400 text-xl drop-shadow-lg animate-spin-reverse"
                      style={{ animationDelay: "1s" }}
                    >
                      🏆
                    </div>
                  </div>
                </div>

                {/* 磐石獎資訊 - 佔更多空間 */}
                <div className="md:col-span-3 text-center md:text-left space-y-6">
                  {/* 部門標籤 */}
                  <div
                    className="flex justify-center md:justify-start animate-slide-left"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <div
                      className="inline-flex items-center px-8 py-4 rounded-full font-bold text-white shadow-xl border-2 border-white/20 text-xl bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500"
                      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                    >
                      <div className="mr-4 animate-spin-slow text-2xl">🏢</div>
                      {winner.department}
                    </div>
                  </div>

                  {/* 磐石獎類型 - 更大字體 */}
                  <h2
                    className="text-6xl md:text-7xl font-black mb-4 animate-slide-left text-purple-600"
                    style={{
                      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      animationDelay: "0.6s",
                    }}
                  >
                    {winner.awardType}
                  </h2>

                  {/* 得獎者姓名 - 超大字體 */}
                  <h3
                    className="text-7xl md:text-8xl font-black text-gray-800 leading-tight animate-slide-left"
                    style={{
                      background: "linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      animationDelay: "0.7s",
                    }}
                  >
                    {winner.recipientName}
                  </h3>
                </div>
              </div>

              {/* 具體事蹟區域 */}
              <div className="mt-8 animate-slide-up" style={{ animationDelay: "0.8s" }}>
                <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-2xl p-8 border-l-6 border-purple-500 shadow-inner relative overflow-hidden">
                  {/* 背景裝飾 */}
                  <div className="absolute top-0 right-0 text-6xl opacity-10 text-purple-300">💎</div>

                  {/* 標題 */}
                  <h4
                    className="text-2xl font-black text-gray-800 mb-5 text-center flex items-center justify-center gap-3 animate-fade-in"
                    style={{ animationDelay: "0.9s" }}
                  >
                    <span className="animate-bounce">🏆</span>
                    具體事蹟
                    <span className="animate-bounce" style={{ animationDelay: "0.5s" }}>
                      🏆
                    </span>
                  </h4>

                  {/* 具體事蹟內容 */}
                  <div
                    className="text-gray-700 leading-relaxed whitespace-pre-line relative z-10 text-lg animate-fade-in"
                    style={{ animationDelay: "1s" }}
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
