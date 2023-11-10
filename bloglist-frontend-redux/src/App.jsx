/* eslint-disable react-hooks/exhaustive-deps */
import {  useEffect, useRef } from 'react'
import blogService from './services/blogs'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './app.css'
import Header from './components/Header'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from './reducers/blogReducer'
import Blogs from './components/Blog'
import { setUser } from './reducers/userReducer'

const App = () => {
  const createBlogRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch(setBlogs(blogs)))
  }, [])
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
      <Blogs />
    </div>
  )
}

export default App
