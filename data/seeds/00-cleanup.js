exports.seed = async (knex) => {
    await knex("children").truncate()
    await knex("entries").truncate()
    await knex("foods").truncate()
    await knex("users").truncate()
}