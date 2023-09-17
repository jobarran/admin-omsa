import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IPersonal } from '../../../interfaces';
import { Personal } from '../../../models';

type Data = 
| { message: string }
| IPersonal[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {


    switch( req.method ) {
        case 'GET':
            return getPersonal(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' })

    }


}

const getPersonal = async(req: NextApiRequest, res: NextApiResponse<Data>) =>  {

    await db.connect();
    const personal = await Personal.find().select('-password').lean();
    await db.disconnect();

    return res.status(200).json( personal );


}