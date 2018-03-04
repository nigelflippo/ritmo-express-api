exports.seed = function(knex, Promise) {
  return knex('instruments').insert([
    {
      id: 1,
      instrument: 'classical guitar'
    },
    {
      id: 2,
      instrument: 'electric guitar'
    },
    {
      id: 3,
      instrument: 'bass guitar'
    },
    {
      id: 4,
      instrument: 'viola'
    },
    {
      id: 5,
      instrument: 'violin'
    },
    {
      id: 6,
      instrument: 'cello'
    },
    {
      id: 7,
      instrument: 'upright bass'
    },
    {
      id: 8,
      instrument: 'piano'
    },
    {
      id: 9,
      instrument: 'voice'
    },
  ]).then(() => {
    return knex.raw(
      `SELECT setval('instruments_id_seq', (SELECT MAX(id) FROM instruments));`
    )
  })
};
