const db = require("../../data/dbconfig")

// creates a new child
async function createChild(id, child) {
    const [newChild] = await db("children").insert(child)
    const result = await findChild(newChild, id).first()

    return result
}

// changes the child using the child's name
async function editChild(name, change) {
    const changes = await db("children")
        .where({ name })
        .update(change)
    const result = await findChildByName(name).first()

    return result
}

// deletes a child
function deleteChild(name) {
    return db("children")
        .where({ name })
        .del()
}

function findChild(childId, userId) {
    return db("children")
    .where({
        id: childId,
        user_id: userId
    })
}

function findChildByName(name) {
    return db("children")
        .where("name", name)
}

module.exports = {
    createChild,
    editChild,
    findChild,
    deleteChild
}