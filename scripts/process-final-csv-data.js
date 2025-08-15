// 處理最新的CSV資料，包含新的獎項分類和順序
async function processFinalCsvData() {
  try {
    console.log("正在獲取最新的CSV資料...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/113%E5%BE%97%E7%8D%8E%E5%90%8D%E5%96%AE%E4%BA%BA%E6%95%B8%E7%B5%B1%E8%A8%88%E4%B8%8A%E5%8F%B0%E9%A0%86%E5%BA%8F%28%E7%A3%90%E7%9F%B3%20%E5%84%AA%E8%B3%AA%20%E5%B9%B4%E8%B3%87%29%20-%20%E5%B7%A5%E4%BD%9C%E8%A1%A84-9vIiJMYGIwyCBQ7ijqnbMiT3jhhEkp.csv",
    )

    if (!response.ok) {
      throw new Error(`HTTP錯誤! 狀態: ${response.status}`)
    }

    const csvText = await response.text()
    console.log("成功獲取CSV資料")
    console.log("原始CSV資料 (前500字元):")
    console.log(csvText.substring(0, 500))
    console.log("=".repeat(50))

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

    // 進階CSV解析函數，處理包含逗號和引號的欄位
    function parseCSVLine(line) {
      const result = []
      let current = ""
      let inQuotes = false
      let i = 0

      while (i < line.length) {
        const char = line[i]

        if (char === '"') {
          if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
            // 處理雙引號轉義 ""
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
    console.log("標題數量:", headers.length)

    const winners = []
    let processedCount = 0

    // 處理每一行資料 (跳過標題行)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) {
        console.log(`第 ${i} 行為空，跳過`)
        continue
      }

      console.log(`\n處理第 ${i} 行:`)
      console.log(`原始資料: ${line.substring(0, 150)}${line.length > 150 ? "..." : ""}`)

      const values = parseCSVLine(line)
      console.log(`解析結果: [${values.map((v) => `"${v.substring(0, 30)}${v.length > 30 ? "..." : ""}"`).join(", ")}]`)
      console.log(`欄位數量: ${values.length}`)

      if (values.length >= 4) {
        // 清理和驗證資料
        const department = values[0] ? values[0].toString().trim() : ""
        const awardType = values[1] ? values[1].toString().trim() : ""
        const recipientName = values[2] ? values[2].toString().trim() : ""
        const achievements = values[3] ? values[3].toString().trim().replace(/\\n/g, "\n") : ""

        // 驗證必要欄位
        if (recipientName && department && awardType) {
          const winner = {
            id: processedCount + 1,
            department: department,
            awardType: awardType,
            recipientName: recipientName,
            achievements: achievements,
          }

          winners.push(winner)
          processedCount++

          console.log(`✅ 成功處理得獎者 ${processedCount}:`)
          console.log(`   姓名: ${winner.recipientName}`)
          console.log(`   部門: ${winner.department}`)
          console.log(`   獎項: ${winner.awardType}`)
          console.log(`   事蹟長度: ${winner.achievements.length} 字元`)
        } else {
          console.log(`⚠️ 跳過第 ${i} 行，資料不完整:`)
          console.log(`   姓名: "${recipientName}"`)
          console.log(`   部門: "${department}"`)
          console.log(`   獎項: "${awardType}"`)
        }
      } else {
        console.log(`⚠️ 跳過第 ${i} 行，欄位數量不足: ${values.length} < 4`)
      }
    }

    console.log("\n" + "=".repeat(60))
    console.log(`🎉 處理完成！總得獎者數: ${winners.length}`)
    console.log("=".repeat(60))

    // 完整得獎者清單
    console.log("\n📋 完整得獎者清單 (按CSV順序):")
    console.log("-".repeat(80))
    console.log("序號 | 姓名          | 部門            | 獎項    | 事蹟字數")
    console.log("-".repeat(80))

    winners.forEach((winner, index) => {
      const nameDisplay = winner.recipientName.padEnd(12, "　")
      const deptDisplay = winner.department.padEnd(14, "　")
      const awardDisplay = winner.awardType.padEnd(6, "　")
      const achievementLength = winner.achievements.length.toString().padStart(4, " ")

      console.log(
        `${(index + 1).toString().padStart(3, " ")} | ${nameDisplay} | ${deptDisplay} | ${awardDisplay} | ${achievementLength}字`,
      )
    })

    // 統計分析
    console.log("\n" + "=".repeat(60))
    console.log("📊 統計分析")
    console.log("=".repeat(60))

    // 獎項分布
    const awardCounts = {}
    winners.forEach((winner) => {
      const award = winner.awardType || "未分類"
      awardCounts[award] = (awardCounts[award] || 0) + 1
    })

    console.log("\n🏆 獎項分布:")
    console.log("-".repeat(30))
    Object.entries(awardCounts)
      .sort(([, a], [, b]) => b - a)
      .forEach(([type, count]) => {
        const percentage = ((count / winners.length) * 100).toFixed(1)
        console.log(`${type.padEnd(10, "　")}: ${count.toString().padStart(3, " ")} 位 (${percentage}%)`)
      })

    // 部門分布
    const deptCounts = {}
    winners.forEach((winner) => {
      const dept = winner.department || "未知部門"
      deptCounts[dept] = (deptCounts[dept] || 0) + 1
    })

    console.log("\n🏢 部門分布:")
    console.log("-".repeat(40))
    Object.entries(deptCounts)
      .sort(([, a], [, b]) => b - a)
      .forEach(([dept, count]) => {
        const percentage = ((count / winners.length) * 100).toFixed(1)
        console.log(`${dept.padEnd(16, "　")}: ${count.toString().padStart(2, " ")} 位 (${percentage}%)`)
      })

    // 內容長度分析
    const achievementLengths = winners.map((w) => w.achievements.length).filter((l) => l > 0)
    if (achievementLengths.length > 0) {
      const avgLength = Math.round(achievementLengths.reduce((a, b) => a + b, 0) / achievementLengths.length)
      const maxLength = Math.max(...achievementLengths)
      const minLength = Math.min(...achievementLengths)

      console.log("\n📝 具體事蹟內容分析:")
      console.log("-".repeat(30))
      console.log(`平均字數: ${avgLength} 字`)
      console.log(`最長內容: ${maxLength} 字`)
      console.log(`最短內容: ${minLength} 字`)

      // 找出最長和最短的內容
      const longestWinner = winners.find((w) => w.achievements.length === maxLength)
      const shortestWinner = winners.find((w) => w.achievements.length === minLength)

      if (longestWinner) {
        console.log(`最長內容得獎者: ${longestWinner.recipientName} (${longestWinner.department})`)
      }
      if (shortestWinner) {
        console.log(`最短內容得獎者: ${shortestWinner.recipientName} (${shortestWinner.department})`)
      }
    }

    // 資料品質檢查
    console.log("\n🔍 資料品質檢查:")
    console.log("-".repeat(30))
    const emptyAchievements = winners.filter((w) => !w.achievements || w.achievements.trim().length === 0).length
    const longNames = winners.filter((w) => w.recipientName.length > 10).length
    const specialChars = winners.filter((w) =>
      /[^\u4e00-\u9fa5\u3040-\u309f\u30a0-\u30ff\w\s]/.test(w.recipientName),
    ).length

    console.log(`空白事蹟: ${emptyAchievements} 位`)
    console.log(`長姓名 (>10字): ${longNames} 位`)
    console.log(`含特殊字符姓名: ${specialChars} 位`)

    console.log("\n✅ CSV資料處理完成！")
    return winners
  } catch (error) {
    console.error("❌ 處理CSV時發生錯誤:", error)
    console.error("錯誤詳情:", error.message)
    if (error.stack) {
      console.error("錯誤堆疊:", error.stack)
    }
    return []
  }
}

// 執行函數
processFinalCsvData()
