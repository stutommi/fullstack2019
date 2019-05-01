import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'
import 'jest-dom/extend-expect'

test('renders title, author and likes', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    likes: 3,
  }

  const Component = render(
    <SimpleBlog blog={blog} />
  )

  expect(Component.container).toHaveTextContent('Test Title')
  expect(Component.container).toHaveTextContent('Test Author')
  expect(Component.container).toHaveTextContent('3')
})

test('clicking the button twice should call callback function twice', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    likes: 3,
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})
