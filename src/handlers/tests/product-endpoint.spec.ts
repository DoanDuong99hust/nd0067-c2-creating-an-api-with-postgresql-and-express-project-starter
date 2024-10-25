import app from '../../server' // Link to your server file
import supertest from 'supertest'
const request = supertest(app)

let mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsIl9maXJzdF9uYW1lIjoiZHVvbmciLCJfbGFzdF9uYW1lIjoiZG9hbiIsImlhdCI6MTcyOTc0MTUwOH0.p8fPz7Gx8zjEkdDLIjVn-o-bq7gbPx4k9XBVa5j6m6w'
let productId = 1

describe("GET /products", () => {
    it("should return all products", async () => {
        return supertest(app)
            .get("/products")
            .set('Authorization', `Bearer ${mockToken}`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
    });
});

describe("POST /products", () => {
    it("should create a product", async () => {
        return supertest(app)
            .post("/products")
            .send({
                    name: 'product 1',
                    price: 100
                })
            .set('Authorization', `Bearer ${mockToken}`)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)

    });
});

describe("GET /products/:id", () => {
    it('should return user with coresponding id', async () => {
        return supertest(app)
            .get(`/products/${productId}`)
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
    });
})