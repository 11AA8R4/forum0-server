import { Router } from 'express'
//middlewares
import multer from '../app/middlewares/multer'
import createUserMiddleware from '../app/middlewares/createUser'
import authMiddleware from '../app/middlewares/auth'
//controllers
import UserController from '../app/controllers/UserController'
import SessionController from '../app/controllers/SessionController'
import CommentController from '../app/controllers/CommentController'
import PostController from '../app/controllers/PostController'

const routes = new Router();

routes.use(multer.send)
//offline routes

//post
routes.post('/users',createUserMiddleware,UserController.createUser)//Create
routes.post('/sessions',SessionController.store)//Login

//put
routes.put('/sessions',SessionController.auth)//Authenticate

// -              -               -                -
//online
routes.use(authMiddleware)

//users
routes.put('/users/:uid',UserController.delete)//delete User

routes.get('/posts',PostController.read)//delete User
routes.post('/posts',PostController.createPost)//delete User
routes.put('/like/:pid',PostController.like)//delete User
routes.post('/comments/:pid',PostController.comment)//delete User

export default routes;
