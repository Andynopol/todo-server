import { Router } from "express";

import { AddTodo, RemoveTodo } from '../controller/TodoController.js';

const router = Router();

router.post( '/store', AddTodo );

router.delete( '/remove', RemoveTodo );

export default router;