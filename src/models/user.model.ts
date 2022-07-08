import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';

(async () => {
    await mongooseConnect();
})();

export interface iUser {
    id?: String;
    name: string;
    secondName: string;
    email: string;
    password: string;
    avatar: string;
    playList: string[];
}

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
    playList: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Game',
            default: null,
        },
    ],
});

export const User = mongoose.model('User', userSchema);
