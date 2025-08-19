# 📸 投影片截圖指南

本指南提供三種方法來截取所有投影片並生成PDF文件。

## 🎯 方法選擇

### 方法一：自動截圖 (推薦)
使用Python自動化工具，全自動截圖並生成PDF。

**前置要求：**
```bash
# 安裝Python依賴
pip install selenium pillow reportlab

# 安裝ChromeDriver (macOS)
brew install chromedriver
```

**使用方法：**
```bash
# 確保開發伺服器正在運行
npm run dev -- -p 3005

# 執行自動截圖
python3 scripts/auto-capture.py
```

### 方法二：手動截圖
使用macOS內建工具進行手動截圖。

**使用方法：**
```bash
# 執行手動截圖腳本
./scripts/manual-capture.sh
```

**操作步驟：**
1. 打開瀏覽器到 http://localhost:3005
2. 按 F 鍵進入全螢幕模式
3. 按照腳本提示逐頁截圖
4. 可選擇自動合併成PDF (需要ImageMagick)

### 方法三：使用Preview手動合併
如果自動化工具無法使用，可以手動截圖後用Preview合併。

**步驟：**
1. 手動截取每一頁投影片 (Cmd+Shift+4)
2. 打開Preview應用程式
3. 選擇所有截圖檔案
4. 檔案 → 列印 → 另存為PDF

## 📋 輸出結果

所有方法都會產生：
- `screenshots/` 資料夾包含所有PNG截圖
- `award-presentation-slides.pdf` 完整PDF文件

## ⚙️ 技術規格

- **解析度：** 1920x1080 (Full HD)
- **格式：** PNG截圖 → PDF文件
- **頁面方向：** 橫向 (Landscape)
- **PDF尺寸：** A4橫向，按比例縮放

## 🐛 疑難排解

### ChromeDriver問題
```bash
# 重新安裝ChromeDriver
brew uninstall chromedriver
brew install chromedriver

# 或使用直接下載
# https://chromedriver.chromium.org/
```

### Python依賴問題
```bash
# 更新pip
pip install --upgrade pip

# 重新安裝依賴
pip install --force-reinstall selenium pillow reportlab
```

### 權限問題
```bash
# 給予腳本執行權限
chmod +x scripts/*.sh
chmod +x scripts/*.py
```

## 📊 預期頁數

根據當前配置，總投影片數約為 **62頁**：
- 主頁、表演頁、致詞頁：5頁
- 年資獎和磐石獎：15頁 (含新增的年資獎標題頁)
- 優質獎：37頁
- 串場和結尾：5頁

## 💡 使用建議

1. **開發環境：** 確保 `npm run dev -- -p 3005` 正在運行
2. **網路連線：** 確保照片能正常載入
3. **螢幕解析度：** 建議使用高解析度螢幕以獲得最佳截圖品質
4. **系統效能：** 自動截圖過程中避免使用其他應用程式

---

🎉 成功截圖後，您將獲得完整的投影片PDF，可用於列印、分享或備份！