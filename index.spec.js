const supertest = require("supertest")
const db = require("./data/dbconfig")
const server = require("./index")

beforeEach(async () => {
    await db.seed.run()
})

test("create a new user", async () => {
    const res = await supertest(server)
        .post("/api/auth/register")
        .send({
            username: "Kenneth",
            password: "testpassword"
        })
    
    expect(res.status).toBe(201)
})