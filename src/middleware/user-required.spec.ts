import { NextFunction, Response, Request } from 'express';
import { ExtRequest } from '../interfaces/token';
import { Review } from '../models/review.model';
import { User } from '../models/user.model';
import { userRequiredForReviews } from './user-required';

jest.mock('jsonwebtoken');
describe('Given the control error', () => {
    let req: Partial<ExtRequest>;
    let resp: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        (req = {
            body: { id: '1' },
            get: jest.fn(),
            tokenPayload: { id: '1' },
        }),
            (next = jest.fn());
    });
    describe('When use user-required with valid token', () => {
        test('Then should be call next without error', async () => {
            User.findById = jest.fn().mockReturnValue({ id: '1' });
            req.get = jest.fn().mockReturnValue('bearer token');
            await userRequiredForReviews(
                req as Request,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });

        test('Then should be call next with error', async () => {
            req = {
                body: { id: '23' },
                get: jest.fn(),
                tokenPayload: { id: '34' },
            };
            const error = new Error(
                'User and userID in review are not matching'
            );
            error.name = 'UserAuthorizationError';
            User.findById = jest.fn().mockReturnValue({ id: '8' });
            req.get = jest.fn().mockReturnValue('bearer token');
            await userRequiredForReviews(
                req as Request,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalledWith(error);
        });
        test('Then should  be call next with UserAuthorizationError ', async () => {
            User.findById = jest.fn().mockReturnValue({ _id: '13131' });

            await userRequiredForReviews(
                req as Request,
                resp as Response,
                next
            );
            expect(next).toHaveBeenCalled();
        });
    });
});
