import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const { winnerId, photoUrl } = await request.json()
    
    console.log('收到更新請求:', { winnerId, photoUrl })
    
    if (!winnerId || !photoUrl) {
      console.log('參數錯誤:', { winnerId, photoUrl })
      return NextResponse.json(
        { error: '缺少必要參數' },
        { status: 400 }
      )
    }

    // 讀取現有的資料檔案
    const filePath = path.join(process.cwd(), 'data', 'final-awards.ts')
    console.log('檔案路徑:', filePath)
    
    const fileContent = await fs.readFile(filePath, 'utf-8')
    console.log('原始檔案大小:', fileContent.length, '字元')
    
    // 解析並更新資料
    // 找到對應的得獎者並添加 photoUrl
    const updatedContent = updateWinnerPhoto(fileContent, winnerId, photoUrl)
    console.log('更新後檔案大小:', updatedContent.length, '字元')
    console.log('檔案是否有變化:', fileContent !== updatedContent)
    
    // 寫回檔案
    await fs.writeFile(filePath, updatedContent, 'utf-8')
    console.log('檔案寫入完成')
    
    return NextResponse.json({
      success: true,
      message: '資料檔案更新成功'
    })

  } catch (error) {
    console.error('Update award data error:', error)
    return NextResponse.json(
      { error: '更新資料檔案失敗' },
      { status: 500 }
    )
  }
}

function updateWinnerPhoto(fileContent: string, winnerId: number, photoUrl: string): string {
  console.log('開始更新得獎者照片:', { winnerId, photoUrl })
  
  // 使用更簡單但精確的方法 - 逐行處理
  const lines = fileContent.split('\n')
  let inTargetObject = false
  let braceCount = 0
  let objectStartIndex = -1
  let updated = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // 找到目標 ID
    if (line.includes(`id: ${winnerId}`)) {
      console.log('找到目標得獎者:', line.trim())
      inTargetObject = true
      objectStartIndex = i
      // 往回找到物件開始的 {
      for (let j = i; j >= 0; j--) {
        if (lines[j].includes('{')) {
          objectStartIndex = j
          break
        }
      }
      continue
    }
    
    // 如果在目標物件中
    if (inTargetObject) {
      // 計算大括號數量來確定物件結束
      const openBraces = (line.match(/\{/g) || []).length
      const closeBraces = (line.match(/\}/g) || []).length
      braceCount += openBraces - closeBraces
      
      // 檢查是否已經有 photoUrl
      if (line.includes('photoUrl:')) {
        console.log('更新現有的 photoUrl')
        lines[i] = line.replace(/photoUrl:\s*"[^"]*"/, `photoUrl: "${photoUrl}"`)
        updated = true
        break
      }
      
      // 物件結束，添加 photoUrl
      if (braceCount <= 0) {
        console.log('在物件結束前添加 photoUrl')
        // 在當前行之前插入 photoUrl
        const indent = line.match(/^(\s*)/)?.[1] || '      '
        lines.splice(i, 0, `${indent}photoUrl: "${photoUrl}",`)
        updated = true
        break
      }
    }
  }
  
  console.log('檔案更新結果:', updated ? '成功' : '失敗 - 找不到目標得獎者')
  return lines.join('\n')
}