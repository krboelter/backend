exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          username: "Test",
          password: "test123",
          first_name: "Testie",
          last_name: "Tester",
        }
      ]);
    })
};
