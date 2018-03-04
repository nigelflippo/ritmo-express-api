
exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('first_name').notNullable().defaultsTo('')
    table.string('last_name').notNullable().defaultsTo('')
    table.string('username').notNullable().defaultsTo('')
    table.string('email').notNullable().unique()
    table.string('phone_number').notNullable().defaultsTo('')
    table.string('address').notNullable().defaultsTo('')
    table.specificType('password', 'char(60)').notNullable()
    table.integer('skill_level_id').notNullable()
    table.foreign('skill_level_id').references('skill_levels.id')
    table.integer('instrument_id').notNullable()
    table.foreign('instrument_id').references('instruments.id')
    table.text('bio').notNullable().defaultTo('New User')
    table.boolean('admin').notNullable().defaultsTo(false)
    table.boolean('instructor').notNullable().defaultsTo(false)
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'))
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'))
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
};
