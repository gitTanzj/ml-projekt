import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const generatePrompt = (req: Request, res: Response) => {

}

const sendPrompt = (req: Request, res: Response) => {

}

const bufferToUint8Array = (buffer: Buffer): Uint8Array => {
    return new Uint8Array(buffer);
  };

const evaluateImage = async (req: Request, res: Response) => {
    try {
        console.log('Evaluating image');
        
        const { prompt } = req.body;
    
        const pythonProcess = spawn('python', ['./scripts/image_eval.py', './uploads/image.png'], {
          env: { ...process.env, TF_CPP_MIN_LOG_LEVEL: '2', PYTHONIOENCODING: 'utf-8'}
        });

        let output = '';
        let errorOccurred = false;

        pythonProcess.stdout.on('data', (data) => {
          output += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
          errorOccurred = true;
          res.status(500).json({ error: 'Failed to evaluate image' });
        });
        
        pythonProcess.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
          if (!errorOccurred) {
            try {
              const predictions = output;
              console.log('Predictions:', predictions);

              const data = JSON.parse(predictions.split('\n')[3]);
              
              res.status(200).json({ data, prompt });
              fs.rmSync('./uploads/image.png');
            } catch (error) {
              console.error('Error parsing JSON:', error);
              res.status(500).json({ error: 'Failed to evaluate image' });
            }
          }
        });
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