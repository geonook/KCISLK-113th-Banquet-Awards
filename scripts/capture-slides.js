const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

async function captureSlides() {
  console.log('🚀 Starting slide capture process...');
  
  const browser = await puppeteer.launch({
    headless: false, // 設為false以便觀看進度
    defaultViewport: null,
    args: ['--start-maximized']
  });

  const page = await browser.newPage();
  
  // 設定視窗大小為1920x1080 (Full HD)
  await page.setViewport({ width: 1920, height: 1080 });
  
  try {
    // 導航到本地開發伺服器
    console.log('📡 Connecting to localhost:3005...');
    await page.goto('http://localhost:3005', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    // 等待頁面載入
    await page.waitForTimeout(3000);

    // 獲取總投影片數量
    const totalSlides = await page.evaluate(() => {
      // 尋找導航元素中的總數
      const navElement = document.querySelector('[class*="navigation"]');
      if (navElement) {
        const text = navElement.textContent;
        const match = text.match(/(\d+)$/);
        if (match) return parseInt(match[1]);
      }
      
      // 備用方法：尋找分頁指示器
      const pageIndicator = document.querySelector('span:contains("/")');
      if (pageIndicator) {
        const text = pageIndicator.textContent;
        const match = text.match(/\/(\d+)/);
        if (match) return parseInt(match[1]);
      }
      
      // 如果都找不到，返回預估數量
      return 62; // 根據之前的分析，大約62頁
    });

    console.log(`📊 Total slides detected: ${totalSlides}`);

    // 創建screenshots資料夾
    const screenshotsDir = path.join(__dirname, '../screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }

    const screenshots = [];

    // 逐頁截圖
    for (let i = 0; i < totalSlides; i++) {
      console.log(`📸 Capturing slide ${i + 1}/${totalSlides}...`);
      
      // 如果不是第一頁，導航到下一頁
      if (i > 0) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(2000); // 等待動畫完成
      }
      
      // 等待圖片載入
      await page.waitForTimeout(1000);
      
      // 截圖
      const filename = `slide-${String(i + 1).padStart(3, '0')}.png`;
      const filepath = path.join(screenshotsDir, filename);
      
      await page.screenshot({
        path: filepath,
        fullPage: false,
        type: 'png',
        quality: 100
      });
      
      screenshots.push(filepath);
      console.log(`✅ Saved: ${filename}`);
    }

    console.log('📄 Creating PDF...');
    await createPDF(screenshots);

    console.log('🎉 All slides captured successfully!');
    
  } catch (error) {
    console.error('❌ Error during capture:', error);
  } finally {
    await browser.close();
  }
}

async function createPDF(screenshots) {
  const pdfDoc = await PDFDocument.create();
  
  for (const screenshotPath of screenshots) {
    const imageBytes = fs.readFileSync(screenshotPath);
    const image = await pdfDoc.embedPng(imageBytes);
    
    // 計算頁面尺寸 (保持16:9比例)
    const { width, height } = image.scale(1);
    const maxWidth = 842; // A4寬度 (72 DPI)
    const maxHeight = 595; // A4高度 (72 DPI) 橫向
    
    let finalWidth = width;
    let finalHeight = height;
    
    // 按比例縮放以適應頁面
    if (width > maxWidth || height > maxHeight) {
      const scale = Math.min(maxWidth / width, maxHeight / height);
      finalWidth = width * scale;
      finalHeight = height * scale;
    }
    
    const page = pdfDoc.addPage([finalWidth, finalHeight]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: finalWidth,
      height: finalHeight,
    });
  }
  
  const pdfBytes = await pdfDoc.save();
  const pdfPath = path.join(__dirname, '../award-presentation-slides.pdf');
  fs.writeFileSync(pdfPath, pdfBytes);
  
  console.log(`📁 PDF saved: ${pdfPath}`);
}

// 執行截圖
captureSlides().catch(console.error);