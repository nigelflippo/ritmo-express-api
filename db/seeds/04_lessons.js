exports.seed = function(knex, Promise) {
  return knex('lessons').insert([
    {
      id: 1,
      name: 'Beginning Guitar',
      description: 'Beginning guitar lessons.',
      instrument_id: 1,
      instructor_id: 1,
      pupil_id: null,
      address: '80302',
      lesson_price: 50,
      date: '032418',
      time: '1430'
    }
  ]).then(() => {
    return knex.raw(
      `SELECT setval('lessons_id_seq', (SELECT MAX(id) FROM lessons));`
    )
  })
};
