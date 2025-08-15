"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, RotateCw, Move, Crop, Palette, RotateCcw, ZoomIn, ZoomOut, RefreshCw } from "lucide-react"

interface PhotoEditorModalProps {
  imageUrl: string
  onSave: (editedImageUrl: string) => void
  onClose: () => void
}

interface CropSettings {
  x: number
  y: number
  width: number
  height: number
}

interface AdjustmentSettings {
  brightness: number
  contrast: number
  saturation: number
  rotation: number
  scale: number
}

export function PhotoEditorModal({ imageUrl, onSave, onClose }: PhotoEditorModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // 裁切設定
  const [cropSettings, setCropSettings] = useState<CropSettings>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  })

  // 調整設定
  const [adjustments, setAdjustments] = useState<AdjustmentSettings>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    rotation: 0,
    scale: 100,
  })

  // 載入原始圖片
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      setOriginalImage(img)
      // 初始化裁切設定為整張圖片
      setCropSettings({
        x: 0,
        y: 0,
        width: img.width,
        height: img.height,
      })
    }
    img.src = imageUrl
  }, [imageUrl])

  // 應用所有效果到畫布
  const applyEffects = () => {
    if (!originalImage || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 設定畫布大小
    canvas.width = cropSettings.width
    canvas.height = cropSettings.height

    // 清除畫布
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // 保存當前狀態
    ctx.save()

    // 應用濾鏡效果
    ctx.filter = `brightness(${adjustments.brightness}%) contrast(${adjustments.contrast}%) saturate(${adjustments.saturation}%)`

    // 計算縮放和旋轉的中心點
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // 移動到中心點
    ctx.translate(centerX, centerY)

    // 應用旋轉
    ctx.rotate((adjustments.rotation * Math.PI) / 180)

    // 應用縮放
    const scale = adjustments.scale / 100
    ctx.scale(scale, scale)

    // 繪製裁切後的圖片
    ctx.drawImage(
      originalImage,
      cropSettings.x,
      cropSettings.y,
      cropSettings.width,
      cropSettings.height,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height,
    )

    // 恢復狀態
    ctx.restore()
  }

  // 當設定改變時重新繪製
  useEffect(() => {
    applyEffects()
  }, [originalImage, cropSettings, adjustments])

  // 重設所有設定
  const resetAll = () => {
    if (originalImage) {
      setCropSettings({
        x: 0,
        y: 0,
        width: originalImage.width,
        height: originalImage.height,
      })
    }
    setAdjustments({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      rotation: 0,
      scale: 100,
    })
  }

  // 預設裁切比例
  const applyCropPreset = (ratio: string) => {
    if (!originalImage) return

    let width = originalImage.width
    let height = originalImage.height
    let x = 0
    let y = 0

    switch (ratio) {
      case "1:1": // 正方形
        const size = Math.min(width, height)
        width = size
        height = size
        x = (originalImage.width - size) / 2
        y = (originalImage.height - size) / 2
        break
      case "4:3": // 標準比例
        if (width / height > 4 / 3) {
          width = (height * 4) / 3
          x = (originalImage.width - width) / 2
        } else {
          height = (width * 3) / 4
          y = (originalImage.height - height) / 2
        }
        break
      case "16:9": // 寬螢幕
        if (width / height > 16 / 9) {
          width = (height * 16) / 9
          x = (originalImage.width - width) / 2
        } else {
          height = (width * 9) / 16
          y = (originalImage.height - height) / 2
        }
        break
    }

    setCropSettings({ x, y, width, height })
  }

  // 儲存編輯後的圖片
  const handleSave = async () => {
    if (!canvasRef.current) return

    setIsProcessing(true)
    try {
      const canvas = canvasRef.current
      const editedImageUrl = canvas.toDataURL("image/jpeg", 0.9)
      onSave(editedImageUrl)
    } catch (error) {
      console.error("Failed to save image:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] bg-white border border-gray-200 shadow-xl">
        <DialogHeader className="bg-white border-b border-gray-200 pb-4">
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Palette className="w-5 h-5 text-blue-600" />
            照片編輯器
          </DialogTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </DialogHeader>

        <div className="flex gap-6 overflow-hidden bg-white">
          {/* 預覽區域 */}
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-200 p-4">
            <div className="w-full h-full flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-full object-contain border border-gray-300 rounded-lg bg-white shadow-sm"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>
          </div>

          {/* 控制面板 */}
          <div className="w-80 bg-white border-l border-gray-200">
            <Tabs defaultValue="crop" className="h-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                <TabsTrigger value="crop" className="text-xs">
                  <Crop className="w-4 h-4 mr-1" />
                  裁切
                </TabsTrigger>
                <TabsTrigger value="adjust" className="text-xs">
                  <Move className="w-4 h-4 mr-1" />
                  調整
                </TabsTrigger>
                <TabsTrigger value="filter" className="text-xs">
                  <Palette className="w-4 h-4 mr-1" />
                  濾鏡
                </TabsTrigger>
              </TabsList>

              <div className="p-4 space-y-4 h-full overflow-y-auto">
                <TabsContent value="crop" className="space-y-4 mt-0">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">預設比例</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        onClick={() => applyCropPreset("1:1")}
                        variant="outline"
                        size="sm"
                        className="text-xs bg-white hover:bg-gray-50 border-gray-300"
                      >
                        1:1
                      </Button>
                      <Button
                        onClick={() => applyCropPreset("4:3")}
                        variant="outline"
                        size="sm"
                        className="text-xs bg-white hover:bg-gray-50 border-gray-300"
                      >
                        4:3
                      </Button>
                      <Button
                        onClick={() => applyCropPreset("16:9")}
                        variant="outline"
                        size="sm"
                        className="text-xs bg-white hover:bg-gray-50 border-gray-300"
                      >
                        16:9
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-700">X 位置</label>
                      <Slider
                        value={[cropSettings.x]}
                        onValueChange={([value]) => setCropSettings((prev) => ({ ...prev, x: value }))}
                        max={originalImage?.width || 100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700">Y 位置</label>
                      <Slider
                        value={[cropSettings.y]}
                        onValueChange={([value]) => setCropSettings((prev) => ({ ...prev, y: value }))}
                        max={originalImage?.height || 100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700">寬度</label>
                      <Slider
                        value={[cropSettings.width]}
                        onValueChange={([value]) => setCropSettings((prev) => ({ ...prev, width: value }))}
                        min={50}
                        max={originalImage?.width || 100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-700">高度</label>
                      <Slider
                        value={[cropSettings.height]}
                        onValueChange={([value]) => setCropSettings((prev) => ({ ...prev, height: value }))}
                        min={50}
                        max={originalImage?.height || 100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="adjust" className="space-y-4 mt-0">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-700 flex items-center gap-2">
                        <RotateCw className="w-4 h-4" />
                        旋轉 ({adjustments.rotation}°)
                      </label>
                      <Slider
                        value={[adjustments.rotation]}
                        onValueChange={([value]) => setAdjustments((prev) => ({ ...prev, rotation: value }))}
                        min={-180}
                        max={180}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex gap-2 mt-2">
                        <Button
                          onClick={() => setAdjustments((prev) => ({ ...prev, rotation: prev.rotation - 90 }))}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs bg-white hover:bg-gray-50 border-gray-300"
                        >
                          <RotateCcw className="w-3 h-3 mr-1" />
                          -90°
                        </Button>
                        <Button
                          onClick={() => setAdjustments((prev) => ({ ...prev, rotation: prev.rotation + 90 }))}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs bg-white hover:bg-gray-50 border-gray-300"
                        >
                          <RotateCw className="w-3 h-3 mr-1" />
                          +90°
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-700 flex items-center gap-2">
                        <ZoomIn className="w-4 h-4" />
                        縮放 ({adjustments.scale}%)
                      </label>
                      <Slider
                        value={[adjustments.scale]}
                        onValueChange={([value]) => setAdjustments((prev) => ({ ...prev, scale: value }))}
                        min={25}
                        max={200}
                        step={5}
                        className="mt-2"
                      />
                      <div className="flex gap-2 mt-2">
                        <Button
                          onClick={() => setAdjustments((prev) => ({ ...prev, scale: 50 }))}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs bg-white hover:bg-gray-50 border-gray-300"
                        >
                          <ZoomOut className="w-3 h-3 mr-1" />
                          50%
                        </Button>
                        <Button
                          onClick={() => setAdjustments((prev) => ({ ...prev, scale: 100 }))}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs bg-white hover:bg-gray-50 border-gray-300"
                        >
                          100%
                        </Button>
                        <Button
                          onClick={() => setAdjustments((prev) => ({ ...prev, scale: 150 }))}
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs bg-white hover:bg-gray-50 border-gray-300"
                        >
                          <ZoomIn className="w-3 h-3 mr-1" />
                          150%
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="filter" className="space-y-4 mt-0">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-700">亮度 ({adjustments.brightness}%)</label>
                      <Slider
                        value={[adjustments.brightness]}
                        onValueChange={([value]) => setAdjustments((prev) => ({ ...prev, brightness: value }))}
                        min={50}
                        max={150}
                        step={5}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-700">對比度 ({adjustments.contrast}%)</label>
                      <Slider
                        value={[adjustments.contrast]}
                        onValueChange={([value]) => setAdjustments((prev) => ({ ...prev, contrast: value }))}
                        min={50}
                        max={150}
                        step={5}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-700">飽和度 ({adjustments.saturation}%)</label>
                      <Slider
                        value={[adjustments.saturation]}
                        onValueChange={([value]) => setAdjustments((prev) => ({ ...prev, saturation: value }))}
                        min={0}
                        max={200}
                        step={10}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* 操作按鈕 */}
                <div className="absolute bottom-4 left-4 right-4 space-y-2 bg-white pt-4 border-t border-gray-200">
                  <Button
                    onClick={resetAll}
                    variant="outline"
                    className="w-full bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    重設全部
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      onClick={onClose}
                      variant="outline"
                      className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
                    >
                      取消
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isProcessing}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isProcessing ? "處理中..." : "儲存"}
                    </Button>
                  </div>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
