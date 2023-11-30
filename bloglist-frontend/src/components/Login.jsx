import blogService from '../services/blogs'
import loginService from '../services/login'
import { useNotificationDispatch } from '../reducers/NotificationContext'
import { useUserDispatch } from '../reducers/UserContent'
import { useState } from 'react'
import Notification from './Notification'
import { TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import NewUser from './NewUser'

const Login = ({ loggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useNotificationDispatch()
  const userDipsatch = useUserDispatch()
  const navigate = useNavigate()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDipsatch({ type: 'user', payload: user })
      setUsername('')
      setPassword('')
      dispatch({
        type: 'message',
        payload: `Welcome ${user.name}`,
      })
      navigate('/')
    } catch (exception) {
      dispatch({
        type: 'error',
        payload: 'Wrong username or password',
      })
    }
  }

  return (
    <div className='login-div'>
      <form onSubmit={handleLogin}>
        <Notification />
        <h1>Log In</h1>
        <div>
          <TextField
            label='Username'
            id='outlined-basic'
            variant='outlined'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
            inputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </div>
        <br />
        <div>
          <TextField
            type='password'
            label='Password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            name='Password'
            id='password'
            inputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </div>
        <Link to='/newuser' element={<NewUser />}>
          <button>New User</button>
        </Link>
        <button type='submit' id='login-button'>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
