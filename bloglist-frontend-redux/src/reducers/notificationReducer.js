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

export default notificationSlice.reducer
