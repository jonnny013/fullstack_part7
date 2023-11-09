import React from 'react'
import logoPic from '../mainLogo.png'
import notificationReducer, { messages } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
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
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(messages('notification', 'User logged out'))
  }

  return (
    <div style={styles} className='headerDiv'>
      <img className='logo' src={logoPic} alt='logo' />
      <h1 className='blogTitle'>Blogs</h1>
      <p className='userInfo'>{user.name} is logged in.</p>
      <button id='logout-button' onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Header
