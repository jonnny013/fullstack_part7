import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CreateBlog from './CreateBlog'
import userEvent from '@testing-library/user-event'

test('<CreateBlog /> creates blog', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<CreateBlog handleCreateBlog={createBlog} />)

  const input1 = screen.getByPlaceholderText('Choose a title')
  // eslint-disable-next-line quotes
  const input2 = screen.getByPlaceholderText("Author's name")
  const input3 = screen.getByPlaceholderText('Add a Url to see the whole blog')
  const sendButton = screen.getByText('Create')

  await user.type(input1, 'testing a form...')
  await user.type(input2, 'tester1')
  await user.type(input3, 'google.com')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
  expect(createBlog.mock.calls[0][0].author).toBe('tester1')
  expect(createBlog.mock.calls[0][0].url).toBe('google.com')
})