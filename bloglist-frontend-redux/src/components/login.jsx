import { useDispatch } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import { notification, error, reset } from '../reducers/notificationReducer'

const Login = ({username, password, setUser, user, setUsername, setPassword}) => {
  const dispatch = useDispatch()
  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(notification(`Welcome ${user.name}`, 'green'))
      setTimeout(() => {
        dispatch(reset)
      }, 5000)
    } catch (exception) {
      dispatch(error('Wrong username or password'))
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
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <p className='login-paragraph'>Password</p>
        <input
          type='password'
          id='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
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
