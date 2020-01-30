exports.seed = function(knex) {
  return knex('foods').del()
    .then(function () {
      return knex('foods').insert([
        { food_name: "Banana", category: "Fruit" },
        { food_name: "Carrot", category: "Vegetable" },
        { food_name: "Bread", category: "Grains" }
      ]);
    })
};
