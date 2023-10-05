import { db } from ".";
import dayjs from "dayjs";
import Remito from '@/models/Remito';
import { Iremito } from "@/interfaces";


export const getRemitoByObra = async ( idObra: string ): Promise<Iremito | null> => {

    await db.connect()
    const remitos = await Remito.find({ obra: idObra }).select('-_id').lean()
    await db.disconnect()

    if ( !remitos ) {
        return null;
    }

    return JSON.parse(JSON.stringify( remitos ))

}

export const getRemitoByNumber = async ()  => {

    await db.connect()
    await db.disconnect()

 
}

export const getLastRemitoByObra = async ( idObra: string ): Promise<Iremito | null> => {

    await db.connect()
    
    const lastRemito = await Remito
        .find({ obra: idObra })
        .sort({ number: -1 })
        .limit(1)
        .select('-_id')
        .lean()
    await db.disconnect()

    if ( lastRemito.length < 1 ) {
        console.log('es por aca')
        return null;
    }

    return JSON.parse(JSON.stringify( lastRemito[0] ))
    
}