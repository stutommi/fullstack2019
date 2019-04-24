const config = require('./utils/config')
const middleware = require('./utils/middleware')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
  .then(() => logger.info('connected to database'))
  .catch(error => logger.error('error connecting to database', error.message)
  )

app.use(bodyParser.json())
app.use(morgan('tiny'))

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app