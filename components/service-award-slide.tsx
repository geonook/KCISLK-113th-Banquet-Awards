"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { AwardWinner } from "../types/award"

interface ServiceAwardSlideProps {
  winner: AwardWinner
  isActive: boolean
}

export function ServiceAwardSlide({ winner, isActive }: ServiceAwardSlideProps) {
  const [showContent, setShowContent] = useState(false)

  // 判斷是否為年資獎
  const isServiceAward = winner.awardType.includes("年資獎") || winner.awardType.includes("Years of Service")

  // 提取年資數字
  const getServiceYears = () => {
    const match = winner.awardType.match(/(\d+)/)
    return match ? match[1] : "多年"
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
      {/* 年資獎專用背景效果 */}
      <div className="absolute inset-0 animate-scale-in">
        <Image
          src="/images/award-background.jpg"
          alt="Award ceremony background"
          fill
          className="object-cover brightness-115 contrast-110 saturate-120"
        />
      </div>

      {/* 年資獎專用漸層遮罩 - 金色主題 */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.2) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)
          `,
        }}
      />

      {/* 年資獎專用浮動裝飾 */}
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
            <div className="text-2xl text-yellow-300/40">
              {i % 4 === 0 ? "🏅" : i % 4 === 1 ? "⏰" : i % 4 === 2 ? "🎖️" : "✨"}
            </div>
          </div>
        ))}
      </div>

      {showContent && (
        <div className="relative z-10 w-full max-w-6xl px-4 mx-auto animate-slide-up">
          <div className="relative animate-scale-in" style={{ animationDelay: "0.1s" }}>
            {/* 背景光暈 - 金色主題 */}
            <div className="absolute inset-0 rounded-3xl blur-3xl scale-105 bg-gradient-to-r from-yellow-400/20 via-amber-400/20 to-orange-400/20" />

            {/* 主卡片 */}
            <div className="relative bg-white/25 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden p-12">
              {/* 頂部裝飾條 - 金色漸層 */}
              <div
                className="absolute top-0 left-0 h-3 w-full animate-expand bg-gradient-to-r from-yellow-400 via-amber-500 via-orange-500 to-yellow-400"
                style={{ animationDelay: "0.2s" }}
              />

              {/* 年資獎章 - 特殊設計 */}
              <div className="absolute -top-8 -right-8 z-10 animate-bounce-in" style={{ animationDelay: "0.3s" }}>
                <div className="relative">
                  {/* 多層光暈效果 */}
                  <div className="absolute inset-0 rounded-full blur-xl animate-pulse bg-gradient-to-br from-yellow-400 to-amber-500" />
                  <div className="absolute -inset-2 rounded-full blur-lg animate-spin-slow bg-gradient-to-r from-yellow-300 to-orange-400 opacity-60" />

                  {/* 獎章主體 */}
                  <div className="relative w-32 h-32 rounded-full flex flex-col items-center justify-center text-white font-black shadow-2xl border-4 border-white bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-400">
                    <div className="text-3xl mb-1">🏅</div>
                    <div className="text-lg leading-tight text-center">
                      <div className="text-2xl font-black">{getServiceYears()}</div>
                      <div className="text-sm">年資</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 年資獎專用佈局 - 更大的空間給照片和姓名 */}
              <div className="grid md:grid-cols-5 gap-8 items-center">
                {/* 照片區域 - 更大 */}
                <div
                  className="md:col-span-2 flex justify-center animate-slide-right"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="relative group">
                    {/* 年資獎專用光環 - 金色 */}
                    <div className="absolute -inset-6 rounded-full opacity-40 animate-spin-slow bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-400" />
                    <div className="absolute -inset-4 rounded-full opacity-30 animate-spin-reverse bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300" />

                    {/* 照片框架 - 更大尺寸 */}
                    <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl relative z-10 border-6 border-yellow-300 group-hover:scale-105 transition-transform duration-300"
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
                          className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 group-hover:scale-105 transition-transform duration-300 animate-fade-in"
                          style={{ animationDelay: "0.6s" }}
                        >
                          <div className="w-24 h-24 mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-200 to-amber-300 text-yellow-700">
                            <span className="text-5xl">📷</span>
                          </div>
                          <p className="text-lg font-bold text-gray-700 text-center px-4 leading-tight">
                            {winner.recipientName}
                            <br />
                            <span className="text-base text-gray-500">得獎者照片</span>
                          </p>
                          <div className="mt-4 flex items-center text-base text-gray-500 bg-white/50 px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200">
                            <span className="text-xl mr-3">📤</span>
                            <span>點擊上傳</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 年資獎專用裝飾 */}
                    <div className="absolute -top-4 -left-4 text-yellow-400 text-3xl drop-shadow-lg animate-spin-slow">
                      🏆
                    </div>
                    <div
                      className="absolute -bottom-4 -right-4 text-yellow-400 text-2xl drop-shadow-lg animate-spin-reverse"
                      style={{ animationDelay: "1s" }}
                    >
                      🏅
                    </div>
                  </div>
                </div>

                {/* 年資獎資訊 - 佔更多空間 */}
                <div className="md:col-span-3 text-center md:text-left space-y-6">
                  {/* 部門標籤 */}
                  <div
                    className="flex justify-center md:justify-start animate-slide-left"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <div
                      className="inline-flex items-center px-8 py-4 rounded-full font-bold text-white shadow-xl border-2 border-white/20 text-xl bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500"
                      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                    >
                      <div className="mr-4 animate-spin-slow text-2xl">🏢</div>
                      {winner.department}
                    </div>
                  </div>

                  {/* 年資獎類型 - 更大字體 */}
                  <h2
                    className="text-6xl md:text-7xl font-black mb-4 animate-slide-left text-amber-600"
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

                  {/* 年資獎專用感謝詞 */}
                  <div className="mt-8 animate-slide-up" style={{ animationDelay: "0.8s" }}>
                    <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 rounded-2xl p-8 border-l-6 border-yellow-500 shadow-inner relative overflow-hidden">
                      {/* 背景裝飾 */}
                      <div className="absolute top-0 right-0 text-8xl opacity-10 text-yellow-300">🏅</div>

                      {/* 感謝內容 */}
                      <div className="relative z-10 text-center">
                        <h4 className="text-3xl font-black text-gray-800 mb-6 flex items-center justify-center gap-4">
                          <span className="animate-bounce">🙏</span>
                          感謝您的長期奉獻
                          <span className="animate-bounce" style={{ animationDelay: "0.5s" }}>
                            🙏
                          </span>
                        </h4>

                        <div className="text-xl text-gray-700 leading-relaxed space-y-4">
                          <p className="font-semibold">
                            感謝您 <span className="text-amber-600 font-black text-2xl">{getServiceYears()}</span>{" "}
                            年來的辛勤付出
                          </p>
                          <p>您的專業與熱忱，是學校發展的重要基石</p>
                          <p className="text-lg text-amber-700 font-bold">🌟 致敬您的教育初心與堅持 🌟</p>
                        </div>
                      </div>
                    </div>
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
