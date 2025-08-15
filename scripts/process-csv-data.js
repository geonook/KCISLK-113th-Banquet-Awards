// Fetch and process the CSV data
async function processCsvData() {
  try {
    console.log("Fetching complete CSV data...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E9%A0%92%E7%8D%8E%E5%90%8D%E5%96%AE-YGSBWRnxdA9qYlY1HF951qSfbIIKbG.csv",
    )
    const csvText = await response.text()

    console.log("Raw CSV data (first 1000 chars):")
    console.log(csvText.substring(0, 1000))

    // Parse CSV manually to handle Chinese headers and maintain order
    const lines = csvText.split("\n").filter((line) => line.trim())
    console.log(`Total lines found: ${lines.length}`)

    const winners = []

    // Process each line starting from line 1 (skip header)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      // Better CSV parsing to handle quoted fields with commas
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

      if (values.length >= 4) {
        const winner = {
          id: i,
          department: values[0] || "",
          awardType: values[1] || "",
          recipientName: values[2] || "",
          achievements: values[3] ? values[3].replace(/\\n/g, "\n") : "",
        }

        winners.push(winner)
        console.log(`Winner ${i}: ${winner.recipientName} - ${winner.department} - ${winner.awardType}`)
      }
    }

    console.log(`\nTotal winners processed: ${winners.length}`)

    // Show award type distribution
    const awardCounts = {}
    winners.forEach((winner) => {
      awardCounts[winner.awardType] = (awardCounts[winner.awardType] || 0) + 1
    })

    console.log("\nAward distribution:")
    Object.entries(awardCounts).forEach(([type, count]) => {
      console.log(`${type}: ${count} winners`)
    })

    // Show department distribution
    const deptCounts = {}
    winners.forEach((winner) => {
      deptCounts[winner.department] = (deptCounts[winner.department] || 0) + 1
    })

    console.log("\nDepartment distribution:")
    Object.entries(deptCounts).forEach(([dept, count]) => {
      console.log(`${dept}: ${count} winners`)
    })

    return winners
  } catch (error) {
    console.error("Error processing CSV:", error)
    return []
  }
}

// Execute the function
processCsvData()
