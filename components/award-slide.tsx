import Image from "next/image"
import type { AwardWinner } from "../types/award"

interface AwardSlideProps {
  winner: AwardWinner
}

export function AwardSlide({ winner }: AwardSlideProps) {
  const isRockAward = winner.awardType === "磐石獎"

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden p-8">
      <Image src="/images/award-background.jpg" alt="Award ceremony background" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="bg-white rounded-3xl shadow-2xl p-12 relative overflow-hidden">
          {/* Award Badge */}
          <div
            className={`absolute -top-6 -right-6 w-32 h-32 rounded-full flex items-center justify-center text-2xl font-bold shadow-xl transform rotate-12 ${
              isRockAward
                ? "bg-gradient-to-br from-gray-300 to-gray-500 text-gray-800"
                : "bg-gradient-to-br from-yellow-400 to-orange-500 text-yellow-900"
            }`}
          >
            {isRockAward ? "磐石" : "優質"}
          </div>

          {/* Top Border */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400" />

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Winner Photo */}
            <div className="flex justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-xl bg-gray-200 flex items-center justify-center">
                {winner.photoUrl ? (
                  <Image
                    src={winner.photoUrl || "/placeholder.svg"}
                    alt={`${winner.recipientName} photo`}
                    width={192}
                    height={192}
                    className="object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👤</span>
                    </div>
                    <p className="text-sm">得獎者照片</p>
                  </div>
                )}
              </div>
            </div>

            {/* Award Info */}
            <div className="md:col-span-2 text-center md:text-left">
              <div className="inline-block bg-gray-100 px-6 py-2 rounded-full text-gray-700 font-semibold mb-4">
                {winner.department}
              </div>

              <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isRockAward ? "text-purple-600" : "text-red-500"}`}>
                {winner.awardType}
              </h2>

              <h3 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8 leading-tight">
                {winner.recipientName}
              </h3>
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-8 bg-gray-50 rounded-2xl p-8 border-l-4 border-blue-500">
            <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">具體事蹟</h4>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">{winner.achievements}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
