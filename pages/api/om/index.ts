// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Personal } from '@/models';
import { IOm, IPersonal,  } from '@/interfaces';
import { db } from '@/database';
import Om from '@/models/Om';


type Data = 
  | {message: string}
  | IOm[]


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch ( req.method ) {
        case 'GET':
            return getOm( req, res )
        case 'POST':
            return createOm( req, res )
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
    
}


const getOm = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    
    try {

        await db.connect();
        const om = await Om.find(req.query).lean();
        console.log(om)
        await db.disconnect();
        return res.status(200).json( om );
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
    }

}

const createOm = async(req: NextApiRequest, res: NextApiResponse) => {

    console.log(req.body)

    try {
        await db.connect();
        const omInDB = await Om.findOne({ name: req.body.name });
        if ( omInDB ) {
            await db.disconnect();
            console.log('ya existe')
            return res.status(400).json({message: 'Ya existe un producto con ese slug'});
        }
        
        const om = new Om( req.body );
        await om.save();
        await db.disconnect();
        console.log({NuevaOm: om})
        res.status(201).json( om );


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }


}