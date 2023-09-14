import jwt from 'jsonwebtoken'

export const createJWT = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET, (err, token) => {
      if (err) {
        reject('Error signing the token ' + err)
      }
      resolve({ token })
    })
  })
}