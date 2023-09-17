import { IObra } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose'


const userSchema = new Schema({
    name    : { type: String, required: true },
    idObra  : { type: String, required: true, unique: true },
})

const Obra:Model<IObra> = mongoose.models.Obra || model('Obra', userSchema);

export default Obra;