/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, response, Response } from 'express';
import { Model } from 'mongoose';
import { iGame } from '../models/game.model';

export class GameController<T> {
    constructor(public model: Model<T>) {}

    getAll = async (req: Request, resp: Response) => {
        resp.setHeader('Content-Type', 'application/json');
        const games = await this.model.find();
        resp.end(JSON.stringify(games));
    };

    getById = async (req: Request, resp: Response) => {
        resp.setHeader('Content-Type', 'application/json');
        const result = await this.model.findById(req.params.id);
        if (result === null) {
            resp.status(404);
            resp.end('No game found');
        }
        resp.end(JSON.stringify(result));
    };

    post = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-Type', 'application/json');
        resp.status(201);
        try {
            const newItem = await this.model.create(req.body);
            resp.end(JSON.stringify(newItem));
<<<<<<< HEAD
        } catch (error) {
            next(error);
        }
    };
    postMany = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-Type', 'application/json');
        resp.status(201);
        const arrayGames: iGame[] = req.body;
        try {
            const result = arrayGames.map((game) => {
                this.model.create(game);
            });
            resp.end(JSON.stringify(result));
=======
>>>>>>> main
        } catch (error) {
            next(error);
        }
    };

    patch = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-type', 'application/json');
        response.status(200);
        try {
            const updatedItem = await this.model.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (updatedItem === null) {
                resp.status(404);
                resp.end('No game found');
            }
            resp.end(JSON.stringify(updatedItem));
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, resp: Response) => {
        resp.setHeader('Content-type', 'application/json');
        response.status(200);
        const deletedItem = await this.model.findByIdAndDelete(req.params.id);
        if (deletedItem === null) {
            resp.status(400);
            resp.end(`Game not found`);
        } else {
            resp.end(JSON.stringify({ _id: deletedItem._id }));
        }
    };
}
