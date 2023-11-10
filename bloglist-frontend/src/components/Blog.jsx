import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useNotificationDispatch } from '../reducers/NotificationContext'
import { useUserValue } from '../reducers/UserContent'

const Blog = ({ blog }) => {
  const user = useUserValue()
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const updateBlogMutation = useMutation({
    mutationFn: blogService.addLike,
    onMutate: () => {
      dispatch({
        type: 'loading',
        payload: 'Loading...',
      })
    },
    onSuccess: updatedBlog => {
      dispatch({
        type: 'message',
        payload: 'Blog liked!',
      })
      queryClient.setQueryData(['blogs'], blogs => {
        const updatedBlogs = blogs.map(blog =>
          blog.id === updatedBlog.id ? { ...blog, likes: blog.likes + 1 } : blog
        )
        return updatedBlogs
      })
    },
    onError: error => {
      dispatch({
        type: 'error',
        payload: `Failed to like the blog: ${error}`,
      })
    },
  })
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onMutate: () => {
      dispatch({
        type: 'loading',
        payload: 'Loading...',
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      dispatch({
        type: 'message',
        payload: 'Blog deleted!',
      })
    },
    onError: error => {
      dispatch({
        type: 'error',
        payload: `Unable to delete: ${error.response.data.error}`,
      })
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

export const Blogs = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })
  const blogs = result.data
  return (
    <>
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blogs
