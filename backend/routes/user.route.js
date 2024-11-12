import express from 'express'
import { getUserProfile, updateProfile } from '../controllers/user.controller.js'
import { protectedRoute } from '../middleware/protectRoute.js'

const router = express.Router()

router.get("/profile/:username", protectedRoute, getUserProfile)
router.post("/update", protectedRoute, updateProfile)

export default router