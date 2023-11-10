import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Blog = ({ blog, user, errormessagefunction }) => {
  const queryClient = useQueryClient()

  const updateBlogMutation = useMutation({
    mutationFn: blogService.addLike,
    onMutate: () => {
      errormessagefunction('Loading...', 'green')
    },
    onSuccess: updatedBlog => {
      errormessagefunction('Blog liked!', 'green')
      queryClient.setQueryData(['blogs'], blogs => {
        const updatedBlogs = blogs.map(blog =>
          blog.id === updatedBlog.id ? { ...blog, likes: blog.likes + 1 } : blog
        )
        return updatedBlogs
      })
    },
    onError: (error) => {
      errormessagefunction(`Failed to like the blog: ${error}`, 'red')
    },
  })
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onMutate: () => {
      errormessagefunction('Loading...', 'green')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      errormessagefunction('Blog deleted', 'green')
    },
    onError: error => {
      errormessagefunction(
        `Unable to delete: ${error.response.data.error}`,
        'red'
      )
    },
  })

  const handleDelete = async blog => {
    event.preventDefault()
    if (window.confirm(`Would you like to delete the blog: ${blog.title}?`)) {
      window.confirm
      deleteBlogMutation.mutate({ ...blog })
    }
  }
  const handleLike = async blog => {
    event.preventDefault()
    await updateBlogMutation.mutateAsync({ ...blog })
  }

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: 'rgb(155, 195, 217)',
  }
  const paragraphStyle = {
    margin: 2,
    fontSize: '2.3rem',
  }
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const getClickableLink = link => {
    return link.startsWith('http://') || link.startsWith('https://')
      ? link
      : `http://${link}`
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const viewHideButton = visible ? 'Hide' : 'View'
  return (
    <div style={blogStyle} className='blogTitleDisplay'>
      <div>
        <p style={paragraphStyle}>
          {blog.title} - {blog.author}{' '}
          <button id='view-hide-button' onClick={toggleVisibility}>
            {viewHideButton}
          </button>
        </p>
      </div>
      <div style={showWhenVisible} className='blogFullInfoDisplay'>
        <p style={paragraphStyle}>
          Link:{' '}
          <a href={getClickableLink(blog.url)} target='_blank' rel='noreferrer'>
            {blog.url}
          </a>
        </p>
        <p style={paragraphStyle}>
          Likes: {blog.likes}{' '}
          <button id='like-button' onClick={() => handleLike(blog)}>
            Like
          </button>
        </p>
        <p style={paragraphStyle}>User: {blog.user.name}</p>
        {blog.user.username === user.username && (
          <p style={paragraphStyle}>
            <button id='remove-button' onClick={() => handleDelete(blog)}>
              Remove
            </button>
          </p>
        )}
      </div>
    </div>
  )
}

export const Blogs = ({ blogs, user, setBlogs, errormessagefunction }) => {
  return (
    <>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            setBlogs={setBlogs}
            errormessagefunction={errormessagefunction}
          />
        ))}
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blogs
