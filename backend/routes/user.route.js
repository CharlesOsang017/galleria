import express from 'express'
import { createUser, userLogin } from '../controllers/user.controller.js';

const router = express.Router()


router.post('/create', createUser)
router.post("/login", userLogin)


export default router;