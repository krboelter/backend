exports.up = async function(knex) {
    await knex.schema.createTable("foods", (table) => {
        table.increments()
        table.string("food_name")
            .notNullable()
            .unique()
        table.string("category")
            .notNullable()
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("foods")
};
