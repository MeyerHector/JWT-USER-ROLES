import { body } from 'express-validator'

export const createUserSchema = [
  body('username')
    .exists().withMessage('username is required')
    .notEmpty().withMessage('username cannot be empty')
    .isString().withMessage('username must to be text'),
  body('password')
    .exists().withMessage('password is required')
    .notEmpty().withMessage('password cannot be empty')
    .isString().withMessage('password must to be text'),
  body('email')
    .exists().withMessage('email is required')
    .notEmpty().withMessage('email cannot be empty')
    .isEmail().withMessage('invalid email')
]

export const loginUserSchema = [
  body('email')
    .exists().withMessage('email is required')
    .notEmpty().withMessage('email cannot be empty')
    .isEmail().withMessage('invalid email'),
  body('password')
    .exists().withMessage('password is required')
    .notEmpty().withMessage('password cannot be empty')
    .isString().withMessage('password must to be text')
]