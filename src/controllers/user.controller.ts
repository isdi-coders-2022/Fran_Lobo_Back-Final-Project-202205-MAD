/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { HydratedDocument, Model } from 'mongoose';
import { iTokenPayload } from '../interfaces/token.js';
import * as aut from '../services/authorization.js';

export class UserController<T> {
    constructor(public model: Model<T>) {}

    getAll = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-Type', 'application/json');
        const user = await this.model.find();
        resp.end(JSON.stringify(user));
    };

    getById = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-Type', 'application/json');
        const result = await this.model
            .findById(req.params.id)
            .populate('playList');
        if (result === null) {
            resp.status(404);
            resp.end('No user found');
        } else {
            resp.end(JSON.stringify(result));
        }
    };

    registerUser = async (req: Request, resp: Response, next: NextFunction) => {
        let newItem: HydratedDocument<any>;
        try {
            req.body.password = await aut.encrypt(req.body.password);
            newItem = await this.model.create(req.body);
        } catch (error) {
            next(error);
            return;
        }
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.end(JSON.stringify(newItem));
    };

    patch = async (req: Request, resp: Response, next: NextFunction) => {
        resp.setHeader('Content-type', 'application/json');
        try {
            const updatedItem = await this.model.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (updatedItem === null) {
                resp.status(404);
                resp.end('No user found');
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
            resp.end(`User not found`);
        } else {
            resp.end(JSON.stringify({ _id: deletedItem._id }));
        }
    };

    loginController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        const findUser: any = await this.model.findOne({
            email: req.body.email,
        });
        if (
            !findUser ||
            !(await aut.compare(req.body.password, findUser.password))
        ) {
            const error = new Error('Invalid user or password');
            error.name = 'UserAuthorizationError';
            next(error);
            return;
        }
        const tokenPayLoad: iTokenPayload = {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
        };

        const token = aut.createToken(tokenPayLoad);
        resp.setHeader('Content-type', 'application/json');
        resp.status(201);
        resp.end(JSON.stringify({ token, id: findUser.id }));
    };
}
