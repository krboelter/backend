exports.seed = async (knex) => {
    await knex("entries").truncate()
    await knex("children").truncate()
    await knex("foods").truncate()
    await knex("users").truncate()
}