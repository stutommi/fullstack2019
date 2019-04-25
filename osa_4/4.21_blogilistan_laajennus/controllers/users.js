const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

// GET USER
usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1})
    res.json(users.map(user => user.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

// POST USER
usersRouter.post('/', async (req, res, next) => { 
  try {
    const body = req.body
    
    if (body.password.length < 3) {
      res.status(400).json({error: 'invalid password'})
    }

    const saltRounds = 10

    // Hash password
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    // Create mongoose object
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    // Save user to database
    const savedUser = await user.save()

    // Send saved user as a response
    res.json(savedUser)

  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter