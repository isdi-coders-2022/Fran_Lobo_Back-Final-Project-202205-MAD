import mongoose, { SchemaTypes } from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
(async () => {
    await mongooseConnect();
})();
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    secondName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
<<<<<<< Updated upstream
    playList: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Game',
            default: null,
        },
    ],
=======
    playList: {
        type: [{ type: SchemaTypes.ObjectId, ref: 'Game', default: null }],
        required: true,
    },
>>>>>>> Stashed changes
});
export const User = mongoose.model('User', userSchema);
