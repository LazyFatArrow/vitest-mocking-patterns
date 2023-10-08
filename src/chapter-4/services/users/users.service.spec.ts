import { describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import { User, fetchUsers } from './users.service'

vi.mock('axios')

describe('Users Service', () => {
  const axiosMock = vi.mocked(axios, true)

  describe('fetchUsers', () => {
    it('fetches the users', async () => {
      const usersMock: User[] = [
        {
          id: '1',
          name: 'aymen',
        },
      ]

      axiosMock.get.mockResolvedValue({
        data: usersMock,
      })

      expect(await fetchUsers()).toEqual(usersMock)
    })
  })
})
