"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface SmoothTitleSlideProps {
  title: string
  subtitle: string
}

// 優化動畫流暢度的標題頁面
export function SmoothTitleSlide({ title, subtitle }: SmoothTitleSlideProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 優化背景動畫 */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0"
      >
        <Image
          src="/images/award-background.jpg"
          alt="Award ceremony background"
          fill
          className="object-cover brightness-125 contrast-110"
          priority
        />
      </motion.div>

      {/* 簡化遮罩動畫 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40"
      />

      {/* 減少浮動粒子數量以提升性能 */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
              y: (typeof window !== "undefined" ? window.innerHeight : 1080) + 50,
              opacity: 0,
            }}
            animate={{
              y: -50,
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* 優化主要內容動畫 */}
      {showContent && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 text-center px-8 max-w-7xl w-full"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/30"
          >
            {/* 簡化裝飾元素 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"
            />

            {/* 優化標題動畫 */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 bg-clip-text text-transparent leading-tight whitespace-nowrap"
            >
              {title}
            </motion.h1>

            {/* 優化副標題動畫 */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-6 font-semibold"
            >
              {subtitle}
            </motion.p>

            {/* 優化裝飾線動畫 */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-6 origin-center"
            />

            {/* 優化底部文字動畫 */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
              className="text-base md:text-lg text-gray-600"
            >
              <p className="font-medium">認可卓越表現 • 彰顯專業貢獻 • 激勵團隊成長</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
