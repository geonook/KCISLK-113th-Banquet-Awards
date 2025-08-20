#!/bin/bash

# 創建PDF腳本 - 使用macOS內建工具
echo "📄 正在創建投影片PDF..."

cd /Users/chenzehong/Desktop/award-presentation-template/screenshots

# 檢查截圖檔案
if [ ! -f "slide-001.png" ]; then
    echo "❌ 未找到截圖檔案，請先執行截圖流程"
    exit 1
fi

# 計算檔案數量
slide_count=$(ls slide-*.png | wc -l)
echo "📊 找到 $slide_count 張投影片截圖"

echo "📄 正在合併成PDF..."

# 使用macOS的Preview.app來合併PDF
# 先檢查是否有ImageMagick
if command -v convert &> /dev/null; then
    echo "🔧 使用ImageMagick合併..."
    convert slide-*.png ../award-presentation-slides.pdf
    
    if [ $? -eq 0 ]; then
        echo "✅ PDF已成功創建!"
        echo "📁 檔案位置: $(pwd)/../award-presentation-slides.pdf"
        
        # 顯示PDF檔案大小
        pdf_size=$(du -h ../award-presentation-slides.pdf | cut -f1)
        echo "📊 PDF大小: $pdf_size"
        
        echo ""
        echo "🎉 完成! 可以使用以下命令打開PDF:"
        echo "open ../award-presentation-slides.pdf"
    else
        echo "❌ ImageMagick合併失敗"
        exit 1
    fi
else
    echo "📦 ImageMagick未安裝，使用手動方法..."
    echo ""
    echo "📋 手動PDF創建步驟:"
    echo "1. 在Finder中選擇所有 slide-*.png 檔案"
    echo "2. 右鍵 → 打開方式 → Preview"
    echo "3. 在Preview中: 檔案 → 列印 → PDF → 儲存為PDF"
    echo "4. 檔案名稱: award-presentation-slides.pdf"
    echo ""
    echo "💡 或安裝ImageMagick進行自動合併:"
    echo "brew install imagemagick"
    echo "然後重新執行此腳本"
fi