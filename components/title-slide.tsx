import Image from "next/image"

interface TitleSlideProps {
  title: string
  subtitle: string
}

export function TitleSlide({ title, subtitle }: TitleSlideProps) {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/images/award-background.jpg"
        alt="Award ceremony background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 text-center text-white px-8">
        <div className="bg-white/95 text-gray-800 rounded-3xl p-16 max-w-4xl mx-auto shadow-2xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            {title}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-8">{subtitle}</p>
          <div className="text-lg text-gray-500 space-y-2">
            <p>認可卓越表現 • 彰顯專業貢獻 • 激勵團隊成長</p>
          </div>
        </div>
      </div>
    </div>
  )
}
