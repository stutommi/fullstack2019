import React from 'react'
import { useField } from '../hooks'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import propTypes from 'prop-types'

const BlogForm = ({ user, setBlogs, blogs, handleNotification }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleAddBlog = async event => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title: title.value,
        author: author.value,
        url: url.value,
      })

      if (newBlog) {
        newBlog.name = user.name
        blogFormRef.current.toggleVisibility()
        handleNotification(`a new blog ${title.value} by ${author.value} added`, 'success')
        setBlogs(blogs.concat(newBlog))
        title.reset()
        author.reset()
        url.reset()
      } else {
        handleNotification('invalid blog information', 'error')
      }
    } catch (exception) {
      console.log(exception.message)
    }
  }

  const blogFormRef = React.createRef()

  const titleAtr = { ...title }
  const authorAtr = { ...author }
  const urlAtr = { ...url }

  delete titleAtr.reset
  delete authorAtr.reset
  delete urlAtr.reset


  return (
    <Togglable buttonLabel='new Blog' ref={blogFormRef}>
      <form onSubmit={handleAddBlog}>
        <div>
          <label>Title</label>
          <input {...titleAtr} />
        </div>
        <div>
          <label>Author</label>
          <input {...authorAtr} />
        </div>
        <div>
          <label>Url</label>
          <input {...urlAtr} />
        </div>
        <button type='submit'>
          create
        </button>
      </form>
    </Togglable>
  )
}

BlogForm.propTypes = {
  user: propTypes.object.isRequired,
  setBlogs: propTypes.func.isRequired,
  blogs: propTypes.array.isRequired,
  handleNotification: propTypes.func.isRequired
}

export default BlogForm