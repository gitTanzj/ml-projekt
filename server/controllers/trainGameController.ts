import * as tf from '@tensorflow/tfjs';
import fs from 'fs';
import { Request, Response } from 'express';

// const loadImage = async (path: string) => {
//     const imageBuffer = fs.readFileSync(path);
//     const imageTensor = tf.node.decodeImage(imageBuffer, 3)
//         .resizeNearestNeighbor([224, 224])
//         .toFloat()
//         .div(tf.scalar(255.0));
//     return imageTensor.expandDims(); // Add batch dimension
// }

// const loadImages = async (paths: string[]) => {
//     const imageTensors = await Promise.all(paths.map(path => loadImage(path)))
//     return tf.concat(imageTensors);
// }



const model = tf.sequential();
model.add(tf.layers.dense({inputShape: [300], units: 1}))

const trainModel = async (req: Request, res: Response) => {
    const images = req.files as Express.Multer.File[];
    const label = req.body.label;
    console.log(images)
    console.log(label)

    // TRAIN MODEL WITH TRAINING DATA



    // setTimeout(() => {
    //     fs.readdirSync('./uploads').forEach(file => {
    //         fs.rmSync(`./uploads/${file}`)
    //     })
    // }, 3000)
    
    res.status(201).send('Model trained successfully')
}

const testModel = async (req: Request, res: Response) => {
    
}

export { trainModel }