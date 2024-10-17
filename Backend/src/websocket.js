import { WebSocketServer } from 'ws'
import Environmental from './models/environmental.model.js'

export const wss = new WebSocketServer({ port: 4001 })

export function initializeWebSocket() {

    wss.on('connection', (ws) => {

        console.log('Cliente conectado al WebSocket')

        ws.on('message', async () => {

            try {

                const environmentalData = await Environmental.find().sort({ createdAt: -1 })

                ws.send(JSON.stringify(environmentalData))

            } catch (err) {
                console.error('Error al obtener datos de la base de datos:', err)
                ws.send(JSON.stringify({ error: 'Error al obtener datos' }))
            }

        })

        ws.on('close', () => {
            console.log('Cliente desconectado')
        })

    })

    console.log('Servidor WebSocket escuchando en el puerto: 4001')

}