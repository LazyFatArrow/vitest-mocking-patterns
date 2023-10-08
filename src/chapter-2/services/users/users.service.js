import axios from 'axios'
import { logError } from '../errors/errors.service'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export const fetchUsers = async () => {
  try {
    return (await axios.get(`${BASE_URL}/users`)).data
  } catch (error) {
    logError(error)
    throw error
  }
}
