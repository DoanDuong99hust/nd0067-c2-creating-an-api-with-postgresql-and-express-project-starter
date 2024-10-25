import app from '../../server' // Link to your server file
import supertest from 'supertest'
const request = supertest(app)

let mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsIl9maXJzdF9uYW1lIjoiZHVvbmciLCJfbGFzdF9uYW1lIjoiZG9hbiIsImlhdCI6MTcyOTc0MTUwOH0.p8fPz7Gx8zjEkdDLIjVn-o-bq7gbPx4k9XBVa5j6m6w'
let userId = 1
let orderId = 1

describe("GET /orders", () => {
    it("should return all orders", async () => {
        return supertest(app)
            .get("/orders")
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
    });
});

describe("POST /orders", () => {
    it("should create a order", async () => {
        return supertest(app)
            .post("/orders")
            .send({
                    user_id: 1,
                    product_ids: [1,2,3],
                    product_quantities: [1,1,1],
                    order_status: 'DONE'
                })
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)

    });
});

describe("GET /orders/:id", () => {
    it('should return order with coresponding id', async () => {
        return supertest(app)
            .get(`/orders/${orderId}`)
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
    });
})

describe("GET /orders/user/:user_id", () => {
    it('should return order of user', async () => {
        return supertest(app)
            .get(`/orders/user/${userId}`)
            .set('Authorization', `Bearer ${mockToken}`)
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
    });
})
