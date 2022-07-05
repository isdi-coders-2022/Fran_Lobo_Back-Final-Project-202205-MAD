import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
import { SchemaTypes } from 'mongoose';
await mongooseConnect();
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
export const Review = mongoose.model('Review', reviewSchema);
