"use client"

import { ChevronLeft, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useState } from "react"

interface FloatingNavigationProps {
  currentSlide: number
  totalSlides: number
  onPrevious: () => void
  onNext: () => void
  onGoToStart?: () => void
}

export function FloatingNavigation({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onGoToStart,
}: FloatingNavigationProps) {
  const [isHovered, setIsHovered] = useState(false)
  const progress = (currentSlide + 1) / totalSlides

  return (
    <>
      {/* 極細進度條 */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full h-0.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 z-50 origin-left opacity-80"
      />

      {/* 右上角數字 - 超小 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed top-3 right-3 z-50"
      >
        <div className="text-white/60 text-xs font-mono bg-black/10 backdrop-blur-sm px-2 py-1 rounded">
          {currentSlide + 1}/{totalSlides}
        </div>
      </motion.div>

      {/* 浮動導航球 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.05 : 1,
            backdropFilter: isHovered ? "blur(20px)" : "blur(10px)",
          }}
          transition={{ duration: 0.2 }}
          className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-white/20"
        >
          {/* 首頁 */}
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} animate={{ opacity: isHovered ? 1 : 0.7 }}>
            <Button
              onClick={onGoToStart}
              className="w-6 h-6 rounded-full bg-transparent hover:bg-white/20 text-white/80 hover:text-white border-0 p-0"
              disabled={currentSlide === 0}
            >
              <Home className="w-3 h-3" />
            </Button>
          </motion.div>

          {/* 分隔線 */}
          <div className="w-px h-4 bg-white/20 mx-2" />

          {/* 上一頁 */}
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} animate={{ opacity: isHovered ? 1 : 0.7 }}>
            <Button
              onClick={onPrevious}
              className="w-6 h-6 rounded-full bg-transparent hover:bg-white/20 text-white/80 hover:text-white border-0 p-0 disabled:opacity-30"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-3 h-3" />
            </Button>
          </motion.div>

          {/* 進度點 */}
          <div className="flex items-center gap-1 px-2">
            {Array.from({ length: Math.min(totalSlides, 7) }, (_, i) => (
              <motion.div
                key={i}
                className={`rounded-full transition-all duration-200 ${
                  i === currentSlide ? "w-4 h-1.5 bg-white/90" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
                }`}
                whileHover={{ scale: 1.3 }}
                animate={{
                  opacity: isHovered ? 1 : i === currentSlide ? 1 : 0.5,
                }}
              />
            ))}
          </div>

          {/* 下一頁 */}
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} animate={{ opacity: isHovered ? 1 : 0.7 }}>
            <Button
              onClick={onNext}
              className="w-6 h-6 rounded-full bg-transparent hover:bg-white/20 text-white/80 hover:text-white border-0 p-0 disabled:opacity-30"
              disabled={currentSlide === totalSlides - 1}
            >
              <ChevronRight className="w-3 h-3" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 隱藏式鍵盤提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.8 : 0 }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40"
      >
        <div className="text-white/60 text-xs bg-black/20 backdrop-blur-sm px-2 py-1 rounded text-center">
          ← → 鍵盤切換
        </div>
      </motion.div>
    </>
  )
}
