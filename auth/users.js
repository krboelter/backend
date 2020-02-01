const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")

const restricted = require("../middleware/restricted")
const generateToken = require("./token")
const usersModel = require("./users-model")
const entries = require("../children/entries")

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
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await usersModel.findBy({ username }).first()
        const verifyPassword = await bcrypt.compare(password, user.password)
        

        if (user && verifyPassword) {
            const token = await generateToken(user)

            res.status(200).json({
                message: `Welcome ${user.username}`,
                token
            })
        } else {
            res.status(401).json({
                message: "Invalid credentials"
            })
        }
    } catch(err) {
        next(err)
    }
})

router.get("/users/:id", restricted, async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await usersModel.findById(id)
        const data = await usersModel.findChildren(id)
        
        res.status(200).json({
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            children: data // returns an array of children
        })
        
    } catch(err) {
        console.log("Unable to log you in...")
        next(err)
    }
})

// not necessary, but if you want to use it...
router.get("/users/logout", restricted, async (req, res, next) => {
    try {
        res.status(200).json({
            message: "You have been logged out."
        })
    } catch(err) {
        next(err)
    }
})

router.use("/users", restricted, entries)

module.exports = router