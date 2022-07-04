import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
//import homeRouter from './routers/home.router.js';
//import { robotRouter } from './routers/robot.router.js';
export const app = express();
// los Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
//app.use('/', homeRouter);
//app.use('/robot', robotRouter);
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
