import React from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

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
    <div className='login-form'>
      <style>
        {`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}
      </style>

      <Grid
        textAlign='center'
        style={{ height: '100' }}
        verticalAlign='middle'>
        <Grid.Column
          style={{ maxWidth: '450' }}>
          <Header as='h2' color='blue' textAlign='center'>
            Log in
          </Header>
          <Form size='large' onSubmit={handleLogin}>
            <Segment stacked>
              <Form.Input
                fluid icon='user'
                iconPosition='left'
                placeholder='Username'
                {...userAtr}
                id='username'
              />

              <Form.Input
                fluid icon='lock'
                iconPosition='left'
                placeholder='Password'
                {...passAtr}
                id='password'
              />

              <Button primary fluid type='submit' size='large'>
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div >
  )
}

export default LoginForm