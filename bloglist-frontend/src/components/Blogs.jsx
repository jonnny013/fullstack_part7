import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from './Blog'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import { useEffect, useRef } from 'react'
import { useBlogsDispatch } from '../reducers/BlogsContext'

export const Blogs = () => {
  const blogDispatch = useBlogsDispatch()
  const createBlogRef = useRef()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAllBlogs,
  })
  const blogs = result.data

  useEffect(() => {
    blogDispatch({ type: 'blogs', payload: blogs })
  }, [blogs])

  return (
    <>
      <Togglable buttonLabel='Create New Blog' ref={createBlogRef}>
        <CreateBlog createBlogRef={createBlogRef} />
      </Togglable>
      {result.isLoading ? (
        <div>Loading blogs...</div>
      ) : (
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => <Blog key={blog.id} blog={blog} />)
      )}
    </>
  )
}

export default Blogs