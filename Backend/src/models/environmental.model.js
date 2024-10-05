import mongoose from 'mongoose'

const environmentalSchema = new mongoose.Schema({
    temperature: {
        type: Number,
        required: true,
        trim: true
    },
    humidity: {
        type: Number,
        required: true,
        trim: true
    },
    light: {
        type: Number,
        required: true,
        trim: true
    },
},{
    timestamps: true
})

export default mongoose.model('environmental', environmentalSchema)