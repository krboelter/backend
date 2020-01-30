const bcrypt = require("bcryptjs")
const db = require("../data/dbconfig")

async function add(user) {
    user.password = await bcrypt.hash(user.password, 14)
    const [newUser] = db("users").insert(user)

    return findById(newUser)
}

function findById(id) {
    db("users").where({ id }).first()
}

function findBy(filter) {
    const user = db("users")
        .where(filter)
        .select("id", "username", "first_name", "last_name")

    return user
}

module.exports = {
    add,
    findById,
    findBy
}