import mongoose from 'mongoose';
import { UserDataDoc } from '../constants/types';


const User: mongoose.Schema = new mongoose.Schema( {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    todos: { type: Array, required: true, default: [] }
} );


export const getUserModel = ( collection: string ) => {
    return mongoose.model<UserDataDoc>( "usr", User, collection );
};