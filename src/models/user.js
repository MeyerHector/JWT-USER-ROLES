import { sequelize } from "../connection/db.js";
import { DataTypes } from "sequelize";
import { hashString } from '../helpers/hash.js'
import bcrypt from 'bcrypt'


export const ROLES = {
    ADMIN: 'admin',
    USER: 'user'
}

export const user = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(10),
        unique: true,
        allowNull: false

    },
    password: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(ROLES.ADMIN, ROLES.USER),
        defaultValue: ROLES.USER
    }
},
    {
        timestamps: true,
    })

export async function getAllUsers() {
    return await user.findAll() ?? null
}

export async function createUser(user) {
    const hashedPassword = await hashString(user.password)

    return await user.create({ ...username, password: hashedPassword })
}

export async function getUserById(userId) {
    return await user.findByPk(userId) ?? null
}

export async function getUserByEmailAndPassword({ email, password }) {
    const user = await user.findOne({ where: { email } })

    if (!user) {
        return null
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return null
    }

    return user
}