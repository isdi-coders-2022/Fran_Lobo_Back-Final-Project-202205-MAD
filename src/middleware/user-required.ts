import { NextFunction, Request, Response } from 'express';
import { ExtRequest } from '../interfaces/token';

import { Review } from '../models/review.model.js';

export const userRequiredForReviews = async (
    req: Request,
    resp: Response,
    next: NextFunction
) => {
    // el usuario tiene acceso al recurso (e.g. Tarea)

    const userID = (req as unknown as ExtRequest).tokenPayload.id;
    const findReview = await Review.findById(req.params.id);
    if (findReview?.idUser === userID) {
        next();
    } else {
        const error = new Error();
        error.name = 'UserAuthorizationError';
        next(error);
    }
};
