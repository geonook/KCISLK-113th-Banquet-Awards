"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { FloatingDecorations } from "./floating-decorations"

interface EnhancedTitleSlideProps {
  title: string
  subtitle: string
}

// 簡化的標題頁面 - 移除學校資訊，保留雙語標語
export function EnhancedTitleSlide({ title, subtitle }: EnhancedTitleSlideProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 背景 */}
      <motion.div
        initial={{ scale: 1.02, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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

      {/* 遮罩 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40"
      />

      {/* 浮動裝飾 */}
      <FloatingDecorations />

      {/* 雙語標語 - 只在第一頁顯示 */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="absolute top-8 left-8 z-20"
      >
        <div className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-600/90 to-orange-600/90 backdrop-blur-md shadow-xl border-2 border-yellow-200/60">
          <p className="text-lg font-bold tracking-wider text-white drop-shadow-lg">七年同心 點石成金</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="absolute bottom-32 right-8 z-20"
      >
        <div className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-700/90 to-purple-700/90 backdrop-blur-md shadow-xl border-2 border-blue-200/60">
          <p className="text-base font-bold italic text-white drop-shadow-lg tracking-wide">
            We started with rock - seven years on - we shine like gold
          </p>
        </div>
      </motion.div>

      {/* 主要內容 */}
      {showContent && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 text-center px-8 max-w-7xl w-full"
        >
          <motion.div
            initial={{ scale: 0.99, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/30"
          >
            {/* 裝飾元素 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"
            />

            {/* 標題 */}
            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 bg-clip-text text-transparent leading-tight"
            >
              {title}
            </motion.h1>

            {/* 副標題 */}
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-6 font-semibold"
            >
              {subtitle}
            </motion.p>

            {/* 裝飾線 */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
              className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-6 origin-center"
            />

            {/* 核心理念 */}
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
              className="text-base md:text-lg text-gray-600 space-y-2"
            >
              <p className="font-bold text-xl text-blue-700">Kang Chiao brings me the world</p>
              <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
                <p className="font-medium text-gray-700">Embrace diversity, ignite creativity.</p>
                <span className="hidden md:block text-gray-400">•</span>
                <p className="font-medium text-gray-700">Transforming learning, transforming lives.</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
