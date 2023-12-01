export type NotificationState = {
  initialized: boolean
  notifications: Notification[]
}

export interface Notification {
  timestamp: number
  title?: string
  hash: string
  status: "pending"|"confirmed"|"rejected"
}
