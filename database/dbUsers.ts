import { User } from "@/models"
import { db } from "."
import bcrypt from 'bcryptjs';
import { IUser } from "@/interfaces";


export const checkUserEmailPassword = async ( email: string, password: string ) => {

    await db.connect()
    const user = await User.findOne({ email })
    await db.disconnect()

    if ( !user ) {
        return null
    }

    if ( !bcrypt.compareSync( password, user.password! ) ) {
        return null
    }

    const { role, name, lastName, legajo, obra, _id} = user

    return {
        _id,
        email: email.toLocaleLowerCase(),
        role,
        name,
        lastName,
        legajo,
        obra,
    }
}


// Crea o verifica usuario de oauth
// export const oAuthToDbUser = async ( oAuthEmail: string, oAuthName: string ) => {

//     await db.connect();
//     const user = await User.findOne({ email: oAuthEmail });

//     if ( user ) {
//         await db.disconnect();
//         const { _id, name, lastName, email, role } = user;
//         return { _id, name, lastName, email, role };
//     }

//     const newUser = new User({ email: oAuthEmail, name: oAuthName, password: '@', role: 'client'  });
//     await newUser.save();
//     await db.disconnect();

//     const { _id, name, email, role } = newUser;
//     return { _id, name, email, role };
    
// }


export const getUsersByLegajo = async (legajo: string): Promise<IUser | null>  => {

    await db.connect()
    const user = await User.findOne({ legajo }).lean()
    await db.disconnect()

    if ( !user ) {
        return null;
    }

    return JSON.parse(JSON.stringify( user ))

}

interface UserLegajo {
    legajo: string;
}

export const getAllUserLegajo = async (): Promise<UserLegajo[]> => {
    
    await db.connect();
    const slug = await User.find().select( 'legajo -_id' ).lean();
    await db.disconnect();

    return slug;

}
