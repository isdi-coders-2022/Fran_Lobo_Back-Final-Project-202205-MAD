import mongoose, { SchemaTypes } from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';
await mongooseConnect();
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    secondName: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    pasword: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    playList: {
        type: [{ type: SchemaTypes.ObjectId, ref: 'Game', default: null }],
        required: true,
    },
});
export const User = mongoose.model('User', userSchema);
