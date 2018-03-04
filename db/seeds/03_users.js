exports.seed = function(knex, Promise) {
  return knex('users').insert([
    {
      id: 1,
      first_name: 'nigel',
      last_name: 'flippo',
      username: 'nigelflippo',
      email: 'nigel.flippo@gmail.com',
      phone_number: '3036195321',
      address: '80302',
      password: '$2a$10$QGjnoIkFWtsHOJdAsWUiJ.hu4Vmm5zo0RZgUcDGXHXmdvfDV3.jI2',
      skill_level_id: 5,
      instrument_id: 1,
      bio: 'New User',
      admin: true,
      instructor: true
    }
  ]).then(() => {
    return knex.raw(
      `SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`
    )
  })
};
