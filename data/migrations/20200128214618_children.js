exports.up = async function(knex) {
    await knex.schema.createTable("children", (table) => {
        table.increments()
        table.string("name")
            .notNullable()
        table.integer("age")
        table.string("weight")
        table.integer("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("children")
};
