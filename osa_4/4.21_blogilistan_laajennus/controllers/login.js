const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (req, res, next) => {
  const body = req.body
  try {
    const user = await User.findOne({ username: body.username })

    const passwordCorrect = user === null || body.password === undefined
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

    if (!(passwordCorrect)) {
      res.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: body.username,
      id: body.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    console.log(token)

    res
      .status(200)
      .send({ token, username: user.username, name: user.name })

  } catch (exception) {
    next(exception)
  }
})

module.exports = loginRouter