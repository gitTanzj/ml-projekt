import express, { Request, Response } from 'express';
import { app } from '../utils/firebase'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
const auth = getAuth(app);

const register = (req: Request, res: Response) => {
    const { email, password } = req.body;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
}

const login = (req: Request, res: Response) => {
    const { email, password } = req.body;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user
    })
    .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
    })
}

export { login, register }