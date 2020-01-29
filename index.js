const express = require("express")
const server = express()

server.use(express.json())

server.get((error, req, res, next) => {
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