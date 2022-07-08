import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';

(async () => {
    await mongooseConnect();
})();

export interface iGame {
    name: string;
    description: string;
    url: string;
    image: string;
}

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

export const Game = mongoose.model('Game', gameSchema);
