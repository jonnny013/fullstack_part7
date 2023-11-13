import { useQuery } from '@tanstack/react-query'
import React from 'react'
import userService from '../services/userInfo'

const UsersView = () => {
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  })
  const users = result.data
  console.log(users)
  const style = {
    backgroundColor: 'white'
  }
  return (
    <>
      {result.isLoading ? <div style={style}>Loading users...</div> : users.map(user => (
        <div style={style} key={user.id}>
          <p>{user.name}</p>
          <p>{user.blogs.length}</p>
        </div>
      )) }
    </>
  )
}

export default UsersView