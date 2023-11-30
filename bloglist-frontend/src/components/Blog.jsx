import { Link } from 'react-router-dom'
import blogService from '../services/blogs'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useNotificationDispatch } from '../reducers/NotificationContext'
import { useUserValue } from '../reducers/UserContent'
import { useLocation, useNavigate } from 'react-router-dom'
import commentService from '../services/comments'
import { TextField, Button } from '@mui/material'
import { useState } from 'react'
import { useBlogsValue } from '../reducers/BlogsContext'
import DeleteIcon from '@mui/icons-material/Delete'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'

const Blog = () => {
  const user = useUserValue()
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const thisBlog = location.state.blog
  const [comment, setComment] = useState('')
  const blogs = useBlogsValue()
  let blog = null

  if (thisBlog && blogs) {
    blog = blogs.find(blog => blog.id === thisBlog.id)
  }

  const result = useQuery({
    queryKey: ['comments'],
    queryFn: commentService.getAllComments,
  })
  const comments = result.data

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
      navigate('/')
    },
    onError: error => {
      dispatch({
        type: 'error',
        payload: `Unable to delete: ${error.response.data.error}`,
      })
    },
  })

  const newCommentMutation = useMutation({
    mutationFn: commentService.postComment,
    onMutate: () => {
      dispatch({
        type: 'loading',
        payload: 'Loading...',
      })
    },
    onSuccess: newComment => {
      dispatch({
        type: 'message',
        payload: `New comment added: ${newComment.content}`,
      })
      queryClient.setQueryData(['blogs'], blogs => {
        const updatedBlogs = blogs.map(blog =>
          blog.id === newComment.blog ? { ...blog, comments: [...blog.comments, newComment] } : blog
        )
        return updatedBlogs
      })
    },
    onError: error => {
      dispatch({
        type: 'error',
        payload: `Post unsuccesful: ${error.response.data.error}`,
      })
    },
  })

  const onCommentSubmit = async (event) => {
    event.preventDefault()
    const newComment = {
      content: comment,
      blogId: blog.id
    }
    newCommentMutation.mutate(newComment)
    setComment('')
  }

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
    width: '100%'
  }
  const paragraphStyle = {
    margin: 2,
    fontSize: '2.3rem',
  }


  const getClickableLink = link => {
    return link.startsWith('http://') || link.startsWith('https://')
      ? link
      : `http://${link}`
  }

  if (!blog) {
    return <p style={{ color: 'white' }}>Currently unavailable</p>
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      className='blogTitleDisplay'
    >
      <Link to='/'>
        <button style={{ textAlign: 'center' }}>Back</button>
      </Link>
      <div style={blogStyle} className='blogFullInfoDisplay'>
        <h2 style={paragraphStyle}>{blog.title}</h2>
        <br />
        <p style={paragraphStyle}>
          Link:{' '}
          <a href={getClickableLink(blog.url)} target='_blank' rel='noreferrer'>
            {blog.url}
          </a>
        </p>
        <br />
        <p style={paragraphStyle}>
          Likes: {blog.likes}
          <span> </span>
          <Button
            variant='contained'
            endIcon={<ThumbUpOffAltIcon />}
            id='like-button'
            onClick={() => handleLike(blog)}
          >
            Send
          </Button>
        </p>
        <br />
        <p style={paragraphStyle}>Added by: {blog.user.name}</p>
        {blog.user.username === user.username && (
          <p style={paragraphStyle}>
            <Button
              variant='contained'
              color='error'
              startIcon={<DeleteIcon />}
              id='remove-button'
              onClick={() => handleDelete(blog)}
            >
              Delete
            </Button>
          </p>
        )}
        <br />
        <p style={paragraphStyle}>Comments:</p>
        <form onSubmit={onCommentSubmit}>
          <div>
            <TextField
              label='comment'
              value={comment}
              onInput={e => setComment(e.target.value)}
              inputProps={{ style: { fontSize: 20 } }}
              InputLabelProps={{ style: { fontSize: 20 } }}
            />
          </div>
          <div>
            <Button variant='contained' color='primary' type='submit'>
              Comment
            </Button>
          </div>
        </form>
        <ul>
          {blog.comments.map(comment => (
            <li key={comment.id} style={paragraphStyle}>
              {comment.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
