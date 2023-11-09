import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const content = action.payload
      state.push({
        title: content.title,
        author: content.author,
        url: content.url
      })
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
