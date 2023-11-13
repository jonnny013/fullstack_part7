import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from './Blog'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import { useEffect, useRef } from 'react'
import { useBlogsDispatch } from '../reducers/BlogsContext'
import { Link } from 'react-router-dom'

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

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: 'rgb(155, 195, 217)',
  }

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
          .map(blog => (
            <Link
              key={blog.id}
              to={`/blogs/${blog.id}`}
              element={<Blog />}
              state={{ blog }}
            >
              <div style={blogStyle} className='blogTitleDisplay'>
                <p
                  style={{
                    margin: 2,
                    fontSize: '2.3rem',
                  }}
                >
                  {blog.title}
                </p>
              </div>
            </Link>
          ))
      )}
    </>
  )
}

export default Blogs