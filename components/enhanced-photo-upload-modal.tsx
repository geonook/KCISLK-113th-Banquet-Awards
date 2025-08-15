"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhotoEditorModal } from "./photo-editor-modal"
import { Upload, X, Camera, Edit, Link } from "lucide-react"
import { ImageIcon } from "lucide-react"
import type { AwardWinner } from "@/types/award"

interface EnhancedPhotoUploadModalProps {
  winner: AwardWinner
  onPhotoUploaded: (photoUrl: string) => void
  onClose: () => void
}

export function EnhancedPhotoUploadModal({ winner, onPhotoUploaded, onClose }: EnhancedPhotoUploadModalProps) {
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("file")
  const [photoUrl, setPhotoUrl] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setPhotoUrl(url)
    setPreviewUrl(url)
  }

  const handleUpload = async () => {
    setIsUploading(true)
    try {
      let finalUrl = ""

      if (uploadMethod === "file" && selectedFile) {
        let fileToUpload = selectedFile
        
        console.log('上傳調試信息:', {
          selectedFile: selectedFile.name,
          previewUrl: previewUrl.substring(0, 50) + '...',
          isBlob: previewUrl.startsWith('blob:'),
          isDataUrl: previewUrl.startsWith('data:'),
          originalSize: selectedFile.size
        })
        
        // 如果預覽 URL 是 data URL（表示照片已被編輯），需要將其轉換為檔案
        if (previewUrl.startsWith('data:')) {
          console.log('檢測到編輯後的 data URL，開始轉換...')
          try {
            // 將 data URL 轉換為 blob
            const response = await fetch(previewUrl)
            const blob = await response.blob()
            fileToUpload = new File([blob], selectedFile.name, { type: selectedFile.type })
            console.log('data URL 轉換成功:', {
              originalSize: selectedFile.size,
              editedSize: fileToUpload.size,
              type: fileToUpload.type
            })
          } catch (dataError) {
            console.warn('無法處理編輯後的照片，使用原始檔案:', dataError)
          }
        } else if (previewUrl.startsWith('blob:')) {
          console.log('檢測到編輯後的 blob URL，開始轉換...')
          try {
            const response = await fetch(previewUrl)
            const blob = await response.blob()
            fileToUpload = new File([blob], selectedFile.name, { type: selectedFile.type })
            console.log('blob URL 轉換成功:', {
              originalSize: selectedFile.size,
              editedSize: fileToUpload.size,
              type: fileToUpload.type
            })
          } catch (blobError) {
            console.warn('無法處理編輯後的照片，使用原始檔案:', blobError)
          }
        } else {
          console.log('使用原始檔案上傳')
        }

        // 上傳檔案到 MinIO
        const formData = new FormData()
        formData.append('file', fileToUpload)
        formData.append('winnerId', winner.id.toString())

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || '上傳失敗')
        }

        finalUrl = result.url
      } else if (uploadMethod === "url" && photoUrl) {
        finalUrl = photoUrl
      }

      if (finalUrl) {
        onPhotoUploaded(finalUrl)
        onClose()
        
        // 如果是檔案上傳，給一點時間讓伺服器更新檔案，然後重新載入頁面
        if (uploadMethod === "file") {
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        }
      }
    } catch (error) {
      console.error("Upload failed:", error)
      alert(`上傳失敗: ${error instanceof Error ? error.message : '未知錯誤'}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleEditPhoto = () => {
    setShowEditor(true)
  }

  const handlePhotoEdited = (editedPhotoUrl: string) => {
    setPreviewUrl(editedPhotoUrl)
    setShowEditor(false)
    // 編輯後不直接上傳，讓用戶回到上傳畫面確認
    // onPhotoUploaded(editedPhotoUrl) // 移除直接上傳
  }

  const canUpload = (uploadMethod === "file" && selectedFile) || (uploadMethod === "url" && photoUrl) || (uploadMethod === "file" && previewUrl)

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl bg-white border border-gray-200 shadow-xl">
          <DialogHeader className="bg-white border-b border-gray-200 pb-4">
            <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-600" />
              上傳照片 - {winner.recipientName}
            </DialogTitle>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </DialogHeader>

          <div className="space-y-6 p-6 bg-white">
            {/* 得獎者資訊 */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900">{winner.recipientName}</h3>
              <p className="text-sm text-gray-600 mt-1">{winner.department}</p>
              <p className="text-sm text-blue-600 mt-1">{winner.awardType}</p>
            </div>

            {/* 上傳方式選擇 */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setUploadMethod("file")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  uploadMethod === "file" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Upload className="w-4 h-4 inline mr-2" />
                上傳檔案
              </button>
              <button
                onClick={() => setUploadMethod("url")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  uploadMethod === "url" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Link className="w-4 h-4 inline mr-2" />
                網址連結
              </button>
            </div>

            {/* 上傳區域 */}
            {uploadMethod === "file" ? (
              <div className="space-y-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">點擊選擇照片檔案</p>
                  <p className="text-sm text-gray-500">支援 JPG, PNG, GIF 格式</p>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
              </div>
            ) : (
              <div className="space-y-4">
                <Input
                  placeholder="請輸入照片網址 (https://...)"
                  value={photoUrl}
                  onChange={handleUrlChange}
                  className="bg-white border-gray-300"
                />
              </div>
            )}

            {/* 預覽區域 */}
            {previewUrl && (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="預覽"
                    className="w-full max-h-64 object-contain rounded-lg border border-gray-200 bg-gray-50"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleEditPhoto}
                    variant="outline"
                    className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    編輯照片
                  </Button>
                </div>
              </div>
            )}

            {/* 操作按鈕 */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
              >
                取消
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!canUpload || isUploading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              >
                {isUploading ? "上傳中..." : "確認上傳"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 照片編輯器 */}
      {showEditor && previewUrl && (
        <PhotoEditorModal imageUrl={previewUrl} onSave={handlePhotoEdited} onClose={() => setShowEditor(false)} />
      )}
    </>
  )
}
