// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Personal } from '@/models';
import { IPersonal,  } from '@/interfaces';
import { db } from '@/database';


type Data = 
  | {message: string}
  | IPersonal[]


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch ( req.method ) {
        case 'GET':
            return getPersonal( req, res )
        case 'POST':
            return createPersonal( req, res )
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
    
}


const getPersonal = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    try {

        await db.connect();
        const personal = await Personal.find()
                                       .select('estado categoria lastName name legajo obra alta')
                                       .lean();
    
        await db.disconnect();
        return res.status(200).json( personal );
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
    }

}

const createPersonal = async(req: NextApiRequest, res: NextApiResponse) => {

    try {
        await db.connect();
        const personalInDB = await Personal.findOne({ legajo: req.body.legajo });
        if ( personalInDB ) {
            await db.disconnect();
            console.log('ya existe')
            return res.status(400).json({message: 'Ya existe un producto con ese slug'});
        }
        
        const personal = new Personal( req.body );
        await personal.save();
        await db.disconnect();
        console.log({NuevoPersonal: personal})
        res.status(201).json( personal );


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }


}