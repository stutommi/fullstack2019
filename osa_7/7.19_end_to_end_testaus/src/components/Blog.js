import React from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { deleteBlog, updateLike } from '../reducers/blogsReducer'
import { connect } from 'react-redux'
import Comments from './Comments'
import { Button, Icon } from 'semantic-ui-react'


const Blog = ({ blog, ...props }) => {
  return (
    <>
      {blog ?
        (<>
          <h2>{blog.title}</h2>
          <a href={blog.url}>{blog.url}</a>
          <p>{blog.likes} likes</p>
          <Button data-cy='like' onClick={() => props.updateLike(blog)}>
            <Icon color='red' name='heart'/>
            like
          </Button>

          <Comments blog={blog} />
        </>

        )
        : null
      }
    </>
  )

}

export default connect(
  null, { setNotification, deleteBlog, updateLike }
)(Blog)