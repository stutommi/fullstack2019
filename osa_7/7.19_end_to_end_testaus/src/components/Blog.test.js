import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'
import 'jest-dom/extend-expect'

describe('Blog', () => {
  let component

  beforeEach(() => {
    const user = { name: 'Jubajei' }
    const blog = {
      title: 'Test Title',
      author: 'Test Author',
      likes: 3,
      url: 'testi',
      name: 'noniin',
      user: { name: 'noniin' }
    }

    component = render(
      <Blog blog={blog} user={user} />
    )
  })

  test('initially shows only name and author', () => {

    const tbody = component.container.querySelector('.togglableContent')
    expect(tbody).toHaveStyle('display: none')
    expect(component.container).toHaveTextContent('Test Title')
    expect(component.container).toHaveTextContent('Test Author')
  })

  test('shows url and likes after clicking from thead-element', () => {
    const thead = component.container.querySelector('thead')

    fireEvent.click(thead)
    expect(component.container).toHaveTextContent('Test Title')
    expect(component.container).toHaveTextContent('Test Author')
    expect(component.container).toHaveTextContent('testi')
    expect(component.container).toHaveTextContent('added by noniin')
  })


})
