import React from 'react'
import logoPic from '../mainLogo.png'
import notificationReducer, {
  reset,
  notification,
} from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Header = props => {
  const dispatch = useDispatch()
  const styles = {
    backgroundColor: 'orange',
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  }

  const handleLogout = event => {
    event.preventDefault()
    props.setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(notification('User logged out'))
  }

  return (
    <div style={styles} className='headerDiv'>
      <img className='logo' src={logoPic} alt='logo' />
      <h1 className='blogTitle'>Blogs</h1>
      <p className='userInfo'>{props.user.name} is logged in.</p>
      <button id='logout-button' onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Header
