import { React, useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const CreateBlog = ({ errormessagefunction, createBlogRef }) => {
  const queryClient = useQueryClient()
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async blogObject => {
    try {
      newBlogMutation.mutate({ blogObject })
      createBlogRef.current.toggleVisibility()
      errormessagefunction(
        `New blog ${blogObject.title} by ${blogObject.author} added`,
        'green'
      )
    } catch (exception) {
      errormessagefunction(
        `Post unsuccesful: ${exception.response.data.error}`,
        'red'
      )
    }
  }

  const makeBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
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
    width: 400,
    borderRadius: 5,
    marginTop: 10
  }

  return (
    <div style={stylesDiv}>
      <h2 className='createBlogTitle'>Create New Blog</h2>
      <form onSubmit={makeBlog} style={stylesDiv}>

        <p className='newBlogParagraph'>Title</p>
        <input type='text' id='title-input' value={title} name='Title' placeholder='Choose a title' onChange={({ target }) => setTitle(target.value)} />

        <p className='newBlogParagraph'>Author</p>
        <input type='text' id='author-input' value={author} name='Author' placeholder="Author's name" onChange={({ target }) => setAuthor(target.value)} />

        <p className='newBlogParagraph'>Website</p>
        <input type='text'  id='url-input' value={url} name='Url'  placeholder='Add a Url to see the whole blog' onChange={({ target }) => setUrl(target.value)} />
        <br />
        <button type='submit' id='create-button'>Create</button>
      </form>
    </div>
  )
}


export default CreateBlog