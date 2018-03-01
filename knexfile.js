'use strict'

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/ritmo_db_dev',
    migrations: {
      diredctory: './db/migrations'
    },
    seed: {
      directory: './db/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      diredctory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
}
