// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Obra } from '@/models';
import { IObra,  } from '@/interfaces';
import { db, seeeDatabase } from '@/database';


type Data = 
  | {message: string}
  | IObra[]


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch ( req.method ) {
        case 'GET':
            return getObras( req, res )
    
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
    
}


const getObras = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    let condition = {};

    await db.connect();

    const obras = await Obra.find()
                            .select('name idObra')
                            .lean();

    await db.disconnect();

    return res.status(200).json( obras );

}

