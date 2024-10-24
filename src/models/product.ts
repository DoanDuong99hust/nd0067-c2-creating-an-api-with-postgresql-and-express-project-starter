import Client from '../database';

export type Product = {
    id?: number,
    name: string,
    price: number
}

export class ProductStore {
    async index(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM product'
            const conn = await Client.connect()
      
            const result = await conn.query(sql)
      
            conn.release()
      
            return result.rows 
        } catch (err) {
            throw new Error(`Could not get products. Error: ${err}`)
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const sql = 'SELECT * FROM product WHERE id=($1)'

            const conn = await Client.connect()    
            const result = await conn.query(sql, [id])
        
            conn.release()
        
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }
    
    async create(p: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO product (name, price) VALUES($1, $2) RETURNING *'
            const conn = await Client.connect()
        
            const result = await conn
                .query(sql, [p.name, p.price])
        
            const product = result.rows[0]
        
            conn.release()
        
            return product
        } catch (err) {
            throw new Error(`Could not add new book ${p.name}. Error: ${err}`)
        }
    }

    async truncate() {
        try {
            const sql = 'TRUNCATE product RESTART IDENTITY CASCADE'
            // @ts-ignore
            const conn = await Client.connect()
        
            await conn.query(sql)
        
            conn.release()
        } catch (err) {
            throw new Error(`Could not truncate data. Error: ${err}`)
        }
    }
}