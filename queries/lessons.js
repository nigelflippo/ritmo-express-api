'use strict'

const express = require('express')
const knex = require('../knex')
const _ = {}

_.getAllLessons = (req, res, next) => {
  knex('lessons')
    .orderBy('id', 'asc')
    .then(data => res.status(200).json(data))
    .catch(err => next(err))
}

_.getLesson = (req, res, next) => {
  const id = req.params.id
  knex('lessons')
}

module.exports = _
