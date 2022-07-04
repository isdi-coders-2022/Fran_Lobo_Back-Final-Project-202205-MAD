/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';

export class ReviewController<T> {
    constructor(public model: Model<T>) {}

    getAll = async (req: Request, resp: Response, next: NextFunction) => {
        console.log('hola');
        resp.setHeader('Content-Type', 'application/json');
        try {
            resp.end(JSON.stringify(await this.model.find()));
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-Type', 'application/json');
        try {
            const result = await this.model.findById(req.params.id);
            if (result === null) {
                resp.status(404);
                resp.end('No object found');
            }
            resp.end(JSON.stringify(result));
        } catch (error) {
            next(error);
        }
    };

    post = async (req: Request, resp: Response, next: NextFunction) => {
        console.log(req.body);
        console.log('post');
        resp.setHeader('Content-Type', 'application/json');
        resp.status(201);
        try {
            const newItem = await this.model.create(req.body);
            // resp.end(JSON.stringify( newItem));
            resp.end(JSON.stringify(req.body));
        } catch (error) {
            next(error);
        }
    };

    patch = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-type', 'application/json');
        try {
            const newItem = await this.model.findByIdAndUpdate(
                req.params.id,
                req.body
            );
            resp.end(JSON.stringify(req.body));
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-type', 'application/json');
        try {
            const deletedItem = await this.model.findByIdAndDelete(
                req.params.id
            );
            if (deletedItem === null) {
                resp.status(400);
                resp.end(`Object not found`);
            } else {
                resp.end(JSON.stringify({ _id: deletedItem._id }));
            }
        } catch (error) {
            next(error);
        }
    };
}
