const config = require('./utils/config')
const middleware = require('./utils/middleware')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
  .then(() => logger.info('connected to database'))
  .catch(error => logger.error('error connecting to database', error.message)
  )

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

// For testing purposes
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app