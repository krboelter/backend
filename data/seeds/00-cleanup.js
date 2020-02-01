exports.seed = async (knex) => {
    await knex("foods").truncate()
    await knex("entries").truncate()
    await knex("children").truncate()
    await knex("users").truncate()
}