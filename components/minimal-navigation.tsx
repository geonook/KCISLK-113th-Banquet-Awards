"use client"

import { ChevronLeft, ChevronRight, Home, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface MinimalNavigationProps {
  currentSlide: number
  totalSlides: number
  onPrevious: () => void
  onNext: () => void
  onGoToStart?: () => void
}

export function MinimalNavigation({
  currentSlide,
  totalSlides,
  onPrevious,
  onNext,
  onGoToStart,
}: MinimalNavigationProps) {
  const progress = (currentSlide + 1) / totalSlides

  return (
    <>
      {/* 頂部進度條 - 更細緻 */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: progress, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 w-full h-1 z-50 origin-left"
        style={{
          background: "linear-gradient(90deg, #f59e0b 0%, #ea580c 25%, #dc2626 50%, #7c3aed 75%, #2563eb 100%)",
        }}
      />

      {/* 右上角計數器 - 更小巧 */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-4 right-4 z-50"
      >
        <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-full text-white/90 text-sm font-medium shadow-lg border border-white/10">
          <motion.span
            key={currentSlide}
            initial={{ scale: 1.1, color: "#f59e0b" }}
            animate={{ scale: 1, color: "#ffffff" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {currentSlide + 1}
          </motion.span>
          <span className="text-white/60 mx-1">/</span>
          <span className="text-white/80">{totalSlides}</span>
        </div>
      </motion.div>

      {/* 底部導航 - 極簡設計 */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/10">
          {/* 首頁按鈕 */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              onClick={onGoToStart}
              className="w-8 h-8 rounded-full bg-transparent hover:bg-white/20 text-white/80 hover:text-white border-0 p-0 transition-all duration-200"
              disabled={currentSlide === 0}
            >
              <Home className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* 上一頁按鈕 */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              onClick={onPrevious}
              className="w-8 h-8 rounded-full bg-transparent hover:bg-white/20 text-white/80 hover:text-white border-0 p-0 transition-all duration-200 disabled:opacity-30"
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* 頁面指示器 - 更小的點 */}
          <div className="flex items-center gap-1 px-3">
            {Array.from({ length: Math.min(totalSlides, 10) }, (_, i) => (
              <motion.div
                key={i}
                className={`rounded-full transition-all duration-200 ${
                  i === currentSlide ? "w-6 h-2 bg-white/90" : "w-2 h-2 bg-white/30 hover:bg-white/50"
                }`}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.1 }}
              />
            ))}
            {totalSlides > 10 && <span className="text-white/50 text-xs ml-1">...</span>}
          </div>

          {/* 下一頁按鈕 */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              onClick={onNext}
              className="w-8 h-8 rounded-full bg-transparent hover:bg-white/20 text-white/80 hover:text-white border-0 p-0 transition-all duration-200 disabled:opacity-30"
              disabled={currentSlide === totalSlides - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* 右側快捷按鈕 - 更小更低調 */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40"
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={() => window.location.reload()}
            className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/30 text-white/70 hover:text-white border border-white/10 transition-all duration-200 p-0"
            title="重新載入"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
        </motion.div>
      </motion.div>

      {/* 鍵盤提示 - 可選顯示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 2 }}
        className="fixed bottom-4 left-4 z-40"
      >
        <div className="bg-black/10 backdrop-blur-md px-3 py-1 rounded-full text-white/50 text-xs border border-white/10">
          <span className="hidden md:inline">← → 或 空白鍵 切換</span>
          <span className="md:hidden">滑動切換</span>
        </div>
      </motion.div>
    </>
  )
}
