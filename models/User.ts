import { IUser } from '@/interfaces';
import mongoose, { Schema, model, Model } from 'mongoose'


const userSchema = new Schema({
    name    : { type: String, required: true },
    lastName: { type: String, required: true },
    legajo  : { type: String, required: true, unique: true },
    email   : { type: String, required: true, unique: true },
    password: { type: String, required: true },
    obra:     [{ type: String }],
    role: {
        type: String,
        enum: {
            values  : ['admin', 'user'],
            message : '{VALUE} no es un role válido',
            default : 'client',
            required: true
        }
    }
}, {
    timestamps: true
})

const User:Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;