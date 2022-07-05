import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ReviewController } from './review.controller.js';

describe('Given a review controller', () => {
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
    let reviewController = new ReviewController(
        mockModel as unknown as mongoose.Model<{}>
    );
    beforeEach(() => {
        req = {
            params: { _id: '62c31d498ed5de1aa978ba0e' },
            body: { text: 'Solo he jugado una partida' },
        };
        resp = {
            setHeader: jest.fn(),
            status: jest.fn(),
            end: jest.fn().mockReturnValue({}),
        };
    });
    describe('When method getAll is called', () => {
        test('Then resp.end should be called with mockResult', async () => {
            const mockResult = [{ text: 'Solo he jugado una partida' }];
            (mockModel.find as jest.Mock).mockResolvedValue(mockResult);
            await reviewController.getAll(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
    });
    describe('when method getById is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            const mockResult = { text: 'Solo he jugado una partida' };
            (mockModel.findById as jest.Mock).mockResolvedValue(mockResult);
            await reviewController.getById(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
        test('If response is null, then resp.end should be called without mockResult', async () => {
            const mockResult = null;
            (mockModel.findById as jest.Mock).mockResolvedValue(mockResult);
            await reviewController.getById(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.status).toHaveBeenCalledWith(404);
            expect(resp.end).toHaveBeenCalledWith('No review found');
        });
    });
    describe('When method post is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            const mockResult = { text: 'Solo he jugado una partida' };
            (mockModel.create as jest.Mock).mockReturnValue(mockResult);
            await reviewController.post(
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
            await reviewController.post(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When patch method is called', () => {
        test('If success then resp.end should be called with mockResult', async () => {
            const mockResult = { text: 'Solo he jugado una partida' };
            (mockModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
                mockResult
            );
            await reviewController.patch(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
    });
    describe('When delete method is called', () => {
        test('If success, then resp.end  should be called with mockResult', async () => {
            const mockResult = { _id: '62c31d498ed5de1aa978ba0e' };
            (mockModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
                mockResult
            );
            await reviewController.delete(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.end).toHaveBeenCalledWith(
                JSON.stringify({ _id: '62c31d498ed5de1aa978ba0e' })
            );
        });
        test('if response === null,  then resp.end should be called with status Object not found', async () => {
            const mockResult = null;
            (mockModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
                mockResult
            );
            await reviewController.delete(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.status).toHaveBeenLastCalledWith(400),
                expect(resp.end).toHaveBeenLastCalledWith('Review not found');
        });
    });
});
