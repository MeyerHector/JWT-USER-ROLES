import { sequelize } from "../connection/db.js";
import { DataTypes } from "sequelize";
import { hashString } from '../helpers/hash.js'
import bcrypt from 'bcrypt'


export const ROLES = {
    ADMIN: 'admin',
    USER: 'user'
}

export const User = sequelize.define('user', {
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

User.sync()

export async function getAllUsers() {
    return await User.findAll() ?? null
}

export async function createUser(user) {
    const hashedPassword = await hashString(user.password)
    return await User.create({ ...user, password: hashedPassword })
}
// user || null userId
export async function getUserById(id) {
    return await User.findByPk(id) ?? null
}

export async function getUserByUsername(username) {
    return  (await User.findOne({ where:{username}}))??null;
}

export async function getUserByEmail(email){
    return   (await User.findOne({where :{email}}))?true:false ;
}
export async function getUserByEmailAndPassword({ email, password }) {
    const user = await User.findOne({ where: { email } })
    console.log(user)
    if (!user) {
        return null
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (isPasswordValid) {
        return null
    }

    return user
}

export async function updateUser(user, userId) {
    return await User.update(user, {
        where: {
            id: userId
        }
    });
}