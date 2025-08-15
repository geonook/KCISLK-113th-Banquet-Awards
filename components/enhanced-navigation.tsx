"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface EnhancedNavigationProps {
  currentSlide: number
  totalSlides: number
  onPrevious: () => void
  onNext: () => void
}

export function EnhancedNavigation({ currentSlide, totalSlides, onPrevious, onNext }: EnhancedNavigationProps) {
  return (
    <>
      {/* 計數器 */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed top-6 right-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full font-bold text-gray-800 shadow-xl z-50 border border-white/30"
      >
        <motion.span
          key={currentSlide}
          initial={{ scale: 1.05, color: "#f59e0b" }}
          animate={{ scale: 1, color: "#374151" }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {currentSlide + 1}
        </motion.span>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-600">{totalSlides}</span>
      </motion.div>

      {/* 進度條 */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: (currentSlide + 1) / totalSlides }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 z-50 shadow-lg origin-left"
      />

      {/* 導航按鈕 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-50"
      >
        <Button
          onClick={onPrevious}
          className="bg-white/90 hover:bg-white text-gray-800 shadow-xl backdrop-blur-sm px-6 py-3 rounded-full font-semibold transition-all duration-150 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 border border-white/30"
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          上一頁
        </Button>

        <Button
          onClick={onNext}
          className="bg-white/90 hover:bg-white text-gray-800 shadow-xl backdrop-blur-sm px-6 py-3 rounded-full font-semibold transition-all duration-150 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 border border-white/30"
          disabled={currentSlide === totalSlides - 1}
        >
          下一頁
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>

      {/* 指示器 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
        className="fixed bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 z-40"
      >
        {Array.from({ length: Math.min(totalSlides, 12) }, (_, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-150 ${
              i === currentSlide
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.1 }}
          />
        ))}
        {totalSlides > 12 && <span className="text-white/70 text-xs ml-2">...</span>}
      </motion.div>
    </>
  )
}
