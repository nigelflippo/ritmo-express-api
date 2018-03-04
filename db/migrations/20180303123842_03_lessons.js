
exports.up = (knex, Promise) => {
  return knex.schema.createTable('lessons', table => {
    table.increments()
    table.string('name').notNullable().defaultsTo('')
    table.string('description').notNullable().defaultsTo('')
    table.integer('instrument_id').notNullable()
    table.foreign('instrument_id').references('instruments.id')
    table.integer('instructor_id').notNullable()
    table.foreign('instructor_id').references('users.id')
    table.integer('pupil_id').defaultsTo(null)
    table.foreign('pupil_id').references('users.id')
    table.string('address').notNullable().defaultsTo('')
    table.integer('lesson_price').notNullable().defaultsTo(50)
    table.string('date').notNullable().defaultsTo('')
    table.string('time').notNullable().defaultsTo('')
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('lessons')
};
