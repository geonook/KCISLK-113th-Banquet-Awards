export interface AwardWinner {
  id: number
  department: string
  awardType: string
  recipientName: string
  achievements: string
  photoUrl?: string
}

export interface AwardData {
  title: string
  subtitle: string
  winners: AwardWinner[]
}
