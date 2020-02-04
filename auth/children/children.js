const express = require("express")
const router = express.Router()

const childrenModel = require("./children-model")

// creates a child under user id
router.post("/:id/children", (req, res, next) => {
    const child = req.body
})

module.exports = router