import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ErrorMessages, SuccessMessages } from '../constants/enums.js';
import { getUserModel } from '../model/UserModel.js';
import { RegisterRequestPayload } from 'src/constants/types.js';
import mongoose from 'mongoose';

export const loginUser = async ( req: Request, res: Response ) => {
    const { username, email, password } = req.body;
    try {

        if ( !password || ( !email && !username ) ) return res.status( 400 ).json( { origin: process.env.ORIGIN, message: ErrorMessages.invalid } );

        const UserModel = getUserModel( process.env.MONGO_COLLECTION );

        const user = username ? await UserModel.findOne( { username } ) : await UserModel.findOne( { email } );

        if ( !user ) return res.status( 404 ).json( { origin: process.env.ORIGIN, messgae: ErrorMessages.notFound } );

        if ( await bcrypt.compare( user.password, password ) ) return res.status( 403 ).json( { origin: process.env.ORIGIN, messgae: ErrorMessages.incorrectAuth } );

        const token = req.headers.authorization ? req.headers.authorization : jwt.sign( { email: user.email, id: user._id }, process.env.SECRET, { expiresIn: "1h" } );

        res.status( 200 ).json( { origin: process.env.ORIGIN, user, token } );


    } catch ( err ) {
        res.status( 500 ).json( { message: ErrorMessages.unknown } );
    }
};

export const saveUser = async ( req: Request, res: Response ) => {
    const { email, password, confirmPassword, firstName, lastName }: RegisterRequestPayload = req.body;

    try {

        if ( !password || !firstName || !lastName || !email || !confirmPassword ) {
            return res.status( 400 ).json( { origin: process.env.ORIGIN, message: ErrorMessages.invalid } );
        }

        if ( password !== confirmPassword ) return res.status( 401 ).json( { origin: process.env.ORIGIN, message: ErrorMessages.wrongPassword } );

        const UserModel = getUserModel( process.env.MONGO_TEST_COLLECTION );

        const duplicateUser = await UserModel.find( { email } );

        if ( duplicateUser.length ) return res.status( 409 ).json( { origin: process.env.ORIGIN, message: ErrorMessages.duplicateMail } );

        const newUser = new UserModel( {
            email,
            firstName,
            lastName,
            password: await bcrypt.hash( password, 12 ),
            todos: []
        } );

        await newUser.save();

        res.status( 200 ).json( { origin: process.env.ORIGIN, message: SuccessMessages.userCreated, status: "OK" } );

    } catch ( err ) {
        res.status( 500 ).json( { message: ErrorMessages.unknown } );
    }
};


export const deleteUser = async ( req: Request, res: Response ) => {
    const { _id } = req.params;
    console.log( _id );
    try {

        if ( !_id ) {
            return res.status( 400 ).json( { origin: process.env.ORIGIN, message: ErrorMessages.invalid } );
        }

        if ( !mongoose.Types.ObjectId.isValid( _id ) ) return res.status( 401 ).json( { origin: process.env.ORIGIN, message: ErrorMessages.incorrectId } );

        const UserModel = getUserModel( process.env.MONGO_TEST_COLLECTION );

        const user = await UserModel.findById( { _id } );

        if ( !user ) return res.status( 404 ).json( { origin: process.env.ORIGIN, message: ErrorMessages.notFound } );

        await UserModel.findByIdAndDelete( { _id: user._id } );

        res.status( 200 ).json( { origin: process.env.ORIGIN, message: SuccessMessages.userDeleted } );

    } catch ( err ) {
        res.status( 500 ).json( { message: ErrorMessages.unknown } );
    }
};