import React from 'react'
import logoPic from '../mainLogo.png'

const Header = (props) => {
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
      <p className='userInfo'>{props.user.name} is logged in.</p>
      <button id='logout-button' onClick={props.handleLogout}>Logout</button>
    </div>
  )
}

export default Header