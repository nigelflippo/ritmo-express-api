
exports.up = (knex, Promise) => {
  return knex.schema.createTable('instruments', table => {
    table.increments()
    table.string('instrument').notNullable().defaultsTo('')
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('instruments')
};
