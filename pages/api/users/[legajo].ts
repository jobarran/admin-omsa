// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/database';
import { User } from '@/models';
import { IUser } from '@/interfaces';

type Data = 
  | {message: string}
  | IUser


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch ( req.method ) {
        case 'GET':
            return getUserByLegajo( req, res )
    
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
    
}


const getUserByLegajo = async (req: NextApiRequest, res: NextApiResponse<Data>) => {    

    await db.connect();
    const { legajo } = req.query
    const user = await User.findOne({ legajo }).lean()
    await db.disconnect();

    if( !user ) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        })
    }
    
    res.status(200).json( user )
}

