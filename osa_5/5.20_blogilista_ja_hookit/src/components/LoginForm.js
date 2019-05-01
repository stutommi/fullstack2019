import React from 'react'

const LoginForm = (props) => {
  const {
    password,
    username,
    handleLogin
  } = props

  const userAtr = { ...username }
  const passAtr = { ...password }

  delete userAtr.reset
  delete passAtr.reset




  return (
    <>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
          <input
            className='username'
            {...userAtr}
          />
        </div>
        <div>
          salasana
          <input
            className='password'
            {...passAtr}
          />
        </div>
        <button type='submit'>kirjaudu</button>
      </form>
    </>
  )
}

export default LoginForm