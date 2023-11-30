import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNewUser =  async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

export default { getUsers, createNewUser }