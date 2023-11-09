import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { messages } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const Login = () => {
  const dispatch = useDispatch()
  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value,
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      event.target.username.value = ''
      event.target.password.value = ''
      dispatch(messages('notification', `Welcome ${user.name}`))
    } catch (exception) {
      dispatch(messages('error', 'Wrong username or password'))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Log In</h1>
      <div>
        <p className='login-paragraph'>Username</p>
        <input
          type='text'
          id='username'
          name='Username'
        />
      </div>
      <div>
        <p className='login-paragraph'>Password</p>
        <input
          type='password'
          id='password'
          name='Password'
        />
      </div>
      <button type='submit' id='login-button'>
        Login
      </button>
      <p>temp login username: test password: test</p>
    </form>
  )
}

export default Login
