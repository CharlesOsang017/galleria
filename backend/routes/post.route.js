import express from 'express'
import { protectedRoute } from '../middleware/protectRoute.js'
import { createPost, deletePost } from '../controllers/post.controller.js'

const router = express.Router()

router.post('/create', protectedRoute, createPost)
router.delete("/delete/:id", protectedRoute, deletePost)

export default router