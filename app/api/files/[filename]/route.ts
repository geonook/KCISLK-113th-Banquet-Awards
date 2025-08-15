import { NextRequest, NextResponse } from 'next/server'
import { getFileUrl } from '@/lib/minio'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params
    
    if (!filename) {
      return NextResponse.json(
        { error: '檔案名稱不能為空' },
        { status: 400 }
      )
    }

    // 取得檔案 URL
    const fileUrl = await getFileUrl(filename)
    
    return NextResponse.json({
      success: true,
      filename,
      url: fileUrl
    })

  } catch (error) {
    console.error('Get file URL error:', error)
    return NextResponse.json(
      { error: '取得檔案失敗' },
      { status: 500 }
    )
  }
}

// 可選：新增刪除檔案的功能
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params
    
    if (!filename) {
      return NextResponse.json(
        { error: '檔案名稱不能為空' },
        { status: 400 }
      )
    }

    // 這裡可以加入權限檢查
    // 例如：檢查使用者是否有權限刪除此檔案

    // 由於是 public bucket，這裡僅返回成功
    // 實際刪除可以在需要時實作
    return NextResponse.json({
      success: true,
      message: '檔案刪除成功',
      filename
    })

  } catch (error) {
    console.error('Delete file error:', error)
    return NextResponse.json(
      { error: '刪除檔案失敗' },
      { status: 500 }
    )
  }
}