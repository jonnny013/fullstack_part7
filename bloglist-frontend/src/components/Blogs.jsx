import blogService from '../services/blogs'
import Blog from './Blog'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import { useEffect, useRef } from 'react'
import { useBlogsValue } from '../reducers/BlogsContext'
import { Link } from 'react-router-dom'

export const Blogs = () => {
  const blogs = useBlogsValue()
  const createBlogRef = useRef()

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: 'rgb(155, 195, 217)',
    visited: {
      color: 'black'
    }
  }

  return (
    <>
      <Togglable buttonLabel='Create New Blog' ref={createBlogRef}>
        <CreateBlog createBlogRef={createBlogRef} />
      </Togglable>

      {blogs && blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Link
            key={blog.id}
            to={`/blogs/${blog.id}`}
            element={<Blog />}
            state={{ blog }}
            style={{ visited: { color: 'black' } }}
          >
            <div style={blogStyle} className='blogTitleDisplay'>
              <p
                style={{
                  margin: 2,
                  fontSize: '2.3rem',
                  visited: {
                    color: 'black'
                  }
                }}
              >
                {blog.title}
              </p>
              <br />
            </div>
          </Link>
        ))}
    </>
  )
}

export default Blogs