exports.up = async function(knex) {
    await knex.schema.createTable("entries", (table) => {
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

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("entries")
};
