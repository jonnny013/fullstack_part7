import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const content = action.payload
      console.log(action.payload)
      state.push(content)
    },
    appendBlog(state,action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  },
})

export const { createBlog, appendBlog, setBlogs, } = blogSlice.actions


export default blogSlice.reducer
