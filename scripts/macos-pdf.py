#!/usr/bin/env python3
"""
使用macOS內建的Quartz PDFKit創建PDF (不需要額外安裝依賴)
"""

import os
import sys
import subprocess
from pathlib import Path

def create_pdf_with_macos():
    """使用macOS內建工具創建PDF"""
    screenshots_dir = "/Users/chenzehong/Desktop/award-presentation-template/screenshots"
    output_pdf = "/Users/chenzehong/Desktop/award-presentation-template/award-presentation-slides.pdf"
    
    # 檢查截圖目錄
    if not os.path.exists(screenshots_dir):
        print("❌ 截圖目錄不存在")
        return False
    
    # 獲取所有PNG文件
    png_files = sorted([f for f in os.listdir(screenshots_dir) if f.endswith('.png')])
    
    if not png_files:
        print("❌ 未找到PNG截圖檔案")
        return False
    
    print(f"📊 找到 {len(png_files)} 張截圖")
    
    # 創建AppleScript來自動化Preview
    applescript = f'''
tell application "Preview"
    activate
    
    -- 打開第一張圖片
    open POSIX file "{screenshots_dir}/slide-001.png"
    
    delay 2
    
    -- 打開剩餘的圖片並加入同一個文件
    '''
    
    for i in range(2, len(png_files) + 1):
        filename = f"slide-{i:03d}.png"
        applescript += f'''
    open POSIX file "{screenshots_dir}/{filename}"
    delay 0.5
        '''
    
    applescript += f'''
    
    delay 2
    
    -- 保存為PDF
    tell document 1
        save as "PDF" in POSIX file "{output_pdf}"
    end tell
    
    delay 2
    quit
end tell
'''

    # 執行AppleScript
    try:
        print("📄 正在使用Preview創建PDF...")
        result = subprocess.run(['osascript', '-e', applescript], 
                              capture_output=True, text=True)
        
        if result.returncode == 0:
            if os.path.exists(output_pdf):
                file_size = os.path.getsize(output_pdf) / 1024 / 1024  # MB
                print(f"✅ PDF創建成功!")
                print(f"📁 檔案路徑: {output_pdf}")
                print(f"📊 檔案大小: {file_size:.1f} MB")
                return True
            else:
                print("❌ PDF檔案未成功創建")
                return False
        else:
            print(f"❌ AppleScript執行失敗: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ 創建PDF時發生錯誤: {e}")
        return False

def simple_pdf_creation():
    """簡單的PDF創建指南"""
    print("🎯 手動創建PDF步驟:")
    print("1. 打開Finder，導航到screenshots資料夾")
    print("2. 選擇所有slide-*.png檔案 (Cmd+A)")
    print("3. 右鍵點擊 → 打開方式 → Preview")
    print("4. 在Preview中，確保所有圖片都在側邊欄顯示")
    print("5. 選擇: 檔案 → 匯出為PDF...")
    print("6. 檔案名稱: award-presentation-slides.pdf")
    print("7. 儲存位置: award-presentation-template 主目錄")
    print("8. 點擊「儲存」")

if __name__ == "__main__":
    print("📄 投影片PDF創建工具")
    print("=" * 40)
    
    # 嘗試自動創建
    if create_pdf_with_macos():
        print("🎉 PDF創建完成!")
    else:
        print("🔄 自動創建失敗，提供手動步驟:")
        print()
        simple_pdf_creation()