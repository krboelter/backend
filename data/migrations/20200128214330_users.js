exports.up = async function(knex) {
    await knex.schema.createTable("users", (table) => {
        table.increments()
            .unique()
        table.string("username")
            .notNullable()
            .unique()
        table.string("password")
            .notNullable()
        table.string("first_name")
        table.string("last_name")
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users")
};
