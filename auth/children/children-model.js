const db = require("../../data/dbconfig")

// creates a new child
async function createChild(id, child) {
    return db("children").insert(child).returning("*")
}

// changes the child using the child's name
async function editChild(name, change) {
    return db("children")
        .where({ name })
        .update(change)
        .returning("*")
    
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