
exports.up = (knex, Promise) => {
  return knex.schema.createTable('skill_levels', table => {
    table.increments()
    table.string('skill_level').notNullable().defaultsTo('')
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('skill_levels')
};
