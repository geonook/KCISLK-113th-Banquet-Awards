"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, X, Check, Camera } from "lucide-react"
import Image from "next/image"

interface PhotoUploadModalProps {
  isOpen: boolean
  onClose: () => void
  recipientName: string
  currentPhotoUrl?: string
  onPhotoUpload: (photoUrl: string) => void
}

export function PhotoUploadModal({
  isOpen,
  onClose,
  recipientName,
  currentPhotoUrl,
  onPhotoUpload,
}: PhotoUploadModalProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhotoUrl || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    // 檢查檔案類型
    if (!file.type.startsWith("image/")) {
      alert("請選擇圖片檔案 (JPG, PNG, GIF 等)")
      return
    }

    // 檢查檔案大小 (限制 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("圖片檔案不能超過 5MB")
      return
    }

    setUploading(true)

    try {
      // 創建預覽
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // 模擬上傳過程 (實際應用中這裡會上傳到雲端儲存)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // 在實際應用中，這裡會返回上傳後的 URL
      const uploadedUrl = URL.createObjectURL(file)
      onPhotoUpload(uploadedUrl)

      console.log(`✅ ${recipientName} 的照片上傳成功`)
    } catch (error) {
      console.error("上傳失敗:", error)
      alert("照片上傳失敗，請重試")
    } finally {
      setUploading(false)
    }
  }

  const handleRemovePhoto = () => {
    setPreviewUrl(null)
    onPhotoUpload("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            上傳 {recipientName} 的照片
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 預覽區域 */}
          {previewUrl ? (
            <div className="relative">
              <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <Image
                  src={previewUrl || "/placeholder.svg"}
                  alt={`${recipientName} 照片預覽`}
                  width={256}
                  height={256}
                  className="object-cover w-full h-full"
                />
              </div>
              <Button
                onClick={handleRemovePhoto}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white p-0"
                disabled={uploading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            /* 上傳區域 */
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-700">拖放照片到這裡</p>
                  <p className="text-sm text-gray-500 mt-1">或點擊下方按鈕選擇檔案</p>
                </div>
                <div className="text-xs text-gray-400">支援 JPG, PNG, GIF 格式，檔案大小不超過 5MB</div>
              </div>
            </div>
          )}

          {/* 操作按鈕 */}
          <div className="flex gap-3">
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex-1"
              variant="outline"
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2" />
                  上傳中...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  選擇檔案
                </>
              )}
            </Button>

            {previewUrl && !uploading && (
              <Button onClick={onClose} className="flex-1">
                <Check className="w-4 h-4 mr-2" />
                確認使用
              </Button>
            )}
          </div>

          {/* 隱藏的檔案輸入 */}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

          {/* 使用說明 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <h4 className="font-medium text-blue-800 mb-2">📸 照片建議</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 建議使用正方形比例的照片</li>
              <li>• 人物清晰，光線充足</li>
              <li>• 背景簡潔，避免雜亂</li>
              <li>• 檔案大小建議在 1-3MB 之間</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
