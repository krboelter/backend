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

beforeAll(async () => {
    await db.seed.run()
})

describe("website testing", () => {

    test("gets foods", async () => {
        const res = await supertest(server)
        .get("/api/foods")
            
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
        const login = await loginUser("ken", "abc123")
        const res = await supertest(server)
            .get("/api/auth/users/3")
            .set("token", login.body.token)
        
        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.username).toEqual("ken")
    })

    test("creates a child", async () => {
        const login = await loginUser("Test", "test123")
        const res = await supertest(server)
            .post("/api/auth/users/1/children")
            .send({
                name: "Avery",
                age: 1,
                weight: "20 pounds"
            })
            .set("token", login.body.token)

        const newChild = await db("children")
            .where("id", res.body.newChild[0])
            .select("weight")
            .first()
        
        expect(res.status).toBe(201)
        expect(res.type).toBe("application/json")
        expect(newChild.weight).toEqual("20 pounds")
    })

    test("gets entries for a user", async () => {
        const login = await loginUser("Test", "test123")
        const res = await supertest(server)
            .get("/api/auth/users/1/entries")
            .set("token", login.body.token)

        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.entries.length).toBeGreaterThan(0)
    })

    test("deletes a user", async () => {
        await createUser("ken", "abc123")
        const login = await loginUser("ken", "abc123")
        const res = await supertest(server)
            .delete("/api/auth/users/2")
            .set("token", login.body.token)

        expect(res.status).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.message).toEqual("User 2 has been deleted.")
    })

    test("edit a user's first and last name", async () => {
        await createUser("ken", "abc123")
        const login = await loginUser("ken", "abc123")
        const res = await supertest(server)
            .put("/api/auth/users/2")
            .send({ first_name: "Kenneth" })
            .set("token", login.body.token)
        
        console.log(res.body, "EDIT USER")
        
        expect(res.status).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body).toEqual({
            id: 2,
            username: "ken",
            password: "abc123",
            first_name: "Kenneth",
            last_name: "Boelter"
        })
    })
})