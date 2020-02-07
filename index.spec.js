const supertest = require("supertest")
const db = require("./data/dbconfig")
const server = require("./index")

function createUser(username, password) {
    return supertest(server)
        .post("/api/auth/register")
        .send({
            username: username,
            password: password
        })
}

function loginUser(username, password) {
    return supertest(server)
        .post("/api/auth/login")
        .send({
            username,
            password
        })
}

function getPassword(username) {
    return db("users")
        .where({ username })
        .select("password")
        .first()
}

beforeAll(async () => {
    await db.seed.run()
})

describe("website testing", () => {

    test("gets foods", async () => {
        const res = await supertest(server)
        .get("/api/foods")
            
        console.log(res.body.foods.length, "LENGTH OF FOOD ARRAY")
        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.foods.length).toBeGreaterThan(2)
    })
    
    test("create a new user", async () => {
        const res = await createUser("Kenneth", "testpassword")
        
        expect(res.status).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("User has been created")
    })

    test("password must be > 6", async () => {
        const res = await createUser("ken", "abc12")
        
        expect(res.status).toBe(400)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toBe("Password must contain 6 or more characters.")
    })
    
    test("gets user information", async () => {
        await createUser("ken", "abc123")
        const pass = await getPassword("ken")
        await loginUser("ken", pass)
        const res = await supertest(server)
            .get("/api/auth/users/1")
        
        
        expect(res.status).toBe(200)
    })

    test("creates a child", async () => {
        const pass = await getPassword("Test")
        await loginUser("Test", pass)
        const res = await supertest(server)
            .post("/api/auth/users/2/children")
            .send({
                name: "Avery",
                age: 1,
                weight: "20 pounds"
            })
        
        expect(res.status).toBe(201)
    })

    test("gets entries for a user", async () => {
        const pass = await getPassword("Test")
        await loginUser("Test", pass)
        const res = await supertest(server)
            .get("/api/auth/users/1/entries")

        console.log(res.body)
        expect(res.status).toBe(200)
    })

    test("deletes a user", async () => {
        await createUser("ken", "abc123")
        const pass = getPassword("ken")
        await loginUser("ken", pass)
        const res = await supertest(server)
            .delete("/api/auth/users/2")

        expect(res.status).toBe(200)
    })
})