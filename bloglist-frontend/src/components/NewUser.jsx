import { useState } from 'react'
import userService from '../services/userInfo'
import blogService from '../services/blogs'
import commentService from '../services/comments'
import { useUserDispatch } from '../reducers/UserContent'
import { useNotificationDispatch } from '../reducers/NotificationContext'
import Notification from './Notification'
import { TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import loginService from '../services/login'

const NewUser = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [name, setName] = useState('')
  const dispatch = useNotificationDispatch()
  const userDipsatch = useUserDispatch()
  const navigate = useNavigate()


  const handleCreateUser = async event => {
    event.preventDefault()
    if (password !== confirmPass) {
      return dispatch({
        type: 'error',
        payload: 'Password does not match',
      })
    }
    try {
      const user = await userService.createNewUser({
        username,
        password,
        name
      })
      const loggedInUser = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(loggedInUser))
      blogService.setToken(user.token)
      commentService.setToken(user.token)
      userDipsatch({ type: 'user', payload: user })
      setUsername('')
      setPassword('')
      setName('')
      setConfirmPass('')
      dispatch({
        type: 'message',
        payload: `User: ${user.name} created`,
      })
      navigate('/')

    } catch (exception) {
      dispatch({
        type: 'error',
        payload: `${ exception }`,
      })
    }
  }

  return (
    <div className='login-div'>
      <form onSubmit={handleCreateUser}>
        <Notification />
        <h1>New User</h1>
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
            label='Name'
            value={name}
            onChange={({ target }) => setName(target.value)}
            name='Name'
            id='name'
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
        <br />
        <div>
          <TextField
            type='password'
            label='Confirm Password'
            value={confirmPass}
            onChange={({ target }) => setConfirmPass(target.value)}
            name='ConfirmPassword'
            id='confirmPass'
            inputProps={{ style: { fontSize: 20 } }}
            InputLabelProps={{ style: { fontSize: 20 } }}
          />
        </div>
        <Link to='/login'>
          <button type='button'>Cancel</button>
        </Link>
        <button type='submit' id='login-button'>
          Create
        </button>
      </form>
    </div>
  )
}

export default NewUser
