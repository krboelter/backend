const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const usersModel = require("./users-model")

router.post("/users", async (req, res, next) => {
    try {
        const username = req.body.username
        const password = req.body.password

        if (req.body.password < 6) {
            res.status(400).json({
                message: "Please create a password with 6 characters minimum."
            })
        } else if(!username || !password) {
            res.status(400).json({
                message: "Both a username and a password is required."
            })
        }else {
            const newUser = await usersModel.add(req.body)
            const user = await usersModel.findBy(req.body.username)
    
            res.status(201).json({
                message: "User has been created",
                newUser: user
            })
        }
    } catch(err) {
        res.status(401).json({
            message: "User could not be created"
        })
    }
})

module.exports = router