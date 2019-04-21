const config = require('./utils/config')
const middleware = require('./utils/middleware')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log(error.message)
  )

app.use(bodyParser.json())
app.use(morgan('tiny'))

app.use(blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app