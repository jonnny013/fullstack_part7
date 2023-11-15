import React from 'react'
import logoPic from '../mainLogo.png'
import { useNotificationDispatch } from '../reducers/NotificationContext'
import { useUserDispatch, useUserValue } from '../reducers/UserContent'
import { Link } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import ContactPageIcon from '@mui/icons-material/ContactPage'
import BookIcon from '@mui/icons-material/Book'

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
      <Box>
        <BottomNavigation
          showLabels
          sx={{
            bgcolor: 'transparent',
            height: 70,
            width: '100%',
            margin: '20px',
            alignItems: 'center',
            '& .MuiBottomNavigationAction-root,  svg': {
              color: '#007A78',
              fontSize: 55,
              margin: 1,
            },
            '& .MuiBottomNavigationAction-label,': {
              fontSize: 20,
            },
            '@media (max-width: 600px)': {
              margin: '0',
            },
          }}
        >
          <BottomNavigationAction
            label='Blogs'
            icon={<BookIcon />}
            component={Link}
            to='/'
          />
          <BottomNavigationAction
            label='Users'
            icon={<ContactPageIcon />}
            component={Link}
            to='/users'
          />
          <BottomNavigationAction
            label='Logout'
            icon={<LogoutIcon />}
            onClick={handleLogout}
          />
        </BottomNavigation>
      </Box>
      <div>
        <p className='userInfo'>{user.name} is logged in.</p>
      </div>
    </div>
  )
}

export default Header
