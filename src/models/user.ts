import Client, { pepper, saltRounds } from "../database";
import bcrypt from 'bcrypt'

export type User = {
    id?: number,
    first_name: string,
    last_name: string,
    username: string,
    password: string
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM user_'
            const conn = await Client.connect()
      
            const result = await conn.query(sql)
      
            conn.release()
      
            return result.rows 
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async show(id: number): Promise<User> {
        try {
            const sql = 'SELECT * FROM user_ WHERE id=($1)'

            const conn = await Client.connect()    
            const result = await conn.query(sql, [id])
        
            conn.release()
        
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }
    
    async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO user_ (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *'
            const conn = await Client.connect()

            const hash = bcrypt.hashSync(
                u.password + pepper, 
                parseInt(saltRounds!)
              );
              console.log(u);
              
            const result = await conn.query(sql, [u.first_name, u.last_name, u.username, hash])
            
            const user = result.rows[0]
        
            conn.release()
        
            return user
        } catch (err) {
            throw new Error(`Could not add new user ${u.first_name + u.last_name}. Error: ${err}`)
        }
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await Client.connect()
        const sql = 'SELECT password FROM user_ WHERE username=($1)'
    
        const result = await conn.query(sql, [username])
        
        if(result.rows.length) {
    
          const user = result.rows[0]
    
          console.log(user)
    
          if (bcrypt.compareSync(password+pepper, user.password_digest)) {
            return user
          }
        }
    
        return null
      }
}

