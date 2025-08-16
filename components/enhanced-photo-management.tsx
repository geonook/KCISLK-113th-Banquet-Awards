"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EnhancedPhotoUploadModal } from "./enhanced-photo-upload-modal"
import { Upload, Search, Download, Trash2, ImageIcon, Users, Camera } from "lucide-react"
import type { Winner } from "@/types/award"

interface EnhancedPhotoManagementProps {
  winners: Winner[]
  onPhotoUpdate: (winnerId: number, photoUrl: string) => void
  triggerButton?: React.ReactNode
}

export function EnhancedPhotoManagement({ winners, onPhotoUpdate, triggerButton }: EnhancedPhotoManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedWinner, setSelectedWinner] = useState<Winner | null>(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // 確保 winners 是陣列
  const winnersArray = Array.isArray(winners) ? winners : []

  const filteredWinners = winnersArray.filter(
    (winner) =>
      winner.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winner.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      winner.awardType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const winnersWithPhotos = winnersArray.filter((winner) => winner.photoUrl).length
  const winnersWithoutPhotos = winnersArray.length - winnersWithPhotos

  const handleUploadClick = (winner: Winner) => {
    setSelectedWinner(winner)
    setShowUploadModal(true)
  }

  const handlePhotoUploaded = (photoUrl: string) => {
    if (selectedWinner) {
      onPhotoUpdate(selectedWinner.id, photoUrl)
    }
    setShowUploadModal(false)
    setSelectedWinner(null)
  }

  const clearAllPhotos = () => {
    if (confirm("確定要清除所有照片嗎？此操作無法復原。")) {
      winnersArray.forEach((winner) => {
        if (winner.photoUrl) {
          onPhotoUpdate(winner.id, "")
        }
      })
    }
  }

  const exportPhotoStatus = () => {
    const data = winnersArray.map((winner) => ({
      id: winner.id,
      name: winner.recipientName,
      department: winner.department,
      awardType: winner.awardType,
      hasPhoto: !!winner.photoUrl,
      photoUrl: winner.photoUrl || "",
    }))

    const csvContent = [
      ["ID", "姓名", "部門", "獎項", "有照片", "照片網址"],
      ...data.map((row) => [row.id, row.name, row.department, row.awardType, row.hasPhoto ? "是" : "否", row.photoUrl]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "photo_status.csv"
    link.click()
  }

  const defaultTrigger = (
    <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-900 border-gray-300">
      <Camera className="w-4 h-4 mr-2" />
      管理得獎者照片
    </Button>
  )

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{triggerButton || defaultTrigger}</DialogTrigger>
        <DialogContent className="max-w-6xl max-h-[90vh] bg-white border border-gray-200 shadow-xl">
          <DialogHeader className="bg-white border-b border-gray-200 pb-4">
            <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-600" />
              照片管理中心
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 overflow-y-auto bg-white">
            {/* 統計資訊 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-blue-600">{winnersArray.length}</div>
                <div className="text-sm text-gray-600">總得獎者</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-green-600">{winnersWithPhotos}</div>
                <div className="text-sm text-gray-600">已上傳照片</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                <div className="text-2xl font-bold text-orange-600">{winnersWithoutPhotos}</div>
                <div className="text-sm text-gray-600">待上傳照片</div>
              </div>
            </div>

            {/* 操作工具列 */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 flex-1">
                <Search className="w-4 h-4 text-gray-500" />
                <Input
                  placeholder="搜尋姓名、部門或獎項..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-white border-gray-300"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={exportPhotoStatus}
                  variant="outline"
                  size="sm"
                  className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
                >
                  <Download className="w-4 h-4 mr-1" />
                  匯出狀態
                </Button>
                <Button
                  onClick={clearAllPhotos}
                  variant="outline"
                  size="sm"
                  className="bg-white hover:bg-red-50 text-red-600 border-red-300 hover:border-red-400"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  清除全部
                </Button>
              </div>
            </div>

            {/* 得獎者列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-2">
              {filteredWinners.map((winner) => (
                <div
                  key={winner.id}
                  className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{winner.recipientName}</h3>
                      <p className="text-xs text-gray-600 mt-1">{winner.department}</p>
                      <p className="text-xs text-blue-600 mt-1">{winner.awardType}</p>
                    </div>
                    <div className="ml-2">
                      {winner.photoUrl ? (
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center border border-green-200">
                          <img
                            src={winner.photoUrl || "/placeholder.svg"}
                            alt={winner.recipientName}
                            className="w-10 h-10 object-cover rounded"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                          <Users className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleUploadClick(winner)}
                    size="sm"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Upload className="w-3 h-3 mr-1" />
                    {winner.photoUrl ? "更換照片" : "上傳照片"}
                  </Button>
                </div>
              ))}
            </div>

            {filteredWinners.length === 0 && (
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>找不到符合條件的得獎者</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* 照片上傳模態框 */}
      {showUploadModal && selectedWinner && (
        <EnhancedPhotoUploadModal
          winner={selectedWinner}
          onPhotoUploaded={handlePhotoUploaded}
          onClose={() => {
            setShowUploadModal(false)
            setSelectedWinner(null)
          }}
        />
      )}
    </>
  )
}