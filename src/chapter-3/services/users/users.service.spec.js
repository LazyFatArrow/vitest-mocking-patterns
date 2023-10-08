import {
  describe,
  test,
  vi,
  expect,
  beforeEach,
  beforeAll,
  afterAll,
} from 'vitest'
import { fetchUsersWithPolling } from './users.service'
import { logError } from '../errors/errors.service'
import axios from 'axios'

vi.mock('axios')
vi.mock('../errors/errors.service')

describe('Users Service', () => {
  describe('fetchUsersWithPolling', () => {
    beforeEach(() => {
      axios.get.mockResolvedValue({
        data: [{ id: 1 }],
      })

      axios.get.mockClear()
      logError.mockClear()
    })

    beforeAll(() => {
      vi.useFakeTimers()
    })

    afterAll(() => {
      vi.useRealTimers()
    })

    test('polls users every 10 seconds', async () => {
      const stopPolling = fetchUsersWithPolling()

      // await for axios.get to resolve, so that we reach the `setTimeout` expression.
      await new Promise(process.nextTick)

      // Check that axios.get has been called once initially.
      expect(axios.get).toHaveBeenCalledTimes(1)

      // Fast-forward 9 seconds. axios.get should not have been called again yet.
      vi.advanceTimersByTime(9000)
      expect(axios.get).toHaveBeenCalledTimes(1)

      // Fast-forward 1 more second (total 10 seconds). fetchUsers is now called a second time.
      vi.advanceTimersByTime(2000)
      expect(axios.get).toHaveBeenCalledTimes(2)

      stopPolling() // stop polling
    })

    test('stops polling when calling the returned stop function', async () => {
      const stopPolling = fetchUsersWithPolling()

      await new Promise(process.nextTick)

      expect(axios.get).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(9000)

      expect(axios.get).toHaveBeenCalledTimes(1)

      stopPolling()

      vi.advanceTimersByTime(1000)
      expect(axios.get).toHaveBeenCalledTimes(1)
    })

    test('stops polling when an error occurs and calls logError', async () => {
      const error = new Error('example error')
      fetchUsersWithPolling()

      await new Promise(process.nextTick)

      expect(axios.get).toHaveBeenCalledTimes(1)

      axios.get.mockRejectedValueOnce(error)

      vi.advanceTimersByTime(10000)

      expect(axios.get).toHaveBeenCalledTimes(2)

      await new Promise(process.nextTick)

      expect(logError).toHaveBeenCalledWith(error)

      vi.advanceTimersByTime(10000)

      expect(axios.get).toHaveBeenCalledTimes(2)
    })
  })
})
