import { Request, Response } from 'express';
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as tf from '@tensorflow/tfjs-node-gpu';
import { Tensor3D } from '@tensorflow/tfjs-core';

const generatePrompt = (req: Request, res: Response) => {

}

const sendPrompt = (req: Request, res: Response) => {

}

const evaluateImage = async (req: Request, res: Response) => {
    try {
        console.log('Evaluating image');
        const model = await mobilenet.load({
            version: 2,
            alpha: 1.0
        });

        const { image, prompt } = req.body;

        // Decode the image buffer
        const decodedImage = tf.node.decodeImage(image, 3);

        const predictions = await model.classify(decodedImage as unknown as Tensor3D);

        res.status(200).json({ predictions, prompt });
    } catch (error) {
        console.error('Error evaluating image:', error);
        res.status(500).json({ error: 'Failed to evaluate image' });
    }
}   

const sendResults = (req: Request, res: Response) => {

}

export{
    generatePrompt,
    sendPrompt,
    evaluateImage,
    sendResults
}