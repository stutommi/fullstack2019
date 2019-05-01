import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, handleNotification, user }) => {
  const [showContent, setshowContent] = useState(false)

  const blogStyle = {
    border: 'black solid 1px',
    borderRadius: '3px',
    marginBottom: '5px',
  }

  const visibility = { display: showContent ? '' : 'none' }

  const handleDelete = async () => {
    const confirmation = window.confirm(`remove ${blog.title}`)
    if (confirmation) {
      const response = await blogService.remove(blog.id)
      if (response === 204) {
        handleNotification(`${blog.title} deleted`, 'success')
        setBlogs(blogs.filter(b => b.id !== blog.id))
      }
    }
  }

  const handleLike = async () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    const updatedBlog = await blogService.update(blog.id, likedBlog)
    if (updatedBlog) {

      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id
        ? blog
        : updatedBlog
      ))
    }
  }

  const toggleVisibility = () => setshowContent(!showContent)

  return (
    <table style={blogStyle}>
      <thead onClick={toggleVisibility}>
        <tr>
          <th>
            {blog.title} by {blog.author}
          </th>
        </tr>
      </thead>
      <tbody style={visibility} className='togglableContent'>
        <tr>
          <td>{blog.url}</td>
        </tr>
        <tr>
          <td>{blog.likes}
            <button onClick={handleLike}>
              like
            </button>
          </td>
        </tr>
        {blog.user &&
          <tr>
            <td>
              added by {blog.name ? blog.name : blog.user.name}
            </td>
          </tr>
        }
        {(blog.name === user.name || blog.user.name === user.name) &&
          <tr>
            <td>
              <button onClick={handleDelete}>
                remove
              </button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  )
}

export default Blog