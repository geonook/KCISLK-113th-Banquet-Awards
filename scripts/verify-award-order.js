// 驗證得獎者順序是否正確
function verifyAwardOrder() {
  console.log("🔍 開始驗證得獎者順序...")
  console.log("=" * 60)

  // 您提供的正確順序
  const correctOrder = [
    "俞聖陶",
    "羅幸基",
    "游承恩",
    "葉郁庭",
    "江志軒",
    "林志龍",
    "Mitchell David James",
    "黃于庭",
    "Harold Keys",
    "郭育誠",
    "邱振男",
    "張雅涵",
    "廖婉柔",
    "何愛玲",
    "陳襄琦",
    "Jonathan Perry",
    "林怡岑",
    "沈秀君",
    "謝岱芬",
    "杜海寧",
    "張克銘",
    "哈尚傑",
    "江芝羽",
    "Shamovtseva Victoria",
    "邱雅詩",
    "李雅琦",
    "Carole Godfrey",
    "姜孟妤 Meg Chiang",
    "張沛寧",
    "錢世亮",
    "Shalymar Evangelista",
    "Mario Aguilar",
    "李思潔",
    "鄭楷晉",
    "陳玟卉",
    "陳郁夫",
    "黃韻靜",
    "許友欽",
    "李文歆 Peko Lee",
    "黃俐璇 Scarlett Huang",
    "李銘仁",
    "葉子萃",
    "吳亭頡",
    "Cecile de Vera",
    "Robert Kovacevic",
    "薛靚潔",
    "李雋之",
    "李孟紋",
    "Hedges Justin Holmes",
    "周俊逸",
  ]

  // 系統中的實際順序（從 final-awards.ts）
  const actualOrder = [
    "俞聖陶", // 1
    "羅幸基", // 2
    "游承恩", // 3
    "葉郁庭", // 4
    "江志軒", // 5
    "林志龍", // 6
    "Mitchell David James", // 7
    "黃于庭", // 8
    "Harold Keys", // 9
    "郭育誠", // 10
    "邱振男", // 11
    "張雅涵", // 12
    "廖婉柔", // 13
    "何愛玲", // 14
    "陳襄琦", // 15
    "Jonathan Perry", // 16
    "林怡岑", // 17
    "沈秀君", // 18
    "謝岱芬", // 19
    "杜海寧", // 20
    "張克銘", // 21
    "哈尚傑", // 22
    "江芝羽", // 23
    "Shamovtseva Victoria", // 24
    "邱雅詩", // 25
    "李雅琦", // 26
    "Carole Godfrey", // 27
    "姜孟妤 Meg Chiang", // 28
    "張沛寧", // 29
    "錢世亮", // 30
    "Shalymar Evangelista", // 31
    "Mario Aguilar", // 32
    "李思潔", // 33
    "鄭楷晉", // 34
    "陳玟卉", // 35
    "陳郁夫", // 36
    "黃韻靜", // 37
    "許友欽", // 38
    "李文歆 Peko Lee", // 39
    "黃俐璇 Scarlett Huang", // 40
    "李銘仁", // 41
    "葉子萃", // 42
    "吳亭頡", // 43
    "Cecile de Vera", // 44
    "Robert Kovacevic", // 45
    "薛靚潔", // 46
    "李雋之", // 47
    "李孟紋", // 48
    "Hedges Justin Holmes", // 49
    "周俊逸", // 50
  ]

  console.log("📊 順序驗證結果:")
  console.log("-" * 80)
  console.log("序號 | 正確順序              | 系統順序              | 狀態")
  console.log("-" * 80)

  let correctCount = 0
  const errors = []

  for (let i = 0; i < Math.max(correctOrder.length, actualOrder.length); i++) {
    const correct = correctOrder[i] || "缺少"
    const actual = actualOrder[i] || "缺少"
    const isMatch = correct === actual
    const status = isMatch ? "✅" : "❌"

    if (isMatch) {
      correctCount++
    } else {
      errors.push({
        position: i + 1,
        expected: correct,
        actual: actual,
      })
    }

    const paddedIndex = (i + 1).toString().padStart(3, " ")
    const paddedCorrect = correct.padEnd(20, "　")
    const paddedActual = actual.padEnd(20, "　")

    console.log(`${paddedIndex} | ${paddedCorrect} | ${paddedActual} | ${status}`)
  }

  console.log("-" * 80)
  console.log(`✅ 正確: ${correctCount}/${correctOrder.length}`)
  console.log(`❌ 錯誤: ${errors.length}`)
  console.log(`📈 準確率: ${((correctCount / correctOrder.length) * 100).toFixed(1)}%`)

  if (errors.length > 0) {
    console.log("\n❌ 發現的錯誤:")
    console.log("-" * 50)
    errors.forEach((error) => {
      console.log(`位置 ${error.position}:`)
      console.log(`  期望: ${error.expected}`)
      console.log(`  實際: ${error.actual}`)
      console.log("")
    })
  } else {
    console.log("\n🎉 所有得獎者順序完全正確！")
  }

  // 額外檢查：是否有重複或遺漏
  console.log("\n🔍 重複和遺漏檢查:")
  console.log("-" * 40)

  const correctSet = new Set(correctOrder)
  const actualSet = new Set(actualOrder)

  const missing = correctOrder.filter((name) => !actualSet.has(name))
  const extra = actualOrder.filter((name) => !correctSet.has(name))

  if (missing.length > 0) {
    console.log("❌ 遺漏的得獎者:")
    missing.forEach((name) => console.log(`  - ${name}`))
  }

  if (extra.length > 0) {
    console.log("❌ 多出的得獎者:")
    extra.forEach((name) => console.log(`  - ${name}`))
  }

  if (missing.length === 0 && extra.length === 0) {
    console.log("✅ 沒有遺漏或多出的得獎者")
  }

  // 獎項類型統計
  console.log("\n📊 獎項類型統計:")
  console.log("-" * 30)

  // 根據位置判斷獎項類型
  const serviceAwards = actualOrder.slice(0, 7) // 前7位是年資獎
  const rockAwards = actualOrder.slice(7, 13) // 第8-13位是磐石獎
  const excellenceAwards = actualOrder.slice(13) // 第14位之後是優質獎

  console.log(`🏅 年資獎: ${serviceAwards.length} 位`)
  console.log(`💎 磐石獎: ${rockAwards.length} 位`)
  console.log(`🌟 優質獎: ${excellenceAwards.length} 位`)
  console.log(`📋 總計: ${actualOrder.length} 位`)

  console.log("\n" + "=" * 60)
  console.log("🎯 驗證完成！")

  return {
    isCorrect: errors.length === 0,
    correctCount,
    totalCount: correctOrder.length,
    errors,
    missing,
    extra,
  }
}

// 執行驗證
const result = verifyAwardOrder()

if (result.isCorrect) {
  console.log("\n🎊 恭喜！所有得獎者順序完全正確！")
} else {
  console.log(`\n⚠️  發現 ${result.errors.length} 個順序錯誤，需要修正。`)
}
