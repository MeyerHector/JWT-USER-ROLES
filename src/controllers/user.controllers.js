import { createUser, getAllUsers, updateUser } from '../models/user.js'

export const ctrlGetAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers()

        if (users.length == 0) {
            throw ({
                status: 400,
                message: 'No users registered'
            })
        }

        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
}

export const ctrlCreateUser = async (req, res) => {
    try {
        const newUser = await createUser(req.body)
        if(!newUser){
            throw ({
                status: 400,
                message:'Could not create user'
            })
        }
        return res.status(201).json(newUser)
    } catch (error) {
        console.log('Could not create the user', error)
        res.status(error.status ||500).json({error})
    }
}

export const ctrlUpdateUser = async (req, res) => {

    const {userId} = req.params.id;
    try {
        const updatedUser = await updateUser(req.body, userId)

        if(!updatedUser) {
            throw({
                status:400,
                message:'Could not update the user'
            })
        }
        res.status(200).json(
            {
                message: 'The user was updated',
                data: updatedUser
            }
        )
    } catch (error) {
        console.log('could not update the user')
        res.status(500).json({error: error.message})
    }
}