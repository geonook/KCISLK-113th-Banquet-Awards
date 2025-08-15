import { NextRequest, NextResponse } from 'next/server'
import { uploadFile } from '@/lib/minio'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const winnerId = formData.get('winnerId') as string
    
    if (!file) {
      return NextResponse.json(
        { error: '沒有提供檔案' },
        { status: 400 }
      )
    }

    if (!winnerId) {
      return NextResponse.json(
        { error: '沒有提供得獎者 ID' },
        { status: 400 }
      )
    }

    // 檢查檔案類型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: '不支援的檔案格式，請上傳 JPG、PNG、GIF 或 WebP 格式' },
        { status: 400 }
      )
    }

    // 檢查檔案大小 (限制 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: '檔案大小超過限制 (10MB)' },
        { status: 400 }
      )
    }

    // 產生唯一檔名
    const fileExtension = file.name.split('.').pop()
    const uniqueFileName = `${uuidv4()}.${fileExtension}`
    
    // 轉換檔案為 Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // 上傳到 MinIO
    await uploadFile(uniqueFileName, buffer, file.type)

    // 回傳檔案資訊
    const fileUrl = `${process.env.MINIO_ENDPOINT}/${process.env.MINIO_BUCKET_NAME || 'award-photos'}/${uniqueFileName}`
    
    // 更新資料檔案
    try {
      console.log('準備更新資料檔案:', { winnerId: parseInt(winnerId), photoUrl: fileUrl })
      
      const updateResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3005'}/api/update-award`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          winnerId: parseInt(winnerId),
          photoUrl: fileUrl
        })
      })

      console.log('更新 API 回應狀態:', updateResponse.status)
      
      if (!updateResponse.ok) {
        const errorText = await updateResponse.text()
        console.error('更新資料檔案失敗:', errorText)
      } else {
        const result = await updateResponse.json()
        console.log('更新資料檔案成功:', result)
      }
    } catch (updateError) {
      console.error('更新資料檔案時發生錯誤:', updateError)
    }
    
    return NextResponse.json({
      success: true,
      fileName: uniqueFileName,
      originalName: file.name,
      url: fileUrl,
      size: file.size,
      type: file.type,
      winnerId: parseInt(winnerId)
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: '檔案上傳失敗，請稍後再試' },
      { status: 500 }
    )
  }
}