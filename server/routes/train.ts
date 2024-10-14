import express, { Request, Response } from 'express';
import { trainModel } from '../controllers/trainGameController'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
    }
})
// const multi_upload = multer({
//     storage,
//     limits: { fileSize: 1 * 1024 * 1024 }, // 1MB
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//             cb(null, true);
//         } else {
//             cb(null, false);
//             const err = new Error('Only .png, .jpg and .jpeg format allowed!')
//             err.name = 'ExtensionError'
//             return cb(err);
//         }
//     },
// }).array('image', 10)

const upload = multer({ storage })

const router = express.Router()

router.post('/', upload.array('images'), trainModel)

export default router;