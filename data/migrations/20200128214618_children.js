exports.up = function(knex) {
    knex.schema.createTable("children", (table) => {
        table.increments()
        table.string("name")
            .notNullable()
        table.age()
        table.integer("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
    })
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists("children")
};
