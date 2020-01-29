exports.up = function(knex) {
    knex.schema.createTable("users", (table) => {
        table.increments()
        table.string("username")
            .notNullable()
            .unique()
        table.string("password")
            .notNullable()
        table.string("first_name")
            .notNullable()
        table.string("last_name")
            .notNullable()
        table.integer("foods_id")
            .notNullable()
            .references("id")
            .inTable("foods")
    })
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists("users")
};
