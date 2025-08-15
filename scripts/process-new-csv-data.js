// 處理新的CSV資料並按頁數排序
async function processNewCsvData() {
  try {
    console.log("正在獲取新的CSV資料...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%9C%AA%E5%91%BD%E5%90%8D%E7%9A%84%E8%A9%A6%E7%AE%97%E8%A1%A8%20-%20%E5%B7%A5%E4%BD%9C%E8%A1%A81-OqTMTyEzB4IejXMhVjr0Ghor7zadgW.csv",
    )
    const csvText = await response.text()

    console.log("原始CSV資料 (前1000字元):")
    console.log(csvText.substring(0, 1000))

    // 手動解析CSV以處理中文標題並保持順序
    const lines = csvText.split("\n").filter((line) => line.trim())
    console.log(`總行數: ${lines.length}`)

    // 解析標題行
    const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""))
    console.log("標題:", headers)

    const winners = []

    // 處理每一行資料 (跳過標題行)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      // 更好的CSV解析以處理包含逗號的引號欄位
      const values = []
      let current = ""
      let inQuotes = false
      let quoteCount = 0

      for (let j = 0; j < line.length; j++) {
        const char = line[j]
        if (char === '"') {
          quoteCount++
          inQuotes = quoteCount % 2 === 1
        } else if (char === "," && !inQuotes) {
          values.push(current.trim().replace(/^"|"$/g, "").replace(/""/g, '"'))
          current = ""
        } else {
          current += char
        }
      }
      values.push(current.trim().replace(/^"|"$/g, "").replace(/""/g, '"'))

      if (values.length >= 5) {
        const winner = {
          id: i,
          pageNumber: Number.parseInt(values[0]) || 0, // 頁數
          department: values[1] || "", // 部門
          awardType: values[2] || "", // 獎項
          recipientName: values[3] || "", // 被推薦人
          achievements: values[4] ? values[4].replace(/\\n/g, "\n") : "", // 具體事蹟
        }

        winners.push(winner)
        console.log(
          `得獎者 ${i}: 頁數${winner.pageNumber} - ${winner.recipientName} - ${winner.department} - ${winner.awardType}`,
        )
      }
    }

    // 按頁數排序
    winners.sort((a, b) => a.pageNumber - b.pageNumber)

    console.log(`\n總得獎者數: ${winners.length}`)
    console.log("排序後的前10位得獎者:")
    winners.slice(0, 10).forEach((winner, index) => {
      console.log(`${index + 1}. 頁數${winner.pageNumber}: ${winner.recipientName} (${winner.department})`)
    })

    // 顯示獎項分布
    const awardCounts = {}
    winners.forEach((winner) => {
      awardCounts[winner.awardType] = (awardCounts[winner.awardType] || 0) + 1
    })

    console.log("\n獎項分布:")
    Object.entries(awardCounts).forEach(([type, count]) => {
      console.log(`${type}: ${count} 位得獎者`)
    })

    // 顯示部門分布
    const deptCounts = {}
    winners.forEach((winner) => {
      deptCounts[winner.department] = (deptCounts[winner.department] || 0) + 1
    })

    console.log("\n部門分布:")
    Object.entries(deptCounts).forEach(([dept, count]) => {
      console.log(`${dept}: ${count} 位得獎者`)
    })

    return winners
  } catch (error) {
    console.error("處理CSV時發生錯誤:", error)
    return []
  }
}

// 執行函數
processNewCsvData()
