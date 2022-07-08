import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller.js';
import { loginRequired } from '../middleware/login-required.js';
import { userRequiredForReviews } from '../middleware/user-required.js';
import { Review } from '../models/review.model.js';
export const reviewController = new ReviewController(Review);
export const reviewRouter = Router();
reviewRouter.get('/', reviewController.getAll);
reviewRouter.get('/:id', reviewController.getById);
reviewRouter.post('/', loginRequired, userRequiredForReviews, reviewController.post); //
reviewRouter.patch('/:id', loginRequired, userRequiredForReviews, reviewController.patch); //
reviewRouter.delete('/:id', loginRequired, userRequiredForReviews, reviewController.delete); //
