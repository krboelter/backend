const express = require("express")
const router = express.Router()

const restricted = require("../middleware/restricted")
const usersModel = require("../auth/users-model")
const entriesModel = require("./entries-model")

//gets all entries
router.get("/:id/children/entries", async (req, res, next) => {
    try {
        
    } catch(err) {
        next(err)
    }

    // what it should return:
    // an array of the children's entries but:
    // children_id = name
    // food_id = food_name
})

module.exports = router