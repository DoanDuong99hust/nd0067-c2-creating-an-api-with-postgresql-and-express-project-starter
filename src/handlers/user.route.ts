import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt from 'jsonwebtoken'
import { tokenSecret } from '../database'
const store = new UserStore()

const index = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        jwt.verify(token, tokenSecret!)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
  const users = await store.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
    try {
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader!.split(' ')[1]
        
        jwt.verify(token, tokenSecret!)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
   const user = await store.show(+req.params.id)
   res.json(user)
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password
        }
        
        const newUser = await store.create(user)
        var token =  jwt.sign({ _id: newUser.id, _first_name: newUser.first_name, _last_name: newUser.last_name }, tokenSecret!);
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const user = await store.authenticate(req.body.usename, req.body.password)
        var token = jwt.sign({ u_id: user?.id, _first_name: user?.first_name, _last_name: user?.last_name }, tokenSecret!);
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const usersRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', create)
  app.post('/users/authentication', authenticate)
}

export default usersRoutes