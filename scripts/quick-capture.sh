#!/bin/bash

# 快速截圖腳本 - 簡化版
echo "🚀 投影片快速截圖工具"
echo "========================"
echo ""

# 創建截圖資料夾
mkdir -p screenshots
cd screenshots

echo "📋 使用說明："
echo "1. 請先在瀏覽器打開 http://localhost:3005"
echo "2. 按 F 鍵進入全螢幕模式"
echo "3. 此腳本會自動進行截圖，每次截圖後請按右箭頭切換頁面"
echo ""
echo "準備開始？按 Enter 繼續..."
read

echo ""
echo "⏱️  3秒後開始自動截圖..."
sleep 1
echo "⏱️  2秒..."
sleep 1  
echo "⏱️  1秒..."
sleep 1

# 預估62頁投影片
total_pages=62
echo ""
echo "📸 開始自動截圖 (預估 $total_pages 頁)..."
echo ""

for i in $(seq 1 $total_pages); do
    filename=$(printf "slide-%03d.png" $i)
    
    echo "📸 第 $i/$total_pages 頁..."
    
    # 截圖
    screencapture -x "$filename"
    
    if [ $? -eq 0 ]; then
        echo "✅ 已儲存: $filename"
    else
        echo "❌ 截圖失敗: $filename"
        break
    fi
    
    if [ $i -lt $total_pages ]; then
        echo "⏭️  請按右箭頭切換到下一頁，然後按 Enter..."
        read
    fi
done

echo ""
echo "📊 截圖完成！總共 $i 張截圖"
echo "📁 檔案位置: $(pwd)"
echo ""

# 列出所有截圖檔案
echo "📋 截圖檔案列表："
ls -la slide-*.png 2>/dev/null | head -10
if [ $(ls slide-*.png 2>/dev/null | wc -l) -gt 10 ]; then
    echo "... (還有更多檔案)"
fi

echo ""
echo "🔄 是否要合併成PDF？(需要ImageMagick) [y/N]"
read create_pdf

if [ "$create_pdf" = "y" ] || [ "$create_pdf" = "Y" ]; then
    if command -v convert &> /dev/null; then
        echo "📄 正在創建PDF..."
        convert slide-*.png ../award-presentation-slides.pdf
        if [ $? -eq 0 ]; then
            echo "✅ PDF已創建: award-presentation-slides.pdf"
            echo "📊 PDF檔案大小: $(du -h ../award-presentation-slides.pdf | cut -f1)"
        else
            echo "❌ PDF創建失敗"
        fi
    else
        echo "❌ 未安裝ImageMagick"
        echo "💡 安裝方法: brew install imagemagick"
        echo "或者手動使用Preview合併PNG檔案"
    fi
fi

echo ""
echo "🎉 截圖流程完成！"
echo ""
echo "📝 手動PDF合併方法："
echo "1. 打開Finder，選擇所有slide-*.png檔案"
echo "2. 右鍵 → 打開方式 → Preview"
echo "3. 在Preview中：檔案 → 列印 → PDF → 儲存為PDF"