const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const app = express()

const links = require('./api/links')
const posts = require('./api/posts')
const users = require('./api/users')
const auth = require('./auth')

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/auth', auth)

app.use('/api/v1/links', links)
app.use('/api/v1/posts', posts)
app.use('/api/v1/users', users)

app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404;
  next(err);
})

app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    })
})

module.exports = app
