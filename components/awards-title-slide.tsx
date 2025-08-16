"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface AwardsTitleSlideProps {
  phase: 'first' | 'second'
  isActive?: boolean
  awardCounts?: {
    service?: number    // 年資獎人數
    rock?: number       // 磐石獎人數  
    excellence?: number // 優質獎人數
  }
}

export function AwardsTitleSlide({ phase, isActive = true, awardCounts }: AwardsTitleSlideProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setShowContent(true), 300)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  // 階段特定配置
  const phaseConfig = {
    first: {
      title: "優秀同仁頒獎",
      subtitle: "Outstanding Staff Awards",
      description: "年資獎 & 磐石獎 / Service & Rock Awards",
      slogan: "資深貢獻，磐石精神",
      sloganEn: "Senior Contribution, Rock Spirit",
      gradientColors: "from-blue-600 via-purple-600 to-yellow-500",
      overlayColors: `
        radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.2) 0%, transparent 50%),
        linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.4) 100%)
      `,
      icons: ["🏆", "💎"],
      particleColors: ["from-blue-300 to-purple-400", "from-purple-300 to-yellow-400", "from-yellow-300 to-orange-400"]
    },
    second: {
      title: "優秀同仁頒獎",
      subtitle: "Outstanding Staff Awards", 
      description: "優質獎 / Excellence Awards",
      slogan: "卓越表現，優質服務",
      sloganEn: "Excellence Performance, Quality Service",
      gradientColors: "from-orange-500 via-red-500 to-yellow-500",
      overlayColors: `
        radial-gradient(circle at 30% 20%, rgba(249, 115, 22, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(239, 68, 68, 0.2) 0%, transparent 50%),
        linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)
      `,
      icons: ["⭐", "🌟"],
      particleColors: ["from-orange-300 to-red-400", "from-red-300 to-pink-400", "from-yellow-300 to-orange-400"]
    }
  }

  const config = phaseConfig[phase]

  // 計算總得獎人數
  const totalAwards = phase === 'first' 
    ? (awardCounts?.service || 0) + (awardCounts?.rock || 0)
    : (awardCounts?.excellence || 0)

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 背景圖片 */}
      <div className="absolute inset-0 animate-scale-in">
        <Image
          src="/images/award-background.jpg"
          alt="Award ceremony background"
          fill
          className="object-cover brightness-105 contrast-110 saturate-120"
          priority
        />
      </div>

      {/* 階段特定漸層遮罩 */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{
          background: config.overlayColors,
          animationDelay: "0.5s",
        }}
      />

      {/* 榮耀光環效果 */}
      <div className="absolute inset-0 animate-fade-in" style={{ animationDelay: "1s" }}>
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r ${config.gradientColors} rounded-full opacity-10 blur-3xl animate-pulse`} />
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r ${config.gradientColors} rounded-full opacity-15 blur-2xl animate-pulse`} style={{ animationDelay: "0.5s" }} />
      </div>

      {/* 慶祝粒子系統 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          >
            <div
              className={`w-4 h-4 rounded-full shadow-lg ${
                config.particleColors[i % config.particleColors.length]
              } animate-pulse`}
              style={{
                boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)"
              }}
            />
          </div>
        ))}
      </div>

      {/* 獎盃浮動圖標 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {config.icons.map((icon, i) => (
          <div
            key={i}
            className="absolute text-6xl animate-float"
            style={{
              left: `${20 + i * 60}%`,
              top: `${30 + i * 20}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: "8s",
              filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))",
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* 頂部標語 */}
      <div className="absolute top-12 left-12 z-20 animate-slide-right" style={{ animationDelay: "0.8s" }}>
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${config.gradientColors} opacity-30 rounded-2xl blur-xl`} />
          <div className="relative px-8 py-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 shadow-2xl">
            <p
              className="text-xl font-bold tracking-wider text-white drop-shadow-lg"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
            >
              {config.slogan}
            </p>
          </div>
        </div>
      </div>

      {/* 底部英文標語 */}
      <div className="absolute bottom-36 right-12 z-20 animate-slide-left" style={{ animationDelay: "1s" }}>
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${config.gradientColors} opacity-30 rounded-2xl blur-xl`} />
          <div className="relative px-10 py-5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 shadow-2xl">
            <p
              className="text-lg font-bold italic text-white drop-shadow-lg tracking-wide"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
            >
              {config.sloganEn}
            </p>
          </div>
        </div>
      </div>

      {/* 得獎人數統計 */}
      {awardCounts && (
        <div className="absolute top-12 right-12 z-20 animate-slide-left" style={{ animationDelay: "1.2s" }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/40 to-orange-500/40 rounded-2xl blur-xl" />
            <div className="relative px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
              <div className="text-center text-white">
                <p className="text-lg font-bold drop-shadow-lg">得獎人數</p>
                <p className="text-2xl font-black text-yellow-300 drop-shadow-lg">{totalAwards}位</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 主要內容區域 */}
      {showContent && (
        <div className="relative z-10 text-center px-6 w-full max-w-6xl mx-auto animate-slide-up">
          <div className="relative animate-scale-in" style={{ animationDelay: "0.8s" }}>
            {/* 背景光暈效果 */}
            <div className={`absolute inset-0 bg-gradient-to-r ${config.gradientColors} opacity-20 rounded-3xl blur-3xl scale-110`} />

            {/* 主卡片 */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-14 shadow-2xl border border-white/30 overflow-hidden">
              {/* 裝飾性漸層頂條 */}
              <div className={`absolute top-0 left-0 w-full h-3 bg-gradient-to-r ${config.gradientColors}`} />

              {/* 動態裝飾圓圈 */}
              <div className={`absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br ${config.gradientColors} rounded-full opacity-30 animate-spin-slow`} />
              <div className={`absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-br ${config.gradientColors} rounded-full opacity-30 animate-spin-reverse`} />

              {/* 獎盃圖標裝飾 */}
              <div className="absolute top-6 right-6 text-4xl animate-bounce" style={{ animationDelay: "2s" }}>
                🏆
              </div>

              {/* 標題區域 */}
              <div className="mb-8 animate-slide-up" style={{ animationDelay: "1s" }}>
                {/* 主標題 */}
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-none"
                  style={{
                    background: `linear-gradient(135deg, ${config.gradientColors.replace('from-', '').replace('via-', '').replace('to-', '').split(' ').map(color => {
                      const colorMap: Record<string, string> = {
                        'blue-600': '#2563eb',
                        'purple-600': '#7c3aed', 
                        'yellow-500': '#eab308',
                        'orange-500': '#f97316',
                        'red-500': '#ef4444'
                      }
                      return colorMap[color] || '#000'
                    }).join(', ')})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(3px 3px 6px rgba(0,0,0,0.2))",
                  }}
                >
                  {config.title}
                </h1>

                {/* 英文副標題 */}
                <p
                  className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-semibold tracking-wide mb-4 animate-slide-up"
                  style={{ animationDelay: "1.2s" }}
                >
                  {config.subtitle}
                </p>

                {/* 階段描述 */}
                <p
                  className={`text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${config.gradientColors} animate-slide-up`}
                  style={{ animationDelay: "1.4s" }}
                >
                  {config.description}
                </p>
              </div>

              {/* 閃爍裝飾線條 */}
              <div className="relative mb-8 animate-slide-up" style={{ animationDelay: "1.6s" }}>
                <div className={`h-1 bg-gradient-to-r ${config.gradientColors} mx-auto animate-expand`} />
                <div className="absolute top-0 left-1/2 w-20 h-1 bg-gradient-to-r from-white via-yellow-300 to-white opacity-80 blur-sm animate-shimmer" />
              </div>

              {/* 獎項詳細說明區域 */}
              <div className="space-y-6 animate-slide-up" style={{ animationDelay: "1.8s" }}>
                {phase === 'first' ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* 年資獎 */}
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 shadow-lg animate-slide-right" style={{ animationDelay: "2s" }}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">🏆</span>
                        <h3 className="text-lg font-bold text-gray-700">年資獎</h3>
                        {awardCounts?.service && (
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                            {awardCounts.service}位
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">資深同仁的忠誠奉獻</p>
                    </div>

                    {/* 磐石獎 */}
                    <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-yellow-50 rounded-xl border border-purple-200 shadow-lg animate-slide-left" style={{ animationDelay: "2.2s" }}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">💎</span>
                        <h3 className="text-lg font-bold text-gray-700">磐石獎</h3>
                        {awardCounts?.rock && (
                          <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-semibold">
                            {awardCounts.rock}位
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">穩如磐石的專業精神</p>
                    </div>
                  </div>
                ) : (
                  <div className="px-8 py-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200 shadow-lg animate-scale-in" style={{ animationDelay: "2s" }}>
                    <div className="flex items-center justify-center gap-4 mb-3">
                      <span className="text-3xl">⭐</span>
                      <h3 className="text-2xl font-bold text-gray-700">優質獎</h3>
                      <span className="text-3xl">🌟</span>
                      {awardCounts?.excellence && (
                        <span className="text-lg bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-bold">
                          {awardCounts.excellence}位得獎
                        </span>
                      )}
                    </div>
                    <p className="text-center text-gray-600 text-lg">卓越表現，優質服務的最佳典範</p>
                  </div>
                )}
              </div>

              {/* 慶祝標語 */}
              <div className="mt-8 animate-slide-up" style={{ animationDelay: "2.4s" }}>
                <p className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${config.gradientColors} animate-pulse`}>
                  🎉 讓我們一起為優秀同仁喝采！ 🎉
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}