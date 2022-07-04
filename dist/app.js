import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { reviewRouter } from './routers/review.router.js';
import { gameRouter } from './routers/game.router.js';
import { userRouter } from './routers/user.router.js';
export const app = express();
// los Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/game', gameRouter);
app.use('/review', reviewRouter);
app.use((error, req, resp, next) => {
    req;
    next;
    let status = 500;
    if (error.name === 'ValidationError ') {
        status = 406;
    }
    if (error.name === 'CastError') {
        status = 400;
    }
    resp.status(status);
    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };
    resp.end(JSON.stringify(result));
});
