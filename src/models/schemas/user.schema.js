import { body } from 'express-validator'
import { getUserByEmail, getUserByUsername } from '../user.js'

export const createUserSchema = [
  body('username')
    .custom( async (username)=> {
      const user = await getUserByUsername(username)
      if (user) {
        throw new Error("This username is already taken")
      }
    })
    .exists().withMessage('username is required')
    .notEmpty().withMessage('username cannot be empty')
    .isString().withMessage('username must to be text'),


  body('password')
    .exists().withMessage('password is required')
    .notEmpty().withMessage('password cannot be empty')
    .isString().withMessage('password must be text')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .bail().
    matches(/[a-z]/).withMessage('Password must have at least one lowercase letter')
    .bail()
    .matches(/[A-Z]/).withMessage('Password must have at least one uppercase letter')
    .bail()
    .matches(/[0-9]/).withMessage('Password must have at least one number')
    .bail()
    .matches(/[^A-Za-z0-9]/).withMessage('Password must have at least one symbol'),

  body('email')
    .custom( async (email)=> {
      const emailResult = await getUserByEmail(email)
      console.log(emailResult)
      if (emailResult === true) {
        throw new Error("this Email address has been used before");
      }
    })
    .exists().withMessage('email is required')
    .notEmpty().withMessage('email cannot be empty')
    .isEmail().withMessage('invalid email')
]

export const loginUserSchema = [
  body('email')
    .custom( async (email)=> {
      const emailResult = await getUserByEmail(email)
      if (!emailResult) {
        throw new Error ('no accounts registered with this email')
      }
    })
    .exists().withMessage('email is required')
    .notEmpty().withMessage('email cannot be empty')
    .isEmail().withMessage('invalid email'),
  body('password')
    .exists().withMessage('password is required')
    .notEmpty().withMessage('password cannot be empty')
    .isString().withMessage('password must be text')
]

export const updateUserSchema = [
  body('username')
    .notEmpty().withMessage('username cannot be empty')
    .isString().withMessage('username must be text'),
  body('email')
    .notEmpty().withMessage('email cannot be empty')
    .isEmail().withMessage('invalid email'),
  body('password')
    .isEmpty().withMessage('password cannot be empty')
    .isString().withMessage('password must be text')
    .exists().withMessage('password is required')
    .notEmpty().withMessage('password cannot be empty')
    .isString().withMessage('password must be text')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .bail().
    matches(/[a-z]/).withMessage('Password must have at least one lowercase letter')
    .bail()
    .matches(/[A-Z]/).withMessage('Password must have at least one uppercase letter')
    .bail()
    .matches(/[0-9]/).withMessage('Password must have at least one number')
    .bail()
    .matches(/[^A-Za-z0-9]/).withMessage('Password must have at least one symbol'),
]