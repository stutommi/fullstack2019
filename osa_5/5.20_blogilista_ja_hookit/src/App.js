import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'

const App = () => {
  const username = useField('text')
  const password = useField('password')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ text: '', status: '' })

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const handleNotification = (message, status = 'success') => {
    status === 'success'
      ? status = 'lightgreen'
      : status = 'red'
    setMessage({ text: message, status: status })
    setTimeout(() => {
      setMessage({ text: '', status: 'white' })
    }, 5000)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const credentials = {
        password: password.value,
        username: username.value
      }

      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      password.reset()
      username.reset()
    } catch (exception) {
      console.log(exception)

      handleNotification('invalid username or password', 'error')
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    handleNotification(`${user.name} logged out`, 'success')
    setUser(null)
    blogService.setToken('')
  }

  return (
    <>
      <Notification message={message} />
      {user !== null
        ?
        <>
          <p>{user.name} logged in</p>
          <h2>blogs</h2>
          <BlogForm
            setBlogs={setBlogs}
            blogs={blogs}
            handleNotification={handleNotification}
            user={user}
          />
          {blogs
            ? blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog
                  key={blog.id}
                  user={user}
                  blog={blog}
                  blogs={blogs}
                  setBlogs={setBlogs}
                  handleNotification={handleNotification}
                />
              )
            : null
          }
          <button onClick={handleLogOut}>kirjaudu ulos</button>
        </>
        :
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
        />
      }
    </>
  )
}

export default App