import Environmental from '../models/environmental.model.js'
import Pet from '../models/pet.model.js'

export const state = async (req, res) => {
    try {

        const DatosAmbientales = await Environmental.findOne().sort({ _id: -1 })

        if (!DatosAmbientales) {
            return res.status(404).json({ message: "No se encontraron datos ambientales." })
        }

        const { temperatura, humedad, luz } = DatosAmbientales

        let hambre, sueño, salud, vivo

        //LOGICA SUEÑO Y HAMBRE
        if (luz <= 10) {
            sueño = 'alto'
            hambre = 'alto'
        } else if (luz > 10 && luz <= 20) {
            sueño = 'medio'
            hambre = 'medio'
        } else {
            sueño = 'bajo'
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
            sueño,
            salud,
            vivo
        }

        const newState = new Pet(result)
        await newState.save()

        res.status(200).json({
            message: "Estado de la mascota actualizado.",
            state: result
        })

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

