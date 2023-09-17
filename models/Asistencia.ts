import { IAsistencia } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose'

const asistenciaSubSchema = new Schema({
        legajo: {type: String, required: true},
        obra    : {type: String, required: true},
        name      : {type: String, required: true},
        lastName  : {type: String, required: true},
        ingreso   : {type: String, required: false},
        salida    : {type: String, required: false},
        tarea     : {type: String, required: false},
        estado    : {
            type: String,
            enum: {
                values  : ['Presente', 'Ausente', 'ART', 'Vacaciones', ''],
                message : '{VALUE} no es un estado válido',
                default : 'Presente',
                required: false
            }
        },    
})

const asistenciaSchema = new Schema({
    fecha         : { type: String, required: true },
    clima : {
        type: String,
        enum: {
            values  : ['lluvia', 'viento', 'material', 'uocra', 'otro', ''],
            message : '{VALUE} no es un estado válido',
            required: false
        }
    },
    montaje : {
        type: String,
        enum: {
            values  : ['si', 'parcial', 'no', ''],
            message : '{VALUE} no es un estado válido',
            required: false
        }
    },
    observaciones: {type: String, required: false},
    asistenciaData: [asistenciaSubSchema],
}, {
    timestamps: true
})

const Asistencia: Model<IAsistencia> = mongoose.models.Asistencia || model('Asistencia', asistenciaSchema);

export default Asistencia;