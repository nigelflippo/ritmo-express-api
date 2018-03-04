'use strict'

const express = require('express')
const knex = require('../knex')
const router = express.Router()

const skillLevels = require('./skill_levels')
const instruments = require('./instruments')

const authorize = () => {}

router.get('/skill_levels', skillLevels.getAllSkillLevels)
router.get('/skill_levels/:id', skillLevels.getSkillLevel)

router.get('/instruments', instruments.getAllInstruments)
router.get('/instruments/:id', instruments.getInstrument)
router.post('/instruments', instruments.createInstrument)

module.exports = router
