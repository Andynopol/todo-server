import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import UserRouter from './router/UserRouter.js';
import TodoRouter from './router/TodoRouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3800;

app.use( express.json( { limit: '50mb' } ) );
app.use( express.urlencoded( { limit: '30mb', extended: true } ) );
app.use( '/usr', UserRouter );
app.use( '/todos', TodoRouter );

mongoose.connect( process.env.MONGO_BASE_URL, { dbName: process.env.MONGO_DB_NAME, user: process.env.MONGO_USER, pass: process.env.MONGO_PASS } )
    .then( () => console.log( `Connection established! We are online!` ) )
    .catch( () => console.log( `Database connection failed!` ) );


app.listen( PORT, () => console.log( `listening at port: ${ PORT }` ) );

