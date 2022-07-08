import { NextFunction, Request, Response } from 'express';
import { ExtRequest } from '../interfaces/token.js';
import { User } from '../models/user.model.js';

export const userRequiredForReviews = async (
    req: Request,
    resp: Response,
    next: NextFunction
) => {
    const userID = (req as unknown as ExtRequest).tokenPayload.id;
    const user = await User.findById(req.body.idUser);

    if (user === null || user.id !== userID) {
        const error = new Error('User and userID in review are not matching');
        error.name = 'UserAuthorizationError';
        next(error);
    }
    next();
};
