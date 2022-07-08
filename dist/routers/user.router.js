import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { loginRequired } from '../middleware/login-required.js';
import { userRequiredForReviews } from '../middleware/user-required.js';
import { User } from '../models/user.model.js';
export const userController = new UserController(User);
export const userRouter = Router();
userRouter.get('/', userController.getAll);
userRouter.get('/:id', loginRequired, userRequiredForReviews, userController.getById); //
userRouter.post('/login', userController.loginController);
userRouter.post('/', userController.registerUser);
userRouter.patch('/:id', loginRequired, userRequiredForReviews, userController.patch); //
userRouter.delete('/:id', loginRequired, userRequiredForReviews, userController.delete); //
