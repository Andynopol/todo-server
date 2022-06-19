import { Router } from "express";

import { AddTodo, getTodos, RemoveTodo } from '../controller/TodoController.js';

const router = Router();

router.get( '/:_id', getTodos );

router.post( '/store', AddTodo );

router.delete( '/remove', RemoveTodo );

export default router;