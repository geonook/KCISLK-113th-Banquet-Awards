"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface AnimatedTitleSlideProps {
  title: string
  subtitle: string
}

// 調整標題大小以符合16:9比例，避免分行
export function AnimatedTitleSlide({ title, subtitle }: AnimatedTitleSlideProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with better visibility */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/award-background.jpg"
          alt="Award ceremony background"
          fill
          className="object-cover brightness-110 contrast-110"
          priority
        />
      </motion.div>

      {/* Reduced overlay opacity to show background better */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/40"
      />

      {/* Enhanced floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-yellow-400/40 rounded-full shadow-lg"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              opacity: 0,
            }}
            animate={{
              y: -50,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content - 調整為16:9比例適合的大小 */}
      {showContent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center px-8 max-w-7xl w-full"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/30"
          >
            {/* Decorative Elements */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-30"
            />
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-30"
            />

            {/* 調整標題大小避免在16:9比例下分行 */}
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 bg-clip-text text-transparent leading-tight whitespace-nowrap"
            >
              {title}
            </motion.h1>

            {/* 調整副標題大小 */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-6 font-semibold"
            >
              {subtitle}
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1.6 }}
              className="h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mb-6"
            />

            {/* Bottom Text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.8 }}
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
