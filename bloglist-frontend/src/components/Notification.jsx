import React, { useEffect } from 'react'
import { useNotificationDispatch, useNotificationValue } from '../reducers/NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()
  const dispatch = useNotificationDispatch()
  const style1 = {
    border: '2px solid green',
    backgroundColor: 'lightgray',
    color: 'green',
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
    height: 25,
    overflow: 'scroll',
  }

  const style2 = {
    border: '2px solid red',
    backgroundColor: 'lightgray',
    color: 'red',
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
    height: 25,
    overflow: 'scroll',
  }

  const style3 = {
    border: '2px solid blue',
    backgroundColor: 'lightgray',
    color: 'blue',
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
    height: 25,
    overflow: 'scroll',
  }
  const style4 = {
    color: 'blue',
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
    height: 29,
    overflow: 'scroll',
  }
  useEffect(() => {
    if (notification.message !== '') {
      const timeOut = setTimeout(() => {
        dispatch({
          type: 'reset',
        })
      }, 10000)
      return () => clearTimeout(timeOut)
    }
  }, [notification.message, dispatch])


  const selection = () => {
    if (notification.style === 'loading') {
      return style3
    } else if (notification.style === 'message') {
      return style1
    } else if (notification.style === 'error') {
      return style2
    } else {
      return style4
    }
  }
  return (
    <div style={selection()} className='notificationMessage'>{notification.message}</div>
  )
}

Notification.propTypes = {

}

export default Notification