"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  currentSlide: number
  totalSlides: number
  onPrevious: () => void
  onNext: () => void
}

export function Navigation({ currentSlide, totalSlides, onPrevious, onNext }: NavigationProps) {
  return (
    <>
      {/* Slide Counter */}
      <div className="fixed top-8 right-8 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full font-bold text-gray-800 shadow-lg z-50">
        {currentSlide + 1} / {totalSlides}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
        <Button
          onClick={onPrevious}
          className="bg-white/90 hover:bg-white text-gray-800 shadow-lg backdrop-blur-sm px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          上一頁
        </Button>
        <Button
          onClick={onNext}
          className="bg-white/90 hover:bg-white text-gray-800 shadow-lg backdrop-blur-sm px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          disabled={currentSlide === totalSlides - 1}
        >
          下一頁
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </>
  )
}
