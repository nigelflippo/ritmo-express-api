'use strict'

const express = require('express')
const knex = require('../knex')

const _ = {}

_.getAllInstruments = (req, res, next) => {
  return knex('instruments')
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => next(err))
}

_.getInstrument = (req, res, next) => {
  const id = req.params.id
  if (Number.isNaN(id)) return next({ status: 404, message: `Not Found` })
  return knex('instruments')
    .where({ id })
    .first()
    .then(data => {
      if (!data) return next({ status: 404, message: `Not Found` })
      res.status(200).json(data)
    })
    .catch(err => next(err))
}

_.createInstrument = (req, res, next) => {
  const { instrument } = req.body
  if (!instrument) return next({ status: 404, message: `Instrument required.` })
  const newInstrument = { instrument }
  return knex.insert(newInstrument, '*')
    .into('instruments')
    .then(data => {
      if (!data) return next({ status: 204, message: 'Instrument already exists.' })
      res.status(201).json(data)
    })
    .catch(err => next(err))
}

module.exports = _
