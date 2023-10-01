import { IObra, IOm } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose'

const omSubSchema = new Schema({
    quantity   : {type: Number, required: true},
    code       : {type: String, required: true},
    description: {type: String, required: true},
    received   : {type: Number, required: true},
    type       : {type: String, required: true}, 
    modId      : {type: Number, required: false},
})

const omSchema = new Schema({
    idObra     : { type: String, required: true },
    name       : { type: String, required: true },
    revision   : { type: String, required: true},
    floor      : { type: String, required: true},
    sector     : { type: String, required: true},
    description: { type: String, required: true },
    status     : {
        type: String,
        enum: {
            values  : ['pedido', 'recibido', '-', ''],
            message : '{VALUE} no es un estado válido',
            required: false
        }
    },
    necesidad  : { type: String, required: true },
    pedido     : { type: String, required: true },
    element    : [omSubSchema],
    }, {
    timestamps : true
    })

const Om : Model<IOm> = mongoose.models.Om || model('Om', omSchema);

export default Om;