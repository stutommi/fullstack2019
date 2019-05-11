import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { Button, Menu } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const NavMenu = ({ user, ...props }) => {
  const [active, setActive] = useState('')


  const handleLogOut = () => {
    console.log(user)
    window.localStorage.removeItem('loggedBlogAppUser')
    setNotification(`${user.name} logged out`, 5, 'green')
    props.setUser(null)
    blogService.setToken('')
  }

  const handleItemClick = (e, { name }) => setActive(name)

  return (
    <Menu>
      <Menu.Item
        as={Link} to={'/'}
        name='blogs'
        active={active === 'blogs'}
        onClick={handleItemClick}
      >
        blogs
      </Menu.Item>
      <Menu.Item
        as={Link} to={'/users/'}
        name='users'
        active={active === 'users'}
        onClick={handleItemClick}
      >
        users
      </Menu.Item>
      <Menu.Item>
        <span>{user.name} logged in</span>
      </Menu.Item>
      <Menu.Item as={Button} onClick={handleLogOut}>
        log out
      </Menu.Item>
    </Menu>
  )
}

NavMenu.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  {
    setUser
  }
)(NavMenu)