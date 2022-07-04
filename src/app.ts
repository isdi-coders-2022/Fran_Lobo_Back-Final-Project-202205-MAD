import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { gameRouter } from './routers/game.router.js';
import { userRouter } from './routers/user.router.js';
export const app = express();

// los Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

export interface ExtraRequest extends Request {
    calculo: number;
}

app.use('/game', userRouter);
app.use('/game', gameRouter);

app.use((error: Error, req: Request, resp: Response, next: NextFunction) => {
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
