import { mongooseConnect } from '../db/mongoose.js';
import mongoose from 'mongoose';

await mongooseConnect();

export interface iReview {
    idUser: string;
    idGame: string;
    text: string;
}

const reviewSchema = new mongoose.Schema({
    idUser: {
        type: [
            { type: mongoose.SchemaTypes.ObjectId, ref: 'User', default: null },
        ],
        required: true,
    },
    idGame: {
        type: [
            { type: mongoose.SchemaTypes.ObjectId, ref: 'Game', default: null },
        ],
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

export const Review = mongoose.model('Review', reviewSchema);
