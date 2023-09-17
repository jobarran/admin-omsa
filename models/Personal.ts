import { IPersonal } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose'


const personalSchema = new Schema({
    name       : { type: String, required: true },
    lastName   : { type: String, required: true },
    legajo     : { type: String, required: true, unique: true },
    estado     : { type: String, required: true },
    obra       : { type: String, required: true },
    telefono   : { type: String, required: false },
    direccion  : { type: String, required: false},
    nacimiento : { type: String, required: false},
    categoria  : { type: String, required: true },
    alta       : { type: String, required: true },
    tags       : [{ type: String, required: false }],
    descripcion: { type: String, required: false },

}, {
    timestamps: true
})

const User:Model<IPersonal> = mongoose.models.Personal || model('Personal', personalSchema);

export default User;