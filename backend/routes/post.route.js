import express from 'express'
import { protectedRoute } from '../middleware/protectRoute.js'
import { createPost, deletePost, updatePost } from '../controllers/post.controller.js'

const router = express.Router()

router.post('/create', protectedRoute, createPost)
router.delete("/delete/:id", protectedRoute, deletePost)
router.put("/update/:id", protectedRoute, updatePost)

export default router