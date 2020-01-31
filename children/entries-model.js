const db = require("../data/dbconfig")

// function findChildrenId(parentId) {
//     return db("children")
//         .where("id", parentId)
//         .select("id")
// }

function getAllEntries(parentId) {
    const entries = db("entries")
        .join()
}

module.exports = {
    findChildrenId,
    getAllEntries
}