import React from 'react'

const User = ({ user }) => {
  return (
    <div>
      {
        user
          ? (
            <>
              <h1>{user.name}</h1>
              <h2>added blogs</h2>
              <ul>
                {
                  user.blogs.map(blog =>
                    <li key={blog.id}>{blog.title}</li>)
                }
              </ul>
            </>)
          : <h2>No user Found</h2>
      }
    </div>
  )
}


export default User