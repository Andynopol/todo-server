import { Request, Response } from 'express';
import { ErrorMessages } from '../constants/enums.js';
import { getUserModel } from '../model/UserModel.js';
import { v4 as uuid } from 'uuid';

export const AddTodo = async ( req: Request, res: Response ) => {
    const { _id, content } = req.body;

    try {

        if ( !_id || !content ) return res.status( 400 ).json( { origin: process.env.ORIGIN, message: ErrorMessages.wrongPassword } ).end();

        const UserModel = getUserModel( process.env.MONGO_COLLECTION );

        const user = await UserModel.findById( _id );

        if ( !user ) return res.status( 404 ).json( { origin: process.env.ORIGIN, message: ErrorMessages.notFound } );

        await UserModel.findByIdAndUpdate( _id, { $push: { todos: { todoId: uuid(), content, timestamp: new Date() } } } );

        res.status( 200 ).json( { origin: process.env.ORIGIN, message: "Todo Item stored with success" } );

    } catch ( err ) {
        res.status( 500 ).json( { message: ErrorMessages.unknown } );
    }
};

export const RemoveTodo = async ( req: Request, res: Response ) => {
    const { _id, todoId, } = req.body;

    try {

        if ( !_id || !todoId ) return res.status( 400 ).json( { origin: process.env.ORIGIN, message: ErrorMessages.invalid } ).end();

        const UserModel = getUserModel( process.env.MONGO_COLLECTION );

        const user = await UserModel.findById( _id );

        if ( !user ) return res.status( 404 ).json( { origin: process.env.ORIGIN, message: ErrorMessages.notFound } );

        await UserModel.findByIdAndUpdate( _id, { $pull: { todos: { todoId } } } );

        res.status( 200 ).json( { origin: process.env.ORIGIN, message: "Todo Item removed with success" } );

    } catch ( err ) {
        res.status( 500 ).json( { message: ErrorMessages.unknown } );
    }
};