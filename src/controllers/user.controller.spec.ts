import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { UserController } from './user.controller.js';
import * as aut from '../services/authorization';

jest.mock('../services/authorization');

describe('Given a user controller', () => {
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: Partial<NextFunction> = jest.fn();

    const mockResult = { name: 'Fernando' };

    let mockModel = {
        find: jest.fn(),
        findOne: jest.fn().mockResolvedValue(mockResult),
        findById: jest.fn().mockReturnValue({
            populate: jest.fn().mockResolvedValue(mockResult),
        }),
        create: jest.fn().mockResolvedValue(mockResult),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    };
    let userController = new UserController(
        mockModel as unknown as mongoose.Model<{}>
    );
    beforeEach(() => {
        req = {
            params: { _id: '62c31391669ea81bed566ec1' },
            body: { name: 'Fernando', password: '123456' },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            end: jest.fn().mockReturnValue({}),
        };
    });
    describe('When method getAll is called', () => {
        test('Then resp.end should be called with mockResult', async () => {
            const mockResult = [{ name: 'Fernando' }];
            (mockModel.find as jest.Mock).mockResolvedValue(mockResult);
            await userController.getAll(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
    });
    describe('when method getById is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            const mockResult = { name: 'Fernando' };
            await userController.getById(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
        test('If response is null, then resp.end should be called without mockResult', async () => {
            const mockResult = null;
            (mockModel.findById as jest.Mock).mockReturnValue({
                populate: jest.fn().mockResolvedValue(mockResult),
            }),
                // MOCK DOUBLE POPULATE
                // (mockModel.findById as jest.Mock).mockReturnValue({
                //     populate: jest
                //         .fn()
                //         .mockReturnValue({
                //             populate: jest.fn().mockResolvedValue(mockResult),
                //         }),
                // }),

                await userController.getById(
                    req as Request,
                    resp as Response,
                    next as NextFunction
                );
            expect(resp.status).toHaveBeenCalledWith(404);
            expect(resp.end).toHaveBeenCalledWith('No user found');
        });
    });
    describe('When method registerUser is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            await userController.registerUser(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalled();
            /*expect(resp.end).toHaveBeenLastCalledWith(
                JSON.stringify(mockResult)
            );*/
        });
        test('If error, then function next should be called with error', async () => {
            const mockResult = null;
            (mockModel.create as jest.Mock).mockRejectedValue(mockResult);
            await userController.registerUser(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When patch method is called', () => {
        test('If success then resp.end should be called with mockResult', async () => {
            const mockResult = { name: 'Fernando' };
            (mockModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
                mockResult
            );
            await userController.patch(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
        test('if the data to patch is null, status code should be 404 ', async () => {
            (mockModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
            await userController.patch(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalledWith('No user found');
        });
        test('If error, then function next should be called with error', async () => {
            (mockModel.findByIdAndUpdate as jest.Mock).mockRejectedValue({});
            await userController.patch(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When delete method is called', () => {
        test('If success, then resp.end  should be called with mockResult', async () => {
            const mockResult = { _id: '62c31391669ea81bed566ec1' };
            (mockModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
                mockResult
            );
            await userController.delete(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalledWith(
                JSON.stringify({ _id: '62c31391669ea81bed566ec1' })
            );
        });
        test('if response === null,  then resp.end should be called with status Object not found', async () => {
            const mockResult = null;
            (mockModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
                mockResult
            );
            await userController.delete(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.status).toHaveBeenLastCalledWith(400),
                expect(resp.end).toHaveBeenLastCalledWith('User not found');
        });
    });
    describe('When loginController method is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            const mockResult = {
                token: '4353463436346',
                id: '62c30611f0d5e69d5fefa1b4',
            };
            (aut.createToken as jest.Mock).mockReturnValue(mockResult.token);
            mockModel.findOne.mockResolvedValueOnce(mockResult);
            (aut.compare as jest.Mock).mockResolvedValue(true);
            await userController.loginController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
        test('If error, then function next should be called with error', async () => {
            mockModel.findOne.mockResolvedValueOnce(null);
            await userController.loginController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
});
