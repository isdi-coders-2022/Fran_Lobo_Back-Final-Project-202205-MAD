<<<<<<< HEAD
import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
(async () => {
    await mongooseConnect();
})();
const reviewSchema = new mongoose.Schema({
    idUser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
=======
import { mongooseConnect } from '../db/mongoose.js';
import mongoose from 'mongoose';
await mongooseConnect();
const reviewSchema = new mongoose.Schema({
    idUser: {
        type: [
            { type: mongoose.SchemaTypes.ObjectId, ref: 'User', default: null },
        ],
>>>>>>> main
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
