"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PhotoUploadModal } from "./photo-upload-modal"
import { Camera, Search, Upload, Users, Check, X } from "lucide-react"
import Image from "next/image"
import type { AwardWinner } from "../types/award"

interface PhotoManagementPanelProps {
  winners: AwardWinner[]
  onPhotoUpdate: (winnerId: number, photoUrl: string) => void
}

export function PhotoManagementPanel({ winners, onPhotoUpdate }: PhotoManagementPanelProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedWinner, setSelectedWinner] = useState<AwardWinner | null>(null)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const filteredWinners = winners.filter(
    (winner) =>
      winner.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winner.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winner.awardType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const winnersWithPhotos = winners.filter((w) => w.photoUrl).length
  const winnersWithoutPhotos = winners.length - winnersWithPhotos

  const handlePhotoUpload = (photoUrl: string) => {
    if (selectedWinner) {
      onPhotoUpdate(selectedWinner.id, photoUrl)
      setUploadModalOpen(false)
      setSelectedWinner(null)
    }
  }

  const openUploadModal = (winner: AwardWinner) => {
    setSelectedWinner(winner)
    setUploadModalOpen(true)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Camera className="w-4 h-4 mr-2" />
          管理得獎者照片
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            得獎者照片管理
          </DialogTitle>
        </DialogHeader>

        {/* 統計資訊 */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{winners.length}</div>
            <div className="text-sm text-gray-600">總得獎者</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{winnersWithPhotos}</div>
            <div className="text-sm text-gray-600">已上傳照片</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{winnersWithoutPhotos}</div>
            <div className="text-sm text-gray-600">待上傳照片</div>
          </div>
        </div>

        {/* 搜尋框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="搜尋得獎者姓名、部門或獎項..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* 得獎者列表 */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-2">
            {filteredWinners.map((winner) => (
              <div
                key={winner.id}
                className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                {/* 照片預覽 */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  {winner.photoUrl ? (
                    <Image
                      src={winner.photoUrl || "/placeholder.svg"}
                      alt={`${winner.recipientName} 照片`}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Camera className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* 得獎者資訊 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 truncate">{winner.recipientName}</h3>
                    {winner.photoUrl ? (
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-orange-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {winner.department} • {winner.awardType}
                  </div>
                </div>

                {/* 操作按鈕 */}
                <Button
                  onClick={() => openUploadModal(winner)}
                  size="sm"
                  variant={winner.photoUrl ? "outline" : "default"}
                  className={winner.photoUrl ? "" : "bg-blue-600 hover:bg-blue-700 text-white"}
                >
                  <Upload className="w-4 h-4 mr-1" />
                  {winner.photoUrl ? "更換" : "上傳"}
                </Button>
              </div>
            ))}
          </div>

          {filteredWinners.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Camera className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>找不到符合條件的得獎者</p>
            </div>
          )}
        </div>

        {/* 批量操作提示 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h4 className="font-medium text-blue-800 mb-2">💡 使用提示</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 點擊「上傳」或「更換」按鈕為個別得獎者上傳照片</li>
            <li>• 建議照片為正方形比例，人物清晰可見</li>
            <li>• 上傳的照片會即時在簡報中顯示</li>
            <li>• 支援拖放上傳，操作更便利</li>
          </ul>
        </div>
      </DialogContent>

      {/* 照片上傳模態框 */}
      {selectedWinner && (
        <PhotoUploadModal
          isOpen={uploadModalOpen}
          onClose={() => {
            setUploadModalOpen(false)
            setSelectedWinner(null)
          }}
          recipientName={selectedWinner.recipientName}
          currentPhotoUrl={selectedWinner.photoUrl}
          onPhotoUpload={handlePhotoUpload}
        />
      )}
    </Dialog>
  )
}
