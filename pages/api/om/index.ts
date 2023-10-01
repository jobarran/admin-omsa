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
        case 'PUT':
            return editOm( req, res )
        case 'DELETE':
            return deleteOm( req, res )
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
        await db.disconnect();
        return res.status(200).json( om );
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
    }

}

const createOm = async(req: NextApiRequest, res: NextApiResponse) => {

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
        res.status(201).json( om );


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }


}

const deleteOm = async(req: NextApiRequest, res: NextApiResponse) => {

    const omId = req.body.id;

    try {
        await db.connect();
        const om = await Om.findOne({name: req.body.id});
        if ( !om ) {
            return res.status(400).json({message: 'OM no existe por ese id'});
        }

        await Om.findOneAndDelete({name: req.body.id});
        await db.disconnect();
        res.status(200).json({ message: 'OM eliminada' });

        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
    }

}

const editOm = async(req: NextApiRequest, res: NextApiResponse) => {

    console.log({req: req.body.element})

    try {
        await db.connect();
        const om = await Om.findOne({name: req.body.name});
        if ( !om ) {
            return res.status(400).json({message: 'OM no existe por ese id'});
        }

        const updateOm = await Om.findOneAndUpdate({name: req.body.name}, req.body, { new: true });
        await db.disconnect();
        res.status(200).json({ message: 'OM actualizada' });

        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
    }

}