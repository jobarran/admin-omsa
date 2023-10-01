import { Iremito } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose'

const remitoSubSchema = new Schema({
        om      : {type: String, required: true},
        code    : {type: String, required: true},
        id      : {type: String, required: false},
        cantidad: {type: Number, required: true},
})

const remitoSchema = new Schema({
    number   : { type: String, required: true, unique: true },
    obra     : { type: String, required: true },
    date     : { type: String, required: true },
    observaciones: {type: String, required: false},
    elementos: [remitoSubSchema],
}, {
    timestamps: true
})

const Remito: Model<Iremito> = mongoose.models.Remito || model('Remito', remitoSchema);

export default Remito;