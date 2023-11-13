import React from 'react'
import logoPic from '../mainLogo.png'
import { useNotificationDispatch } from '../reducers/NotificationContext'
import { useUserDispatch, useUserValue } from '../reducers/UserContent'
import { Link } from 'react-router-dom'

const Header = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch()
  const dispatch = useNotificationDispatch()
  const handleLogout = event => {
    event.preventDefault()
    userDispatch({ type: 'user', payload: null })
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch({
      type: 'message',
      payload: 'User logged out',
    })
  }

  const styles = {
    backgroundColor: 'orange',
    display: 'flex',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  }
  const logoStyle = {
    width: 100,
    height: 'auto',
  }

  return (
    <div style={styles} className='headerDiv'>
      <div>
        <img style={logoStyle} className='logo' src={logoPic} alt='logo' />
        <h1 className='blogTitle'>Blogs</h1>
      </div>
      <Link to='/'>Blogs</Link>
      <Link to='/users'>Users</Link>

      <div>
        <p className='userInfo'>{user.name} is logged in.</p>
        <button id='logout-button' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Header