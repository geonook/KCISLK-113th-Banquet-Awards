"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface PerformanceSlideProps {
  performanceType: 'violin' | 'choir' | 'dance'
  isActive?: boolean
  duration?: number // 表演時長（分鐘），用於倒計時
  performers?: string[] // 表演者名單（可選）
}

// 表演類型配置
const performanceConfig = {
  violin: {
    title: "小提琴表演",
    englishTitle: "Violin Performance",
    description: "開場表演 / Opening Performance",
    icon: "🎻",
    gradientColors: "from-purple-400 via-pink-500 to-red-500",
    bgGradient: "rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2), rgba(239, 68, 68, 0.2)",
    accentColor: "purple",
    lightColor: "rgba(147, 51, 234, 0.3)"
  },
  choir: {
    title: "小學國際處中外師合唱",
    englishTitle: "Elementary International Division Choir",
    description: "串場表演 / Intermission Performance",
    icon: "🎵",
    gradientColors: "from-blue-400 via-cyan-500 to-teal-500",
    bgGradient: "rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2), rgba(20, 184, 166, 0.2)",
    accentColor: "blue",
    lightColor: "rgba(59, 130, 246, 0.3)"
  },
  dance: {
    title: "幼兒園中外師多元文化舞蹈表演",
    englishTitle: "Kindergarten Multicultural Dance Performance",
    description: "串場表演 / Intermission Performance",
    icon: "💃",
    gradientColors: "from-yellow-400 via-orange-500 to-red-500",
    bgGradient: "rgba(245, 158, 11, 0.2), rgba(249, 115, 22, 0.2), rgba(239, 68, 68, 0.2)",
    accentColor: "orange",
    lightColor: "rgba(245, 158, 11, 0.3)"
  }
}

