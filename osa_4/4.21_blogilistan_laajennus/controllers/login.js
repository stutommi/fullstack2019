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
    } else {
      const userForToken = {
        username: body.username,
        id: user._id
      }

      const token = jwt.sign(userForToken, process.env.SECRET)

      res
        .status(200)
        .send({ token, username: user.username, name: user.name })
    }


  } catch (exception) {
    next(exception)
  }
})

module.exports = loginRouter