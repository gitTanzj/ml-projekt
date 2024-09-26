import express, { Request, Response } from 'express';
const router = express.Router()

import { login, register } from '../controllers/userController'

router.get('/' )

router.post('/login', login)
router.post('/register', register)

export default router;