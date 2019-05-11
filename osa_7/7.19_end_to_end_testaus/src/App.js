import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import PropTypes from 'prop-types'
// Components
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import NavMenu from './components/NavMenu'
// Reducers
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
// Services
import blogService from './services/blogs'
import loginService from './services/login'
// Hooks
import { useField } from './hooks'
// Styles
import { Header, Container } from 'semantic-ui-react'

const App = (props) => {
  const username = useField('text')
  const password = useField('password')

  useEffect(() => {
    props.initializeBlogs()
    props.initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      props.setUser(user)
      password.reset()
      username.reset()
    } catch (exception) {
      console.log(exception)
      props.setNotification('invalid username or password', 5, 'red')
    }
  }

  const userById = (id) =>
    props.users.find(user =>
      user.id === id)

  const blogById = (id) =>
    props.blogs.find(blog =>
      blog.id === id)

  return (
    <Router>
      <Container>
        <Notification />
        {props.user !== null
          ?
          <>
            <NavMenu />
            <Header as='h1' textAlign='center'>blogs</Header>
            <Route exact path='/users' render={() => <Users />} />
            <Route path='/users/:id' render={({ match }) =>
              <User user={userById(match.params.id)} />}
            />
            <Route path='/blogs/:id' render={({ match }) =>
              <Blog blog={blogById(match.params.id)} />}
            />
            <Route exact path='/' render={() =>
              <>
                <BlogForm />
                <BlogList />
              </>
            } />
          </>
          :
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
          />
        }
      </Container>
    </Router>
  )
}

App.propTypes = {
  setNotification: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  initializeBlogs: PropTypes.func.isRequired,
  initializeUsers: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object,
  users: PropTypes.array.isRequired,
}


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users,
    user: state.user
  }
}

export default connect(
  mapStateToProps, { setNotification, initializeBlogs, initializeUsers, setUser }
)(App)