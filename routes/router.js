'use strict'

const express = require('express')
const knex = require('../knex')
const router = express.Router()

const skillLevels = require('../queries/skill_levels')
const instruments = require('../queries/instruments')
const users = require('../queries/users')
const auth = require('../queries/auth')
const lessons = require('../queries/lessons')

const authorize = (req, res, next) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) return next({ status: 401, message: `Unauthorized` })
    req.claim = payload
    next()
  })
}

router.get('/skill_levels', skillLevels.getAllSkillLevels)
router.get('/skill_levels/:id', skillLevels.getSkillLevel)

router.get('/instruments', instruments.getAllInstruments)
router.get('/instruments/:id', instruments.getInstrument)
router.post('/instruments', instruments.createInstrument)

router.get('/users', users.getAllUsers)
router.get('/users/:id', users.getUser)
router.post('/users', users.createUser)
router.patch('/users/:id', users.updateUser)
router.delete('/users/:id', users.deleteUser)

router.get('/auth/verify', auth.verifyAuth)
router.post('auth/login', auth.authLogin)

router.get('/lessons', lessons.getAllLessons)


module.exports = router
