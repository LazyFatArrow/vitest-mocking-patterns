import axios from 'axios'
import { logError } from '../errors/errors.service'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const fetchUsersWithPolling = () => {
  const POLLING_INTERVAL = 10000 // 10 seconds
  let isPolling = true

  const fetchWithPolling = async () => {
    try {
      if (isPolling) {
        const users = (await axios.get(`${BASE_URL}/users`)).data

        // do something with users

        setTimeout(fetchWithPolling, POLLING_INTERVAL)
      }
    } catch (error) {
      logError(error)
    }
  }

  fetchWithPolling()

  return () => {
    isPolling = false
  }
}
