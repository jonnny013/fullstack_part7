import React from 'react'
import { useAllUsersValue } from '../reducers/AllUsersContext'
import { useLocation } from 'react-router-dom'

const SingleUserView = () => {
  const allUsers = useAllUsersValue()
  const location = useLocation()
  const user = location.state.user

  if (!user) {
    return <p style={{ color: 'white' }}>Currently unavailable</p>
  }
  return (
    <div style={{ color: 'white', fontSize: 20 }}>
      <h1>{user.name}</h1>
      <p>Added blogs:</p>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default SingleUserView