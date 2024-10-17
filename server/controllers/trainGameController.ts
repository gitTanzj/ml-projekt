
import fs from 'fs';
import { Request, Response } from 'express';



const trainModel = async (req: Request, res: Response) => {
    const images = req.files as Express.Multer.File[];
    const label = req.body.label;
    console.log(images)
    console.log(label)

    // TRAIN MODEL WITH TRAINING DATA
    
    res.status(201).send('Model trained successfully')

    fs.rmSync('./uploads', { recursive: true, force: true });
}

const testModel = async (req: Request, res: Response) => {
    
}

export { trainModel }