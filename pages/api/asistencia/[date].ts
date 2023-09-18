// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Asistencia } from '@/models';
import { IAsistencia } from '@/interfaces';
import { db } from '@/database';

type Data = 
  | {message: string}
  | IAsistencia

  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
  
      switch ( req.method ) {
          case 'GET':
              return getAsistenciaByDate( req, res );

          case 'PUT':
              return updateAsistenciaByDate( req, res );
      
          default:
              return res.status(400).json({
                  message: 'Bad request'
              })
      }
      
  }


const getAsistenciaByDate = async (req: NextApiRequest, res: NextApiResponse<Data>) => {    

    const { date } = req.query 
    
    try {
        
        await db.connect();
        
        if ( date ) {
            const asistencia = await Asistencia.findOne({ fecha : date }).lean()
            await db.disconnect();
            if( !asistencia ) {
                return res.status(404).json({
                    message: 'Asistencia no encontrada'
                })
            }
            return res.status(200).json( asistencia )
        }
        
        

    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }

    
}


const updateAsistenciaByDate = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { date = '' } = req.query
    const { rowsData, clima, montaje, observaciones }  = req.body;

    try {

        await db.connect();
        const asistencia:any = await Asistencia.findOne({ fecha : date ? date : '' }).lean()
    
        if ( !asistencia ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe una asistencia con esta fecha' });
        }

        const updatedData = asistencia.asistenciaData.map((item1:any) => {
            
            const matchingItem = rowsData.find((item2: any) => item2.id === item1.legajo);
            
            if (matchingItem) {
                
                return {
                    ...item1,
                    obra: matchingItem.obra, 
                    ingreso: matchingItem.ingreso, 
                    salida: matchingItem.salida, 
                    tarea: matchingItem.tarea, 
                    estado: matchingItem.estado, 
                }
            }
            
            return item1;
        });
        
        
        const updatedAsistencia: IAsistencia | null = await Asistencia.findOneAndUpdate(
            { fecha: date ? date : '' },
            {
                asistenciaData:updatedData,
                clima:clima,
                montaje:montaje,
                observaciones:observaciones
            },
            { new:true }
        );

        await db.disconnect();

        return res.status(200).json( updatedAsistencia! );


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }


}
