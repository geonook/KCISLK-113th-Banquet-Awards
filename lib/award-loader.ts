import type { AwardData, Winner } from "../types/award"

// 分批載入獎項資料以優化記憶體使用
class AwardLoader {
  private static instance: AwardLoader
  private loadedData: AwardData | null = null
  private batchSize = 10

  static getInstance(): AwardLoader {
    if (!AwardLoader.instance) {
      AwardLoader.instance = new AwardLoader()
    }
    return AwardLoader.instance
  }

  // 懶載入完整資料
  async loadAwardData(): Promise<AwardData> {
    if (this.loadedData) {
      return this.loadedData
    }

    // 動態導入資料以減少初始bundle大小
    const { finalAwardData } = await import('../data/final-awards')
    this.loadedData = finalAwardData
    return this.loadedData
  }

  // 分批載入獲獎者資料
  async loadWinnersBatch(startIndex: number, endIndex?: number): Promise<Winner[]> {
    const data = await this.loadAwardData()
    const end = endIndex || Math.min(startIndex + this.batchSize, data.winners.length)
    return data.winners.slice(startIndex, end)
  }

  // 取得特定獲獎者
  async getWinner(id: number): Promise<Winner | undefined> {
    const data = await this.loadAwardData()
    return data.winners.find(winner => winner.id === id)
  }

  // 取得總數
  async getTotalWinners(): Promise<number> {
    const data = await this.loadAwardData()
    return data.winners.length
  }

  // 按獎項類型過濾
  async getWinnersByAwardType(awardType: string): Promise<Winner[]> {
    const data = await this.loadAwardData()
    return data.winners.filter(winner => winner.awardType === awardType)
  }

  // 清理記憶體
  clearCache(): void {
    this.loadedData = null
  }
}

export const awardLoader = AwardLoader.getInstance()