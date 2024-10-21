import mongoose from 'mongoose'

const environmentalSchema = new mongoose.Schema({
    temperatura: {
        type: Number,
        required: true,
        trim: true
    },
    humedad: {
        type: Number,
        required: true,
        trim: true
    },
    luz: {
        type: Number,
        required: true,
        trim: true
    },
},{
    timestamps: true
})

export default mongoose.model('environmental', environmentalSchema)