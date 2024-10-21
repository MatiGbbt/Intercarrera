import mqtt from 'mqtt'
import Environmental from './models/environmental.model.js'
import { wss } from './websocket.js'

export function initializeMqtt() {
    
    const brokerUrl = 'mqtt://broker.emqx.io'
    const clientMQTT = mqtt.connect(brokerUrl)
    const topico = 'Mascota'

    clientMQTT.on('connect', () => {

        console.log('Conectado al broker MQTT')

        clientMQTT.subscribe(topico, (err) => {
            if (!err) {
                console.log(`Suscrito al tópico: ${topico}`)
            } else {
                console.error('Error al suscribirse:', err)
            }
        })

    })

    clientMQTT.on('message', async (topico, message) => {
        try {

            const datos = JSON.parse(message.toString());

            const nuevoDato = new Environmental({
                temperatura: datos.temperatura,
                humedad: datos.humedad,
                luz: datos.luz
            });

            await nuevoDato.save();

            wss.clients.forEach(client => {
                if (client.readyState === client.OPEN) {
                    client.send(JSON.stringify([nuevoDato]))
                }
            })

            EnviarDatosTecnicos(nuevoDato, clientMQTT)

            console.log('Dato Enviado y  Guardado en la Base de Datos:', nuevoDato)

        } catch (err) {

            console.error('Error al guardar el dato en la base de datos:', err)

        }
    })

    clientMQTT.on('error', (err) => {
        console.error('Error en MQTT:', err)
    })

}

function EnviarDatosTecnicos(nuevoDato, clientMQTT){

    const { temperatura, humedad, luz } = nuevoDato

    let hambre, suenio, salud, vivo

        //LOGICA SUEÑO Y HAMBRE
        if (luz <= 10) {
            suenio = 'alto'
            hambre = 'alto'
        } else if (luz > 10 && luz <= 20) {
            suenio = 'medio'
            hambre = 'medio'
        } else {
            suenio = 'bajo'
            hambre = 'bajo'
        }

        //LOGICA SALUD
        if (humedad <= 30 || temperatura <= 15) {
            salud = 'alto'
        } else if (humedad > 30 && humedad <= 70 || temperatura > 15 && temperatura <= 25) {
            salud = 'medio'
        } else if (humedad > 70 && humedad <= 100 || temperatura > 25 && temperatura <= 50) {
            salud = 'bajo'
        }

        // Determinar si está vivo basado en la salud
        if (humedad > 100 || temperatura > 50) {
            vivo = false
        }else {
            vivo = true
        }

        const result = {
            hambre,
            suenio,
            salud,
            vivo
        }

    clientMQTT.publish('MascotaRespuesta', JSON.stringify(result), { retain: true }, (err) => {
        if (err) {
            console.error('Error al publicar en MascotaRespuesta:', err)
        } else {
            console.log('Estado de la mascota publicado en MascotaRespuesta:', result)
        }
    })
}