const db = require("../../data/dbconfig")
const allFoods = db("foods").select()

// adds an entry for a child
async function addEntry(id, childName, entry) {
    const foodId = await filterFoodWithName(entry.food_name).first()
    const childId = await filterChildWithName(childName).first()
    const amount = entry.amount
    const date = entry.date
    
    if (foodId == undefined) {
        return "There is no food with that name."
    } else {
        const [newEntry] = await db("entries")
        .insert({ user_id: id, children_id: childId.id, food_id: foodId.id, amount, date})
        const newId = await findEntryById(newEntry).first()
        
        return newId
    }
    
}

// gets all the entries
async function getAllEntries(id) {
    const entries = await db("entries")
        .join("children", "entries.children_id", "=", "children.id")
        .join("foods", "entries.food_id", "=", "foods.id")
        .select("entries.id", "children.id", "children.name", "entries.user_id", "foods.food_name", "foods.category", "entries.amount", "entries.date")

        console.log(entries)
    return filterChildren(entries, id)
}

// edit an entry
async function editEntry(entryId, changes) {
    
    console.log(changes)
    if (!changes.food_name) {
        console.log("No Food Changes")
        const updates = await db("entries")
            .where("id", entryId)
            .update(changes)
        
        const newEntry = await findEntryById(updates)
        
        return newEntry
    } else {
        const foodId = await filterFoodWithName(changes.food_name).first()

        if (foodId == undefined) {
            return "There is no food with that name."
        } else {
            console.log("Food Changes")
            console.log(foodId.id, changes.amount)
            const updates = await db("entries")
                .where("id", entryId)
                .update({ food_id: foodId.id, amount: changes.amount, date: changes.date })
    
            
            const newEntry = await findEntryById(updates)
            return newEntry
        }
    }
}

// delete an entry
async function deleteEntry(id, name) {
    const deleted = await db("entries")
        .where({ id, name})
        .first()
    const deleteIt = await db("entries")
        .where({ id, name })
        .del()
    
    return deleted
}

// filters the child per the user id
function filterChildren(array, id) {
    const children = []
    
    for (let i = 0; i < array.length; i++) {
        console.log(array[i].id, id, "These are the id's")
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

// gets the food object filtered by the food name
function filterFoodWithName(food) {
    return db("foods").where({ "food_name": food })
}

// gets the child object filtered by the child's name
function filterChildWithName(name) {
    return db("children").where({ "name": name })
}

module.exports = {
    getAllEntries,
    addEntry,
    editEntry,
    deleteEntry
}