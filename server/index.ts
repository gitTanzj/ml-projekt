import express, { Request, Response} from 'express';
import { createServer } from "http";
import { Server, Socket } from 'socket.io';
import session from 'express-session';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }
});
const PORT = 4000;

const clients: {
    [key: string]: string;
} = {};
const games: {} = {};

const sessionMiddleware = session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sessionMiddleware)

app.use(express.static(path.join(__dirname, './dist')))

app.get('/', (req: Request, res: Response) => {
    res.send('This is the mope website API!')
})

import userRoutes from './routes/user'
app.use('/user', userRoutes)

import gameRoutes from './routes/game'
app.use('/game', gameRoutes)

import drawRoutes from './routes/train'
app.use('/train', drawRoutes)

io.use((socket, next) => {
    sessionMiddleware(socket.request as express.Request, {} as express.Response, next as express.NextFunction);
})

io.on('connection', (socket: Socket) => {
    const sessionId = (socket.request as express.Request).sessionID;
    console.log(`A user connected with session ID: ${sessionId}`);

    socket.on('join-game', (data) => {
        console.log(`Join game event received from session ID: ${sessionId}`);
        clients[sessionId] = data;
        io.emit('players-size', Object.keys(clients).length);
        if (Object.keys(clients).length === 1) {
            io.emit('start-game');
        }
    });

    socket.on('end-game', () => {
        console.log(`End game event received from session ID: ${sessionId}`);
        delete clients[sessionId];
        io.emit('players-size', Object.keys(clients).length);
    })

    socket.on('disconnect', () => {
        console.log(`User with session ID ${sessionId} disconnected`);
        delete clients[sessionId];
        io.emit('players-size', Object.keys(clients).length);
    });

    socket.on('error', (err) => {
        console.error(`Socket error from session ID ${sessionId}:`, err);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});