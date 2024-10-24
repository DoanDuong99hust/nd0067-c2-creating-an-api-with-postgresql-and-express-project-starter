import express, { Request, Response } from 'express'
import { Orders, OrdersStore } from '../models/orders'
import { OrdersProduct, OrdersProductStore } from '../models/orders_product'
import jwt from 'jsonwebtoken'
import { tokenSecret } from '../database';

const store = new OrdersStore();
const orderProductStore = new OrdersProductStore();

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await store.index()
        res.json(orders)
    } catch (error) {
        res.status(404)
        res.json('Dont have any order')
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const order = await store.show(+req.params.id)
        res.json(order)
    } catch (error) {
        res.status(404)
        res.json('Cannot find order: ' + +req.params.id)
    }
}

const showByUser = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        jwt.verify(token, tokenSecret!)
      } catch(err) {
          res.status(401)
          res.json('Access denied, invalid token')
          return
      }
    const order = await store.showByUserId(+req.params.id)
    res.json(order)
}

const create = async (req: Request, res: Response) => {
    try {
        const order: Orders = {
            user_id: req.body.user_id,
            order_status: req.body.order_status
        }

        const newOrder = await store.create(order)
        let product_ids = req.body.product_ids;
        let product_quantities = req.body.product_quantities;
        for (let index = 0; index < product_ids.length; index++) {
            const order_product: OrdersProduct = {
                order_id: newOrder.id!,
                product_id: product_ids[index],
                quantity: product_quantities[index]
            }
            orderProductStore.create(order_product)
        }
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const ordersRoutes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/orders/:id', show)
  app.get('/orders/user/:user_id', showByUser)
  app.post('/orders', create)
}

export default ordersRoutes