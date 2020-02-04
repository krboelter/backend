const db = require("../../data/dbconfig")

// function findChildrenId(parentId) {
//     return db("children")
//         .where("id", parentId)
//         .select("id")
// }

async function getAllEntries(id) {
    const entries = await db("entries")
        .join("children", "entries.children_id", "=", "children.id")
        .join("foods", "entries.food_id", "=", "foods.id")
        .select("children.id", "children.name", "entries.user_id", "foods.food_name", "foods.category", "entries.amount", "entries.date")

    return filterChildren(entries, id)
}

function filterChildren(array, id) {
    const children = []
    
    for (let i = 0; i < array.length; i++) {
        console.log(array[i].user_id, id, "These are the id's")
        if (array[i].user_id == id) {
            children.push(array[i])
        }
    }
    return children
}

module.exports = {
    // findChildrenId,
    getAllEntries
}