import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
import { SchemaTypes } from 'mongoose';

await mongooseConnect();

export interface iReview {
    idUser: string;
    idGame: string;
    text: string;
}

const reviewSchema = new mongoose.Schema({
    idUser: {
        type: [{ type: SchemaTypes.ObjectId, ref: 'User', default: null }],
        required: true,
    },
    idGame: {
        type: [{ type: SchemaTypes.ObjectId, ref: 'Game', default: null }],
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

export const Game = mongoose.model('Review', reviewSchema);
