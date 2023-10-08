import { describe, test, vi, expect, beforeEach } from 'vitest'
import { fetchUsers } from './users.service'
import { logError } from '../errors/errors.service'
import axios from 'axios'

vi.mock('axios')
vi.mock('../errors/errors.service')

describe('Users Service', () => {
  const usersMock = [{ id: 1 }, { id: 2 }]

  beforeEach(() => {
    axios.get.mockClear()
    logError.mockClear()
  })

  describe('fetchUsers', () => {
    test('makes a GET request to fetch users', async () => {
      axios.get.mockResolvedValue({
        data: usersMock,
      })

      const users = await fetchUsers()

      expect(axios.get).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users',
      )
      expect(users).toEqual(usersMock)
    })

    test('calls logError with the error and throws it when request fails', async () => {
      const error = new Error('request failed')

      axios.get.mockRejectedValue(error)

      expect(fetchUsers()).rejects.toThrow(error)
      await new Promise(process.nextTick)
      expect(logError).toHaveBeenCalledWith(error)
    })
  })
})
