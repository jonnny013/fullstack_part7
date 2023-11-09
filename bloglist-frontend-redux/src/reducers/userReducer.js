import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const content = action.payload
      return state = content
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
