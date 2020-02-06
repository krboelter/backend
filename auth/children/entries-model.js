const db = require("../../data/dbconfig")
const allFoods = db("foods").select()

// gets all the entries
async function getAllEntries(id) {
    const entries = await db("entries")
        .join("children", "entries.children_id", "=", "children.id")
        .join("foods", "entries.food_id", "=", "foods.id")
        .select("children.id", "children.name", "entries.user_id", "foods.food_name", "foods.category", "entries.amount", "entries.date")

    return filterChildren(entries, id)
}

// adds an entry for a child
async function addEntry(id, childName, entry) {
    // gets the food object filtered by the food_name {id, food_id, category}
    const foodId = await db("foods").where({ "food_name": entry.food_name }).first()
    const childId = await db("children").where({ "name": childName }).first()
    const amount = entry.amount
    const date = entry.date

    if (foodId == undefined) {
        return "There is no food with that name"
    } else {
        const [newEntry] = await db("entries")
            .insert({ user_id: id, children_id: childId.id, food_id: foodId.id, amount, date})
        const newId = await findEntryById(newEntry).first()

        return newId
    }

}

// filters the child per the user id
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

// finds an entry by the id
function findEntryById(id) {
    return db("entries")
        .where({ id })
}

module.exports = {
    getAllEntries,
    addEntry
}