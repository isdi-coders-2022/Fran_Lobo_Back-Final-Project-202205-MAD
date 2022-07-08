import { Router } from 'express';
import { GameController } from '../controllers/game.controller.js';
import { Game } from '../models/game.model.js';

export const gameController = new GameController(Game);
export const gameRouter = Router();

gameRouter.get('/', gameController.getAll);
gameRouter.get('/:id', gameController.getById);
gameRouter.post('/', gameController.post);
gameRouter.post('/many', gameController.postMany);
gameRouter.patch('/:id', gameController.patch);
gameRouter.delete('/:id', gameController.delete);
