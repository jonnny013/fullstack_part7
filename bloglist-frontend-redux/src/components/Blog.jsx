import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { messages } from '../reducers/notificationReducer'

const Blog = ({ blog, user, setBlogs }) => {

  const dispatch = useDispatch()
  const handleLike = async blog => {
    event.preventDefault()
    await blogService.addLike(blog)
    blogService.getAll().then(blogs => setBlogs(blogs))
    dispatch(messages('notification','Blog liked!'))
  }
  const handleDelete = async blog => {
    event.preventDefault()
    if (window.confirm(`Would you like to delete the blog: ${blog.title}?`)) {
      try {
        window.confirm
        await blogService.deleteBlog(blog)
        blogService.getAll().then(blogs => setBlogs(blogs))
        dispatch(messages('notifications','Blog deleted'))
      } catch (exception) {
        dispatch(messages(
          'error', `Unable to delete: ${exception.response.data.error}`
        ))
      }
    }
  }
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: 'rgb(155, 195, 217)'
  }
  const paragraphStyle = {
    margin: 2,
    fontSize: '2.3rem',
  }
  const [visible, setVisible] =useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const getClickableLink = link => {
    return link.startsWith('http://') || link.startsWith('https://') ?
      link
      : `http://${link}`
  }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const viewHideButton = visible ? 'Hide' : 'View'
  return(
    <div style={blogStyle} className='blogTitleDisplay'>
      <div>
        <p style={paragraphStyle}>{blog.title} - {blog.author} <button id='view-hide-button' onClick={toggleVisibility}>{viewHideButton}</button></p>
      </div>
      <div style={showWhenVisible} className='blogFullInfoDisplay'>
        <p style={paragraphStyle}>Link: <a href={getClickableLink(blog.url)} target="_blank" rel="noreferrer" >{blog.url}</a></p>
        <p style={paragraphStyle}>Likes: {blog.likes} <button id='like-button' onClick={() => handleLike(blog)}>Like</button></p>
        <p style={paragraphStyle}>User: {blog.user.name}</p>
        {blog.user.username === user.username &&
        <p style={paragraphStyle}><button id='remove-button' onClick={() => handleDelete(blog)}>Remove</button></p>
        }

      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog