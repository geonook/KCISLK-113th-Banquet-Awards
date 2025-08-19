#!/usr/bin/env python3
"""
自動截圖投影片並生成PDF
需要安裝: pip install selenium pillow reportlab
"""

import time
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4, landscape
import sys

def setup_driver():
    """設置Chrome瀏覽器"""
    options = Options()
    options.add_argument("--start-maximized")
    options.add_argument("--disable-infobars")
    options.add_argument("--disable-extensions")
    
    try:
        driver = webdriver.Chrome(options=options)
        return driver
    except Exception as e:
        print(f"❌ 無法啟動Chrome瀏覽器: {e}")
        print("請確保已安裝ChromeDriver:")
        print("brew install chromedriver")
        return None

def capture_slides():
    """截取所有投影片"""
    print("🚀 開始自動截圖流程...")
    
    driver = setup_driver()
    if not driver:
        return False
    
    try:
        # 導航到本地頁面
        print("📡 連接到 localhost:3005...")
        driver.get("http://localhost:3005")
        
        # 等待頁面載入
        time.sleep(3)
        
        # 設定視窗大小
        driver.set_window_size(1920, 1080)
        time.sleep(2)
        
        # 創建截圖資料夾
        screenshots_dir = "screenshots"
        if not os.path.exists(screenshots_dir):
            os.makedirs(screenshots_dir)
        
        screenshots = []
        page = 1
        
        print("📸 開始截圖...")
        
        while True:
            try:
                # 等待頁面載入完成
                time.sleep(2)
                
                # 截圖
                filename = f"slide-{page:03d}.png"
                filepath = os.path.join(screenshots_dir, filename)
                
                if driver.save_screenshot(filepath):
                    print(f"✅ 已儲存: {filename}")
                    screenshots.append(filepath)
                    page += 1
                else:
                    print(f"❌ 截圖失敗: {filename}")
                    break
                
                # 按右箭頭切換到下一頁
                body = driver.find_element(By.TAG_NAME, "body")
                body.send_keys(Keys.ARROW_RIGHT)
                
                # 等待切換動畫
                time.sleep(1.5)
                
                # 檢查是否已到最後一頁 (簡單的檢查方法)
                if page > 65:  # 預估最大頁數
                    break
                    
            except Exception as e:
                print(f"⚠️ 第 {page} 頁處理時發生錯誤: {e}")
                break
        
        print(f"📊 總共截取了 {page - 1} 張投影片")
        
        # 創建PDF
        if screenshots:
            create_pdf(screenshots)
            
        return True
        
    except Exception as e:
        print(f"❌ 截圖過程發生錯誤: {e}")
        return False
    finally:
        driver.quit()
        print("🔚 瀏覽器已關閉")

def create_pdf(screenshots):
    """將截圖合併成PDF"""
    print("📄 正在創建PDF...")
    
    try:
        pdf_path = "award-presentation-slides.pdf"
        
        # 使用landscape A4尺寸
        page_width, page_height = landscape(A4)
        c = canvas.Canvas(pdf_path, pagesize=landscape(A4))
        
        for i, screenshot_path in enumerate(screenshots):
            try:
                # 打開圖片
                img = Image.open(screenshot_path)
                img_width, img_height = img.size
                
                # 計算縮放比例以適應頁面
                scale_x = page_width / img_width
                scale_y = page_height / img_height
                scale = min(scale_x, scale_y)
                
                new_width = img_width * scale
                new_height = img_height * scale
                
                # 計算置中位置
                x = (page_width - new_width) / 2
                y = (page_height - new_height) / 2
                
                # 將圖片加入PDF
                c.drawImage(screenshot_path, x, y, new_width, new_height)
                c.showPage()
                
                print(f"📄 已加入PDF: slide {i + 1}")
                
            except Exception as e:
                print(f"⚠️ 處理圖片 {screenshot_path} 時發生錯誤: {e}")
        
        c.save()
        print(f"✅ PDF 已創建: {pdf_path}")
        
    except Exception as e:
        print(f"❌ 創建PDF時發生錯誤: {e}")

def check_dependencies():
    """檢查必要的依賴"""
    try:
        import selenium
        import PIL
        import reportlab
        return True
    except ImportError as e:
        print(f"❌ 缺少必要的依賴: {e}")
        print("請執行: pip install selenium pillow reportlab")
        return False

if __name__ == "__main__":
    print("🎯 投影片自動截圖工具")
    print("=" * 50)
    
    if not check_dependencies():
        sys.exit(1)
    
    if capture_slides():
        print("🎉 截圖完成！")
    else:
        print("❌ 截圖失敗")
        sys.exit(1)