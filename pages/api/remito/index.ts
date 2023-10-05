// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Personal } from '@/models';
import { IOm, IPersonal, Iremito,  } from '@/interfaces';
import { db } from '@/database';
import Om from '@/models/Om';
import Remito from '@/models/Remito';


type Data = 
  | {message: string}
  | Iremito[]


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    switch ( req.method ) {
        case 'GET':
            return getRemitoByObra( req, res )
        case 'POST':
            return createRemito( req, res )
        case 'PUT':
            return editRemito( req, res )
        case 'DELETE':
            return deleteRemito( req, res )
        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
    
}


const getRemitoByObra = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    try {

        await db.connect();
        const remitos = await Remito
            .find(req.query)
            .sort({ number: -1 })
            .lean();
        await db.disconnect();
        return res.status(200).json( remitos );
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
    }

}

const createRemito = async(req: NextApiRequest, res: NextApiResponse) => {

    try {
        await db.connect();
        const RemitoInDB = await Remito.findOne({ name: req.body.number });
        if ( RemitoInDB ) {
            await db.disconnect();
            return res.status(400).json({message: 'Ya existe un remito con ese numero'});
        }
        
        const remito = new Remito( req.body );
        await remito.save();
        await db.disconnect();
        res.status(201).json( remito );


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }


}

const deleteRemito = async(req: NextApiRequest, res: NextApiResponse) => {

    // const omId = req.body.id;

    // try {
    //     await db.connect();
    //     const om = await Om.findOne({name: req.body.id});
    //     if ( !om ) {
    //         return res.status(400).json({message: 'OM no existe por ese id'});
    //     }

    //     await Om.findOneAndDelete({name: req.body.id});
    //     await db.disconnect();
    //     res.status(200).json({ message: 'OM eliminada' });

        
    // } catch (error) {
    //     console.log(error);
    //     await db.disconnect();
    //     return res.status(400).json({ message: 'Revisar logs del servidor' });
    // }

}

const editRemito = async(req: NextApiRequest, res: NextApiResponse) => {


    // try {
    //     await db.connect();
    //     const om = await Om.findOne({name: req.body.name});
    //     if ( !om ) {
    //         return res.status(400).json({message: 'OM no existe por ese id'});
    //     }

    //     const updateOm = await Om.findOneAndUpdate({name: req.body.name}, req.body, { new: true });
    //     await db.disconnect();
    //     res.status(200).json({ message: 'OM actualizada' });

        
    // } catch (error) {
    //     console.log(error);
    //     await db.disconnect();
    //     return res.status(400).json({ message: 'Revisar logs del servidor' });
    // }

}