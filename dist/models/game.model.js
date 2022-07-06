import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
await mongooseConnect();
const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
        unique: true,
    },
});
export const Game = mongoose.model('Game', gameSchema);
