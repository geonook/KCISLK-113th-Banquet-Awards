"use client"

import { motion } from "framer-motion"

interface SloganDecorationProps {
  isRockAward?: boolean
}

// 標語裝飾組件
export function SloganDecoration({ isRockAward = false }: SloganDecorationProps) {
  return (
    <>
      {/* 左上角中文標語 */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="absolute top-8 left-8 z-20"
      >
        <div
          className={`px-6 py-3 rounded-full backdrop-blur-sm shadow-lg border ${
            isRockAward
              ? "bg-purple-500/20 border-purple-300/30 text-purple-100"
              : "bg-orange-500/20 border-orange-300/30 text-orange-100"
          }`}
        >
          <p className="text-lg font-bold tracking-wider">七年同心 點石成金</p>
        </div>
      </motion.div>

      {/* 右下角英文標語 */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        className="absolute bottom-32 right-8 z-20"
      >
        <div
          className={`px-6 py-3 rounded-full backdrop-blur-sm shadow-lg border ${
            isRockAward
              ? "bg-purple-500/20 border-purple-300/30 text-purple-100"
              : "bg-orange-500/20 border-orange-300/30 text-orange-100"
          }`}
        >
          <p className="text-sm font-semibold italic">We started with rock - seven years on - we shine like gold</p>
        </div>
      </motion.div>
    </>
  )
}
