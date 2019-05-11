import blogService from '../services/blogs'

// Reducer
const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE_BLOGS':
    return action.blogs
  case 'CREATE_BLOG':
    return state.concat(action.blog)
  case 'UPDATE_BLOG':
    return state.map(blog =>
      blog.id !== action.blog.id ? blog : action.blog)
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.id)
  default:
    return state
  }
}

// Action creator
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOGS',
      blogs: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    if (newBlog) {
      dispatch({
        type: 'CREATE_BLOG',
        blog: newBlog
      })
      return newBlog
    }
  }
}

export const updateLike = (blog) => {
  return async (dispatch) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const updatedBlog = await blogService.update(blog.id, likedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      blog: updatedBlog
    })
  }
}

export const createComment = (blog, comment) => {
  return async (dispatch) => {
    blog.comments = blog.comments.concat(comment)
    const updatedBlog = await blogService.createComment(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      blog: updatedBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      id: id
    })
  }
}

export default blogsReducer