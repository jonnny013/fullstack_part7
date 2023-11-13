/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useUserDispatch, useUserValue } from './reducers/UserContent'
import { Container } from '@mui/material'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
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

const App = () => {
  const dipsatch = useUserDispatch()
  const user = useUserValue()

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

  if (!user) {
    return (
      <div className='login-div'>
        <Login />
      </div>
    )
  }

  return (
    <Router>
      <Container>
        <Header />
        <Notification />
        <Routes>
          <Route path='/' element={<Blogs />} />
          <Route path='/users' element={<UsersView />} />
          <Route path='/users/:id' element={<SingleUserView  />}/>
          <Route path='/login' element={<Login />} />
          <Route path='/blogs/:id' element={<Blog />} />
        </Routes>



        <Footer />
      </Container>
    </Router>
  )
}

export default App
