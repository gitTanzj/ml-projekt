import express from 'express';
const app = express();
const PORT = 4000;


import userRoutes from './routes/user'
app.use('/user', userRoutes)

import drawRoutes from './routes/train'
app.use('/train', drawRoutes)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})