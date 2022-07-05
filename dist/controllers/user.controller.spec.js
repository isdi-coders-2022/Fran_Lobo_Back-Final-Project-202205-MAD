import { UserController } from './user.controller.js';
describe('Given a user controller', () => {
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
    let userController = new UserController(mockModel);
    beforeEach(() => {
        req = {
            params: { _id: '62c31391669ea81bed566ec1' },
            body: { name: 'Fernando' },
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
            mockModel.find.mockResolvedValue(mockResult);
            await userController.getAll(req, resp, next);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
    });
    describe('when method getById is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            const mockResult = { name: 'Fernando' };
            mockModel.findById.mockResolvedValue(mockResult);
            await userController.getById(req, resp, next);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
        test('If response is null, then resp.end should be called without mockResult', async () => {
            const mockResult = null;
            mockModel.findById.mockResolvedValue(mockResult);
            await userController.getById(req, resp, next);
            expect(resp.status).toHaveBeenCalledWith(404);
            expect(resp.end).toHaveBeenCalledWith('No user found');
        });
    });
    describe('When method post is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            const mockResult = { name: 'Fernando' };
            mockModel.create.mockReturnValue(mockResult);
            await userController.post(req, resp, next);
            expect(resp.end).toHaveBeenCalled();
            /*expect(resp.end).toHaveBeenLastCalledWith(
                JSON.stringify(mockResult)
            );*/
        });
        test('If error, then function next should be called with error', async () => {
            const mockResult = null;
            mockModel.create.mockRejectedValue(mockResult);
            await userController.post(req, resp, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When patch method is called', () => {
        test('If success then resp.end should be called with mockResult', async () => {
            const mockResult = { name: 'Fernando' };
            mockModel.findByIdAndUpdate.mockResolvedValue(mockResult);
            await userController.patch(req, resp, next);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
    });
    describe('When delete method is called', () => {
        test('If success, then resp.end  should be called with mockResult', async () => {
            const mockResult = { _id: '62c31391669ea81bed566ec1' };
            mockModel.findByIdAndDelete.mockResolvedValue(mockResult);
            await userController.delete(req, resp, next);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify({ _id: '62c31391669ea81bed566ec1' }));
        });
        test('if response === null,  then resp.end should be called with status Object not found', async () => {
            const mockResult = null;
            mockModel.findByIdAndDelete.mockResolvedValue(mockResult);
            await userController.delete(req, resp, next);
            expect(resp.status).toHaveBeenLastCalledWith(400),
                expect(resp.end).toHaveBeenLastCalledWith('User not found');
        });
    });
});
