import app from '../../server' // Link to your server file
import supertest from 'supertest'
const request = supertest(app)

let mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsIl9maXJzdF9uYW1lIjoiZHVvbmciLCJfbGFzdF9uYW1lIjoiZG9hbiIsImlhdCI6MTcyOTc0MTUwOH0.p8fPz7Gx8zjEkdDLIjVn-o-bq7gbPx4k9XBVa5j6m6w'
let userId = 1

describe("GET /users", () => {
    it("should return all users", async () => {
        return supertest(app)
            .get("/users")
            .set('Authorization', `Bearer ${mockToken}`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
    });
});

describe("POST /users", () => {
    it("should create a user", async () => {
        return supertest(app)
            .post("/users")
            .send({
                first_name: 'first name 1',
                last_name: 'last name 1',
                username: 'adtest 1',
                password: '1'
            })
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)

    });
});

describe("GET /users/:id", () => {
    it('should return user with coresponding id', async () => {
        return supertest(app)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${mockToken}`)
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
    });
})

describe("POST /users/authentication", () => {
    it("should authenticate user credential", async () => {
        return supertest(app)
            .post("/users/authentication")
            .send({
                username: 'ad',
                password: '1'
            })
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)

    });
});
