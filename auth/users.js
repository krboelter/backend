const express = require("express")
const router = express.Router()
const usersModel = require("./users-model")

router.post("/register", async (req, res, next) => {
    try {
        const username = req.body.username
        const password = req.body.password

        if (req.body.password.length < 6) {
            return res.status(400).json({
                message: "Password must contain 6 or more characters."
            })
        } else if(!username || !password) {
            return res.status(400).json({
                message: "Both a username and a password are required."
            })
        }else {
            const added = await usersModel.add(req.body)
            const user = await usersModel.findBy({username})

    
            res.status(201).json({
                message: "User has been created",
                newUser: user
            })
        }
    } catch(err) {
        console.log(err)
        if (err) {
            res.status(401).json({
                message: "User could not be created"
            })
        } else {
            next(err)
        }
    }
})

module.exports = router