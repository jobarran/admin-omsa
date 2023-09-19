import { IAsistencia } from "@/interfaces";
import { db } from ".";
import { Asistencia } from "@/models";
import dayjs from "dayjs";



export const getOrCreateAsistencia = async(personal: any) => {

    const fecha = dayjs().format('YYYYMMDD').toString()

    const data = {
        fecha: fecha,
        clima: '',
        montaje: '',
        observaciones: '',
        asistenciaData: personal.map((obj: object ) => ({
             ...obj,
             ingreso: '',
             salida: '',
             estado: '',
             tarea: ''
            }))
    }
   
    try {
        await db.connect();
        const asistenciaInDB = await Asistencia.findOne({ fecha: fecha });
        
        if ( asistenciaInDB ) {
            await db.disconnect();
            return JSON.parse(JSON.stringify( asistenciaInDB ))
        }
        
        const asistencia = new Asistencia( data );
        await asistencia.save();
        await db.disconnect();
        console.log('crenado asistencia desde getServerSideProps...')
        return JSON.parse(JSON.stringify( asistencia ))

    } catch (error) {
        console.log(error);
        await db.disconnect();
     }

}



export const getAsistenciaDates = async ()  => {

    await db.connect()
    const asistencia = await Asistencia.find().select('fecha -_id').lean()
    await db.disconnect()

    if ( !asistencia ) {
        return null;
    }

    return JSON.parse(JSON.stringify( asistencia ))

}
