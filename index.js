const express = require("express")
const server = express()
const authRouter = require("./auth/users")

server.use(express.json())
server.use("/api/auth", authRouter)

server.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Welcome to the website!"
    })
})

server.get((error, req, res, next) => {
    console.log("Error: ", error)

    res.status(500).json({
        message: "Internal server error...",
        error
    })
})

const host = process.env.HOST || "http://localhost"
const port = process.env.PORT || 5001

server.listen(port, () => {
    console.log(`\n***Server listening at ${host}:${port}***\n`)
})