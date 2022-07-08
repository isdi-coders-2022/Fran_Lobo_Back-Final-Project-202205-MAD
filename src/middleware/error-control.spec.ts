import { NextFunction, Request, Response } from 'express';
import { errorControl } from './error-control';

describe('Given the control error', () => {
    let req: Request;
    let resp: Partial<Response>;
    let next: NextFunction;
    let error: Error;

    describe('When send a error', () => {
        (resp = { send: jest.fn(), status: jest.fn() }),
            (error = {
                name: 'UserAuthorizationError',
                message: 'test-errorControl',
            });
        test('Then change a status with a error name', () => {
            errorControl(error, req, resp as Response, next);
            expect(resp.status).toHaveBeenCalledWith(401);
        });
        test('Then change a status with a error name', () => {
            errorControl({} as Error, req, resp as Response, next);
            expect(resp.status).toHaveBeenCalledWith(401);
        });
    });
});
