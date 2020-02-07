const db = require("../data/dbconfig")

async function addFood(food) {
    const [id] = await db("foods").insert(food).returning("*")

    return getFoodById(id)
}

function getFoods() {
    return db("foods")
        .select()
}

function getFoodById(id) {
    return db("foods")
        .where({ id })
        .select("food_name", "category")
}

module.exports = {
    addFood,
    getFoods
}