export function PerformanceSlide({ 
  performanceType, 
  isActive = true,
  duration,
  performers = []
}: PerformanceSlideProps) {
  const [showContent, setShowContent] = useState(false)
  const [countdown, setCountdown] = useState(duration ? duration * 60 : null)
  
  const config = performanceConfig[performanceType]

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // 倒計時功能
  useEffect(() => {
    if (countdown && countdown > 0 && isActive) {
      const timer = setInterval(() => {
        setCountdown(prev => prev ? prev - 1 : null)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [countdown, isActive])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // 音樂視覺化元素
  const MusicVisualization = () => (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      {/* 音符動畫 */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 6 + 8}s`,
          }}
        >
          <div className={`text-2xl animate-wiggle`} style={{ animationDelay: `${Math.random() * 2}s` }}>
            {i % 4 === 0 ? '♪' : i % 4 === 1 ? '♫' : i % 4 === 2 ? '♬' : '♭'}
          </div>
        </div>
      ))}
      
      {/* 波形動畫 */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 pb-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`bg-gradient-to-t ${config.gradientColors} rounded-full opacity-40 animate-heartbeat`}
            style={{
              width: '4px',
              height: `${Math.random() * 60 + 20}px`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${Math.random() * 2 + 1}s`
            }}
          />
        ))}
      </div>
    </div>
  )

  // 舞台燈光效果
  const StageLighting = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* 聚光燈效果 */}
      <div 
        className="absolute top-0 left-1/2 w-96 h-96 opacity-20 rounded-full blur-3xl animate-pulse"
        style={{ 
          transform: 'translateX(-50%)',
          background: `radial-gradient(circle, ${config.lightColor}, transparent)`
        }}
      />
      <div 
        className="absolute top-20 left-1/4 w-64 h-64 opacity-30 rounded-full blur-2xl animate-pulse"
        style={{ 
          animationDelay: '1s',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent)'
        }}
      />
      <div 
        className="absolute top-20 right-1/4 w-64 h-64 opacity-30 rounded-full blur-2xl animate-pulse"
        style={{ 
          animationDelay: '1.5s',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent)'
        }}
      />
    </div>
  )

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 多層背景效果 */}
      <div className="absolute inset-0 animate-scale-in">
        <Image
          src="/images/award-background.jpg"
          alt="Performance background"
          fill
          className="object-cover brightness-110 contrast-105 saturate-110"
          priority
        />
      </div>

      {/* 表演主題動態漸層遮罩 */}
      <div
        className="absolute inset-0 animate-fade-in"
        style={{
          background: `
            radial-gradient(circle at 30% 20%, ${config.lightColor} 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, ${config.lightColor} 0%, transparent 50%),
            linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)
          `,
          animationDelay: "0.5s",
        }}
      />

      {/* 舞台燈光效果 */}
      <StageLighting />

      {/* 音樂視覺化效果 */}
      <MusicVisualization />

      {/* 高級浮動粒子系統 - 表演主題色彩 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
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
              className={`w-3 h-3 rounded-full shadow-lg animate-sparkle bg-gradient-to-r ${config.gradientColors}`}
              style={{ animationDelay: `${Math.random() * 2}s` }}
            />
          </div>
        ))}
      </div>

      {/* 表演類型標識 */}
      <div className="absolute top-12 left-12 z-20 animate-slide-right" style={{ animationDelay: "0.8s" }}>
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${config.bgGradient} rounded-2xl blur-xl`} />
          <div className="relative px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-bounce" style={{ animationDelay: "1s" }}>
                {config.icon}
              </span>
              <p
                className="text-xl font-bold tracking-wider text-white drop-shadow-lg"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
              >
                表演節目 Performance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 倒計時器 */}
      {countdown && countdown > 0 && (
        <div className="absolute top-12 right-12 z-20 animate-slide-left" style={{ animationDelay: "1s" }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-2xl blur-xl" />
            <div className="relative px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
              <div className="text-center">
                <p className="text-sm text-white/80 mb-1">剩餘時間 / Time Left</p>
                <p
                  className="text-2xl font-mono font-bold text-white drop-shadow-lg animate-pulse"
                  style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                >
                  {formatTime(countdown)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 表演者名單 */}
      {performers.length > 0 && (
        <div className="absolute bottom-36 left-12 z-20 animate-slide-right" style={{ animationDelay: "1.2s" }}>
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${config.bgGradient} rounded-2xl blur-xl`} />
            <div className="relative px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl max-w-md">
              <p className="text-lg font-bold text-white mb-2 drop-shadow-lg">
                表演者 / Performers
              </p>
              <div className="space-y-1">
                {performers.map((performer, index) => (
                  <p
                    key={index}
                    className="text-sm text-white/90 drop-shadow-md animate-slide-up"
                    style={{ 
                      animationDelay: `${1.4 + index * 0.1}s`,
                      textShadow: "0 1px 2px rgba(0,0,0,0.5)"
                    }}
                  >
                    {performer}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 主要內容區域 */}
      {showContent && (
        <div className="relative z-10 text-center px-6 w-full max-w-7xl mx-auto animate-slide-up">
          <div className="relative animate-scale-in" style={{ animationDelay: "0.8s" }}>
            {/* 背景光暈效果 - 表演主題色彩 */}
            <div 
              className="absolute inset-0 rounded-3xl blur-3xl scale-110"
              style={{
                background: `linear-gradient(to right, ${config.bgGradient})`
              }}
            />

            {/* 主卡片 */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-14 shadow-2xl border border-white/30 overflow-hidden">
              {/* 裝飾性幾何元素 - 表演主題色彩 */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${config.gradientColors}`} />

              {/* 動態裝飾圓圈 - 表演主題色彩 */}
              <div className={`absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br ${config.gradientColors} rounded-full opacity-20 animate-spin-slow`} />
              <div className={`absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-br ${config.gradientColors} rounded-full opacity-20 animate-spin-reverse`} />

              {/* 表演icon大圖示 */}
              <div className="mb-8 animate-bounce-in" style={{ animationDelay: "1s" }}>
                <div className="text-8xl mb-4 animate-heartbeat">
                  {config.icon}
                </div>
              </div>

              {/* 標題區域 */}
              <div className="mb-10 animate-slide-up" style={{ animationDelay: "1.2s" }}>
                {/* 中文主標題 */}
                <h1
                  className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r ${config.gradientColors}`}
                  style={{
                    filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
                  }}
                >
                  {config.title}
                </h1>

                {/* 英文副標題 */}
                <h2
                  className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-semibold tracking-wide mb-6 animate-slide-up"
                  style={{ animationDelay: "1.4s" }}
                >
                  {config.englishTitle}
                </h2>

                {/* 表演描述 */}
                <p
                  className="text-lg md:text-xl text-gray-600 font-medium animate-slide-up"
                  style={{ animationDelay: "1.6s" }}
                >
                  {config.description}
                </p>
              </div>

              {/* 裝飾線條 - 表演主題色彩 */}
              <div className="relative mb-10 animate-slide-up" style={{ animationDelay: "1.8s" }}>
                <div className={`h-1 bg-gradient-to-r ${config.gradientColors} mx-auto animate-expand`} />
                <div className="absolute top-0 left-1/2 w-20 h-1 bg-gradient-to-r from-white via-yellow-300 to-white opacity-60 blur-sm animate-shimmer" />
              </div>

              {/* 表演特色描述 */}
              <div className="space-y-6 animate-slide-up" style={{ animationDelay: "2s" }}>
                <div className="flex flex-wrap justify-center items-center gap-6 text-lg md:text-xl">
                  <div
                    className="px-8 py-4 bg-gradient-to-r from-blue-50 to-purple-100 rounded-full border border-blue-200 shadow-lg animate-slide-right hover:scale-105 transition-transform"
                    style={{ animationDelay: "2.2s" }}
                  >
                    <p className="font-semibold text-gray-700 whitespace-nowrap">
                      🎭 精彩演出 Amazing Performance
                    </p>
                  </div>

                  <div
                    className={`w-4 h-4 bg-gradient-to-r ${config.gradientColors} rounded-full animate-pulse`}
                    style={{ animationDelay: "2.4s" }}
                  />

                  <div
                    className="px-8 py-4 bg-gradient-to-r from-orange-50 to-red-100 rounded-full border border-orange-200 shadow-lg animate-slide-left hover:scale-105 transition-transform"
                    style={{ animationDelay: "2.6s" }}
                  >
                    <p className="font-semibold text-gray-700 whitespace-nowrap">
                      ✨ 文化交融 Cultural Fusion
                    </p>
                  </div>
                </div>

                {/* 觀賞提示 */}
                <div
                  className="mt-8 p-6 bg-gradient-to-r from-white/80 to-gray-50/80 rounded-2xl border border-gray-200 shadow-inner animate-slide-up"
                  style={{ animationDelay: "2.8s" }}
                >
                  <p className="text-lg font-medium text-gray-600 mb-2">
                    🎬 請欣賞精彩表演 / Please Enjoy the Performance
                  </p>
                  <p className="text-sm text-gray-500">
                    讓我們一起感受藝術的魅力 / Let's feel the charm of art together
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