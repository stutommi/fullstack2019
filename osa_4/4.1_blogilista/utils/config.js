if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let PORT = process.env.PORT
let mongoUrl = process.env.mongoUrl

module.exports = {
  PORT,
  mongoUrl
}