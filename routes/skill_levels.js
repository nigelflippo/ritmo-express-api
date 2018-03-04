'use strict'

const express = require('express')
const knex = require('../knex')

const _ = {}

_.getAllSkillLevels = (req, res, next) => {
  return knex('skill_levels')
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => next(err))
}

_.getSkillLevel = (req, res, next) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) return next({ status: 404, message: `Not Found`})
  return knex('skill_levels')
    .where({ id })
    .first()
    .then(data => {
      if (!data) return next({ status: 404, message: `Not Found` })
      res.status(200).json(data)
    })
    .catch(err => next(err))
}

module.exports = _
