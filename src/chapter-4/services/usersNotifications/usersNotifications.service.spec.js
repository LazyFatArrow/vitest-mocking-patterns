import { describe, expect, test, vi } from 'vitest'
import { sendVipMemberNotifications } from './usersNotifications.service'
import { sendNotification } from '../notifications/notifications.service'

vi.mock('../notifications/notifications.service.js')

describe('UsersNotifications Service', () => {
  test('sends two notifications to vip users', () => {
    sendVipMemberNotifications()

    expect(sendNotification).toHaveBeenCalledWith(
      'Thank you for being a VIP member!',
    )

    expect(sendNotification.mock.calls).toEqual([
      ['Thank you for being a VIP member!'], // first call
      ['You have a 10% discount on your next purchase.'], // second call
    ])

    // Alternative approach for assertion
    // expect(sendNotification).toHaveBeenNthCalledWith(
    //   1,
    //   'Thank you for being a VIP member!',
    // )
    // expect(sendNotification).toHaveBeenNthCalledWith(
    //   2,
    //   'You have a 10% discount on your next purchase.',
    // )
  })
})
