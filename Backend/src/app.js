//Configuración del servidor

//dependencias
import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import config from './config.js'

//rutas
import authRoutes from './routes/auth.routes.js'
import petRoutes from './routes/pet.routes.js'

//importa la función MQTT
//import { initializeMqtt } from './mqtt.js';

const app = express()

//settings
app.set("port", config.port)

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors())
//

app.use('/api',authRoutes)
app.use('/api',petRoutes)

//initializeMqtt()

export default app