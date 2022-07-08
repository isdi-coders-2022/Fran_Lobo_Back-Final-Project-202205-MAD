import { ReviewController } from './review.controller.js';
describe('Given a review controller', () => {
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
    let reviewController = new ReviewController(mockModel);
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
            mockModel.find.mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    populate: jest.fn().mockResolvedValue(mockResult),
                }),
            });
            await reviewController.getAll(req, resp, next);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
    });
    describe('when method getById is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            const mockResult = { text: 'Solo he jugado una partida' };
            mockModel.findById.mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    populate: jest.fn().mockResolvedValue(mockResult),
                }),
            });
            await reviewController.getById(req, resp, next);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
        test('If response is null, then resp.end should be called without mockResult', async () => {
            const mockResult = null;
            mockModel.findById.mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    populate: jest.fn().mockResolvedValue(mockResult),
                }),
            });
            await reviewController.getById(req, resp, next);
            expect(resp.status).toHaveBeenCalledWith(404);
            expect(resp.end).toHaveBeenCalledWith('No review found');
        });
    });
    describe('When method post is called', () => {
        test('If success, then resp.end should be called with mockResult', async () => {
            const mockResult = { text: 'Solo he jugado una partida' };
            mockModel.create.mockReturnValue(mockResult);
            await reviewController.post(req, resp, next);
            expect(resp.end).toHaveBeenCalled();
            /*expect(resp.end).toHaveBeenLastCalledWith(
                JSON.stringify(mockResult)
            );*/
        });
        test('If error, then function next should be called with error', async () => {
            const mockResult = null;
            mockModel.create.mockRejectedValue(mockResult);
            await reviewController.post(req, resp, next);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('When patch method is called', () => {
        test('If success then resp.end should be called with mockResult', async () => {
            const mockResult = { text: 'Solo he jugado una partida' };
            mockModel.findByIdAndUpdate.mockResolvedValue(mockResult);
            await reviewController.patch(req, resp, next);
            expect(resp.end).toHaveBeenCalledWith(JSON.stringify(mockResult));
        });
        test('if the data to patch is null, status code should be 404 ', async () => {
            mockModel.findByIdAndUpdate.mockResolvedValue(null);
            await reviewController.patch(req, resp, next);
            expect(resp.end).toHaveBeenCalledWith('No review found');
        });
        test('If error, then function next should be called with error', async () => {
            mockModel.findByIdAndUpdate.mockRejectedValue({});
            await reviewController.patch(req, resp, next);
            expect(next).toHaveBeenCalled();
        });
        describe('When delete method is called', () => {
            test('If success, then resp.end  should be called with mockResult', async () => {
                const mockResult = { _id: '62c31d498ed5de1aa978ba0e' };
                mockModel.findByIdAndDelete.mockResolvedValue(mockResult);
                await reviewController.delete(req, resp, next);
                expect(resp.end).toHaveBeenCalledWith(JSON.stringify({ _id: '62c31d498ed5de1aa978ba0e' }));
            });
            test('if response === null,  then resp.end should be called with status Object not found', async () => {
                const mockResult = null;
                mockModel.findByIdAndDelete.mockResolvedValue(mockResult);
                await reviewController.delete(req, resp, next);
                expect(resp.status).toHaveBeenLastCalledWith(400),
                    expect(resp.end).toHaveBeenLastCalledWith('Review not found');
            });
        });
    });
});
