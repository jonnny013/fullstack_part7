import { React, useState } from 'react'
import blogService from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../reducers/NotificationContext'
import { useUserValue } from '../reducers/UserContent'

const CreateBlog = ({ createBlogRef }) => {
  const user = useUserValue()
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onMutate: () => {
      dispatch({
        type: 'loading',
        payload: 'Loading...',
      })
    },
    onSuccess: newBlog => {
      const addUserToBlog = { ...newBlog, user: user }
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(addUserToBlog))
      dispatch({
        type: 'message',
        payload: `New blog ${newBlog.title} by ${newBlog.author} added`,
      })
    },
    onError: error => {
      dispatch({
        type: 'error',
        payload: `Post unsuccessful: ${error.response.data.error}`,
      })
    },
  })
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async blogObject => {
    newBlogMutation.mutate(blogObject)
    createBlogRef.current.toggleVisibility()
  }

  const makeBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    handleCreateBlog(blogObject)
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  const stylesDiv = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(2, 175, 175)',
    width: 370,
    borderRadius: 5,
    marginTop: 10,
  }

  return (
    <div style={stylesDiv} id='createBlogDiv'>
      <h2 className='createBlogTitle'>Create New Blog</h2>
      <form onSubmit={makeBlog} style={stylesDiv}>
        <p className='newBlogParagraph'>Title</p>
        <input
          type='text'
          id='title-input'
          value={title}
          name='Title'
          placeholder='Choose a title'
          onChange={({ target }) => setTitle(target.value)}
        />

        <p className='newBlogParagraph'>Author</p>
        <input
          type='text'
          id='author-input'
          value={author}
          name='Author'
          placeholder="Author's name"
          onChange={({ target }) => setAuthor(target.value)}
        />

        <p className='newBlogParagraph'>Website</p>
        <input
          type='text'
          id='url-input'
          value={url}
          name='Url'
          placeholder='Add a Url to see the whole blog'
          onChange={({ target }) => setUrl(target.value)}
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
