import React from 'react'
import { connect } from 'react-redux'
import { createComment } from '../reducers/blogsReducer'
import { Form, Button } from 'semantic-ui-react'

const CommentForm = ({ blog, ...props }) => {

  const newComment = (e) => {
    e.preventDefault()
    const comment = e.target.comment.value
    props.createComment(blog, comment)
    e.target.comment.value = ''

  }

  return (
    <>
      <Form onSubmit={newComment}>
        <input size='small' type="text" name='comment' />
        <Button size='small' type='submit'>add comment</Button>
      </Form>
    </>
  )
}



export default connect(null, { createComment })(CommentForm)