import { Router } from 'express';
import { evaluateImage } from '../controllers/imageGameController';

const router = Router();

router.post('/evaluate', evaluateImage);

export default router;