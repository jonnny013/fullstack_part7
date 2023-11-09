import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const mockHandler = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'A suitable title',
      author: 'test',
      likes: 5,
      url: 'google.com',
      user: {
        name: 'test',
      }
    }
    const user = {
      name: 'jon'
    }



    container = render(
      <Blog blog={blog} user={user} handleLike={mockHandler} />
    ).container
  })
  test('title and author are displayed at start', async () => {
    await screen.findAllByText('A suitable title - test')
  })
  test('likes and url are hidden', async () => {
    const div = container.querySelector('.blogFullInfoDisplay')
    expect(div).toHaveStyle('display: none')
  })
  test('Click View shows likes and url', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const div = container.querySelector('.blogFullInfoDisplay')
    expect(div).not.toHaveStyle('display: none')
  })
  test('Clicking like twice gets called twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Like')
    await user.click(button)
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
