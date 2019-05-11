import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const BlogList = ({ blogs }) => {
  return (
    <List divided relaxed>
      {blogs
        ? blogs.map(blog =>
          <List.Item id={`${blog.title}`} key={blog.id} >
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </List.Item>)
        : null}
    </List>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired
}

const mapStateToProps = state => ({ blogs: state.blogs })


export default connect(
  mapStateToProps
)(BlogList)