import { GameController } from './game.controller.js';
describe('Given a game controller', () => {
    let req;
    let resp;
    let next = jest.fn();
    let mockModel = {
        find: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    };
    let gameController = new GameController(mockModel);
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
            mockModel.find.mockResolvedValue(mockResult);
            await gameController.getAll(req, resp, next);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
    });
    describe('when method getById is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            const mockResult = { name: 'Catán' };
            mockModel.findById.mockResolvedValue(mockResult);
            await gameController.getById(req, resp, next);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
        test('If response is null, then resp.end should be called without mockResult', async () => {
            const mockResult = null;
            mockModel.findById.mockResolvedValue(mockResult);
            await gameController.getById(req, resp, next);
            expect(resp.status).toHaveBeenCalledWith(404);
            expect(resp.end).toHaveBeenCalledWith('No game found');
        });
    });
    describe('When method post is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            const mockResult = { name: 'Catán' };
            mockModel.create.mockReturnValue(mockResult);
            await gameController.post(req, resp, next);
            expect(resp.end).toHaveBeenCalled();
            /*expect(resp.end).toHaveBeenLastCalledWith(
                JSON.stringify(mockResult)
            );*/
        });
        test('If error, then function next should be called with error', async () => {
            const mockResult = null;
            mockModel.create.mockRejectedValue(mockResult);
            await gameController.post(req, resp, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When patch method is called', () => {
        test('If success then resp.end should be called with mockResult', async () => {
            const mockResult = { name: 'Catán' };
            mockModel.findByIdAndUpdate.mockResolvedValue(mockResult);
            await gameController.patch(req, resp, next);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
    });
    describe('When delete method is called', () => {
        test('If success, then resp.end  should be called with mockResult', async () => {
            const mockResult = { _id: '62c30611f0d5e69d5fefa1b4' };
            mockModel.findByIdAndDelete.mockResolvedValue(mockResult);
            await gameController.delete(req, resp, next);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify({ _id: '62c30611f0d5e69d5fefa1b4' }));
        });
        test('if response === null,  then resp.end should be called with status Object not found', async () => {
            const mockResult = null;
            mockModel.findByIdAndDelete.mockResolvedValue(mockResult);
            await gameController.delete(req, resp, next);
            expect(resp.status).toHaveBeenLastCalledWith(400),
                expect(resp.end).toHaveBeenLastCalledWith('Game not found');
        });
    });
});
