import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'
import { initializeUsers } from '../reducers/usersReducer'
import { useField } from '../hooks/index'
import { Form, Button } from 'semantic-ui-react'

const BlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const blogFormRef = React.createRef()

  const handleAddBlog = async event => {
    event.preventDefault()
    try {
      const newBlog = await props.createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
      })

      if (newBlog) {
        props.initializeUsers()
        newBlog.name = props.user.name
        props.setNotification(`added ${newBlog.title}`, 5, 'green')

        title.reset()
        author.reset()
        url.reset()
        blogFormRef.current.toggleVisibility()
      } else {
        props.setNotification('invalid input', 4, 'red')
      }
    } catch (exception) {
      console.log(exception.message)
    }
  }


  const titleAtr = { ...title }
  const authorAtr = { ...author }
  const urlAtr = { ...url }

  delete titleAtr.reset
  delete authorAtr.reset
  delete urlAtr.reset

  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <Form size='mini' onSubmit={handleAddBlog}>
        <Form.Input id='title' inline size='mini' label='Title' {...titleAtr} />
        <Form.Input id='author' inline size='mini' label='Author' {...authorAtr} />
        <Form.Input id='url' inline size='mini' label='Url' {...urlAtr} />
        <Button size='mini' type='submit'>
          create
        </Button>
      </Form>
    </Togglable>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(
  mapStateToProps, { setNotification, createBlog, initializeUsers }
)(BlogForm)