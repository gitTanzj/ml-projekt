import * as tf from '@tensorflow/tfjs-node';

import { Request, Response } from 'express';

const model = tf.sequential();
model.add(tf.layers.dense({inputShape: [300], units: 1}))
model

const trainModel = async (req: Request, res: Response) => {
    const images = req.files as Express.Multer.File[];
    console.log(images)
}

const testModel = async (req: Request, res: Response) => {
    
}

export { trainModel }