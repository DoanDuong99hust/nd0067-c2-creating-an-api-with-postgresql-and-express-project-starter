import Client from "../database";

export type OrdersProduct = {
    id?: number,
    order_id: number,
    product_id: number,
    quantity: number
}

export class OrdersProductStore {

    async index(): Promise<OrdersProduct[]> {
        try {
            const sql = 'SELECT * FROM orders_product'
            const conn = await Client.connect()
      
            const result = await conn.query(sql)
      
            conn.release()
      
            return result.rows 
        } catch (err) {
            throw new Error(`Could not get orders_product. Error: ${err}`)
        }
    }

    async show(id: number): Promise<OrdersProduct> {
        try {
            const sql = 'SELECT * FROM orders_product WHERE id=($1)'

            const conn = await Client.connect()    
            const result = await conn.query(sql, [id])
        
            conn.release()
        
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
    }

    async showByOrderId(order_id: number) {
        try {
            const sql = 'SELECT * FROM orders_product WHERE order_id=($1)'

            const conn = await Client.connect()    
            const result = await conn.query(sql, [order_id])
        
            conn.release()
        
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find orders_product list for order ${order_id}. Error: ${err}`)
        }
    }

    async showByProductId(product_id: number) {
        try {
            const sql = 'SELECT * FROM orders_product WHERE product_id=($1)'

            const conn = await Client.connect()    
            const result = await conn.query(sql, [product_id])
        
            conn.release()
        
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find orders_product list for product ${product_id}. Error: ${err}`)
        }
    }
    
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