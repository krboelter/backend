const express = require("express")
const router = express.Router()
const foodsModel = require("./foods-model")

router.post("/", async (req, res, next) => {
    try {
        const newFood = req.body
        const added = await foodsModel.addFood(newFood)

        res.status(201).json({
            message: "Food has been created.",
            added
        })
    } catch(err) {
        next(err)
    }
})

router.get("/", async (req, res, next) => {
    try {
        const foods = await foodsModel.getFoods()

        res.status(200).json({
            foods
        })
    } catch(err) {
        next(err)
    }
})

module.exports = router