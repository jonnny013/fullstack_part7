import { React, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { messages } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const CreateBlog = ({ setBlogs, createBlogRef }) => {
  const dispatch = useDispatch()

  const makeBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    dispatch(createBlog(blogObject))
  }
  const stylesDiv = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(2, 175, 175)',
    width: 400,
    borderRadius: 5,
    marginTop: 10,
  }
  const handleCreateBlog = async blogObject => {
    try {
      const response = await blogService.create(blogObject)
      blogService.getAll().then(blogs => setBlogs(blogs))
      createBlogRef.current.toggleVisibility()
      dispatch(
        messages(
          'notification',
          `New blog ${blogObject.title} by ${blogObject.author} added`
        )
      )
    } catch (exception) {
      console.log(exception)
      if (exception.data) {
        dispatch(
          messages(
            'error',
            `Post unsuccesful: ${exception.response.data.error}`
          )
        )
      } else {
        dispatch(messages('error', `Post unsuccesful: ${exception}`))
      }
    }
  }

  return (
    <div style={stylesDiv}>
      <h2 className='createBlogTitle'>Create New Blog</h2>
      <form onSubmit={makeBlog} style={stylesDiv}>
        <p className='newBlogParagraph'>Title</p>
        <input
          type='text'
          id='title-input'
          name='title'
          placeholder='Choose a title'
        />

        <p className='newBlogParagraph'>Author</p>
        <input
          type='text'
          id='author-input'
          name='author'
          placeholder="Author's name"
        />

        <p className='newBlogParagraph'>Website</p>
        <input
          type='text'
          id='url-input'
          name='url'
          placeholder='Add a Url to show the whole blog'
        />
        <br />
        <button type='submit' id='create-button'>
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateBlog
