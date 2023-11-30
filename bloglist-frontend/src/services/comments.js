import axios from 'axios'
const baseUrl = '/api/comments'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllComments = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postComment = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(token)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


const deleteComment = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default { getAllComments, setToken, postComment, deleteComment }
