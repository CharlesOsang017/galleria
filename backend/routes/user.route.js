import express from 'express'
import { createUser,getMe, logOut, userLogin } from '../controllers/user.controller.js';
import { protectedRoute } from '../middleware/protectRoute.js';

const router = express.Router()


router.post('/create', createUser)
router.post("/login", userLogin)
router.post("/logout", logOut)
router.get('/me', protectedRoute, getMe)

export default router;