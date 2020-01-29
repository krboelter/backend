exports.up = function(knex) {
    knex.schema.createTable("entries", (table) => {
        table.increments()
        table.integer("children_id")
            .notNullable()
            .references("id")
            .inTable("children")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
        table.integer("food_id")
            .notNullable()
            .references("id")
            .inTable("foods")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
        table.string("amount")
            .notNullable()
        table.date("date")
            .notNullable()
    })
};

exports.down = function(knex) {
    knex.schema.dropTableIfExists("entries")
};
