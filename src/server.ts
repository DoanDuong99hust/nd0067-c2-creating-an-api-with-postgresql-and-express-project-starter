import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import ordersRoutes from './handlers/orders.route'
import productsRoutes from './handlers/product.route'
import usersRoutes from './handlers/user.route'

const app: express.Application = express()
const address: string = "localhost:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

ordersRoutes(app)
productsRoutes(app)
usersRoutes(app)