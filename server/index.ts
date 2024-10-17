import express from 'express';
import { createServer } from "http";
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    }
});
const PORT = 4000;

let player_ids: string[] = []

import userRoutes from './routes/user'
app.use('/user', userRoutes)

import drawRoutes from './routes/train'
app.use('/train', drawRoutes)



io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('play', () => {
        const existing = player_ids.filter((player) => player === socket.id)
        if(existing.length === 0){
            player_ids.push(socket.id)
        }
        io.emit('players', player_ids.length)
    })

    

    
})

io.on('disconnect', (socket) => {
    console.log('user disconnected');
    player_ids = player_ids.filter((player) => player !== socket.id)
})

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});