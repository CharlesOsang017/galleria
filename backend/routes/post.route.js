import express from 'express'
import { protectedRoute } from '../middleware/protectRoute.js'
import { createPost, deletePost, updatePost, likeUnlikePost, commentOnPost } from '../controllers/post.controller.js'

const router = express.Router()

router.post('/create', protectedRoute, createPost)
router.delete("/delete/:id", protectedRoute, deletePost)
router.put("/update/:id", protectedRoute, updatePost)
router.post('/likes/:id', protectedRoute, likeUnlikePost)
router.post("/comments/:id", protectedRoute, commentOnPost)

export default router