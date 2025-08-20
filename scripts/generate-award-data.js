// 處理最新CSV資料並生成完整的獎項資料
async function processAndGenerateAwardData() {
  console.log("🚀 開始處理CSV資料...")
  console.log("=".repeat(60))

  try {
    // 使用更簡潔的CSV URL
    const csvUrl =
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/113%E5%BE%97%E7%8D%8E%E5%90%8D%E5%96%AE%E4%BA%BA%E6%95%B8%E7%B5%B1%E8%A8%88%E4%B8%8A%E5%8F%B0%E9%A0%86%E5%BA%8F%28%E7%A3%90%E7%9F%B3%20%E5%84%AA%E8%B3%AA%20%E5%B9%B4%E8%B3%87%29%20-%20%E5%B7%A5%E4%BD%9C%E8%A1%A84-9vIiJMYGIwyCBQ7ijqnbMiT3jhhEkp.csv"

    console.log("📥 正在下載CSV檔案...")
    console.log("🔗 URL:", csvUrl.substring(0, 80) + "...")

    const response = await fetch(csvUrl, {
      method: "GET",
      headers: {
        Accept: "text/csv,text/plain,*/*",
      },
    })

    console.log("📡 回應狀態:", response.status, response.statusText)

    if (!response.ok) {
      throw new Error(`HTTP錯誤: ${response.status} ${response.statusText}`)
    }

    const csvText = await response.text()
    console.log("✅ CSV檔案下載成功")
    console.log(`📄 檔案大小: ${csvText.length} 字元`)

    if (csvText.length === 0) {
      throw new Error("CSV檔案是空的")
    }

    // 顯示前幾行內容
    const previewLines = csvText.split("\n").slice(0, 3)
    console.log("\n📋 CSV檔案預覽:")
    previewLines.forEach((line, i) => {
      console.log(`第${i + 1}行: ${line.substring(0, 100)}${line.length > 100 ? "..." : ""}`)
    })

    // 解析CSV
    console.log("\n🔄 開始解析CSV資料...")
    const lines = csvText.split(/\r?\n/).filter((line) => line.trim())
    console.log(`📊 總行數: ${lines.length}`)

    // CSV解析函數
    function parseCSVLine(line) {
      const result = []
      let current = ""
      let inQuotes = false
      let i = 0

      while (i < line.length) {
        const char = line[i]
        if (char === '"') {
          if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
            current += '"'
            i += 2
          } else {
            inQuotes = !inQuotes
            i++
          }
        } else if (char === "," && !inQuotes) {
          result.push(current.trim())
          current = ""
          i++
        } else {
          current += char
          i++
        }
      }
      result.push(current.trim())
      return result
    }

    const winners = []
    let successCount = 0
    let skipCount = 0

    // 處理每一行（跳過標題行）
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) {
        skipCount++
        continue
      }

      const values = parseCSVLine(line)

      if (values.length >= 4) {
        const department = values[0]?.toString().trim() || ""
        const awardType = values[1]?.toString().trim() || ""
        const recipientName = values[2]?.toString().trim() || ""
        const achievements = values[3]?.toString().trim().replace(/\\n/g, "\n") || ""

        if (recipientName && department && awardType) {
          winners.push({
            id: successCount + 1,
            department,
            awardType,
            recipientName,
            achievements,
          })
          successCount++

          // 顯示前5位得獎者的詳細資訊
          if (successCount <= 5) {
            console.log(`\n👤 得獎者 ${successCount}:`)
            console.log(`   姓名: ${recipientName}`)
            console.log(`   部門: ${department}`)
            console.log(`   獎項: ${awardType}`)
            console.log(`   事蹟: ${achievements.substring(0, 50)}${achievements.length > 50 ? "..." : ""}`)
          }
        } else {
          skipCount++
        }
      } else {
        skipCount++
      }
    }

    console.log("\n" + "=".repeat(60))
    console.log("🎉 處理完成！")
    console.log("=".repeat(60))
    console.log(`✅ 成功處理: ${successCount} 位得獎者`)
    console.log(`⚠️  跳過記錄: ${skipCount} 筆`)
    console.log(`📈 成功率: ${((successCount / (successCount + skipCount)) * 100).toFixed(1)}%`)

    // 統計分析
    const awardStats = {}
    const deptStats = {}

    winners.forEach((winner) => {
      awardStats[winner.awardType] = (awardStats[winner.awardType] || 0) + 1
      deptStats[winner.department] = (deptStats[winner.department] || 0) + 1
    })

    console.log("\n🏆 獎項統計:")
    console.log("-".repeat(30))
    Object.entries(awardStats)
      .sort(([, a], [, b]) => b - a)
      .forEach(([award, count]) => {
        const percentage = ((count / winners.length) * 100).toFixed(1)
        console.log(`${award.padEnd(8)}: ${count.toString().padStart(3)} 位 (${percentage}%)`)
      })

    console.log("\n🏢 部門統計 (前10名):")
    console.log("-".repeat(40))
    Object.entries(deptStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .forEach(([dept, count]) => {
        const percentage = ((count / winners.length) * 100).toFixed(1)
        console.log(`${dept.padEnd(16)}: ${count.toString().padStart(2)} 位 (${percentage}%)`)
      })

    // 生成TypeScript代碼
    console.log("\n📝 生成TypeScript資料檔案...")

    const tsContent = `import type { AwardData } from "../types/award"

// 根據最新CSV檔案的完整獎項資料（按上台順序排列）
// 資料來源: 113得獎名單人數統計上台順序(磐石 優質 年資)
// 處理時間: ${new Date().toLocaleString("zh-TW")}
// 總得獎者: ${winners.length} 位

export const finalAwardData: AwardData = {
  title: "2025 林口康橋感恩迎新餐會",
  subtitle: "2025 KCISLK Appreciation & Welcome Banquet",
  winners: [
${winners
  .map(
    (winner) => `    {
      id: ${winner.id},
      department: "${winner.department}",
      awardType: "${winner.awardType}",
      recipientName: "${winner.recipientName}",
      achievements: \`${winner.achievements.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`,
    }`,
  )
  .join(",\n")}
  ],
}`

    console.log("✅ TypeScript檔案生成完成")
    console.log(`📄 檔案大小: ${tsContent.length} 字元`)

    console.log("\n" + "=".repeat(60))
    console.log("🎯 處理結果摘要")
    console.log("=".repeat(60))
    console.log(`📊 總得獎者數量: ${winners.length} 位`)
    console.log(`🏆 獎項類型數量: ${Object.keys(awardStats).length} 種`)
    console.log(`🏢 涉及部門數量: ${Object.keys(deptStats).length} 個`)
    console.log(
      `📝 平均事蹟長度: ${Math.round(winners.reduce((sum, w) => sum + w.achievements.length, 0) / winners.length)} 字`,
    )

    console.log("\n🚀 接下來請:")
    console.log("1. 複製上述統計結果給我")
    console.log("2. 我會根據結果更新系統資料")
    console.log("3. 然後您就可以看到完整的頒獎簡報了！")

    return { winners, tsContent, stats: { awardStats, deptStats } }
  } catch (error) {
    console.error("❌ 處理過程中發生錯誤:")
    console.error("錯誤訊息:", error.message)
    console.error("錯誤類型:", error.name)
    if (error.stack) {
      console.error("錯誤堆疊:", error.stack.split("\n").slice(0, 5).join("\n"))
    }
    return null
  }
}

// 🎬 執行主函數
console.log("🎯 開始執行獎項資料處理程序...")
console.log("⏰ 執行時間:", new Date().toLocaleString("zh-TW"))
console.log("")

processAndGenerateAwardData()
  .then((result) => {
    if (result) {
      console.log("\n🎉 所有處理完成！請將上述結果複製給我。")
    } else {
      console.log("\n❌ 處理失敗，請檢查錯誤訊息。")
    }
  })
  .catch((error) => {
    console.error("❌ 執行失敗:", error)
  })
