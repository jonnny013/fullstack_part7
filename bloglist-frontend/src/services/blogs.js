import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAllBlogs = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(token)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async blog => {
  const updatedObject = {
    title: blog.title,
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    url: blog.url,
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, updatedObject)
  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default { getAllBlogs, setToken, create, addLike, deleteBlog }
