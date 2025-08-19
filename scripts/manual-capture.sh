#!/bin/bash

# 手動截圖腳本 - 使用 macOS 內建工具
# 使用方法：./manual-capture.sh

echo "🚀 開始投影片截圖流程..."
echo "📋 請按照以下步驟操作："
echo ""
echo "1. 確保瀏覽器已打開 http://localhost:3005"
echo "2. 按 F 鍵進入全螢幕模式"
echo "3. 準備開始截圖..."
echo ""
echo "按任意鍵開始..."
read -n 1

# 創建截圖資料夾
mkdir -p screenshots
cd screenshots

echo ""
echo "🎯 截圖說明："
echo "- 每次按 Enter 會截取當前頁面"
echo "- 截圖後請按右箭頭鍵切換到下一頁"
echo "- 輸入 'q' 並按 Enter 結束截圖"
echo ""

page=1
while true; do
    echo "📸 第 $page 頁 - 按 Enter 截圖，輸入 'q' 結束："
    read input
    
    if [ "$input" = "q" ]; then
        break
    fi
    
    # 使用 macOS screencapture 工具
    filename=$(printf "slide-%03d.png" $page)
    screencapture -x "$filename"
    
    if [ $? -eq 0 ]; then
        echo "✅ 已儲存: $filename"
        page=$((page + 1))
    else
        echo "❌ 截圖失敗"
    fi
    
    echo "➡️  請按右箭頭鍵切換到下一頁，然後按 Enter 繼續..."
done

echo ""
echo "📊 總共截取了 $((page - 1)) 張投影片"
echo "📁 檔案儲存在: $(pwd)"
echo ""
echo "🔄 是否要將截圖合併成 PDF？(y/n)"
read create_pdf

if [ "$create_pdf" = "y" ] || [ "$create_pdf" = "Y" ]; then
    echo "📄 正在創建 PDF..."
    
    # 檢查是否安裝了 ImageMagick
    if command -v convert &> /dev/null; then
        convert slide-*.png ../award-presentation-slides.pdf
        echo "✅ PDF 已創建: award-presentation-slides.pdf"
    else
        echo "📦 未找到 ImageMagick，請手動安裝："
        echo "brew install imagemagick"
        echo ""
        echo "或者使用 Preview 應用程式手動合併 PNG 檔案成 PDF"
    fi
fi

echo ""
echo "🎉 截圖完成！"