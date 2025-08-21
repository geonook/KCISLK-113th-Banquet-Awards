"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface ThanksgivingMainSlideProps {
  title: string
  subtitle: string
  eventDate?: string
}

export function ThanksgivingMainSlide({ 
  title, 
  subtitle, 
  eventDate = "2024年12月" 
}: ThanksgivingMainSlideProps) {
  const [showContent, setShowContent] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [floatingHearts, setFloatingHearts] = useState<{id: number, x: number, y: number}[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [lastClickTime, setLastClickTime] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Easter egg: Multiple clicks trigger special effects
  const handleMainCardClick = () => {
    const now = Date.now()
    if (now - lastClickTime < 500) {
      setClickCount(prev => prev + 1)
      if (clickCount >= 4) {
        triggerConfetti()
        setClickCount(0)
      }
    } else {
      setClickCount(1)
    }
    setLastClickTime(now)
  }

  // Trigger floating hearts on hover
  const triggerFloatingHearts = (event: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    const newHearts = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 100,
      y: y + (Math.random() - 0.5) * 50
    }))
    
    setFloatingHearts(prev => [...prev, ...newHearts])
    
    // Clean up hearts after animation
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(heart => !newHearts.find(h => h.id === heart.id)))
    }, 2000)
  }

  // Confetti effect
  const triggerConfetti = () => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  // Random seasonal decorations
  const seasonalEmojis = ['🍁', '🦃', '🥧', '🌽', '🍂', '🧡', '💛', '🤎']
  const gratitudeEmojis = ['❤️', '💖', '✨', '🌟', '💫', '🙏', '😊', '🤗']

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 多層背景效果 */}
      <div className="absolute inset-0 animate-scale-in">
        <Image
          src="/images/award-background.jpg"
          alt="Thanksgiving banquet background"
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
        <div className="relative z-10 text-center px-6 w-[85%] max-w-[4800px] mx-auto animate-slide-up">
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

              {/* 餐會標題區域 */}
              <div className="mb-10 animate-slide-up" style={{ animationDelay: "1s" }}>
                {/* 主標題 */}
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-none"
                  style={{
                    color: "white",
                    textShadow: "4px 4px 12px rgba(0,0,0,0.6), 0 0 40px rgba(255,255,255,0.3)",
                    filter: "drop-shadow(4px 4px 8px rgba(0,0,0,0.4))",
                  }}
                >
                  {title}
                </h1>

                <p
                  className="text-2xl md:text-3xl lg:text-4xl text-gray-700 font-semibold tracking-wide animate-slide-up mb-6"
                  style={{ animationDelay: "1.2s" }}
                >
                  {subtitle}
                </p>

              </div>

              {/* 裝飾線條 */}
              <div className="relative mb-10 animate-slide-up" style={{ animationDelay: "1.6s" }}>
                <div className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto animate-expand" />
                <div className="absolute top-0 left-1/2 w-20 h-1 bg-gradient-to-r from-white via-yellow-300 to-white opacity-60 blur-sm animate-shimmer" />
              </div>

              {/* 餐會主旨區域 */}
              <div className="space-y-8 animate-slide-up" style={{ animationDelay: "1.8s" }}>
                <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform duration-200">
                  Kang Chiao Brings Me the World
                </p>

                <div className="flex flex-wrap justify-center items-center gap-4 text-lg md:text-xl">
                  <div
                    className="px-6 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full border border-emerald-200 shadow-md animate-slide-right"
                    style={{ animationDelay: "2s" }}
                  >
                    <p className="font-semibold text-gray-700 whitespace-nowrap">
                      心懷感恩 攜手前行
                    </p>
                  </div>

                  <div
                    className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"
                    style={{ animationDelay: "2.2s" }}
                  />

                  <div
                    className="px-6 py-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-full border border-rose-200 shadow-md animate-slide-left"
                    style={{ animationDelay: "2.4s" }}
                  >
                    <p className="font-semibold text-gray-700 whitespace-nowrap">
                      Building connections, shaping futures
                    </p>
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