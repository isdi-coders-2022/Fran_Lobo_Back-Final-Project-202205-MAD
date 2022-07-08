import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose';
(async () => {
    await mongooseConnect();
})();
const reviewSchema = new mongoose.Schema({
    idUser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
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
