'use strict'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')
const uuid = require('uuid/v1')
const knex = require('./knex.js')

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static('public'))

app.use((req, res, next) => {
  const status = err.status || 500
  res.status(status).send(err.message)
})

app.listen(port, () => console.log(`Port: ${port}`))

module.exports = app
