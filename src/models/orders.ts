import Client from "../database";

export type Orders = {
    id?: number,
    user_id: number,
    order_status: string
}

export class OrdersStore {
    async index(): Promise<Orders[]> {
        try {
            const sql = 'SELECT * FROM orders'
            const conn = await Client.connect()
      
            const result = await conn.query(sql)
      
            conn.release()
      
            return result.rows 
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`)
        }
    }

    async show(id: number): Promise<Orders> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'

            const conn = await Client.connect()    
            const result = await conn.query(sql, [id])
        
            conn.release()
        
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
    }

    async showByUserId(user_id: number) {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1)'

            const conn = await Client.connect()    
            const result = await conn.query(sql, [user_id])
        
            conn.release()
        
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order for user ${user_id}. Error: ${err}`)
        }
    }
    
    async create(o: Orders): Promise<Orders> {
        try {
            const sql = 'INSERT INTO orders (user_id, order_status) VALUES($1, $2) RETURNING *'
            const conn = await Client.connect()
        
            const result = await conn
                .query(sql, [o.user_id, o.order_status])
        
            const order = result.rows[0]
        
            conn.release()
        
            return order
        } catch (err) {
            throw new Error(`Could not add new order ${o.user_id}. Error: ${err}`)
        }
    }

    async truncate() {
        try {
            const sql = 'TRUNCATE orders RESTART IDENTITY CASCADE'
            // @ts-ignore
            const conn = await Client.connect()
        
            await conn.query(sql)
        
            conn.release()
        } catch (err) {
            throw new Error(`Could not truncate data. Error: ${err}`)
        }
    }
}