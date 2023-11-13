import { useReducer, createContext, useContext } from 'react'

const blogsReducer = (state, action) => {
  switch (action.type) {
  case 'blogs':
    return (state = action.payload)
  default:
    return state
  }
}

const BlogsContext = createContext()

export const BlogsContextProvider = props => {
  const [blogs, blogsDispatch] = useReducer(blogsReducer, null)
  return (
    <BlogsContext.Provider value={[blogs, blogsDispatch]}>
      {props.children}
    </BlogsContext.Provider>
  )
}

export const useBlogsValue = () => {
  const blogsAndDispatch = useContext(BlogsContext)
  return blogsAndDispatch[0]
}

export const useBlogsDispatch = () => {
  const blogsAndDispatch = useContext(BlogsContext)
  return blogsAndDispatch[1]
}

export default BlogsContext
