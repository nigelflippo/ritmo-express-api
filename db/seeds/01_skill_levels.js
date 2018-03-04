exports.seed = function(knex, Promise) {
  return knex('skill_levels').insert([
    {
      id: 1,
      skill_level: 'Beginner'
    },
    {
      id: 2,
      skill_level: 'Novice'
    },
    {
      id: 3,
      skill_level: 'Intermediate'
    },
    {
      id: 4,
      skill_level: 'Advanced'
    },
    {
      id: 5,
      skill_level: 'Performance'
    }
  ])
};
