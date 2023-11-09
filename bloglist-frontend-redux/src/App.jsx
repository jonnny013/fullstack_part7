import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './app.css'
import Header from './components/Header'
import Login from './components/Login'

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

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

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

  const handleCreateBlog = async blogObject => {
    try {
      const response = await blogService.create(blogObject)
      blogService.getAll().then(blogs => setBlogs(blogs))
      createBlogRef.current.toggleVisibility()
      errormessagefunction(
        `New blog ${blogObject.title} by ${blogObject.author} added`,
        'green'
      )
    } catch (exception) {
      errormessagefunction(
        `Post unsuccesful: ${exception.response.data.error}`,
        'red'
      )
    }
  }

  const handleLike = async blog => {
    event.preventDefault()
    await blogService.addLike(blog)
    blogService.getAll().then(blogs => setBlogs(blogs))
    errormessagefunction('Blog liked!', 'green')
  }

  const handleDelete = async blog => {
    event.preventDefault()
    if (window.confirm(`Would you like to delete the blog: ${blog.title}?`)) {
      try {
        window.confirm
        await blogService.deleteBlog(blog)
        blogService.getAll().then(blogs => setBlogs(blogs))
        errormessagefunction('Blog deleted', 'green')
      } catch (exception) {
        errormessagefunction(
          `Unable to delete: ${exception.response.data.error}`,
          'red'
        )
      }
    }
  }

  if (!user) {
    return (
      <div className='login-div'>
        <Notification />
        <Login
          username={username}
          password={password}
          setUser={setUser}
          user={user}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Notification />
      <Togglable buttonLabel='Create New Blog' ref={createBlogRef}>
        <CreateBlog handleCreateBlog={handleCreateBlog} />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
