import * as tf from '@tensorflow/tfjs-node';

import { Request, Response } from 'express';

// const model = tf.sequential();
// model.add(tf.layers.dense({inputShape: [300], units: 1}))

const trainModel = async (req: Request, res: Response) => {
    console.log(
        req.body
    )
    const images = req.files as Express.Multer.File[];
    const label = req.body.label;
    console.log(images)
    console.log(label)
}

const testModel = async (req: Request, res: Response) => {
    
}

export { trainModel }