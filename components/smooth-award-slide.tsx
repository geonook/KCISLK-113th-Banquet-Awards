"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import type { AwardWinner } from "../types/award"

interface SmoothAwardSlideProps {
  winner: AwardWinner
  isActive: boolean
}

// 優化動畫流暢度的獎項頁面
export function SmoothAwardSlide({ winner, isActive }: SmoothAwardSlideProps) {
  const [showContent, setShowContent] = useState(false)
  const isRockAward = winner.awardType === "磐石獎"

  useEffect(() => {
    if (isActive) {
      setShowContent(false)
      const timer = setTimeout(() => setShowContent(true), 150)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 優化背景動畫 */}
      <motion.div
        initial={{ scale: 1.02 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/award-background.jpg"
          alt="Award ceremony background"
          fill
          className="object-cover brightness-125 contrast-110 saturate-110"
        />
      </motion.div>

      {/* 簡化遮罩 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 0.6 }}
        className={`absolute inset-0 ${
          isRockAward
            ? "bg-gradient-to-br from-purple-900/50 to-blue-900/50"
            : "bg-gradient-to-br from-orange-900/50 to-red-900/50"
        }`}
      />

      {/* 減少浮動元素數量 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute text-2xl ${isRockAward ? "text-purple-300/20" : "text-yellow-300/20"}`}
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
              y: (typeof window !== "undefined" ? window.innerHeight : 1080) + 100,
              rotate: 0,
            }}
            animate={{
              y: -100,
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 3 + 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "linear",
            }}
          >
            🏆
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 w-full max-w-7xl px-6"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 relative overflow-hidden border border-white/30"
            >
              {/* 優化獎章動畫 */}
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 15 }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
                className={`absolute -top-6 -right-6 w-28 h-28 rounded-full flex items-center justify-center text-xl font-bold shadow-2xl ${
                  isRockAward
                    ? "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 text-white"
                    : "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white"
                }`}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  {isRockAward ? "磐石" : "優質"}
                </motion.span>
              </motion.div>

              {/* 優化頂部邊框動畫 */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className={`absolute top-0 left-0 h-2 origin-left ${
                  isRockAward
                    ? "bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"
                    : "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
                }`}
              />

              <div className="grid md:grid-cols-4 gap-6 items-center">
                {/* 優化照片動畫 */}
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 150, damping: 12 }}
                  className="flex justify-center"
                >
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className={`absolute -inset-3 rounded-full ${
                        isRockAward
                          ? "bg-gradient-to-r from-purple-400 to-blue-400"
                          : "bg-gradient-to-r from-yellow-400 to-orange-500"
                      } opacity-20`}
                    />
                    <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl bg-gray-200 flex items-center justify-center relative z-10">
                      {winner.photoUrl ? (
                        <Image
                          src={winner.photoUrl || "/placeholder.svg"}
                          alt={`${winner.recipientName} photo`}
                          width={160}
                          height={160}
                          className="object-cover"
                        />
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.7, duration: 0.3 }}
                          className="text-gray-400 text-center"
                        >
                          <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-2xl">👤</span>
                          </div>
                          <p className="text-xs font-medium">得獎者照片</p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* 優化獎項資訊動畫 */}
                <div className="md:col-span-3 text-center md:text-left">
                  {/* 部門 */}
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                    className={`inline-block px-6 py-2 rounded-full font-bold mb-4 text-white shadow-lg ${
                      isRockAward
                        ? "bg-gradient-to-r from-purple-500 to-blue-500"
                        : "bg-gradient-to-r from-orange-500 to-red-500"
                    }`}
                  >
                    {winner.department}
                  </motion.div>

                  {/* 獎項類型 */}
                  <motion.h2
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                    className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
                      isRockAward ? "text-purple-600" : "text-orange-600"
                    }`}
                  >
                    {winner.awardType}
                  </motion.h2>

                  {/* 得獎者姓名 */}
                  <motion.h3
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight"
                  >
                    {winner.recipientName}
                  </motion.h3>
                </div>
              </div>

              {/* 優化具體事蹟動畫 */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                className={`mt-6 rounded-2xl p-6 border-l-4 shadow-inner ${
                  isRockAward ? "bg-purple-50 border-purple-500" : "bg-orange-50 border-orange-500"
                }`}
              >
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.3 }}
                  className="text-xl font-bold text-gray-800 mb-4 text-center"
                >
                  🏆 具體事蹟 🏆
                </motion.h4>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.3 }}
                  className="text-gray-700 leading-relaxed whitespace-pre-line text-base max-h-32 overflow-y-auto"
                >
                  {winner.achievements}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
