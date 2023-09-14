
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))

import { dbConnection } from './src/connection/db.js'
dbConnection()


// RUTAS



//

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})