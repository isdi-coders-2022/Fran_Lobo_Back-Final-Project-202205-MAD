import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { User } from '../models/user.model.js';

export const userController = new UserController(User);
export const userRouter = Router();

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getById);
userRouter.post('/login', userController.loginController);
userRouter.post('/', userController.registerUser);
userRouter.patch('/:id', userController.patch);
userRouter.delete('/:id', userController.delete);
