// this middleware needs to check the ID of the user
// to make sure they can only make changes to their own account
// not other people's accounts

const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const id = req.params.id || req.params.userId

    const payload = jwt.decode(req.headers.token, {complete: true})
    console.log(req.params.id)

    if (payload.payload.subject != id) {
        res.status(401).json({
            message: "You are not permited to access this page."
        })
    } else {
        next()
    }
}