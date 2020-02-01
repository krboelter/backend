const bcrypt = require("bcryptjs")
const db = require("../data/dbconfig")

async function add(user) {
    user.password = await bcrypt.hash(user.password, 14)
    return db("users").insert(user).returning('*')
}

function findById(id) {
    return db("users").where({ id }).first()
}

function findBy(filter) {
    const user = db("users")
        .where(filter)
        .select("id", "username", "first_name", "last_name", "password")

    return user
}

function findChildren(parentId) {
    return db("children")
        .where("id", parentId)
        .select("id", "name", "age")
}

module.exports = {
    add,
    findById,
    findBy,
    findChildren
}