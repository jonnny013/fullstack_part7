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
import axios from 'axios'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const createBlogRef = useRef()
  const [errorMessage, setErrorMessage] = useState(null)
  const [styling, setStyling] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: blogService.getAll
  })
  console.log(JSON.parse(JSON.stringify(result)))

  const blogs = result.data

  const errormessagefunction = (message, style) => {
    setErrorMessage(message)
    if (style === 'green') {
      setStyling('style1')
    } else {
      setStyling('style2')
    }
    setTimeout(() => {
      setStyling(null)
      setErrorMessage(null)
    }, 5000)
  }

  if (!user) {
    return (
      <div className='login-div'>
        {errorMessage && <Notification message={errorMessage} styling={styling} />}
        <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} errormessagefunction={errormessagefunction} setUser={setUser}  />
      </div>
    )
  }



  return (
    <div>
      <Header errormessagefunction={errormessagefunction} setUser={setUser} user={user} />
      {errorMessage && (
        <Notification message={errorMessage} styling={styling} />
      )}
      <Togglable buttonLabel='Create New Blog' ref={createBlogRef}>
        <CreateBlog
          setBlogs={setBlogs}
          errormessagefunction={errormessagefunction}
          createBlogRef={createBlogRef}
        />
      </Togglable>
      {result.isLoading ? <div>Loading blogs...</div> : <Blogs
        blogs={blogs}
        user={user}
        setBlogs={setBlogs}
        errormessagefunction={errormessagefunction}
      />}
    </div>
  )
}

export default App