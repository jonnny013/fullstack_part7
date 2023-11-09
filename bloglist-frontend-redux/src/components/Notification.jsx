import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notifications.message)
  const styling = useSelector(state => state.notifications.style)
  console.log('notif', message, 'style', styling)
  const style1 = {
    border: '2px solid green',
    backgroundColor: 'lightgray',
    color: 'green',
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center'
  }

  const style2 = {
    border: '2px solid red',
    backgroundColor: 'lightgray',
    color: 'red',
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center'
  }

  const selection = styling === 'style1' ? style1 : style2
  return (
    <div style={selection} className='notificationMessage'>{message}</div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  styling: PropTypes.string.isRequired
}

export default Notification