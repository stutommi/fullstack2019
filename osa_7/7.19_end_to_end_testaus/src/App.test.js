import React from 'react'
import { wait, waitForElement, render, act } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('shows only form when no user is logged in', async () => {
    let component
    act(() => {
      component = render(<App />)
    })

    await waitForElement(
      () => component.getByText('kirjaudu')
    )

    expect(component.container).toHaveTextContent('kirjaudu')
    expect(component.container).not.toHaveTextContent('blogs')
  })

  test('shows blogs when user is logged in', async () => {
    const user = {
      username: 'test',
      password: 'test',
      token: 'test'
    }

    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    let component
    act(() => {
      component = render(<App />)
      component.rerender(<App />)
    })

    await wait(
      () => component.container.querySelector('.togglableContent')
    )

    expect(component.container).toHaveTextContent('Olli Olematon')
    expect(component.container).toHaveTextContent('Turo Kivikoski')
    expect(component.container).toHaveTextContent('Tauno Palo')
    expect(component.container).toHaveTextContent('blogs')
  })
})
