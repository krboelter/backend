const express = require("express")
const router = express.Router()

const entriesModel = require("./entries-model")

//gets all entries
router.get("/:id/entries", async (req, res, next) => {
    try {
        const entries = await entriesModel.getAllEntries(req.params.id)

        res.status(200).json({
            message: "Retrieving entries successful!",
            entries: entries
        })
    } catch(err) {
        next(err)
    }
})

module.exports = router