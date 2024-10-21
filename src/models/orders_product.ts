import Client from "../database";

export type OrdersProduct = {
    id?: number,
    order_id: number,
    product_id: number,
    quantity: number
}

export class OrdersProductStore {
    
    async create(op: OrdersProduct): Promise<OrdersProduct> {
        try {
            const sql = 'INSERT INTO orders_product (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
            const conn = await Client.connect()
        
            const result = await conn
                .query(sql, [op.order_id, op.product_id, op.quantity])
        
            const order = result.rows[0]
        
            conn.release()
        
            return order
        } catch (err) {
            throw new Error(`Could not create order_product ${op.order_id}. Error: ${err}`)
        }
    }
}