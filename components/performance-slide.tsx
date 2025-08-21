"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface PerformanceSlideProps {
  performanceType: 'violin' | 'choir' | 'dance'
  isActive?: boolean
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
  performers = []
}: PerformanceSlideProps) {
  const [showContent, setShowContent] = useState(false)
  
  const config = performanceConfig[performanceType]

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])


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



      {/* 主要內容區域 */}
      {showContent && (
        <div className="relative z-10 text-center px-6 w-[85%] max-w-[4800px] mx-auto animate-slide-up">
          <div className="relative animate-scale-in" style={{ animationDelay: "0.8s" }}>
            {/* 背景光暈效果 - 表演主題色彩 */}
            <div 
              className="absolute inset-0 rounded-3xl blur-3xl scale-110"
              style={{
                background: `linear-gradient(to right, ${config.bgGradient})`
              }}
            />

            {/* 主卡片 */}
            <div className="relative bg-white/25 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/30 overflow-hidden">
              {/* 裝飾性幾何元素 - 表演主題色彩 */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${config.gradientColors}`} />

              {/* 動態裝飾圓圈 - 表演主題色彩 */}
              <div className={`absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br ${config.gradientColors} rounded-full opacity-20 animate-spin-slow`} />
              <div className={`absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-br ${config.gradientColors} rounded-full opacity-20 animate-spin-reverse`} />


              {/* 標題區域 - 增加間距以維持字卡高度 */}
              <div className="mb-20 animate-slide-up flex flex-col justify-center min-h-[400px]" style={{ animationDelay: "1.2s" }}>
                {/* 中文主標題 - 增加下邊距 */}
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-16 leading-tight"
                  style={{
                    color: "white",
                    textShadow: "4px 4px 12px rgba(0,0,0,0.6), 0 0 40px rgba(255,255,255,0.3)",
                    filter: "drop-shadow(4px 4px 8px rgba(0,0,0,0.4))",
                  }}
                >
                  {config.title}
                </h1>

                {/* 英文副標題 - 增加下邊距 */}
                <h2
                  className="text-xl md:text-2xl lg:text-3xl text-white font-semibold tracking-wide mb-16 animate-slide-up"
                  style={{ 
                    animationDelay: "1.4s",
                    textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.1)"
                  }}
                >
                  {config.englishTitle}
                </h2>

              </div>

              {/* 裝飾線條 - 表演主題色彩，增加間距 */}
              <div className="relative mb-20 animate-slide-up" style={{ animationDelay: "1.8s" }}>
                <div className={`h-1 bg-gradient-to-r ${config.gradientColors} mx-auto animate-expand`} />
                <div className="absolute top-0 left-1/2 w-20 h-1 bg-gradient-to-r from-white via-yellow-300 to-white opacity-60 blur-sm animate-shimmer" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}