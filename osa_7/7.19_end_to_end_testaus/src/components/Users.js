import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>
            </th>
            <th>
              blogs created
            </th>
          </tr>
        </thead>
        <tbody>
          {users !== null
            ? users.map(user =>
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
            : null
          }
        </tbody>
      </table>
    </>

  )
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps
)(Users)