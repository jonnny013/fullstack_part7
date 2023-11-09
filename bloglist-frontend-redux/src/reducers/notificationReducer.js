import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    style: '',
  },
  reducers: {
    notification(state, action) {
      console.log(action.payload)
      state.message = action.payload
      state.style = 'style1'
    },
    error(state, action) {
      console.log(action.payload)
      state.message = action.payload
      state.style = 'style2'
    },
    reset(state) {
      state.message = ''
      state.style = ''
    }
  },
})

export const { notification, error, reset } = notificationSlice.actions

export const messages = (type, content) => {
  return dispatch => {
    type === 'error' ? dispatch(error(content)) : dispatch(notification(content))
    setTimeout(() => {dispatch(reset())}, 5000)
  }
}

export default notificationSlice.reducer
