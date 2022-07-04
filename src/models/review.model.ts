import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';

await mongooseConnect();

export interface iReview {
    idUser: string;
    idGame: string;
    text: string;
}

const reviewSchema = new mongoose.Schema({
    idUser: {
        type: String,
        required: true,
    },
    idGame: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

export const Game = mongoose.model('Review', reviewSchema);
