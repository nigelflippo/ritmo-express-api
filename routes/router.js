'use strict'

const express = require('express')
const knex = require('../knex')
const router = express.Router()

const skillLevels = require('./skill_levels')
const instruments = require('./instruments')
const users = require('./users')

const authorize = () => {}

router.get('/skill_levels', skillLevels.getAllSkillLevels)
router.get('/skill_levels/:id', skillLevels.getSkillLevel)

router.get('/instruments', instruments.getAllInstruments)
router.get('/instruments/:id', instruments.getInstrument)
router.post('/instruments', instruments.createInstrument)

router.get('/users', users.getAllUsers)
router.get('/users/:id', users.getUser)
router.post('/users', users.createUser)


module.exports = router
