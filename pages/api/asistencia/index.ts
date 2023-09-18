import type { NextApiRequest, NextApiResponse } from 'next'

import { db } from '../../../database';
import { IAsistencia } from '@/interfaces';
import { Asistencia } from '@/models';


type Data = 
| { message: string }
| IAsistencia[]
| IAsistencia;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return getAsistencia( req, res );
            
        case 'PUT':
            return updateAsistencia( req, res );

        case 'POST':
            return createAsistencia( req, res )
            
        default:
            return res.status(400).json({ message: 'Bad request' });
    }
    
 
}

const getAsistencia = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    
    try {

        await db.connect();
        const asistencia = await Asistencia.find()
                                         .lean();
    
        await db.disconnect();
        return res.status(200).json( asistencia );
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
    }

}


const updateAsistencia = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { fecha = '', data = '' } = req.body as { fecha: string, data: any };


    await db.connect();
    const asistencia: any = await Asistencia.findOne({ fecha : fecha ? fecha : '' }).lean()
    

    if ( !asistencia ) {
        await db.disconnect();
        return res.status(400).json({ message: 'No existe una asistencia con esta fecha' });
    }
    
    const updatedAsistenciaByDate = [...asistencia.asistenciaData];

    for (const obj of data) {

        if (!updatedAsistenciaByDate.some((item:any) => item.legajo === obj.legajo)) {

            updatedAsistenciaByDate.push({
                name: obj.name,
                lastName: obj.lastName,
                obra: obj.obra,
                legajo: obj.legajo,
                ingreso: '',
                salida: '',
                estado: '',
                tarea: ''
            });
        }
    }

    const updatedAsistencia: IAsistencia | null = await Asistencia.findOneAndUpdate(
        { fecha : fecha },
        { asistenciaData : updatedAsistenciaByDate },
        { new:true }
    );
    await db.disconnect();
    return res.status(200).json( updatedAsistencia! );

}

const createAsistencia = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { fecha = '', asistenciaData = '' } = req.body as { fecha: string, asistenciaData: any };

    try {
        await db.connect();
        const asistenciaInDB = await Asistencia.findOne({ fecha:  fecha ? fecha : '' });
        if ( asistenciaInDB ) {
            await db.disconnect();
            return res.status(201).json( asistenciaInDB );
        }

        const data = {
            fecha: fecha,
            clima: '',
            montaje: '',
            observaciones: '',
            asistenciaData: asistenciaData.map((obj: any ) => ({
                 name: obj.name,
                 lastName: obj.lastName,
                 obra: obj.obra,
                 legajo: obj.legajo,
                 ingreso: '',
                 salida: '',
                 estado: '',
                 tarea: ''
                }))
        }
        
        const asistencia = new Asistencia( data );
        await asistencia.save();
        await db.disconnect();
        return res.status(201).json( asistencia );


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }

    await db.disconnect();

}