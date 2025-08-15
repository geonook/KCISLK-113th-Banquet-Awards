"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Upload } from "lucide-react"
import type { AwardWinner } from "../types/award"
import { FloatingDecorations } from "./floating-decorations"

interface EnhancedAwardSlideProps {
  winner: AwardWinner
  isActive: boolean
}

// 簡化的獎項頁面 - 移除學校資訊和標語
export function EnhancedAwardSlide({ winner, isActive }: EnhancedAwardSlideProps) {
  const [showContent, setShowContent] = useState(false)
  const isRockAward = winner.awardType === "磐石獎"

  useEffect(() => {
    if (isActive) {
      setShowContent(false)
      const timer = setTimeout(() => setShowContent(true), 100)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 背景 */}
      <motion.div
        initial={{ scale: 1.01 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/images/award-background.jpg"
          alt="Award ceremony background"
          fill
          className="object-cover brightness-125 contrast-110 saturate-110"
        />
      </motion.div>

      {/* 遮罩 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 ${
          isRockAward
            ? "bg-gradient-to-br from-purple-900/50 to-blue-900/50"
            : "bg-gradient-to-br from-orange-900/50 to-red-900/50"
        }`}
      />

      {/* 浮動裝飾 */}
      <FloatingDecorations isRockAward={isRockAward} />

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10 w-full max-w-7xl px-6"
          >
            <motion.div
              initial={{ scale: 0.995, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 relative overflow-hidden border border-white/30"
            >
              {/* 獎章 */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 15 }}
                transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 120, damping: 10 }}
                className={`absolute -top-6 -right-6 w-28 h-28 rounded-full flex items-center justify-center text-xl font-bold shadow-2xl ${
                  isRockAward
                    ? "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 text-white"
                    : "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white"
                }`}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.2 }}
                >
                  {isRockAward ? "磐石" : "優質"}
                </motion.span>
              </motion.div>

              {/* 頂部邊框 */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
                className={`absolute top-0 left-0 h-2 origin-left ${
                  isRockAward
                    ? "bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"
                    : "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
                }`}
              />

              <div className="grid md:grid-cols-4 gap-6 items-center">
                {/* 照片區域 */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3, delay: 0.15, type: "spring", stiffness: 100, damping: 8 }}
                  className="flex justify-center"
                >
                  <div className="relative group">
                    {/* 旋轉光環 */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className={`absolute -inset-4 rounded-full ${
                        isRockAward
                          ? "bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"
                          : "bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"
                      } opacity-30`}
                    />

                    {/* 照片框架 */}
                    <div
                      className={`w-44 h-44 rounded-full overflow-hidden shadow-2xl relative z-10 border-4 ${
                        isRockAward ? "border-purple-300" : "border-orange-300"
                      }`}
                    >
                      {winner.photoUrl ? (
                        <Image
                          src={winner.photoUrl || "/placeholder.svg"}
                          alt={`${winner.recipientName} photo`}
                          width={176}
                          height={176}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.2 }}
                          className={`w-full h-full flex flex-col items-center justify-center ${
                            isRockAward
                              ? "bg-gradient-to-br from-purple-100 to-blue-100"
                              : "bg-gradient-to-br from-orange-100 to-yellow-100"
                          } group-hover:scale-105 transition-transform duration-300`}
                        >
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                              isRockAward ? "bg-purple-200 text-purple-600" : "bg-orange-200 text-orange-600"
                            }`}
                          >
                            <Camera className="w-8 h-8" />
                          </div>
                          <p className="text-xs font-bold text-gray-600 text-center px-2">
                            {winner.recipientName}
                            <br />
                            得獎者照片
                          </p>
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <Upload className="w-3 h-3 mr-1" />
                            <span>點擊上傳</span>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* 裝飾星星 */}
                    <motion.div
                      animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="absolute -top-2 -left-2 text-yellow-400 text-xl"
                    >
                      ⭐
                    </motion.div>
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 1 }}
                      className="absolute -bottom-2 -right-2 text-yellow-400 text-lg"
                    >
                      ✨
                    </motion.div>
                  </div>
                </motion.div>

                {/* 獎項資訊 */}
                <div className="md:col-span-3 text-center md:text-left">
                  {/* 部門 */}
                  <motion.div
                    initial={{ x: -15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.18, ease: "easeOut" }}
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
                    initial={{ x: -15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.21, ease: "easeOut" }}
                    className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
                      isRockAward ? "text-purple-600" : "text-orange-600"
                    }`}
                  >
                    {winner.awardType}
                  </motion.h2>

                  {/* 得獎者姓名 */}
                  <motion.h3
                    initial={{ x: -15, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.24, ease: "easeOut" }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight"
                  >
                    {winner.recipientName}
                  </motion.h3>
                </div>
              </div>

              {/* 具體事蹟 */}
              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.27, ease: "easeOut" }}
                className={`mt-6 rounded-2xl p-6 border-l-4 shadow-inner ${
                  isRockAward ? "bg-purple-50 border-purple-500" : "bg-orange-50 border-orange-500"
                }`}
              >
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.15 }}
                  className="text-xl font-bold text-gray-800 mb-4 text-center"
                >
                  🏆 具體事蹟 🏆
                </motion.h4>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.33, duration: 0.15 }}
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
