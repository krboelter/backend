const db = require("../data/dbconfig")

function addFood(food) {
    return db("foods").insert(food).returning("*")
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