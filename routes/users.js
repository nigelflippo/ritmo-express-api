'use strict'

const express = require('express')
const knex = require('../knex')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()

const _ = {}

_.getAllUsers = (req, res, next) => {
  return knex('users')
    .orderBy('last_name', 'desc')
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => next(err))
}
_.getAllUsers = async (req, res, next) => {
  const data = await knex('users')
    .orderBy('last_name', 'desc')
    .catch(err => next(err))

  res.status(200).json(data)
}


_.getUser = (req, res, next) => {
  const id = req.params.id
  if (Number.isNaN(id)) {
    return next({ status: 404, message: `Not Found` })
  }
  return knex('users')
    .where({ id })
    .first()
    .then(data => {
      if (!data) {
        return next({ status: 404, message: `Not Found` })
      }
      res.status(200).json(data)
    })
    .catch(err => next(err))
}
_.getUser = async (req, res, next) => {
  const id = req.params.id
  if (Number.isNaN(id)) return next({ status: 404, message: `Not Found` })

  const data = await knex('users')
    .where({id})
    .first()
    .catch(err => next(err))
  if (!data) return next({ status: 404, message: `Not Found` })

  res.status(200).json(data)
}

// _.createUser = (req, res, next) => {
//
//   const {
//     first_name,
//     last_name,
//     username,
//     email,
//     phone_number,
//     address,
//     password,
//     skill_level_id,
//     instrument_id
//   } = req.body
//
//   const re = /^[A-Za-z\d$@$!%*#?&]{8,}$/
//   if (!re.test(password)) {
//     return next({ status: 400, message: `Password` })
//   }
//   if (!email) {
//     return next({ status: 400, message: `Email must not be blank` })
//   }
//   return knex('users')
//     .where({ email })
//     .first()
//     .then(user => {
//       if (!user) {
//         return bcrypt.hash(password, 10)
//       }
//     })
//     .then(password => {
//       if (!password) {
//         return next({ status: 400, message: `User account already exists` })
//       }
//       const newUser = {
//         first_name,
//         last_name,
//         username,
//         email,
//         phone_number,
//         address,
//         password,
//         skill_level_id,
//         instrument_id
//       }
//       return knex.insert(newUser, '*')
//         .into('users')
//     })
//     .then(data => {
//       if (!data) {
//         return next({ status: 400, message: `User account already exists` })
//       }
//
//       const user = data[0]
//       const claim = { user_id: user.id }
//       const token = jwt.sign(claim, process.env.JWT_KEY, {
//         expiresIn: '1 day'
//       })
//
//       res.cookie('token', token, {
//         httpOnly: true,
//         expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
//         secure: router.get('env') === 'production'
//       })
//
//       delete user.password
//       res.status(201).json(user)
//     })
//     .catch(err => next(err))
// }

// //OLD ASYNC
// _.createUser = async (req, res, next) => {
//
//   const {
//     first_name,
//     last_name,
//     username,
//     email,
//     phone_number,
//     address,
//     password,
//     skill_level_id,
//     instrument_id
//   } = req.body
//
//   const re = /^[A-Za-z\d$@$!%*#?&]{8,}$/
//   if (!re.test(password)) {
//     return next({ status: 400, message: `Password` })
//   }
//   if (!email) {
//     return next({ status: 400, message: `Email must not be blank` })
//   }
//   let hashedPassword
//   const userCheck = await knex('users')
//     .where({ email })
//     .first()
//   if (!userCheck) {
//     hashedPassword = await bcrypt.hash(password, 10)
//   }
//   if (!hashedPassword) {
//     return next({ status: 400, message: `User account already exists` })
//   }
//   const newUser = {
//     first_name,
//     last_name,
//     username,
//     email,
//     phone_number,
//     address,
//     password: hashedPassword,
//     skill_level_id,
//     instrument_id
//   }
//   const data = await knex.insert(newUser, '*')
//     .into('users')
//     .catch(err => next(err))
//   if (!data) {
//     return next({ status: 400, message: `User account already exists` })
//   }
//   const user = data[0]
//   const claim = { user_id: user.id }
//   const token = jwt.sign(claim, process.env.JWT_KEY, {
//     expiresIn: '1 day'
//   })
//
//   res.cookie('token', token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
//     secure: router.get('env') === 'production'
//   })
//
//   delete user.password
//   res.status(201).json(user)
// }

//WORKING ASYNC

const validate = (password, email) => {
  const re = /^[A-Za-z\d$@$!%*#?&]{8,}$/
  if (!re.test(password)) {
    return next({ status: 400, message: `Password` })
  }
  if (!email) {
    return next({ status: 400, message: `Email must not be blank` })
  }
}

const generateToken = (data, res) => {
  if (!data) {
    return next({ status: 400, message: `User account already exists` })
  }
  const user = data[0]
  const claim = { user_id: user.id }
  const token = jwt.sign(claim, process.env.JWT_KEY, {
    expiresIn: '1 day'
  })

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: router.get('env') === 'production'
  })
  // delete user.password
}
_.createUser = async (req, res, next) => {

  const {
    first_name,
    last_name,
    username,
    email,
    phone_number,
    address,
    password,
    skill_level_id,
    instrument_id
  } = req.body

  validate(password, email)

  let hashedPassword
  const userCheck = await knex('users')
    .where({ email })
    .first()
  if (!userCheck) {
    hashedPassword = await bcrypt.hash(password, 10)
  }
  if (!hashedPassword) {
    return next({ status: 400, message: `User account already exists` })
  }
  const newUser = {
    first_name,
    last_name,
    username,
    email,
    phone_number,
    address,
    password: hashedPassword,
    skill_level_id,
    instrument_id
  }
  const data = await knex.insert(newUser, '*')
    .into('users')
    .catch(err => next(err))

  const token = generateToken(data, res)

  res.status(201).json({'New User': data[0]})
}

//
_.updateUser = (req, res, next) => {
  const id = req.params.id
  if (Number.isNaN(id)) {
    return next({ status: 404, message: `Not Found` })
  }
  return knex('users')
    .where({ id })
    .first()
    .then(user => {
      if (!user) {
        return next({ status: 404, message : `User Not Found`})
      }
      const {
        username,
        phone_number,
        address,
        skill_level_id,
        instrument_id
      } = req.body
      const patchUser = {
        username,
        phone_number,
        address,
        skill_level_id,
        instrument_id
      }

      return knex('users')
        .update(patchUser, '*')
        .where({ id })
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => next(err))
}

_.deleteUser = (req, res, next) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return next({ status: 404, message: `Not Found` })
  }
  return knex('users')
    .where({ id })
    .first()
    .del()
    .then(data => {
      res.status(204).json(data)
    })
    .catch(err => next(err))
}

module.exports = _
