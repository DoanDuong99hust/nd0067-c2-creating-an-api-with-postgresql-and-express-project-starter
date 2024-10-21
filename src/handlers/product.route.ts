import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import jwt from 'jsonwebtoken'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
   const product = await store.show(+req.params.id)
   res.json(product)
}

const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader!.split(' ')[1]
    jwt.verify(token, token)
  } catch(err) {
      res.status(401)
      res.json('Access denied, invalid token')
      return
  }
  try {
    const product: Product = {
        name: req.body.name,
        price: req.body.price
    }

    const newProduct = await store.create(product)
    res.json(newProduct)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
}

const productsRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', create)
}

export default productsRoutes