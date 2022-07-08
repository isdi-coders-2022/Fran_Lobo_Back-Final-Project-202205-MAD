/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import { log } from 'console';
import { NextFunction, Request, response, Response } from 'express';
import { Model } from 'mongoose';

export class ReviewController<T> {
    constructor(public model: Model<T>) {}

    getAll = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-Type', 'application/json');
        const reviews = await this.model
            .find()
            .populate('idGame')
            .populate('idUser');
        resp.end(JSON.stringify(reviews));
    };

    getById = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-Type', 'application/json');
        const result = await this.model
            .findById(req.params.id)
            .populate('idGame')
            .populate('idUser');
        if (result === null) {
            resp.status(404);
            resp.end('No review found');
        } else {
            resp.end(JSON.stringify(result));
        }
    };

    post = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-Type', 'application/json');
        resp.status(201);

        try {
            const newItem = await this.model.create(req.body);
            const savedReview = await this.model
                .findById(newItem.id)
                .populate('idGame')
                .populate('idUser');
            resp.end(JSON.stringify(savedReview));
        } catch (error) {
            next(error);
        }
    };

    patch = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-type', 'application/json');
        try {
            const updatedItem = await this.model
                .findByIdAndUpdate(req.params.id, req.body)
                .populate('idGame')
                .populate('idUser');
            if (updatedItem === null) {
                resp.status(404);
                resp.end('No review found');
            } else {
                resp.end(JSON.stringify(updatedItem));
            }
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-type', 'application/json');
        const deletedItem = await this.model.findByIdAndDelete(req.params.id);
        if (deletedItem === null) {
            resp.status(400);
            resp.end(`Review not found`);
        } else {
            resp.end(JSON.stringify({ _id: deletedItem._id }));
        }
    };
}
