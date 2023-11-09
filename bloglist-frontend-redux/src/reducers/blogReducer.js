import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: []
  },
  reducers: {
    createBlog(state, action) {
      console.log(action.payload)
      const content = action.payload
      state.push({
        title: content.title,
        author: content.author,
        url: content.url
      })
    },
  },
})

export const { createBlog, } = blogSlice.actions


export default blogSlice.reducer
