import { createJWT } from '../helpers/JWT.js'
import { createUser, getUserByEmailAndPassword, getUserById } from '../models/user.js'
import jwt from 'jsonwebtoken'

export const ctrlLoginUser = async (req, res) => {
  try {
    const user = await getUserByEmailAndPassword(req.body)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const token = await createJWT({ id: user.id })

    res.status(200).json(token)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}

export const ctrlRegisterUser = async (req, res) => {
  try {
    const user = await createUser(req.body)

    const token = await createJWT({ user: user.id })

    res.status(200).json({ token, message: 'user created successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


// es un controlador que voy a usar para validar si el token es válido.
export const ctrlGetUserInfoByToken = async (req, res) => {
  const token = req.headers.authorization

  if (!token) {
    return res.sendStatus(404)
  }

  const { user: userId } = jwt.verify(token, process.env.SECRET)

  const user = await getUserById(userId)

  if (!user) {
    return res.sendStatus(404)
  }

  res.status(200).json(user)
}