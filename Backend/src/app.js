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
import { initializeMqtt } from './mqtt.js'

//importa el server de WebSocket para obtener la data del ambiente
import { initializeWebSocket } from './websocket.js'

const app = express()

//settings
app.set("port", config.port)

const corsOptions = {
    origin: 'http://localhost:3000', // (aca va la url del front si falla por cors)
    credentials: true,
};

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
//

app.use('/api',authRoutes)
app.use('/api',petRoutes)

initializeMqtt()
initializeWebSocket()

export default app