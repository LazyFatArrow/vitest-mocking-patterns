import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export type User = {
  id: string
  name: string
}

export const fetchUsers = async (): Promise<User[]> => {
  try {
    return (await axios.get<User[]>(`${BASE_URL}/users`)).data
  } catch (error) {
    throw error
  }
}
