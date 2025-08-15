// 重新處理CSV資料，確保排序和數量正確
async function processUpdatedCsvData() {
  try {
    console.log("正在重新獲取CSV資料...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%9C%AA%E5%91%BD%E5%90%8D%E7%9A%84%E8%A9%A6%E7%AE%97%E8%A1%A8%20-%20%E5%B7%A5%E4%BD%9C%E8%A1%A81-OqTMTyEzB4IejXMhVjr0Ghor7zadgW.csv",
    )
    const csvText = await response.text()

    console.log("原始CSV資料:")
    console.log(csvText)
    console.log("=" * 50)

    // 分割行並過濾空行
    const lines = csvText.split(/\r?\n/).filter((line) => line.trim())
    console.log(`總行數: ${lines.length}`)

    if (lines.length === 0) {
      console.error("CSV檔案為空")
      return []
    }

    // 解析標題行
    const headerLine = lines[0]
    console.log("標題行:", headerLine)

    // 手動解析CSV，處理包含逗號和引號的欄位
    function parseCSVLine(line) {
      const result = []
      let current = ""
      let inQuotes = false
      let i = 0

      while (i < line.length) {
        const char = line[i]

        if (char === '"') {
          if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
            // 處理雙引號轉義
            current += '"'
            i += 2
          } else {
            // 切換引號狀態
            inQuotes = !inQuotes
            i++
          }
        } else if (char === "," && !inQuotes) {
          // 欄位分隔符
          result.push(current.trim())
          current = ""
          i++
        } else {
          current += char
          i++
        }
      }

      // 添加最後一個欄位
      result.push(current.trim())
      return result
    }

    const headers = parseCSVLine(headerLine)
    console.log("解析後的標題:", headers)

    const winners = []

    // 處理每一行資料 (跳過標題行)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      console.log(`處理第 ${i} 行:`, line.substring(0, 100) + "...")

      const values = parseCSVLine(line)
      console.log(`第 ${i} 行解析結果:`, values)

      if (values.length >= 5) {
        // 確保所有欄位都有值
        const pageNumber = values[0] ? Number.parseInt(values[0].toString().trim()) : 0
        const department = values[1] ? values[1].toString().trim() : ""
        const awardType = values[2] ? values[2].toString().trim() : ""
        const recipientName = values[3] ? values[3].toString().trim() : ""
        const achievements = values[4] ? values[4].toString().trim().replace(/\\n/g, "\n") : ""

        if (recipientName && department && awardType) {
          const winner = {
            id: i,
            pageNumber: pageNumber,
            department: department,
            awardType: awardType,
            recipientName: recipientName,
            achievements: achievements,
          }

          winners.push(winner)
          console.log(
            `✅ 得獎者 ${winners.length}: 頁數${winner.pageNumber} - ${winner.recipientName} - ${winner.department} - ${winner.awardType}`,
          )
        } else {
          console.log(`⚠️ 跳過第 ${i} 行，資料不完整:`, { recipientName, department, awardType })
        }
      } else {
        console.log(`⚠️ 跳過第 ${i} 行，欄位數量不足: ${values.length}`)
      }
    }

    // 按頁數排序
    winners.sort((a, b) => {
      if (a.pageNumber === b.pageNumber) {
        return a.id - b.id // 如果頁數相同，按原始順序
      }
      return a.pageNumber - b.pageNumber
    })

    console.log("\n" + "=" * 50)
    console.log(`✅ 總得獎者數: ${winners.length}`)
    console.log("\n📋 完整得獎者清單 (按頁數排序):")

    winners.forEach((winner, index) => {
      console.log(
        `${(index + 1).toString().padStart(2, "0")}. 頁數${winner.pageNumber.toString().padStart(2, " ")} | ${winner.recipientName.padEnd(10, " ")} | ${winner.department.padEnd(12, " ")} | ${winner.awardType}`,
      )
    })

    // 統計資訊
    const awardCounts = {}
    const deptCounts = {}
    const pageNumbers = new Set()

    winners.forEach((winner) => {
      awardCounts[winner.awardType] = (awardCounts[winner.awardType] || 0) + 1
      deptCounts[winner.department] = (deptCounts[winner.department] || 0) + 1
      pageNumbers.add(winner.pageNumber)
    })

    console.log("\n📊 獎項分布:")
    Object.entries(awardCounts)
      .sort(([, a], [, b]) => b - a)
      .forEach(([type, count]) => {
        console.log(`  ${type}: ${count} 位`)
      })

    console.log("\n🏢 部門分布:")
    Object.entries(deptCounts)
      .sort(([, a], [, b]) => b - a)
      .forEach(([dept, count]) => {
        console.log(`  ${dept}: ${count} 位`)
      })

    console.log("\n📄 頁數範圍:")
    const sortedPages = Array.from(pageNumbers).sort((a, b) => a - b)
    console.log(`  最小頁數: ${Math.min(...sortedPages)}`)
    console.log(`  最大頁數: ${Math.max(...sortedPages)}`)
    console.log(`  頁數清單: ${sortedPages.join(", ")}`)

    return winners
  } catch (error) {
    console.error("處理CSV時發生錯誤:", error)
    return []
  }
}

// 執行函數
processUpdatedCsvData()
