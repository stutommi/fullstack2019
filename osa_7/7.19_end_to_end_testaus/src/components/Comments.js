import React from 'react'
import CommentForm from './CommentForm'

const Comments = ({ blog }) => (
  <>
    <h3>comments</h3>
    {blog.comments.length === 0
      ? <p>no comments</p>
      : null
    }
    <CommentForm blog={blog} />
    <ul>
      {blog.comments.map(comment =>
        <li key={comment}>{comment}</li>
      )}
    </ul>
  </>
)

export default Comments