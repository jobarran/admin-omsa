// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Obra } from '@/models';
import { IObra,  } from '@/interfaces';
import { db, seeeDatabase } from '@/database';

type Data = 
  | {message: string}
  | IObra

  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
  
      switch ( req.method ) {
          case 'GET':
              return getObraById( req, res )
      
          default:
              return res.status(400).json({
                  message: 'Bad request'
              })
      }
      
  }


const getObraById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {    

    await db.connect();
    const { idObra } = req.query
    const obra = await Obra.findOne({ idObra }).lean()
    await db.disconnect();

    if( !obra ) {
        return res.status(404).json({
            message: 'Obra no encontrada'
        })
    }
    
    res.status(200).json( obra )
}
