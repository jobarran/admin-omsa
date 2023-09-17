import { Personal } from "@/models"
import { db } from "."
import { IUser } from "@/interfaces";


export const getPersonalByLegajo = async (legajo: string): Promise<IUser | null>  => {

    await db.connect()
    const personal = await Personal.findOne({ legajo }).lean()
    await db.disconnect()

    if ( !personal ) {
        return null;
    }

    return JSON.parse(JSON.stringify( personal ))

}

interface Personal {
    legajo: string;
    lastName: string;
    name: string;
    obra: string
}

export const getAllPersonal = async (): Promise<Personal[]> => {

    await db.connect();
    const users = await Personal.find()
                                .select('legajo lastName name obra -_id')
                                .lean()

    await db.disconnect();

    return JSON.parse(JSON.stringify(users));

}