import { IObra, IOm } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose'

const omSubSchema = new Schema({
    quantity   : {type: Number, required: true},
    code       : {type: String, required: true},
    description: {type: String, required: true},
    received   : {type: Number, required: true},
})

const omSchema = new Schema({
    idObra     : { type: String, required: true },
    name       : { type: String, required: true },
    revision   : {type: Number, required: true},
    floor      : {type: Number, required: true},
    sector     : {type: String, required: true},
    description: { type: String, required: true },
    status     : {
        type: String,
        enum: {
            values  : ['pedido', 'recibido', 'parcial', '-', ''],
            message : '{VALUE} no es un estado válido',
            required: false
        }
    },
    element    : [omSubSchema],
    }, {
    timestamps : true
    })

const Om : Model<IOm> = mongoose.models.Om || model('Om', omSchema);

export default Om;