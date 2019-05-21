import React, { useState } from 'react'

const LoginForm = ({ show, setToken, login, handleError, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()

    try {
      const result = await login({
        variables: { username, password }
      })

      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      setPage('authors')
    } catch (error) {
      console.error(error.message)
      handleError(error)
    }

    setUsername('')
    setPassword('')
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>
          login
        </button>
      </form>
    </>
  )
}

export default LoginForm