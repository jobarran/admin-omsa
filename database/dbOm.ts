import { Personal } from "@/models"
import { db } from "."
import { IUser } from "@/interfaces";
import Om from "@/models/Om";


export const getOmsByObra = async (obraId: string)  => {

    await db.connect()
    const oms = await Om.find({ idObra: obraId }).lean()
    await db.disconnect()

    if ( !oms ) {
        console.log('no se encontro la OM')
        return null;
    }

    return JSON.parse(JSON.stringify( oms ))

}
