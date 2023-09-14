import { Router } from 'express'
import { validateSchema } from '../middlewares/express-validator.js'
import { ctrlCreateUser, ctrlGetAllUsers, ctrlUpdateUser } from '../controllers/user.controllers.js'
import { ctrlRegisterUser } from '../controllers/auth.controllers.js'
import { createUserSchema } from '../models/schemas/user.schema.js'

export const userRoutes = Router()

userRoutes.get('/api/users', ctrlGetAllUsers)

userRoutes.post('/api/user', createUserSchema, validateSchema, ctrlCreateUser)

userRoutes.put('/api/user', ctrlUpdateUser)