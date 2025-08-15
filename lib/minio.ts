import { Client } from 'minio'

// 為 Zeabur MinIO 優化的配置
const minioClient = new Client({
  endPoint: 'minio-hic.zeabur.app',
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY || '',
  secretKey: process.env.MINIO_SECRET_KEY || '',
  region: 'us-east-1',
  pathStyle: true,
})

export const bucketName = process.env.MINIO_BUCKET_NAME || 'award-photos'

export async function ensureBucketExists() {
  try {
    const exists = await minioClient.bucketExists(bucketName)
    if (!exists) {
      await minioClient.makeBucket(bucketName, process.env.MINIO_REGION || 'us-east-1')
      console.log(`Bucket ${bucketName} created successfully`)
      
      // 設定 bucket policy 為 public read
      const publicPolicy = {
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${bucketName}/*`]
          }
        ]
      }
      
      await minioClient.setBucketPolicy(bucketName, JSON.stringify(publicPolicy))
      console.log(`Bucket ${bucketName} policy set to public read`)
    }
  } catch (error) {
    console.error('Error ensuring bucket exists:', error)
    throw error
  }
}

export async function uploadFile(fileName: string, fileBuffer: Buffer, contentType: string) {
  try {
    await ensureBucketExists()
    
    const uploadResult = await minioClient.putObject(
      bucketName,
      fileName,
      fileBuffer,
      fileBuffer.length,
      {
        'Content-Type': contentType,
      }
    )
    
    return uploadResult
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

export async function getFileUrl(fileName: string): Promise<string> {
  try {
    // 返回公開可存取的 URL
    return `${process.env.MINIO_ENDPOINT}/${bucketName}/${fileName}`
  } catch (error) {
    console.error('Error getting file URL:', error)
    throw error
  }
}

export async function deleteFile(fileName: string) {
  try {
    await minioClient.removeObject(bucketName, fileName)
    return true
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

export default minioClient