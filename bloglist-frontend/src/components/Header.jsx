import React from 'react'
import logoPic from '../mainLogo.png'
import { useNotificationDispatch } from '../reducers/NotificationContext'
import { useUserDispatch, useUserValue } from '../reducers/UserContent'

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

  return (
    <div style={styles} className='headerDiv'>
      <img className='logo'  src={logoPic} alt='logo' />
      <h1 className='blogTitle'>Blogs</h1>
      <p className='userInfo'>{user.name} is logged in.</p>
      <button id='logout-button' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Header