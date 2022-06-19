import { Router } from "express";

import { deleteUser, loginUser, saveUser } from '../controller/UserController.js';

const router = Router();

router.post( '/login', loginUser );

router.post( '/register', saveUser );

router.delete( '/delete-user/:_id', deleteUser );

export default router;