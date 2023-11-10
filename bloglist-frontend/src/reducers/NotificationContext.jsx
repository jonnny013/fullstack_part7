import { useReducer, createContext, useContext } from 'react'

const initialState = {
  message: '',
  style: '',
}

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'message':
    return (state = { message: `${action.payload}`, style: 'message' })
  case 'error':
    return (state = { message: `${action.payload}`, style: 'error' })
  case 'loading':
    return (state = { message: `${action.payload}`, style: 'loading' })
  case 'reset':
    return (state = { message: '', style: 'reset' })
  default:
    return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  )
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
