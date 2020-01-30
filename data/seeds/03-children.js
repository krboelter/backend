exports.seed = function(knex) {
  return knex('children').del()
    .then(function () {
      return knex('children').insert([
        { name: "Test Child", age: 2, user_id: 1 }
      ]);
    });
};
