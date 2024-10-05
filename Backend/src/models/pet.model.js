import mongoose from 'mongoose'

const petSchema = new mongoose.Schema({
    hambre: {
        type: String,
        required: true,
        trim: true
    },
    sueño: {
        type: String,
        required: true,
        trim: true
    },
    salud: {
        type: String,
        required: true,
        trim: true
    },
    vivo: {
        type: Boolean,
        required: true,
    }
},{
    timestamps: true
})

export default mongoose.model('pet', petSchema)