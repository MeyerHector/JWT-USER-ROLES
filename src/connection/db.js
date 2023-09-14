
import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT || "mysql",
    }
)

export async function dbConnection () {
    try {
      await sequelize.sync({ force: false })
      console.log('db connection successful')
    } catch (error) {
      console.error(error)
    }
  }
