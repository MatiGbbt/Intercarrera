import Environmental from '../models/environmental.model.js'
import Pet from '../models/pet.model.js'

export const state = async (req, res) => {

    try {

        //const environmentalData = await Environmental.findOne().sort({ _id: -1 }); // Trae el último registro

        //if (!environmentalData) {
            //return res.status(404).json({ message: "No se encontraron datos ambientales." })
        //}

        const environmentalData = {
            temperature: 20,
            humidity: 50,
            light: 15
        }

        const { temperature, humidity, light } = environmentalData

        let hambre, sueño, salud, vivo

        //LOGICA SUEÑO Y HAMBRE
        if (light <= 10) {
            sueño = 'alto'
            hambre = 'alto'
        } else if (light > 10 && light <= 20) {
            sueño = 'medio'
            hambre = 'medio'
        } else {
            sueño = 'bajo'
            hambre = 'bajo'
        }

        //LOGICA SALUD
        if (humidity <= 30 || temperature <= 15) {
            salud = 'alto'
        } else if (humidity > 30 && humidity <= 70 || temperature > 15 && temperature <= 25) {
            salud = 'medio'
        } else if (humidity > 70 && humidity <= 100 || temperature > 25 && temperature <= 50) {
            salud = 'bajo'
        }

        // Determinar si está vivo basado en la salud
        if (humidity > 100 || temperature > 50) {
            vivo = false
        }else {
            vivo = true
        }

        const result = {
            hambre,
            sueño,
            salud,
            vivo
        };

        const newState = new Pet(result)
        await newState.save()

        res.status(200).json(result)

    } catch (error) {

        res.status(500).json({message: error.message})

    }
}

export const feed = async (req, res) => { //ALIMENTAR MASCOTA
    try {
        const EstadoActual = await Pet.findOne().sort({ _id: -1 })

        if (!EstadoActual) {
            return res.status(404).json({ message: "No se encontraron datos del estado actual." })
        }

        if (EstadoActual.hambre === 'alto') {
            EstadoActual.hambre = 'medio'
        } else if (EstadoActual.hambre === 'medio') {
            EstadoActual.hambre = 'bajo'
        }

        await EstadoActual.save()
        res.status(200).json(EstadoActual)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const sleep = async (req, res) => { //DORMIR MASCOTA
    try {
        const EstadoActual = await Pet.findOne().sort({ _id: -1 })

        if (!EstadoActual) {
            return res.status(404).json({ message: "No se encontraron datos del estado actual." })
        }

        if (EstadoActual.sueño === 'alto') {
            EstadoActual.sueño = 'medio'
        } else if (EstadoActual.sueño === 'medio') {
            EstadoActual.sueño = 'bajo'
        }

        await EstadoActual.save()
        res.status(200).json(EstadoActual)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const heal = async (req, res) => { //CURAR MASCOTA
    try {
        const EstadoActual = await Pet.findOne().sort({ _id: -1 })

        if (!EstadoActual) {
            return res.status(404).json({ message: "No se encontraron datos del estado actual." })
        }

        if (EstadoActual.salud === 'bajo') {
            EstadoActual.salud = 'medio'
        } else if (EstadoActual.salud === 'medio') {
            EstadoActual.salud = 'alto'
        }

        await EstadoActual.save()
        res.status(200).json(EstadoActual)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const revive = async (req, res) => { //REVIVIR MASCOTA
    try {
        const EstadoActual = await Pet.findOne().sort({ _id: -1 })

        if (!EstadoActual) {
            return res.status(404).json({ message: "No se encontraron datos del estado actual." })
        }

        if (!EstadoActual.vivo) {
            EstadoActual.vivo = true;
            EstadoActual.salud = 'alto'
        }

        await EstadoActual.save();
        res.status(200).json(EstadoActual)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

