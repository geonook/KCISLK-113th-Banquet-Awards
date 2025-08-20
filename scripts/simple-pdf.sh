#!/bin/bash

# 簡單PDF創建腳本
echo "📄 投影片PDF創建工具"
echo "=================================="

cd /Users/chenzehong/Desktop/award-presentation-template/screenshots

# 檢查截圖檔案
if [ ! -f "slide-001.png" ]; then
    echo "❌ 未找到截圖檔案"
    exit 1
fi

slide_count=$(ls slide-*.png | wc -l)
echo "📊 找到 $slide_count 張投影片截圖"

echo ""
echo "📄 正在嘗試使用Preview創建PDF..."

# 使用AppleScript自動化Preview
osascript << 'EOF'
tell application "Finder"
    set screenshotFolder to POSIX file "/Users/chenzehong/Desktop/award-presentation-template/screenshots"
    open screenshotFolder
end tell

delay 2

tell application "Finder"
    select every item of folder screenshotFolder whose name contains "slide-" and name ends with ".png"
end tell

delay 1

tell application "Finder"
    open selection using (path to application "Preview")
end tell

delay 3

tell application "Preview"
    activate
    delay 2
    
    tell application "System Events"
        tell process "Preview"
            -- 使用鍵盤快捷鍵列印
            key code 35 using command down  -- Cmd+P
            delay 2
            
            -- 點擊PDF按鈕
            if exists button "PDF" then
                click button "PDF"
                delay 1
                click menu item "存為PDF" of menu of button "PDF"
                delay 2
                
                -- 輸入檔案名稱
                keystroke "award-presentation-slides"
                delay 1
                
                -- 點擊儲存
                key code 36  -- Enter
            end if
        end tell
    end tell
end tell
EOF

echo ""
echo "⏳ PDF創建過程完成"

# 檢查PDF是否創建成功
if [ -f "/Users/chenzehong/Desktop/award-presentation-template/award-presentation-slides.pdf" ]; then
    pdf_size=$(du -h "/Users/chenzehong/Desktop/award-presentation-template/award-presentation-slides.pdf" | cut -f1)
    echo "✅ PDF創建成功!"
    echo "📁 檔案位置: /Users/chenzehong/Desktop/award-presentation-template/award-presentation-slides.pdf"
    echo "📊 檔案大小: $pdf_size"
    echo ""
    echo "🎉 完成! 您可以使用以下命令打開PDF:"
    echo "open /Users/chenzehong/Desktop/award-presentation-template/award-presentation-slides.pdf"
else
    echo "ℹ️  自動創建可能需要手動操作"
    echo ""
    echo "📋 如需手動完成，請按照以下步驟:"
    echo "1. Preview應用程式應該已經打開並顯示所有截圖"
    echo "2. 在Preview中按 Cmd+P (列印)"
    echo "3. 點擊左下角的「PDF」按鈕"
    echo "4. 選擇「存為PDF」"
    echo "5. 檔案名稱輸入: award-presentation-slides"
    echo "6. 確認儲存位置在 award-presentation-template 資料夾"
    echo "7. 點擊「儲存」"
fi