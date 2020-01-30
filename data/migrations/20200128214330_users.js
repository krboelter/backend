exports.up = async function(knex) {
    await knex.schema.createTable("users", (table) => {
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
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users")
};
