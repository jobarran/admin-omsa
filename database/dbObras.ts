import { Obra } from "@/models"
import { db } from "."
import { IObra } from "@/interfaces";


export const getObrasById = async ( idObra: string): Promise<IObra | null>  => {

    await db.connect()
    const obra = await Obra.findOne({ idObra }).lean()
    await db.disconnect()

    if ( !obra ) {
        console.log('no se encontro obra')
        return null;
    }

    return JSON.parse(JSON.stringify( obra ))

}


export const getAllObras =async (): Promise<IObra[]> => {

    await db.connect();
    const obras = await Obra.find({})
    .select('name idObra -_id')
    .lean()

    await db.disconnect();

    return obras
    
}