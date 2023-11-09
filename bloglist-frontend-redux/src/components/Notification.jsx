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
  const style3 = {
    border: 0,
    backgroundColor: 'none'
  }

  const selection = (styling) => {
    if (styling === '') {
      return  style3
    } else if (styling === 'style1') {
      return style1
    } else if (styling === 'style2') {
      return style2
    }
  }
  return (
    <div style={selection(styling)} className='notificationMessage'>{message}</div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  styling: PropTypes.string.isRequired
}

export default Notification