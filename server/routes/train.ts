import express, { Request, Response } from 'express';
import { trainModel } from '../controllers/trainGameController'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage})
const router = express.Router()

router.post('/', upload.array('images'), trainModel)

export default router;