/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blog'
import blogService from './services/blogs'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './app.css'
import Header from './components/Header'
import Login from './components/Login'
import { useQuery } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { useUserDispatch, useUserValue } from './reducers/UserContent'

const App = () => {
  const dipsatch = useUserDispatch()
  const user = useUserValue()
  const createBlogRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dipsatch({ type: 'user', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  const checkTokenExpiration = () => {
    if (localStorage.getItem('loggedBloglistUser')) {
      const token =
        JSON.parse(localStorage.getItem('loggedBloglistUser')) &&
        JSON.parse(localStorage.getItem('loggedBloglistUser'))['token']
      if (jwtDecode(token).exp < Date.now() / 1000) {
        localStorage.clear()
      }
    }
  }
  checkTokenExpiration()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  const blogs = result.data

  if (!user) {
    return (
      <div className='login-div'>
        <Notification />
        <Login />
      </div>
    )
  }

  return (
    <div>
      <Header />

      <Notification />
      <Togglable buttonLabel='Create New Blog' ref={createBlogRef}>
        <CreateBlog createBlogRef={createBlogRef} />
      </Togglable>
      {result.isLoading ? (
        <div>Loading blogs...</div>
      ) : (
        <Blogs blogs={blogs} />
      )}
    </div>
  )
}

export default App
