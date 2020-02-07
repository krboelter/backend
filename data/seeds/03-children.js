exports.seed = function(knex) {
  return knex('children').del()
    .then(function () {
      return knex('children').insert([
        { name: "Test Child", age: 2, weight: "25 lbs", user_id: 1 }
      ]);
    });
};
