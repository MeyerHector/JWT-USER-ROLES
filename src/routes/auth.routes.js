import { Router } from 'express'
import { validateSchema } from '../middlewares/express-validator.js'
import { createUserSchema, loginUserSchema } from '../models/schemas/user.schema.js'
import { ctrlLoginUser, ctrlRegisterUser } from '../controllers/auth.controllers.js'

export const authRouter = Router()

authRouter.post('/api/register', createUserSchema, validateSchema, ctrlRegisterUser)
authRouter.post('/api/login', loginUserSchema, validateSchema, ctrlLoginUser)