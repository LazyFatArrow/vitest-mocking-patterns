import { sendNotification } from '../notifications/notifications.service'

export const sendVipMemberNotifications = (user) => {
  sendNotification('Thank you for being a VIP member!')
  sendNotification('You have a 10% discount on your next purchase.')
}
