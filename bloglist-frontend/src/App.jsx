/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useUserDispatch, useUserValue } from './reducers/UserContent'
import { Container } from '@mui/material'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom'
import './app.css'
import checkTokenExpiration from './services/tokenCheck'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import commentService from './services/comments'
import Notification from './components/Notification'
import SingleUserView from './components/SingleUserView'
import Header from './components/Header'
import Login from './components/Login'
import UsersView from './components/UsersView'
import Footer from './components/Footer'
import Blog from './components/Blog'
import { useBlogsDispatch } from './reducers/BlogsContext'
import NewUser from './components/NewUser'

const App = () => {
  const dipsatch = useUserDispatch()
  const user = useUserValue()
  const blogDispatch = useBlogsDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dipsatch({ type: 'user', payload: user })
      blogService.setToken(user.token)
      commentService.setToken(user.token)
    }
  }, [])

  checkTokenExpiration()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAllBlogs,
  })
  const blogs = result.data

  useEffect(() => {
    blogDispatch({ type: 'blogs', payload: blogs })
  }, [blogs])

  return (
    <Router>
      <Container>
        {user && (
          <>
            <Header />
            <Notification />
          </>
        )}
        <Routes>
          {!user ? (
            <>
              <Route path='/' element={<Login />} />
              <Route path='/newuser' element={<NewUser />} />
              <Route path='/login' element={<Login />} />
            </>
          ) : (
            <>
              <Route path='/' element={<Blogs />} />
              <Route path='/users' element={<UsersView />} />
              <Route path='/users/:id' element={<SingleUserView />} />
              <Route path='/blogs/:id' element={<Blog />} />
              <Route path='/login' element={<Login loggedIn={user} />} />
              <Route path='/newuser' element={<NewUser loggedIn={user} />} />
            </>
          )}
        </Routes>
        <Footer />
      </Container>
    </Router>
  )
}

export default App
