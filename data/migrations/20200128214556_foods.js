exports.up = function(knex) {
    knex.schema.createTable("foods", (table) => {
        table.increments()
        table.string("food_name")
            .notNullable()
            .unique()
        table.string("category")
            .notNullable()
    })
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists("foods")
};
