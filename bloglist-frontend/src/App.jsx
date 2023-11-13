/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './app.css'
import Header from './components/Header'
import Login from './components/Login'
import { useUserDispatch, useUserValue } from './reducers/UserContent'
import checkTokenExpiration from './services/tokenCheck'
import UsersView from './components/UsersView'
import Footer from './components/Footer'

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

  checkTokenExpiration()

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
      <UsersView />
      <Footer />
    </div>
  )
}

export default App
