// @ts-ignore
import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV,
    BCRYPT_PASSWORD,
    SALT_ROUND,
    TOKEN_SECRET
} = process.env 

let client
console.log(ENV)

if(ENV === 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
  }
  
if(ENV === 'dev') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}
const Client = client;
export default Client!;
export const pepper = BCRYPT_PASSWORD;
export const saltRounds = SALT_ROUND;
export const tokenSecret = TOKEN_SECRET;