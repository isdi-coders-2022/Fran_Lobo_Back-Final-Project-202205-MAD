import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const mongooseConnect = async () => {
    const url = process.env.URL_MONGO;
    return mongoose.connect(url);
};
