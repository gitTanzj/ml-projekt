import { Router } from 'express';
import { evaluateImage } from '../controllers/imageGameController';
import multer from 'multer'

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

router.post('/evaluate', upload.single('image'), evaluateImage);

export default router;