"use client"

import { motion } from "framer-motion"

interface FloatingDecorationsProps {
  isRockAward?: boolean
}

// 統一的浮動裝飾組件
export function FloatingDecorations({ isRockAward = false }: FloatingDecorationsProps) {
  const decorations = [
    { emoji: "🏆", size: "text-2xl", count: 6 },
    { emoji: "⭐", size: "text-xl", count: 4 },
    { emoji: "✨", size: "text-lg", count: 5 },
    { emoji: "🎖️", size: "text-xl", count: 3 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {decorations.map((decoration, decorationIndex) =>
        Array.from({ length: decoration.count }, (_, i) => (
          <motion.div
            key={`${decorationIndex}-${i}`}
            className={`absolute ${decoration.size} ${isRockAward ? "text-purple-300/25" : "text-yellow-300/25"}`}
            initial={{
              x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
              y: (typeof window !== "undefined" ? window.innerHeight : 1080) + 100,
              rotate: 0,
              scale: 0.8,
            }}
            animate={{
              y: -100,
              rotate: 360,
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 4 + 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5 + decorationIndex,
              ease: "linear",
            }}
          >
            {decoration.emoji}
          </motion.div>
        )),
      )}
    </div>
  )
}
