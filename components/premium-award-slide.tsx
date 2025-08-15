"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { AwardWinner } from "../types/award"

interface PremiumAwardSlideProps {
  winner: AwardWinner
  isActive: boolean
}

export function PremiumAwardSlide({ winner, isActive }: PremiumAwardSlideProps) {
  const [showContent, setShowContent] = useState(false)
  const isRockAward = winner.awardType === "磐石獎"

  useEffect(() => {
    if (isActive) {
      setShowContent(false)
      const timer = setTimeout(() => setShowContent(true), 200)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  // 根據內容長度調整佈局間距，但保持字體大小一致
  const isLongContent = winner.achievements.length > 300
  const hasMultipleParagraphs = winner.achievements.split("\n\n").length > 2

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 增強背景效果 */}
      <div className="absolute inset-0 animate-scale-in">
        <Image
          src="/images/award-background.jpg"
          alt="Award ceremony background"
          fill
          className="object-cover brightness-115 contrast-110 saturate-120"
        />
      </div>

      {/* 動態漸層遮罩 */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{
          background: isRockAward
            ? `
              radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)
            `
            : `
              radial-gradient(circle at 20% 30%, rgba(251, 146, 60, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(239, 68, 68, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)
            `,
        }}
      />

      {/* 高級浮動裝飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 6 + 8}s`,
            }}
          >
            <div
              className={`text-2xl ${
                i % 3 === 0
                  ? isRockAward
                    ? "text-purple-300/40"
                    : "text-yellow-300/40"
                  : i % 3 === 1
                    ? isRockAward
                      ? "text-blue-300/40"
                      : "text-orange-300/40"
                    : isRockAward
                      ? "text-indigo-300/40"
                      : "text-red-300/40"
              }`}
            >
              {i % 3 === 0 ? "🏆" : i % 3 === 1 ? "🎖️" : "⭐"}
            </div>
          </div>
        ))}
      </div>

      {showContent && (
        <div className="relative z-10 w-full max-w-7xl px-4 mx-auto animate-slide-up">
          <div className="relative animate-scale-in" style={{ animationDelay: "0.1s" }}>
            {/* 背景光暈 */}
            <div
              className={`absolute inset-0 rounded-3xl blur-3xl scale-105 ${
                isRockAward
                  ? "bg-gradient-to-r from-purple-400/20 via-blue-400/20 to-indigo-400/20"
                  : "bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20"
              }`}
            />

            {/* 主卡片 */}
            <div
              className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden ${
                isLongContent ? "p-6" : "p-8"
              }`}
            >
              {/* 頂部裝飾條 */}
              <div
                className={`absolute top-0 left-0 h-3 w-full animate-expand ${
                  isRockAward
                    ? "bg-gradient-to-r from-purple-500 via-blue-500 via-indigo-500 to-purple-500"
                    : "bg-gradient-to-r from-yellow-400 via-orange-500 via-red-500 to-yellow-400"
                }`}
                style={{ animationDelay: "0.2s" }}
              />

              {/* 動態獎章 */}
              <div className="absolute -top-6 -right-6 z-10 animate-bounce-in" style={{ animationDelay: "0.3s" }}>
                <div className="relative">
                  {/* 光暈效果 */}
                  <div
                    className={`absolute inset-0 rounded-full blur-lg animate-pulse ${
                      isRockAward
                        ? "bg-gradient-to-br from-purple-400 to-blue-500"
                        : "bg-gradient-to-br from-yellow-400 to-red-500"
                    }`}
                  />

                  {/* 獎章主體 */}
                  <div
                    className={`relative w-28 h-28 rounded-full flex items-center justify-center text-xl font-black shadow-2xl border-4 border-white ${
                      isRockAward
                        ? "bg-gradient-to-br from-purple-400 via-purple-500 to-blue-600 text-white"
                        : "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white"
                    }`}
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
                  >
                    <span className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
                      {isRockAward ? "磐石" : "優質"}
                    </span>
                  </div>
                </div>
              </div>

              {/* 調整為更緊湊的佈局 */}
              <div className={`grid md:grid-cols-4 gap-4 items-start ${isLongContent ? "mb-4" : "mb-6"}`}>
                {/* 照片區域 - 固定大小 */}
                <div className="flex justify-center animate-slide-right" style={{ animationDelay: "0.4s" }}>
                  <div className="relative group">
                    {/* 多層光環效果 - 固定大小 */}
                    <div className="absolute -inset-5 rounded-full opacity-30 animate-spin-slow bg-gradient-to-r from-yellow-400 via-orange-500 to-red-400" />
                    <div className="absolute -inset-3 rounded-full opacity-20 animate-spin-reverse bg-gradient-to-r from-orange-300 via-red-300 to-pink-300" />

                    {/* 照片框架 - 固定為 192x192 */}
                    <div className="w-48 h-48 rounded-full overflow-hidden shadow-2xl relative z-10 border-4 group-hover:scale-105 transition-transform duration-300 border-orange-300">
                      {winner.photoUrl ? (
                        <Image
                          src={winner.photoUrl || "/placeholder.svg"}
                          alt={`${winner.recipientName} photo`}
                          width={192}
                          height={192}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-100 to-red-100 group-hover:scale-105 transition-transform duration-300 animate-fade-in"
                          style={{ animationDelay: "0.6s" }}
                        >
                          <div className="w-20 h-20 mb-3 rounded-full flex items-center justify-center hover:scale-110 hover:rotate-6 transition-all duration-300 bg-gradient-to-br from-orange-200 to-red-300 text-orange-700">
                            <span className="text-4xl">📷</span>
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

                    {/* 裝飾星星 - 固定位置 */}
                    <div className="absolute -top-3 -left-3 text-yellow-400 text-2xl drop-shadow-lg animate-spin-slow">
                      ⭐
                    </div>
                    <div
                      className="absolute -bottom-3 -right-3 text-yellow-400 text-xl drop-shadow-lg animate-spin-reverse"
                      style={{ animationDelay: "1s" }}
                    >
                      ✨
                    </div>
                  </div>
                </div>

                {/* 獎項資訊 */}
                <div className={`md:col-span-3 text-center md:text-left ${isLongContent ? "space-y-3" : "space-y-4"}`}>
                  {/* 部門標籤 */}
                  <div
                    className="flex justify-center md:justify-start animate-slide-left"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <div
                      className={`inline-flex items-center px-7 py-3 rounded-full font-bold text-white shadow-xl border-2 border-white/20 text-lg ${
                        isRockAward
                          ? "bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500"
                          : "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
                      }`}
                      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                    >
                      <div className="mr-3 animate-spin-slow">🏢</div>
                      {winner.department}
                    </div>
                  </div>

                  {/* 獎項類型 */}
                  <h2
                    className={`text-4xl md:text-5xl font-black mb-2 animate-slide-left ${
                      isRockAward ? "text-purple-600" : "text-orange-600"
                    }`}
                    style={{
                      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      animationDelay: "0.6s",
                    }}
                  >
                    {winner.awardType}
                  </h2>

                  {/* 得獎者姓名 */}
                  <h3
                    className="text-5xl md:text-6xl font-black text-gray-800 leading-tight animate-slide-left"
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
              <div className={isLongContent ? "mt-4" : "mt-6"}>
                <div
                  className={`rounded-2xl ${isLongContent ? "p-5" : "p-6"} border-l-6 shadow-inner relative overflow-hidden animate-slide-up ${
                    isRockAward
                      ? "bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-purple-500"
                      : "bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 border-orange-500"
                  }`}
                  style={{ animationDelay: "0.8s" }}
                >
                  {/* 背景裝飾 */}
                  <div
                    className={`absolute top-0 right-0 text-6xl opacity-10 ${
                      isRockAward ? "text-purple-300" : "text-orange-300"
                    }`}
                  >
                    🏆
                  </div>

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
