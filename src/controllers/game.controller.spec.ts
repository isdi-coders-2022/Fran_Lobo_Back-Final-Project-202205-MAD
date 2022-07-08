import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { GameController } from './game.controller.js';

describe('Given a game controller', () => {
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: Partial<NextFunction> = jest.fn();

    let mockModel = {
        find: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    };
    let gameController = new GameController(
        mockModel as unknown as mongoose.Model<{}>
    );
    beforeEach(() => {
        req = {
            params: { _id: '62c30611f0d5e69d5fefa1b4' },
            body: { name: 'Catán' },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            end: jest.fn().mockReturnValue({}),
        };
    });
    describe('When method getAll is called', () => {
        test('Then resp.end should be called with mockResult', async () => {
            const mockResult = [{ name: 'Catán' }];
            (mockModel.find as jest.Mock).mockResolvedValue(mockResult);
            await gameController.getAll(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
    });
    describe('when method getById is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            const mockResult = { name: 'Catán' };
            (mockModel.findById as jest.Mock).mockResolvedValue(mockResult);
            await gameController.getById(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
        test('If response is null, then resp.end should be called without mockResult', async () => {
            const mockResult = null;
            (mockModel.findById as jest.Mock).mockResolvedValue(mockResult);
            await gameController.getById(req as Request, resp as Response);
            expect(resp.status).toHaveBeenCalledWith(404);
            expect(resp.end).toHaveBeenCalledWith('No game found');
        });
    });
    describe('When method post is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            const mockResult = { name: 'Catán' };
            (mockModel.create as jest.Mock).mockReturnValue(mockResult);
            await gameController.post(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalled();
        });

        test('If error, then function next should be called with error', async () => {
            (mockModel.create as jest.Mock).mockRejectedValue({});
            await gameController.post(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When method postmany is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            const mockResult = [{ name: 'Catán' }];
            req = {
                params: { _id: '62c30611f0d5e69d5fefa1b4' },
                body: [{ name: 'Catán' }],
            };
            (mockModel.create as jest.Mock).mockReturnValue(mockResult);
            await gameController.postMany(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalled();
        });
        test('If error, then function next should be called with error', async () => {
            const mockResult = null;
            (mockModel.create as jest.Mock).mockRejectedValue(mockResult);
            await gameController.postMany(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When patch method is called', () => {
        test('If success then resp.end should be called with mockResult', async () => {
            const mockResult = { name: 'Catán' };
            (mockModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
                mockResult
            );
            await gameController.patch(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
        test('if the data to patch is null, status code should be 404 ', async () => {
            (mockModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
            await gameController.patch(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalledWith('No game found');
        });
        test('If error, then function next should be called with error', async () => {
            (mockModel.findByIdAndUpdate as jest.Mock).mockRejectedValue({});
            await gameController.patch(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When delete method is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            const mockResult = { _id: '62c30611f0d5e69d5fefa1b4' };
            (mockModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
                mockResult
            );
            await gameController.delete(req as Request, resp as Response);
            expect(resp.end).toHaveBeenCalledWith(
                JSON.stringify({ _id: '62c30611f0d5e69d5fefa1b4' })
            );
        });
        test('if response === null,  then resp.end should be called with status Object not found', async () => {
            const mockResult = null;
            (mockModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
                mockResult
            );
            await gameController.delete(req as Request, resp as Response);
            expect(resp.status).toHaveBeenLastCalledWith(400),
                expect(resp.end).toHaveBeenLastCalledWith('Game not found');
        });
    });
});
