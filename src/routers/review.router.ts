import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller.js';
import { Review } from '../models/review.model.js';

export const reviewController = new ReviewController(Review);
export const reviewRouter = Router();

reviewRouter.get('/', reviewController.getAll);
reviewRouter.get('/:id', reviewController.getById);
reviewRouter.post('/', reviewController.post);
reviewRouter.patch('/:id', reviewController.patch);
reviewRouter.delete('/:id', reviewController.delete);
