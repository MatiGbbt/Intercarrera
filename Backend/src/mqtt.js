import mqtt from 'mqtt'

export function initializeMqtt() {
    
    const brokerUrl = 'mqtt://tu-broker-url'
    const clientMQTT = mqtt.connect(brokerUrl)
    const topico = 'tu/topico'

    clientMQTT.on('connect', () => {

        console.log('Conectado al broker MQTT')

        client.subscribe(topico, (err) => {
            if (!err) {
                console.log(`Suscrito al tópico: ${topic}`)
            } else {
                console.error('Error al suscribirse:', err)
            }
        })

    })

    clientMQTT.on('message', (topico, message) => {
        //GUARDAR EN BD
    })

    clientMQTT.on('error', (err) => {
        console.error('Error en MQTT:', err)
    })
}
