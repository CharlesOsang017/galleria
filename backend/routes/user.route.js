import express from 'express'
import { createUser, logOut, userLogin } from '../controllers/user.controller.js';

const router = express.Router()


router.post('/create', createUser)
router.post("/login", userLogin)
router.post("/logout", logOut)

export default router;