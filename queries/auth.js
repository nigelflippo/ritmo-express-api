'use strict'

const express = require('express')
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const _ = {}

_.verifyAuth = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) return res.status(200).send(false)
    res.status(200).send({loggedIn: true, cookie: payload})
  })
}

_.authLogin = (req, res, next) => {
  const { email, password } = req.body

  if (!email) return next({ status: 400, message: `Email must not be blank` })
  if (!password) return next({ status: 400, message: `Password must not be blank` })

  let user
  return knex('users')
    .where({ email })
    .first()
    .then(data => {
      if (!data) return next({ status: 400, message: `Bad email or password` })

      user = data
      return bcrypt.compare(password, user.password)
    })
    .then(() => {
      const claim = { user_id: user.id }
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '1 day'
      })
      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        secure: router.get('env') === 'production'
      })
      delete user.password
      res.status(201).send(user)
    })
}

_.authLogout = (req, res, next) => {
  res.clearCookie('token')
  res.end()
}


module.exports = _
