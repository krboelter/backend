const bcrypt = require("bcryptjs")
const hash = async(password) => await bcrypt.hash(password, 14)

exports.seed = function(knex) {
  return knex('users').del()
    .then(async function () {
      return knex('users').insert([
        {
          username: "Test",
          password: `${await hash('test123')}`,
          first_name: "Testie",
          last_name: "Tester",
        }
      ]);
    })
};